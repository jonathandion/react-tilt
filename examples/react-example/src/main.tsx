import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
