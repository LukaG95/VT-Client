import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import {App} from './App'
import {UserContextProvider} from './UserContext'
import {PopupContextProvider} from './components/PopupContext'

import './css/styles.css'
import './css/animations.css'
import './css/template.css'
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
  <UserContextProvider>
    <PopupContextProvider>
      <Router>
        <App />
      </Router>
    </PopupContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
)
