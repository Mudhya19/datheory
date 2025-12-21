import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/index.css'

// Temporarily disable mock service worker to troubleshoot blank screen
function enableMocking() {
  // Disable mocking for now to isolate the issue
  return Promise.resolve();
}

enableMocking().then(() => {
  try {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Error mounting React app:', error);
    document.getElementById('root')!.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;">Error mounting React app. Check console for details.</div>';
  }
}).catch(error => {
  console.error('Error initializing mocks:', error);
  document.getElementById('root')!.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;">Error initializing mocks. Check console for details.</div>';
});
