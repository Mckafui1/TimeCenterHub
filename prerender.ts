import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App.tsx';
import { TOOLS } from './constants.tsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');

const routes = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/sitemap',
  ...TOOLS.map(tool => tool.path)
];

// Ensure output directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const render = (url) => {
  const helmetContext: any = {};
  
  const appHtml = renderToString(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        StaticRouter,
        { location: url },
        React.createElement(AppRoutes)
      )
    )
  );

  const { helmet } = helmetContext;

  let html = template.replace('<!--app-html-->', appHtml);
  
  // Inject Helmet meta tags
  if (helmet) {
    const headTags = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `;
    html = html.replace('</head>', `${headTags}</head>`);
  }

  return html;
};

// Process all routes
console.log('Prerendering pages...');
routes.forEach(route => {
  try {
    const html = render(route);
    
    // Determine output path
    const relativePath = route === '/' ? 'index.html' : `${route.substring(1)}/index.html`;
    const outPath = path.resolve(__dirname, 'dist', relativePath);
    
    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, html);
    console.log(`Generated: ${relativePath}`);
  } catch (e) {
    console.error(`Error generating ${route}:`, e);
  }
});

// Generate Sitemap
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://timecenterhub.com${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), sitemap);
  console.log('Generated: sitemap.xml');
};

generateSitemap();

// Copy robots.txt
const copyRobots = () => {
  const robotsSrc = path.resolve(__dirname, 'public/robots.txt');
  const robotsDest = path.resolve(__dirname, 'dist/robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDest);
    console.log('Copied: robots.txt');
  }
};

copyRobots();

console.log('Prerendering complete.');
