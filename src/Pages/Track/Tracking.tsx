import './Tracking.scss';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import timezone from '../../assets/timezone.png';
import { Modal, ModalBody } from 'reactstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai';

function Tracking() {
  const componentRef = useRef<any>();
  let navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem('cartProduct') || '{}');
  let address = JSON.parse(localStorage.getItem('address') || '{}');
  let profile = JSON.parse(localStorage.getItem('profile') || '{}');
  let amount = JSON.parse(localStorage.getItem('productAmount') || '{}');

  const backToOrder = () => {
    navigate('/');
  };
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  var myCurrentDate = new Date();
  var myFutureDate = new Date(myCurrentDate);
  myFutureDate.setDate(myFutureDate.getDate() + 4);

  const Print: any = useReactToPrint({
    content: () => componentRef.current
  });
  localStorage.setItem('deliveryDate', JSON.stringify(myFutureDate));
  const handle = () => {
    setModal(!modal);
  };
  return (
    <div className="trackingDiv">
      <div className="container">
        <button onClick={handle} className="border-0 icon-styleTrack ms-3 choicesbutton">
          Print Receipt
        </button>
        <article className="card mt-3">
          <header className="card-header"> My Orders / Tracking </header>
          <div className="card-body">
            <h6>Order ID: {address?.created}</h6>
            <h6>
              Your Total Amount: ${amount} ({address?.card?.funding})
            </h6>
            <article className="card">
              <div className="card-body row">
                <div className="col">
                  {' '}
                  <strong>Estimated Delivery time:</strong> <br /> {myFutureDate.toString()}{' '}
                </div>
                <div className="col">
                  {' '}
                  <strong>Delivery Address:</strong> <br /> {address?.card?.name},<br />
                  {address?.card?.address_line1},<br />
                  {address?.card?.address_city},{address?.card?.address_zip}
                  <br />
                  {address?.card?.address_country}, | <i className="fa fa-phone"></i>{' '}
                  {profile?.mobileNo}.
                </div>
                <div className="col">
                  {' '}
                  <strong>Status:</strong> <br /> Picked by the courier{' '}
                </div>
                <div className="col">
                  {' '}
                  <strong>Tracking Id:</strong> <br /> {address?.id}{' '}
                </div>
              </div>
            </article>
            {
              <div className="track">
                <div className="step active">
                  {' '}
                  <span className="icon">
                    {' '}
                    <i className="fa fa-check"></i>{' '}
                  </span>{' '}
                  <span className="text">Order confirmed</span>{' '}
                </div>
                <div className="step">
                  {' '}
                  <span className="icon">
                    {' '}
                    <i className="fa fa-user"></i>{' '}
                  </span>{' '}
                  <span className="text"> Picked by courier</span>{' '}
                </div>
                <div className="step">
                  {' '}
                  <span className="icon">
                    {' '}
                    <i className="fa fa-truck"></i>{' '}
                  </span>{' '}
                  <span className="text"> On the way </span>{' '}
                </div>
                <div className="step">
                  {' '}
                  <span className="icon">
                    {' '}
                    <i className="fa fa-box"></i>{' '}
                  </span>{' '}
                  <span className="text">Ready for pickup</span>{' '}
                </div>
              </div>
            }
            <hr />

            <ul className="row">
              {userData?.map((data: any, index: any) => (
                <li className="col-md-4" key={index}>
                  <figure className="itemside mb-3">
                    <div className="aside">
                      <img src={data?.image} className="img-sm border" alt="" />
                    </div>
                    <figcaption className="info align-self-center">
                      <p className="title">{data?.name.slice(0, 50)}</p>{' '}
                      <span className="text-muted">{data?.price_string} </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <hr />

            <button className="btn btn-warning choicesbutton" data-abc="true" onClick={backToOrder}>
              {' '}
              <i className="fa fa-chevron-left"></i> Back to orders
            </button>
          </div>
        </article>

        <div className="modalPopUp">
          <Modal
            isOpen={modal}
            toggle={toggle}
            modalTransition={{ timeout: 500 }}
            className="modalmainContent">
            <ModalBody className="modalBodyPopUp">
              <div className="modalpopRemit-wrapper">
                <div className="modalpopRemit-title">
                  <AiOutlineCloseSquare className="closemodal" onClick={toggle} />
                  <button onClick={Print} className="border-0 choicesbutton">
                    Print Receipt
                  </button>
                  <div className="container bootdey" ref={componentRef}>
                    <div className="row invoice row-printable">
                      <div className="col-md-10">
                        <div className="panel panel-default plain" id="dash_0">
                          <div className="panel-body p30">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="invoice-logo">
                                  <img
                                    width="100"
                                    className="invoiceBill"
                                    src={timezone}
                                    alt="Invoice logo"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 mt-3">
                                <div className="invoice-from">
                                  <ul className="list-unstyled text-right">
                                    <h5 className="fw-bold">SHIPPING ADDRESS</h5>
                                    Time Zone,
                                    <br />
                                    C-63,Bloom plaza,
                                    <br />
                                    Thillianagar,Trichy-620018,
                                    <br />
                                    India, | <i className="fa fa-phone"></i> {profile?.mobileNo}.
                                  </ul>
                                </div>
                              </div>
                              <div className="invoice-to mt25">
                                <ul className="list-unstyled">
                                  <h5 className="fw-bold">DELIVERY ADDRESS</h5>
                                  {address?.card?.name},<br />
                                  {address?.card?.address_line1},<br />
                                  {address?.card?.address_city},{address?.card?.address_zip}
                                  <br />
                                  {address?.card?.address_country}, |{' '}
                                  <i className="fa fa-phone"></i> {profile?.mobileNo}.
                                </ul>
                              </div>
                              <div className="col-lg-12">
                                <div className="invoice-details mt25">
                                  <div className="well">
                                    <ul className="list-unstyled mb0">
                                      <li>
                                        <strong>Invoice</strong> {address?.created}
                                      </li>
                                      <li>
                                        <strong>Invoice Date:</strong>
                                        {myCurrentDate.toString()?.slice(0, 15)}
                                      </li>
                                      <li>
                                        <strong>Status:</strong>{' '}
                                        <span className="label label-danger">
                                          {address?.card?.funding}
                                        </span>
                                      </li>
                                      <li>
                                        <p className="borcode">Everyone looks at your watch </p>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="invoice-items">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th className="per70 text-center">Description</th>
                                          <th className="per5 text-center">Qty</th>
                                          <th className="per25 text-center">Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {userData &&
                                          userData?.map((data: any, index: any) => {
                                            return (
                                              <tr key={index}>
                                                <td>{data?.name}</td>
                                                <td className="text-center">{data?.quantity}</td>
                                                <td className="text-center">
                                                  {data?.price_string}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <th className="text-right">Sub Total:</th>
                                          <th className="text-center">${amount}</th>
                                        </tr>
                                        <tr>
                                          <th className="text-right">20% VAT:</th>
                                          <th className="text-center">$00.00</th>
                                        </tr>
                                        <tr>
                                          <th className="text-right">Credit:</th>
                                          <th className="text-center">$00.00</th>
                                        </tr>
                                        <tr>
                                          <th className="text-right">Total:</th>
                                          <th className="text-center">${amount}</th>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                                <div className="invoice-footer mt25">
                                  <p className="text-center">
                                    Generated on {myCurrentDate.toString()}
                                  </p>
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
        </div>
      </div>
    </div>
  );
}
export default Tracking;
