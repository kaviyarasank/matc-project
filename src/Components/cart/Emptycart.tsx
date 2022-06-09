import "./EmptyCart.scss";
import { useNavigate } from "react-router-dom"

function Empty(){
    let navigate = useNavigate();
    const handleShop=()=>{
        navigate('/');
    }
    return(
        <div className="EmptymainDiv">
            <div className="emptysecDiv">
        <img src="https://codescandy.com/coach/rtl/assets/images/bag.svg" alt="" className="emptyImage"/>
        <h1 className="emptyText mt-4">Your shopping cart is empty</h1>
        <p className="emptyPara mt-3">
Return to the store to add items for your delivery slot. <br/>
Before proceed to checkout you must add some products to your shopping cart.<br/>
 You will find a lot of interesting products on our shop page.</p>
 <button className="emptyButton" onClick={handleShop}>Continue Shop</button>
            </div>
        </div>
    )
}
export default Empty;