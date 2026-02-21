import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './src/App.tsx';
import { TOOLS } from './src/constants.tsx';

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
  const helmetContext = {};
  
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

console.log('Prerendering complete.');
