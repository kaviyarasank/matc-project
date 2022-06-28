import SecondCard from "../CustomCard/secondCard";
import "./Shop.scss";
import { fetchPlayerList } from "../../Redux/Action";
import { AppDispatch } from "../../Redux/Store";
import {useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/loader";
import { addToCart } from "../../Redux/CardAction";
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likeState } from "../../Redux/LikeAction";

function Shop(){
  const [loading , setLoading] = useState(false);
      const dispatch = useDispatch<AppDispatch>();
      const notify = () => toast.success('Product Added Successfully', {
        className: 'toast-success'
      });
      const playerList = useSelector((state:any) => state.team.playerList);
      let newCardDatas = playerList?.data?.results?.map((data: any) => {
        return {
          ...data,
          id: uuid(),
        };
      });
      const fetch = useCallback(
          () => {
            try {
              dispatch(fetchPlayerList());
            } catch (err) {
              console.log(err);
            }
          },
          [dispatch]
        );
  
      useEffect(()=>{
          fetch()
      },[fetch])
      
      useEffect(()=>{
        if(newCardDatas === undefined){
            setLoading(true);
        }
        },[newCardDatas])
        
        useEffect(()=>{
            if(newCardDatas){
                setLoading(false);
            }
            },[newCardDatas])


    const addProducts = useCallback(
      (product:any) => {
        try {
          dispatch(addToCart(product));
        } catch (err) {
          console.log(err);
        }
      },
      [dispatch]
    );
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
const handleAdd=(product:any)=>{
  let cartProduct = {
      ...product,
      count:1
  }
  notify();
  addProducts(cartProduct);
}
const addLikes = useCallback(
  (product: any) => {
      try {
          dispatch(likeState(product));
      } catch (err) {
          console.log(err);
      }
  },
  [dispatch]
);


const handleLike=(data:any)=>{
let cartProduct = {
  ...data,
  like: true
}
addLikes(cartProduct);
}

    return(
        <div className="shop">
            <div className="firstDiv">
           <div className="carosual">
            
<div className="wrapper">
  <div className="clock">
    <div className="clock-circles">
      <div className="clock-circles__item"></div>
      <div className="clock-circles__item"></div>
      <div className="clock-circles__item"></div>
      <div className="clock-circles__item">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
    <div className="clock-indicators">
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
      <div className="clock-indicators__item"></div>
    </div>
    <div className="clock-times">
      <div className="clock-times__second"></div>
      <div className="clock-times__minute"></div>
      <div className="clock-times__hour"></div>
    </div>
  </div>
</div>
    </div>
            </div>
            <div className="secondDiv container">
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
            {newCardDatas === undefined && <Loader/>}
            {loading ? null : (
            <div className="row justify-content-center mt-5">
               {newCardDatas && newCardDatas?.length > 0 && newCardDatas.map((data:any) => (
                    <div className="col-4 responsiveColHome">
                          <SecondCard
                           likeButton={()=>handleLike(data)}
                            name={data.name?.slice(0,30)}
                            image={data.image}
                            price={data.price_string}
                            addtocart={()=>handleAdd(data)}
                           />
                    </div>
                ))}
            </div>
            )}
            </div>
        </div>
    )
}
export default Shop;