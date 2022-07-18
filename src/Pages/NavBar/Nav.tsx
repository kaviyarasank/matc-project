import { Link, useNavigate } from 'react-router-dom';
import './common.scss';
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import timezone from '../../assets/loginLogo.png';
import { getLocalStorageValuesBoolean } from '../../Helper/localStore';
import { useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { GrMoreVertical } from 'react-icons/gr';
import Color from '../../Helper/Color';
import randomColor from 'randomcolor';
import { useCallback, useMemo, useState } from 'react';

function Navigation() {
  const [color, setColor] = useState('');

  const callbackColorChange = useCallback(() => setColor(randomColor()), []);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };
  let localValues = getLocalStorageValuesBoolean();
  const cart = useSelector((state: any) => state.cart);

  const memoColor = useMemo(
    () => <Color handleChange={callbackColorChange} color={color} />,
    [color, callbackColorChange]
  );
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleHome = () => {
    navigate('/');
  };
  let userData = JSON.parse(localStorage.getItem('cartProduct') || '{}');
  return (
    <div
      className={localValues ? 'd-flex navbar-header' : 'd-none'}
      style={{ backgroundColor: color }}>
      <div className="logoImage">
        <img src={timezone} alt="" onClick={handleHome} className="cursor-pointer" />
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={active ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <div className="navbar" style={{ backgroundColor: color }}>
        <ul className={active ? 'nav-menu active' : 'nav-menu'} style={{ backgroundColor: color }}>
          <Link to="/" className="nav-links">
            Home
          </Link>
          <Link to="/shop" className="nav-links">
            Shop
          </Link>
          <Link to="/about" className="nav-links">
            About
          </Link>
          <Link to="/contact" className="nav-links">
            Contact
          </Link>
        </ul>
      </div>
      <div className="login-div">
        <div style={{ color }} className="hoverColor mt-1">
          {memoColor}
        </div>
        <p className="cartLength">{cart?.length}</p>
        <Link to="/cart" className="login-icon carticon">
          <BsCart3 />
        </Link>
        <GrMoreVertical className="store" />
        <NavDropdown title="" id="basic-nav-dropdown" className="dropNav">
          <div className="row d-flex dropBoxwidth">
            <Link to="/likedItems" className="dropText logoutbtn text-center text-decoration-none">
              LikedList
            </Link>
            <Link to="/profile" className="dropText logoutbtn text-center text-decoration-none">
              Profile
            </Link>
            {userData.length !== 0 ? (
              <Link to="/Tracking" className="dropText logoutbtn text-center text-decoration-none">
                TrackYourOrder
              </Link>
            ) : (
              ''
            )}
            <Link
              to="/History"
              className="dropText logoutbtn text-center text-decoration-none historyNone">
              History
            </Link>
          </div>
          <div className="row d-flex">
            <button className="dropText border-0 bg-light logoutbtn" onClick={handleLogout}>
              Logout <AiOutlineLogout />
            </button>
          </div>
        </NavDropdown>
      </div>
    </div>
  );
}

export default Navigation;
