import './Footer.scss';
import timezone from '../../assets/timezone.png';
import { useEffect, useState } from 'react';
import { GrTwitter } from 'react-icons/gr';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  let navigate = useNavigate();
  const bottomVisible = () =>
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight);

  window.onscroll = function () {
    var totalPageHeight = document.body.scrollHeight;
    var scrollPoint = window.scrollY + window.innerHeight;
    if (scrollPoint >= totalPageHeight) {
      setIsBottomVisible(true);
    }
  };

  useEffect(() => {
    setIsBottomVisible(bottomVisible());
  }, [isBottomVisible]);

  window.addEventListener('scroll', () => {
    setIsBottomVisible(bottomVisible());
  });

  const handleAbout = () => {
    navigate('/about');
  };
  const handleContact = () => {
    navigate('/contact');
  };
  return (
    <footer>
      <div
        className={` ${
          isBottomVisible
            ? 'd-flex align-item-center justify-content-center footer-Box mb-1 row  footer-rowcon'
            : 'disappear'
        }  `}>
        <div className="col">
          <img src={timezone} alt="" data-testid="footer-image" />
          <div>
            <p className="footer-link mx-auto text-center">
              {' '}
              Everyone looks at your watch and it represents who you are,your values and your
              personal style.
            </p>
          </div>
        </div>
        <div className="col">
          <p className="footer-heading">Quick Links</p>
          <div>
            <button className="footer-links" data-testid="footer-aboutBtn" onClick={handleAbout}>
              About
            </button>
          </div>
          <div>
            <button className="footer-links">Offers & Discounts</button>
          </div>
          <div>
            <button className="footer-links">Get Coupon</button>
          </div>
          <div>
            <button
              className="footer-links"
              data-testid="footer-contactbtn"
              onClick={handleContact}>
              Contact Us
            </button>
          </div>
        </div>
        <div className="col">
          <p className="footer-heading">New Products</p>
          <div>
            <button className="footer-links">Woman Cloth</button>
          </div>
          <div>
            <button className="footer-links">Fashion Accessories</button>
          </div>
          <div>
            <button className="footer-links">Man Accessories</button>
          </div>
          <div>
            <button className="footer-links">Rubber made Toys</button>
          </div>
        </div>
        <div className="col">
          <p className="footer-heading">Support</p>
          <div>
            <button className="footer-links">Frequently Asked Questions</button>
          </div>
          <div>
            <button className="footer-links">Terms & Conditions</button>
          </div>
          <div>
            <button className="footer-links">Privacy Policy</button>
          </div>
          <div>
            <button className="footer-links">Report a Payment Issue</button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <p className="footer-icon">
            <GrTwitter />
          </p>
          <p className="ms-4 icons">
            <BsFacebook />
          </p>
          <p className="ms-4 icons">
            <BsInstagram />
          </p>
        </div>
        <p className="footer-copyright text-center">Copyright ©2022 All rights reserved</p>
      </div>
    </footer>
  );
}
export default Footer;
