import "./App.css"
import React, { useState, useEffect } from "react"

import Main from "./components/Main"
import Start from "./components/Start"
import firebase from './components/Firebase';

function App() {
  // TODO: some login stuff here
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        setUser(user);
      }
    })
  }, [])

  return authenticated 
    ? <Main setAuthenticated={setAuthenticated} user={user}/> 
    : <Start setAuthenticated={setAuthenticated}/>
}

export default App
