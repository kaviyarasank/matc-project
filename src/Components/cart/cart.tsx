import "./Cart.scss";
import {useLocation, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { clear, decrement, increament } from "../../Redux/CardAction";
import { useEffect, useState } from "react";
import { cartTotalPriceSelector } from "./cartTotal";
import { MdAutoDelete } from 'react-icons/md';
import Empty from "./Emptycart";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineCloseSquare } from "react-icons/ai";


function Cart(){
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const handleClick=()=>{
       setModal(true);
    }

    const cart = useSelector((state:any) => state?.cart);
    const handleplus=(id:any)=>{
      dispatch(increament(id));

    }
    const handleminus=(id:any)=>{
      dispatch(decrement(id));
    }
    const totalPrice = useSelector(cartTotalPriceSelector);
    console.log("totalPrice",cart)
    const handleClear=(id:any)=>{
      dispatch(clear(id))
    }
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    return (
        <div className="cartmainDiv">

          {cart?.length !== 0 ? (<>

            

          <div className="secondCart">

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


                    <div className="card shadow-2-strong mb-5 mb-lg-0 cardType">
                      <div className="card-body p-4">

                        <div className="row">
                          <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                            <form>
                              <div className="d-flex flex-row pb-3">
                                <div className="d-flex align-items-center pe-2">
                                  <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                                    value="" aria-label="..." checked />
                                </div>
                                <div className="rounded border w-100 p-3">
                                  <p className="d-flex align-items-center mb-0">
                                    <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Credit
                                    Card
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row pb-3">
                                <div className="d-flex align-items-center pe-2">
                                  <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v"
                                    value="" aria-label="..." />
                                </div>
                                <div className="rounded border w-100 p-3">
                                  <p className="d-flex align-items-center mb-0">
                                    <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row">
                                <div className="d-flex align-items-center pe-2">
                                  <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                                    value="" aria-label="..." />
                                </div>
                                <div className="rounded border w-100 p-3">
                                  <p className="d-flex align-items-center mb-0">
                                    <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>PayPal
                                  </p>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="col-md-6 col-lg-4 col-xl-6">
                            <div className="row">
                              <div className="col-12 col-xl-6">
                                <div className="form-outline mb-4 mb-xl-5">
                                  <input type="text" id="typeName" className="form-control form-control-lg"
                                    placeholder="Your name" />
                                  <label className="form-label">Name on card</label>
                                </div>

                                <div className="form-outline mb-4 mb-xl-5">
                                  <input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YY" />
                                  <label className="form-label">Expiration</label>
                                </div>
                              </div>
                              <div className="col-12 col-xl-6">
                                <div className="form-outline mb-4 mb-xl-5">
                                  <input type="text" id="typeText" className="form-control form-control-lg"
                                    placeholder="1111 2222 3333 4444" />
                                  <label className="form-label">Card Number</label>
                                </div>

                                <div className="form-outline mb-4 mb-xl-5">
                                  <input type="password" id="typeText" className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;" />
                                  <label className="form-label">Cvv</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-xl-3">
                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Subtotal</p>
                              <p className="mb-2">${" "}00.0</p>
                            </div>

                            <div className="d-flex justify-content-between">
                              <p className="mb-0">Shipping</p>
                              <p className="mb-0">FREE</p>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total (tax included)</p>
                              <p className="mb-2">${totalPrice}</p>
                            </div>

                            <button type="button" className="btn btn-primary btn-block btn-lg" onClick={handleClick}>
                              <div className="d-flex justify-content-between">
                                <span>Checkout</span><br/>
                                <span className="ms-1">${totalPrice}</span>
                              </div>
                            </button>

                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="modalPopUp">
              <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 500 }} >
                <ModalBody className="modalBodyPopUp">
                  <div className="modalpopRemit-wrapper">
                    <div className="modalpopRemit-title">
                        <AiOutlineCloseSquare className="closemodal" onClick={toggle}/>
                    <div className="container py-5">
  <div className="row d-flex justify-content-center align-items-center">
    <div className="col">
      <div className="card my-4 shadow-3">
        <div className=" g-0">
    
          <div className="col-xl-12">
            <div className="card-body p-md-5 text-black">
              <h3 className="mb-4 text-uppercase">Delivery Info</h3>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example1m" placeholder="First Name" className="form-control form-control-lg" />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example1n" placeholder="Last Name" className="form-control form-control-lg" />
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="form3Example8" placeholder="Address" className="form-control form-control-lg" />
              </div>



              <div className="row">
                <div className="col-md-6 mb-4">

                <input type="text" id="form3Example1n" placeholder="State" className="form-control form-control-lg" />


                </div>
                <div className="col-md-6 mb-4">

                <input type="text" id="form3Example1n" placeholder="City" className="form-control form-control-lg" />


                </div>
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="form3Example3" placeholder="PostalCode" className="form-control form-control-lg" />
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="form3Example2" placeholder="Email" className="form-control form-control-lg" />
              </div>
              {/* <div className="form-outline mb-4">
                <label>Your Total Amount Is</label>
                <input type="text" id="form3Example2" placeholder="Email" className="form-control form-control-lg" value={totalPrice} />
              </div> */}

              <div className="d-flex justify-content-end pt-3">
                  <button className="choicesbutton btn-lg ms-2 border-0">Place Order</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div >
            </section>
          </div>

          </>)
          :(
<Empty />
          )
        }

        </div>
    )
}
export default Cart;