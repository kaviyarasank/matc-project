import './History.scss';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function History() {
  let userData = JSON.parse(localStorage.getItem('cartProduct') || '{}');
  let deliveryDate = JSON.parse(localStorage.getItem('deliveryDate') || '{}');
  var myCurrentDate = new Date();
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current
  });
  const handlePrint = () => {
    Print();
  };
  return (
    <div className="History">
      <h1 className="mx-auto text-center ">History</h1>
      <button onClick={handlePrint} className="border-0 icon-styleTrack choicesbutton">
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
          {userData?.map((data: any, index: any) => {
            return (
              <tr key={index}>
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
