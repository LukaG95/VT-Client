import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import Nav from './components/Nav.js'
import Shop from './components/Shop.js'
import About from './components/About.js'

import './css/App.css'

function App() {
  return (
    <div className="App">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
        <Switch>
          <Route exact path="/"><Shop /></Route>
          <Route path="/about"><About /></Route>
        </Switch>
    </div>
  )
}

export default App
