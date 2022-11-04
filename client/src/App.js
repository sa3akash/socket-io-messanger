import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messanger from "./pages/messanger/Messanger";
import {BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux"
import { useEffect } from "react";

function App() {
const {user} = useSelector(state=>state.Auth)

useEffect(()=>{
  localStorage.setItem("user",JSON.stringify(user))
},[user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Messanger/> : <Navigate to="/login"/>} />
        <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
