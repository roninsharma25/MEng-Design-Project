import "./App.css"
import React, { useState, useEffect } from "react"

import Main from "./components/Main"
import Unauthorized from "./components/Unauthorized"
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

  const gradient = {
    backgroundImage: "linear-gradient(to right, #623bff, #4dacff)",
  }

  const centerStyle = {
    borderRadius: "25px",
    padding: "50px",
    margin: "auto", 
    marginTop: "100px",
    width: "50%",
    textAlign: "center"
}

  return authenticated 
    ? <Main authenticate={setAuthenticated} gradient={gradient} user={user}/> 
    : <Unauthorized authenticate={setAuthenticated} centerStyle={{...centerStyle, ...gradient}}/>

}

export default App
