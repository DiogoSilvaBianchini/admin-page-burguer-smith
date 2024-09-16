import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId='596045703945-e9cc6mud5giiejv146btejr7qi4hmj23.apps.googleusercontent.com'
      >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
