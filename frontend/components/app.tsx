import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from './splash/splash';

export default function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Splash />}/>
      </Routes>     
    </div>
  )
}