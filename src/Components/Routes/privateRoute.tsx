import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "../../Components/Home/Home"
import { getLocalStorageValuesBoolean } from "../../Helper/localStore";
import Navigation from "../../Nav";
import About from "../About/About";
import Cart from "../cart/cart";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import ScrollToTop from "../goto/goto";
import Shop from "../Shop/Shop";

function PrivateRouter() {
    let localValues = getLocalStorageValuesBoolean();
    console.log("localValues", localValues)
    return (
        <div className="App">
            {localValues ? <Navigation /> : <div></div>}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/shop" element={<Shop />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
            </Routes>
            <ScrollToTop />
            {localValues ? <Footer /> : <div></div>}

        </div>
    );
}

export default PrivateRouter;
