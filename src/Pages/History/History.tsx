import './History.scss';
import { useReactToPrint } from 'react-to-print';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../Redux/getProductInfo';
import { AppDispatch } from '../../Redux/Store';

function History() {

  const dispatch = useDispatch<AppDispatch>();

  const playerList = useSelector((state: any) => state.getProduct.playerList);
  
  let userData = playerList?.data
  const fetchPr = useCallback(() => {
    try {
      dispatch(fetchProduct());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(()=>{
    const timer = setTimeout(() => {
      fetchPr();
    }, 1000);
    return () => clearTimeout(timer);
  },[fetchPr])

  
  let deliveryDate = JSON.parse(localStorage.getItem('deliveryDate') || '{}');
  var myCurrentDate = new Date();
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current
  });
  const handle = () => {
    Print();
  };
  return (
    <div className="History">
      <h1 className="mx-auto text-center ">History</h1>
      <button onClick={handle} className="border-0 icon-styleTrack choicesbutton">
        Print Receipt
      </button>
      <table className="table tableHistory mt-5" ref={componentRef}>
        <thead>
          <tr>
            <th scope="col">ProductName</th>
            <th scope="col">Image</th>
            <th scope="col">OrderDate</th>
            <th scope="col">DeliveryDate</th>
            <th scope="col">Amount</th>
            <th scope="col">Rating</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((data: any) => {
            return (
              <tr>
                <td>{data?.name}</td>
                <td>
                  <img src={data?.image} alt="" className="historyImages" />
                </td>
                <td>{myCurrentDate.toString()?.slice(0, 15)}</td>
                <td>{deliveryDate.toString()?.slice(0, 10)}</td>
                <td>{data?.price_string}</td>
                <td>{data?.stars}</td>
                <td>{data?.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default History;
