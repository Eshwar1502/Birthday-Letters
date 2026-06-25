import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bundled fonts (offline-safe, no CDN). Weights kept minimal for fast load.
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/600.css'
import '@fontsource/caveat/700.css'
import '@fontsource/permanent-marker/400.css'
import '@fontsource/gloria-hallelujah/400.css'

import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
