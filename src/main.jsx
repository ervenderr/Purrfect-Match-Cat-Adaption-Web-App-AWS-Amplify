import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import { ConfigProvider } from 'antd';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
