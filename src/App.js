import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const [progress, setProgress] = useState(0);
  return (
    <BrowserRouter>
        <div className="App">
          <LoadingBar
          color='#f11946'
          progress={progress}
          loaderSpeed={100}
          height={3}
        />
          <Navbar />    
          <Routes>
            <Route path="/" exact element={<News setProgress={setProgress} key="general" pageSize={6} country="in" category="general"/>} />
            <Route path="/business" exact element={<News setProgress={setProgress} key="business" pageSize={6} country="in" category="business"/>} />
            <Route path="/entertainment" exact element={<News setProgress={setProgress} key="enter" pageSize={6} country="in" category="entertainment"/>} />
            <Route path="/general" exact element={<News setProgress={setProgress} key="gen" pageSize={6} country="in" category="general"/>} />  
            <Route path="/health"  exact element={<News setProgress={setProgress} key="hea" pageSize={6} country="in" category="health"/>} />   
            <Route path="/science" exact element={<News setProgress={setProgress} key="sci" pageSize={6} country="in" category="science"/>} /> 
            <Route path="/sports" exact element={<News setProgress={setProgress} key="sp" pageSize={6} country="in" category="sports"/>} />  
            <Route path="/technology" exact element={<News setProgress={setProgress} key="tech" pageSize={6} country="in" category="technology"/>} />  
          </Routes>
        </div>
    </BrowserRouter>
  )
}

