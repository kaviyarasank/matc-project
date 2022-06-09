import "./Footer.scss";
import timezone from "../../assets/timezone.png";
import { useEffect, useState } from "react";
import { GrTwitter } from 'react-icons/gr';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { useNavigate } from "react-router-dom"

function Footer(){
    const [isBottomVisible,setIsBottomVisible] = useState(false)
    let navigate = useNavigate();
    const bottomVisible =()=>
        document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  
    useEffect(()=>{
      setIsBottomVisible(bottomVisible())
    },[isBottomVisible])
  
      window.addEventListener("scroll",()=>{
        setIsBottomVisible(bottomVisible())
      })

      const handleAbout=()=>{
        navigate("/about");
      }
  const handleContact=()=>{
    navigate("/contact");
  }
    return(
    <footer >
      <div className={` ${isBottomVisible ? "d-flex align-item-center justify-content-center footer-Box mb-1 row  footer-rowcon":"disappear"}  `}>
          <div className="col">
          <img src={timezone} alt=""/>
          <div>
          <p className="footer-link"> Asorem ipsum adipolor sdit amet, consectetur adipisicing elitcf sed do eiusmod tem.</p>
          </div>
              </div>
          <div className="col">
              <p className="footer-heading">Quick Links</p>
              <div><button className="footer-links" onClick={handleAbout}>About</button></div>
              <div><button className="footer-links">Offers & Discounts</button></div>
              <div><button className="footer-links">Get Coupon</button></div>
              <div><button className="footer-links" onClick={handleContact}>Contact Us</button></div>
              
              </div>
          <div className="col">
              <p className="footer-heading">New Products</p>
          <div><button className="footer-links">Woman Cloth</button></div>
              <div><button className="footer-links">Fashion Accessories</button></div>
              <div><button className="footer-links">Man Accessories</button></div>
              <div><button className="footer-links">Rubber made Toys</button></div>
          </div>
          <div className="col">
              <p className="footer-heading">Support</p>
          <div><button className="footer-links">Frequently Asked Questions</button></div>
              <div><button className="footer-links">Terms & Conditions</button></div>
              <div><button className="footer-links">Privacy Policy</button></div>
              <div><button className="footer-links">Report a Payment Issue</button></div>
          </div>
        <div className="d-flex justify-content-center">
        <p className="footer-copyright">Copyright ©2022 All rights reserved</p>
            <p className="footer-icon"><GrTwitter/></p>
           <p className="ms-4 icons"><BsFacebook/></p>
           <p className="ms-4 icons"><BsInstagram/></p>
        </div>
     
      </div>
    </footer>
    )
}
export default Footer;