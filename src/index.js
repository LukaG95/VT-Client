import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App'
import {UserContextProvider} from './UserContext'

import './css/styles.css'
import './css/animations.css'
import './css/template.css'
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
  <UserContextProvider>
      <Router>
        <App />
      </Router>
  </UserContextProvider>,
  document.getElementById('root')
)
