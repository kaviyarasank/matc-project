import { Routes, Route } from "react-router-dom";
import Home from "../../Components/Home/Home";
import { getLocalStorageValuesBoolean } from "../../Helper/localStore";
import Navigation from "../../Nav";
import About from "../About/About";
import Cart from "../cart/cart";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import ScrollToTop from "../goto/goto";
import History from "../History/History";
import LikedItems from "../LikedItems/LikedItems";
import Profile from "../Profile/Profile";
import Shop from "../Shop/Shop";
import Tracking from "../Track/Tracking";
import { ErrorBoundary } from "react-error-boundary";
import "./Routes.scss";



function PrivateRouter() {
  let localValues = getLocalStorageValuesBoolean();
  console.log("localValues", localValues);
  function ErrorFallback() {
    return (
      <div role="alert">
        <main>
          <div id="wrap">
            <div className="hand hand-left">
              <span className="hand-part part-top"></span>
              <span className="hand-part part-middle"></span>
              <span className="hand-part part-bottom"></span>
            </div>
            <div className="hand hand-right">
              <span className="hand-part part-top"></span>
              <span className="hand-part part-middle"></span>
              <span className="hand-part part-bottom"></span>
            </div>
            <div className="line line-1">
              <div className="ball">5</div>
            </div>
            <div className="line line-2">
              <div className="ball">0</div>
            </div>
            <div className="line line-3">
              <div className="ball">0</div>
            </div>
            <div id="server">
              <div className="eye eye-left">
                <span></span>
              </div>
              <div className="eye eye-right">
                <span></span>
              </div>
              <div className="block">
                <div className="light"></div>
              </div>
              <div className="block">
                <div className="light"></div>
              </div>
              <div className="block">
                <div className="light"></div>
              </div>
              <div className="block">
                <div className="light"></div>
              </div>
              <div className="block">
                <div className="light"></div>
              </div>
              <div id="bottom-block">
                <div className="bottom-line"></div>
                <div id="bottom-light"></div>
              </div>
            </div>
          </div>

          <div id="code-error">
            <h1>Internal Server Error!</h1>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="App">
      {localValues ? <Navigation /> : <div></div>}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/likedItems" element={<LikedItems />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/Tracking" element={<Tracking />}></Route>
          <Route path="/History" element={<History />}></Route>
        </Routes>
        <ScrollToTop />
        {localValues ? <Footer /> : <div></div>}
      </ErrorBoundary>
    </div>
  );
}

export default PrivateRouter;
