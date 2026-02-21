import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { HelmetProvider } from 'react-helmet-async'
import { AppRoutes } from './App'

export function render(url: string, helmetContext: any) {
  return renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>
  )
}
