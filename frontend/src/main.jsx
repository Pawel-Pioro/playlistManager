import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import { PlaylistsContextProvider } from './context/PlaylistContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <PlaylistsContextProvider>
        <App />
      </PlaylistsContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
