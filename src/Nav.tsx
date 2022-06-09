
import {Link ,useNavigate} from "react-router-dom"
import "./common.scss";
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import timezone from "./assets/timezone.png";
import { getLocalStorageValuesBoolean } from "./Helper/localStore";
import { useSelector } from "react-redux";

function Navigation() {

  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("name");
    navigate("/");
    window.location.reload();
  }
  let localValues = getLocalStorageValuesBoolean();
  const cart = useSelector((state:any) => state.cart);
  console.log("localValues==>",cart?.length)
  return (
      <div className={localValues ? "d-flex navbar-header" : "d-none"}>
        <div className="logoImage"><img src={timezone} alt=""/></div>
    <div className="navbar">
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
           </ul>
        </div>
        <div className="login-div">
        <p className="cartLength">{cart?.length}</p>
            <Link to="/cart" className="login-icon carticon"><BsCart3/></Link>
            <button className="login-icon font-out ms-1 bg-light border-0" onClick={handleLogout}><AiOutlineLogout/> </button>
            <div className="hide">LogOut</div>
            </div>       
              </div>
  );
}

export default Navigation;
