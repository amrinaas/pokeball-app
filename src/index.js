import React from 'react'
import ReactDOM from 'react-dom/client'

// import from local
import App from './App'
import './index.css'
import storeRedux from './Store'

// import from provider
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={storeRedux}>
      <App />
    </Provider>
  </React.StrictMode>
)
