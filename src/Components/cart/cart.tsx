import "./Cart.scss";
import {useLocation, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { clear, clearCart, decrement, increament } from "../../Redux/CardAction";
import { useCallback, useEffect, useState } from "react";
import { cartTotalPriceSelector } from "./cartTotal";
import { MdAutoDelete } from 'react-icons/md';
import Empty from "./Emptycart";
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense, lazy } from 'react';



function Cart(){
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const handleClick=()=>{
       setModal(true);
    }
    const Empty = lazy(() => import('./Emptycart'));
    const cart = useSelector((state:any) => state?.cart);
    const handleplus=(id:any)=>{
      dispatch(increament(id));

    }
    const handleminus=(id:any)=>{
      dispatch(decrement(id));
    }
    const notify = () => toast.success('Payment Successfull', {
      className: 'toast-success'
    });
    const totalPrice = useSelector(cartTotalPriceSelector);
    console.log("totalPrice",cart)

    
    const handleClear=(id:any)=>{
      dispatch(clear(id))
    }
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    const StripeCheckoutButton = (price:any) => {
      const priceForStripe = price * 100;
      const publishableKey = 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb';
  
      const allClear = useCallback(
        () => {
            try {
                dispatch(clearCart());
            } catch (err) {
                console.log(err);
            }
        },
        [dispatch]
    );

      const onToken = (token: any) => {
          console.log("token",token);
          localStorage.setItem("address", JSON.stringify(token));
          notify();
          localStorage.setItem("cartProduct", JSON.stringify(cart));
          localStorage.setItem("productAmount", JSON.stringify(totalPrice));
          allClear();
          navigate("/Tracking");
      };
  
      return (
          <StripeCheckout
              label='Pay Now'
              name='Time Zone'
              billingAddress
              shippingAddress
              image='https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
              description={`Your total is $${totalPrice}`}
              amount={priceForStripe}
              panelLabel='Pay Now'
              token={onToken}
              stripeKey={publishableKey}
          />
      )
  }

    return (
        <div className="cartmainDiv">

          {cart?.length !== 0 ? (<>
          <div className="secondCart">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className={"toastMargin"}
          />
            <section className="h-custom ">
              <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col cartsection">

                    <div className="table-responsive mt-4">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="h5 colorWhite">Added Items</th>
                            <th className="colorWhite">Quantity</th>
                            <th className="colorWhite">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart && cart?.map((data: any) => {
                            console.log("dataaaa", data);
                            return (
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img src={data?.image} className="img-fluid rounded-3"
                                      style={{ width: "120px" }} alt="Book" />
                                    <div className="flex-column ms-4">
                                      <p className="mb-2 colorWhite">{data?.name?.slice(0, 30)}</p>
                                    </div>
                                  </div>
                                </td>


                                <td className="align-middle">
                                  <div className="d-flex flex-row">
                                    <button className="btn btn-link px-2" disabled={data?.quantity === 1}
                                      onClick={() => handleminus(data?.id)}
                                    >
                                      <i className="fas fa-minus colorWhite"></i>
                                    </button>

                                    <input id="form1" min="0" name="quantity" value={data?.quantity} type="number"
                                      className="form-control form-control-sm" style={{ width: "50px" }} />

                                    <button className="btn btn-link px-2"
                                      onClick={() => handleplus(data?.id)}
                                    >
                                      <i className="fas fa-plus colorWhite"></i>
                                    </button>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0 colorWhite font-weight-bold">${" "}{data?.quantity * data?.price}</p>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0 colorWhite font-weight-bold cursor-pointer" onClick={() => handleClear(data?.id)}><MdAutoDelete className="closeiconcart" /></p>
                                </td>
                              </tr>
                            );

                          })}
                        </tbody>
                      </table>
                    </div>
                    <header className="App-header">
          <h4 className="colorWhite text-center">Payment Process</h4>
          <p className="colorWhite text-center">
            Pay Total of $ {totalPrice}
          </p>
          <p className="colorWhite text-center">
            <StripeCheckoutButton price={totalPrice} />
          </p>
        </header>
                  </div>
                </div>
              </div>
            </section>
          </div>

          </>)
          :(
            <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
                <Empty />
          </Suspense>
          )
        }

        </div>
    )
}
export default Cart;