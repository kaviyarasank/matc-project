
import {Link ,useNavigate} from "react-router-dom"
import "./common.scss";
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import timezone from "./assets/loginLogo.png";
import { getLocalStorageValuesBoolean } from "./Helper/localStore";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { GrMoreVertical } from "react-icons/gr";
import Color from "./Helper/Color";
import randomColor from "randomcolor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCartInfo } from "./Redux/getCartInfo";
import { AppDispatch } from "./Redux/Store";
import { fetchProduct } from "./Redux/getProductInfo";


function Navigation() {

  const [color, setColor] = useState("");
  
  const callbackColorChange = useCallback(() => setColor(randomColor()), []);
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }
  const dispatch = useDispatch<AppDispatch>();

  let localValues = getLocalStorageValuesBoolean();
  const cart = useSelector((state:any) => state.cart);

  const cartInfoDetails = useSelector((state:any) => state.getCartInfo.playerList?.data);
  console.log("cartInfoDetails",cartInfoDetails)
  

  const fetch = useCallback(() => {
    try {
      dispatch(fetchCartInfo());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(()=>{
    fetch();
  },[fetch])

  const memoColor = useMemo(
    () => <Color handleChange={callbackColorChange} color={color} />,
    [color, callbackColorChange]
  );
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleHome =()=>{
    navigate("/")
  }

  const playerList = useSelector((state: any) => state.getProduct.playerList);
  
  let userData = playerList?.data
  console.log("state.getProduct.playerList",playerList)
  const fetchPr = useCallback(() => {
    try {
      dispatch(fetchProduct());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(()=>{
    const timer = setTimeout(() => {
      fetchPr();
    }, 1000);
    return () => clearTimeout(timer);
  },[fetchPr])

  
  return (
      <div className={localValues ? "d-flex navbar-header" : "d-none"}  style={{backgroundColor:color}} >
        <div className="logoImage"><img src={timezone} alt="" onClick={handleHome} className="cursor-pointer"/></div>
        <div className="menu-icon" onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    <div className="navbar"  style={{backgroundColor:color}}>
           <ul className={active ? "nav-menu active" : "nav-menu"} style={{backgroundColor:color}}>
              <Link to="/" className="nav-links">Home</Link>
              <Link to="/shop" className="nav-links">Shop</Link>
              <Link to="/about" className="nav-links">About</Link>
              <Link to="/contact" className="nav-links">Contact</Link>
              
           </ul>
        </div>
        <div className="login-div">
        <div style={{ color }} className="hoverColor">
             {memoColor}
        </div>
        <p className="cartLength">{cart?.length}</p>
            <Link to="/cart" className="login-icon carticon"><BsCart3/></Link>
              <GrMoreVertical className="store"/>
            <NavDropdown title="" id="basic-nav-dropdown" className="dropNav">
            <div className="row d-flex dropBoxwidth">
              <Link to="/likedItems" className="dropText logoutbtn text-center text-decoration-none">LikedList</Link>
              <Link to="/profile" className="dropText logoutbtn text-center text-decoration-none">Profile</Link>
              {userData.length >0 && <Link to="/Tracking" className="dropText logoutbtn text-center text-decoration-none">TrackYourOrder</Link>}
              <Link to="/History" className="dropText logoutbtn text-center text-decoration-none historyNone">History</Link>
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
