import React, { useState, useContext } from 'react';
import './App.css';
import Tree from './components/Tree/Tree'
import SignIn from './components/SignIn/SignIn'
import {Context} from './context/Context'

function App() {

  const { userLogged } = useContext(Context)

  console.log(userLogged);
  
  return (
    userLogged ?
      <Tree></Tree>
      :
      <SignIn></SignIn>
  );
}

export default App;
