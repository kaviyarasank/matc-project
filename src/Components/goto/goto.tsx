import React, { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import "./goto.scss";

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [scroll, setScroll] = useState(0);

    useEffect(() => {

        let progressBarHandler = () => {
            
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll:any = `${totalScroll / windowHeight}`;

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
    return (
        <><div id="progressBarContainer">
            <div id="progressBar" style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }} />
        </div><div className="top-to-btm">
                {showTopBtn && (
                    <FaAngleUp
                        className="icon-position icon-style"
                        onClick={goToTop} />
                )}{" "}
            </div></>
    );
};
export default ScrollToTop;