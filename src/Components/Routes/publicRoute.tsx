import {
    Routes,
    Route,
  } from "react-router-dom";
  import Login from "../../Components/Login/Login"
  import Register from "../../Components/Login/Register"
  
  function PublicRouter() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    );
  }
  
  export default PublicRouter;
  