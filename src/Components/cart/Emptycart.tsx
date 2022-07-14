import './EmptyCart.scss';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Empty() {
  let navigate = useNavigate();
  const handleShop = () => {
    navigate('/');
  };
  const Title = styled.h1`
    text-align: center;
    color: blue;
  `;
  return (
    <div className="EmptymainDiv">
      <div className="emptysecDiv">
        <img
          src="https://codescandy.com/coach/rtl/assets/images/bag.svg"
          alt=""
          className="mx-auto text-center d-block emptycartImages"
        />
        <Title className="mt-4">Your shopping cart is empty</Title>
        <p className="emptyPara mt-3">
          Return to the store to add items for your delivery slot. <br />
          Before proceed to checkout you must add some products to your shopping cart.
          <br />
          You will find a lot of interesting products on our shop page.
        </p>
        <button className="emptyButton" onClick={handleShop}>
          Continue Shop
        </button>
      </div>
    </div>
  );
}
export default Empty;
