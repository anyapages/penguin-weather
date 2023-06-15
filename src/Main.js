import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import "mdb-react-ui-kit";
class Main extends Component {
render() {
  return (
  
    <HashRouter>

      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
  
    </HashRouter>
    
    );
  }
}

export default Main;