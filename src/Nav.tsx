
import {Link ,useNavigate} from "react-router-dom"
import "./common.scss";
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import timezone from "./assets/timezone.png";
import { getLocalStorageValuesBoolean } from "./Helper/localStore";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaStore } from "react-icons/fa";

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
              <FaStore className="store"/>
            <NavDropdown title="" id="basic-nav-dropdown" className="dropNav">
            <div className="row d-flex">
              <Link to="/likedItems" className="dropText logoutbtn text-center text-decoration-none">LikedList</Link>
              <Link to="/likedItems" className="dropText logoutbtn text-center text-decoration-none">Profile</Link>
              </div>
              <div className="row d-flex">
              <button  className="dropText border-0 bg-light logoutbtn" onClick={handleLogout}>Logout <AiOutlineLogout/></button>
              </div>
            </NavDropdown>
            </div>       
              </div>
  );
}

export default Navigation;
