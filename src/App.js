import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ headerName, setHeaderName ] = useState('')
  useEffect(()=> {
    fetch('http://0.0.0.0:8000/')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setHeaderName(json.Hello)
    })
    .catch((error) => {
      console.error(error);
    });
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {headerName}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
