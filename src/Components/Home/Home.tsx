import { useCallback, useEffect, useState } from "react";
import CardComponent from "../CustomCard/card";
import "./Home.scss";
import SecondCard from "../CustomCard/secondCard";
import { Button} from "reactstrap";
import choices from "../../assets/choices.png"
import choicesone from "../../assets/choicesone.png"
import pay from "../../assets/pay.png"
import { useNavigate } from "react-router-dom"
import { fetchPlayerList } from "../../Redux/Action";
import { AppDispatch } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { addToCart } from "../../Redux/CardAction";
import { v4 as uuidv4 } from 'uuid';
import { likeState } from "../../Redux/LikeAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const playerList = useSelector((state: any) => state.team.playerList);
    const unique_id = uuidv4();
    const cart = useSelector((state: any) => state?.like);
    let res = playerList?.data?.results;
    const likeStatess = cart?.map((like:any)=>{
        return like.like
    })
    console.log("response-->",likeStatess)
    const notify = () => toast.success('Product Added Successfully', {
        className: 'toast-success'
      });
// useEffect(()=>{
// if(likeStatess.length > 0){
// setLike(true)
// }else{
//     setLike(false);
// }
// },[likeStatess.length])

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

    useEffect(() => {
        fetch()
    }, [fetch])
    useEffect(() => {
        if (res === undefined) {
            setLoading(true);
        }
    }, [res])

    useEffect(() => {
        if (res) {
            setLoading(false);
        }
    }, [res])

    const shopNow = () => {
        navigate("/shop");
    }

    const addProducts = useCallback(
        (product: any) => {
            try {
                dispatch(addToCart(product));
            } catch (err) {
                console.log(err);
            }
        },
        [dispatch]
    );

    const handleAdd = (product: any) => {
        console.log("product", product)
        let cartProduct = {
            ...product,
            id: unique_id,
            count: 1
        }
        addProducts(cartProduct);
        notify();
    }
    // useEffect(() => {
    //       window.scrollTo(0, 0)
    //   }, [])


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
    return (
        <div className="Home">
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
            <div className="home-shopDiv">
                <div className="container">
                    <div className="d-flex">
                        <div className="">
                            <p className="Div-text">Select Your New<br /> Perfect Style</p>
                            <h5 className="quotes">“Everyone looks at your watch and it represents who you are,<br /> your values and your personal style.”</h5>
                            <button className="homeshop-btn mt-5" onClick={shopNow}>Shop Now</button>
                        </div>
                        <img src="https://preview.colorlib.com/theme/timezone/assets/img/hero/xwatch.png.pagespeed.ic.LlRtijfV2T.webp" className="watch mt-5" alt="" />
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className="homeshop-divtwo">
                <div className="container">
                    <h1 className="popular mt-5">New Arraivals</h1>
                    {res === undefined && <Loader />}
                    {loading ? null : (
                        <div className="row justify-content-center firstcard mt-5">
                            {res && res?.length > 0 && res?.slice(3, 6).map((data: any) => (
                                <div className="col-4 responsiveColHome">
                                    <CardComponent
                                        name={data.name?.slice(0, 30)}
                                        image={data.image}
                                        price={data.price_string?.slice(0, 10)}
                                        addtocarts={() => handleAdd(data)}
                                        value={data?.stars}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <h2 className="popular">Popular Items</h2>
                    <p className="text-center popularItems mt-5">Rolex watches are crafted with scrupulous attention to detail</p>
                    <div className="mt-5">
                        {res === undefined && <Loader />}
                        {loading ? null : (
                            <div className="row justify-content-center mt-5">
                                {res && res?.length > 0 && res.map((data: any) => (
                                    <div className="col-4 responsiveColHome">
                                        <SecondCard
                                            likeButton={()=>handleLike(data)}
                                            name={data.name?.slice(0, 30)}
                                            image={data.image}
                                            price={data.price_string?.slice(0, 10)}
                                            addtocart={() => handleAdd(data)}
                                            value={data?.stars}
                                            id={data?.id}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5">
                    <video className="videoPlayAbout" autoPlay loop >
                        <source src={"https://content.rolex.com/dam/watches/hubs/all-watches/videos/hub-collection-watches-cover.mp4"} type="video/mp4" />
                    </video>
                </div>
                <div className="container mt-5">
                    <div className="row choices">
                        <div className="col-6 mt-5">
                            <h1 className="choiceshead">Watch of Choice</h1>
                            <p className="mt-5 choicestext">Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            <Button className="choicesbutton mt-5" onClick={shopNow}>SHOP WATCHES</Button>
                        </div>
                        <div className="col-6">
                            <img src={choices} alt="" className="lasthomeimage"/>
                        </div>
                    </div>

                </div>
                <div className="container mt-5">
                    <div className="row choices">
                        <div className="col-6">
                            <img src={choicesone} alt=""  className="lasthomeimage"/>
                        </div>
                        <div className="col-6 mt-5">
                            <h1 className="choiceshead">Watch of Choice</h1>
                            <p className="mt-5 choicestext">Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            <Button className="choicesbutton mt-5" onClick={shopNow}>SHOP WATCHES</Button>
                        </div>
                    </div>

                </div>
                <div className="container payLoad">
                    <img src={pay} alt="" className="payimg" />

                </div>
            </div>

        </div>
    )
}
export default Home;