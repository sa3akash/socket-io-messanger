import { useRef } from "react";
import "./register.css";
import {register} from "../../Http";
import {Link} from "react-router-dom"
import {setFetching,setAuth} from "../../store/AuthSlice";
import {useDispatch, useSelector} from "react-redux"

export default function Register() {

  const dispatch = useDispatch()
  const {isFetching} = useSelector(state=>state.Auth)

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value) return;
    const data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    }
    const addRegister = async () => {
      dispatch(setFetching(true))
      try{
        const res = await register(data)
        dispatch(setAuth(res.data))
        dispatch(setFetching(false))
      }catch(err){
        dispatch(setFetching(false))
        console.log(err.response.data);
      }
    }
    addRegister()
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SA2 Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              Sign Up
            </button>
            
            <button className="loginRegisterButton">
              <Link to="/login" style={{color:"inherit",textDecoration:"none"}}>Log into Account</Link>
            </button>
          
          </form>
        </div>
      </div>
    </div>
  );
}