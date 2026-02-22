import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// Define routes to prerender
// We can't easily import TOOLS from constants.tsx here because it's not built for Node yet in this context,
// unless we also build constants.tsx or duplicate the list.
// For simplicity, I will hardcode the main routes and a few tool routes, 
// OR I can try to parse the sitemap.xml if I had one generated? 
// Actually, I can just fetch the routes from the built server bundle if I exported them?
// No, let's just list them. The user wants "not an SPA", so main pages are critical.

const routes = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/sitemap',
  // Time Tools
  '/time-calculator',
  '/chronometer',
  '/time-duration',
  '/add-time',
  '/subtract-time',
  '/hours-from-now',
  '/minutes-from-now',
  '/time-until-midnight',
  '/sleep-calculator',
  '/meeting-cost',
  '/world-clock',
  '/time-to-decimal',
  '/speed-distance-time',
  // Date Tools
  '/age-calculator',
  '/date-calculator',
  '/weekday',
  '/week-number',
  '/time-between-dates',
  '/days-from-now',
  '/business-days',
  '/day-of-year',
  '/leap-year',
  '/pregnancy-due-date',
  '/zodiac',
  '/birthday-countdown',
  '/retirement',
  '/wedding',
  // Work Tools
  '/work-hours',
  '/time-card',
  '/overtime',
  '/billable',
  '/shifts',
  '/breaks',
  // Converter Tools
  '/military-time',
  '/minutes-to-hours',
  '/hours-to-minutes',
  '/unix',
  '/units',
  '/ms-to-seconds',
  '/ms-to-date',
  '/pace',
  // Countdown Tools
  '/pomodoro',
  '/timer',
  '/new-year',
  '/exam',
  '/federal-holidays'
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
