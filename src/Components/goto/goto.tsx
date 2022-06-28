import React, { useEffect, useState } from 'react';
import { FaAngleUp, FaShareSquare } from 'react-icons/fa';
import "./goto.scss";
import { RWebShare } from "react-web-share";
import Chatbot from '../ChatBox/ChatBoat';
import { MdOutlineMessage } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"


const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {

        let progressBarHandler = () => {

            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll: any = `${totalScroll / windowHeight}`;

            setScroll(scroll);
        }

        window.addEventListener("scroll", progressBarHandler);

        return () => window.removeEventListener("scroll", progressBarHandler);
    });
    useEffect(() => {
        window.addEventListener("scroll", () => {
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
            behavior: "smooth",
        });
    };

    var currentLocation = window.location;

    const handleMessage=()=>{
        toggle();
    }
    return (
        <><div id="progressBarContainer">
            <div id="progressBar" style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }} />
        </div><div className="top-to-btm">
                 <div >
                    <Modal isOpen={modal}
                        toggle={toggle}
                        modalTransition={{ timeout: 500 }}>
                        <ModalBody>
                        <Chatbot/>
                        </ModalBody>
                    </Modal>
                </div >
            <MdOutlineMessage className='icon-positionMessage icon-styleMessage messageButton' onClick={handleMessage}/>
                {showTopBtn && (
                    <FaAngleUp
                        className="icon-position icon-style"
                        onClick={goToTop} />
                )}{" "}

                <RWebShare
                    data={{
                        text: "Lost time is never found again",
                        url: `${currentLocation}`,
                        title: "Share this Website by using"
                    }}
                    onClick={() => console.info("share successful!")}
                >
                    <button className='icon-positionMessage icon-styleMessage shareButton'><FaShareSquare /></button>
                </RWebShare>
            </div></>
    );
};
export default ScrollToTop;