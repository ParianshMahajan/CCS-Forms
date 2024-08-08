import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import config from "./config";
import AdminLogin from "./Admin/Pages/Login/AdminLogin";
import Form from "./Admin/Pages/Form/Form";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={</>}</Route> */}\
          <Route path="/form" element={<Form/>}></Route>
          
          {/* Admin  */}
          <Route path={config.adminRoute} element={<AdminLogin/>}></Route>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
