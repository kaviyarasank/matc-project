import SecondCard from "../CustomCard/secondCard";
import "./Shop.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/autoplay"
import { fetchPlayerList } from "../../Redux/Action";
import { AppDispatch } from "../../Redux/Store";
import {useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/loader";
import { addToCart } from "../../Redux/CardAction";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likeState } from "../../Redux/LikeAction";

function Shop(){
  const unique_id = uuidv4();
  const [loading , setLoading] = useState(false);
    const params = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
      const dispatch = useDispatch<AppDispatch>();
      const notify = () => toast.success('Product Added Successfully', {
        className: 'toast-success'
      });
      const playerList = useSelector((state:any) => state.team.playerList);
      let res = playerList?.data?.results;
      console.log("playerList",res)
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
        if(res === undefined){
            setLoading(true);
        }
        },[res])
        
        useEffect(()=>{
            if(res){
                setLoading(false);
            }
            },[res])


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
  console.log("product",product)
  let cartProduct = {
      ...product,
      id:unique_id,
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
  id: unique_id,
  like: true
}
addLikes(cartProduct);
}

    return(
        <div className="shop">
            <div className="firstDiv">
           <div className="carosual">
            <Swiper
    {...params}
    >
      <SwiperSlide><img src={"https://miro.medium.com/max/1200/1*VqeIv1WhEk34hAPVKRFDlg.gif"} alt="" className="shopCaro"/></SwiperSlide>
      <SwiperSlide><img src={"https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="" className="shopCaro"/></SwiperSlide>
      <SwiperSlide><img src={"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="" className="shopCaro"/></SwiperSlide>
      <SwiperSlide><img src={"https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1230&q=80"} alt="" className="shopCaro"/></SwiperSlide>
    </Swiper>
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
            {res === undefined && <Loader/>}
            {loading ? null : (
            <div className="row justify-content-center mt-5">
               {res && res?.length > 0 && res.map((data:any) => (
                    <div className="col-4">
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