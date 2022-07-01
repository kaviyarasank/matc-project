import { Routes, Route } from 'react-router-dom';
import Home from '../../Components/Home/Home';
import { getLocalStorageValuesBoolean } from '../../Helper/localStore';
import Navigation from '../../Nav';
import Cart from '../cart/cart';
import Footer from '../Footer/Footer';
import ScrollToTop from '../goto/goto';
import Profile from '../Profile/Profile';
import Shop from '../Shop/Shop';
import Tracking from '../Track/Tracking';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../../Helper/Error';
import { Suspense, lazy } from 'react';
import Loader from '../Loader/loader';
import '../../Helper/Error.scss';

function PrivateRouter() {
  const localValues = getLocalStorageValuesBoolean();
  const LikedItems = lazy(() => import('../LikedItems/LikedItems'));
  const History = lazy(() => import('../History/History'));
  const About = lazy(() => import('../About/About'));
  const Contact = lazy(() => import('../Contact/Contact'));

  function ErrorFallback() {
    return <Error />;
  }
  return (
    <div className="App">
      {localValues ? <Navigation /> : <div></div>}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="text-center d-block mx-auto loaderPosition">
              <Loader />
            </div>
          }>
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
        </Suspense>
        <ScrollToTop />
        {localValues ? <Footer /> : <div></div>}
      </ErrorBoundary>
    </div>
  );
}

export default PrivateRouter;
