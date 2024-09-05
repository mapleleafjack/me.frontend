import React from 'react';
import './App.css';
import MainPanel from './Components/MainPanel/MainPanel';

function App() {
  return (
    <div id="background" data-testid="main-panel" >
      <MainPanel/>
    </div>
  );
}

export default App;
