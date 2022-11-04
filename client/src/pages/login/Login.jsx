import "./login.css";
import { useRef } from "react";
import {login} from "../../Http"
import {useDispatch,useSelector} from "react-redux"
import {setAuth,setFetching} from "../../store/AuthSlice";
import {Link} from "react-router-dom"

export default function Login() {

  const dispatch = useDispatch()
  const {isFetching} = useSelector(state=>state.Auth)

    const email = useRef();
    const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    if(!email.current.value && !password.current.value) return;
    const data = {
      email: email.current.value,
      password: password.current.value,
    }
    const callLogin = async () => {
      dispatch(setFetching(true))
      try{
        const res = await login(data)
        dispatch(setAuth(res.data))
        dispatch(setFetching(false))
      }catch(err){
        dispatch(setFetching(false))
        console.log(err.response.data);
      }
    }
    callLogin();
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
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link to="/register" style={{color:"inherit",textDecoration:"none"}}>Register</Link>
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}