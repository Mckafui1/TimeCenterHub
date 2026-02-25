import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render, TOOLS } = await import('./dist/server/entry-server.js');

// Define routes to prerender
const routes = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/sitemap',
  ...TOOLS.map(tool => tool.path)
];

(async () => {
  console.log('Start prerendering...');
  
  for (const url of routes) {
    try {
      const helmetContext = {};
      const appHtml = render(url, helmetContext);
      const { helmet } = helmetContext;

      let html = template.replace('<!--app-html-->', appHtml);

      if (helmet) {
        const headTags = `
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `;
        html = html.replace('</head>', `${headTags}</head>`);
      }

      const relativePath = url === '/' ? 'index.html' : `${url.substring(1)}/index.html`;
      const filePath = toAbsolute(`dist/static/${relativePath}`);
      
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      
      fs.writeFileSync(filePath, html);
      console.log(`Prerendered: ${url}`);
    } catch (e) {
      console.error(`Error prerendering ${url}:`, e);
    }
  }

  // Generate Sitemap
  console.log('Generating sitemap.xml...');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://timecenterhub.com${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemap);
  console.log('Sitemap generated.');

  // Copy robots.txt
  const robotsSrc = toAbsolute('public/robots.txt');
  const robotsDest = toAbsolute('dist/static/robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDest);
    console.log('Copied: robots.txt');
  }
  
  // Clean up: move dist/static to dist
  console.log('Moving files to dist root...');
  
  // Helper to move files recursively
  const moveFiles = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        moveFiles(srcPath, destPath);
      } else {
        // If file exists (e.g. from a previous run), overwrite it
        if (fs.existsSync(destPath)) {
            fs.unlinkSync(destPath);
        }
        fs.renameSync(srcPath, destPath);
      }
    }
  };

  // Move static assets to root dist
  moveFiles(toAbsolute('dist/static'), toAbsolute('dist'));
  
  // Remove temp directories
  fs.rmSync(toAbsolute('dist/static'), { recursive: true, force: true });
  fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
  
  console.log('Prerendering complete.');
})();
