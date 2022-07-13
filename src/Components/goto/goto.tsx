import { useEffect, useState } from 'react';
import { FaAngleUp, FaShareSquare } from 'react-icons/fa';
import './goto.scss';
import { RWebShare } from 'react-web-share';
import ChatbotMessage from '../ChatBox/ChatBoat';
import { TbMessageCircle } from 'react-icons/tb';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody } from 'reactstrap';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { postPath } from '../../Redux/pathAction';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll: any = `${totalScroll / windowHeight}`;

      setScroll(scroll);
    };

    window.addEventListener('scroll', progressBarHandler);

    return () => window.removeEventListener('scroll', progressBarHandler);
  });
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  var currentLocation = window.location;

  const handleMessage = () => {
    toggle();
  };
console.log("currentLocation",currentLocation)
  const hanldeShare=()=>{
    console.log("8888888888888",currentLocation)
    dispatch(postPath(currentLocation));
  }
  return (
    <>
      <div id="progressBarContainer">
        <div id="progressBar" style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }} />
      </div>
      <div className="top-to-btm">
        <div>
          <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 500 }} className="modalmainContent">
            <ModalBody>
              <ChatbotMessage />
            </ModalBody>
          </Modal>
        </div>
        <TbMessageCircle
          className="icon-positionMessage icon-styleMessage messageButton"
          onClick={handleMessage}
        />
        {showTopBtn && <FaAngleUp className="icon-position icon-style" onClick={goToTop} />}{' '}
        <RWebShare
          data={{
            text: 'Lost time is never found again',
            url: `${currentLocation}`,
            title: 'Share this Website by using'
          }}
          onClick={() => hanldeShare}>
          <button className="icon-positionMessage icon-styleMessage shareButton" onClick={hanldeShare}>
            <FaShareSquare onClick={hanldeShare}/>
          </button>
        </RWebShare>
      </div>
    </>
  );
};
export default ScrollToTop;
