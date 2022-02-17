import logo from './logo.svg';
import './App.css';
import Example from './components/Example';
import Home from './components/Home';
import Login from './components/Login';
import firebase from './components/Firebase';
import { useState, useEffect } from 'react';
import './styles/reduction.scss';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
  
        {/* <Example /> */}
        {user ? <Home /> : <Login />}
      </header>

    </div>
  );
}

export default App;
