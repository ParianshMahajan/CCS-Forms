import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestFile from "./Pages/TestFile";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestFile/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
