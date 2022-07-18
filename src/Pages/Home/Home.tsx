import React, { useCallback, useEffect, useState } from 'react';
import CardComponent from '../../Components/CustomCard/card';
import './Home.scss';
import SecondCard from '../../Components/CustomCard/secondCard';
import choices from '../../assets/choices.png';
import choicesone from '../../assets/choicesone.png';
import pay from '../../assets/pay.png';
import { useNavigate } from 'react-router-dom';
import { fetchPlayerList } from '../../Redux/Action';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader/loader';
import { addToCart } from '../../Redux/CardAction';
import { v4 as uuid } from 'uuid';
import { likeState } from '../../Redux/LikeAction';
import { toast } from 'react-toastify';
import Button from '../../Components/CustomButton/Button';
import { checkAuth } from '../../Helper/CheckAuth';
import { HomeVideo } from '../../Helper/Constants';
import { HomeWatchImg } from '../../Helper/Constants';

function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const productList = useSelector((state: any) => state.team.playerList);
  let newListDatas = productList?.data?.results?.map((data: any) => {
    return {
      ...data,
      id: uuid()
    };
  });
  const productAddedToast = () =>
    toast.success('Product Added Successfully', {
      className: 'toast-success'
    });
  const fetchProductList = useCallback(() => {
    try {
      const timer = setTimeout(() => {
        dispatch(fetchPlayerList());
      }, 500);
      return () => clearTimeout(timer);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProductList();
    checkAuth();
  }, [fetchProductList]);

  useEffect(() => {
    if (newListDatas === undefined) {
      setLoading(true);
    }
  }, [newListDatas]);

  useEffect(() => {
    if (newListDatas) {
      setLoading(false);
    }
  }, [newListDatas]);

  const shopNow = () => {
    navigate('/shop');
  };

  const addProducts = useCallback(
    (product: React.MouseEvent<HTMLOptionElement>) => {
      try {
        dispatch(addToCart(product));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const handleAdd = (product: React.MouseEvent<HTMLOptionElement>) => {
    let cartProduct = {
      ...product,
      count: 1
    };
    addProducts(cartProduct);
    productAddedToast();
  };

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

  const handleLike = (data: React.MouseEvent<HTMLOptionElement>) => {
    let cartProduct = {
      ...data,
      like: true
    };
    addLikes(cartProduct);
  };
  return (
    <div className="Home">
      <div className="home-shopDiv">
        <div className="container">
          <div className="d-flex">
            <div className="">
              <p className="Div-text">
                Select Your New
                <br /> Perfect Style
              </p>
              <h5 className="quotes">
                “Everyone looks at your watch and it represents who you are,
                <br /> your values and your personal style.”
              </h5>
              <button
                className="homeshop-btn mt-5"
                onClick={shopNow}
                data-testid="firstShop-button">
                Shop Now
              </button>
            </div>
            <img src={HomeWatchImg} className="watch" alt="" />
          </div>
        </div>
        <div></div>
      </div>
      <img src={HomeWatchImg} className="mobileviewwatch mt-5" alt="" />
      <div className="homeshop-divtwo">
        <div className="container">
          <h1 className="popular mt-5">New Arrivals</h1>
          {newListDatas === undefined && <Loader />}
          {loading ? null : (
            <div className="row justify-content-center mt-5">
              {newListDatas &&
                newListDatas?.length > 0 &&
                newListDatas?.slice(3, 6).map((data: any, index: any) => (
                  <div className="col-4 responsiveColHome" data-testid="listApi-div" key={index}>
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
          <p className="text-center popularItems mt-5">
            Rolex watches are crafted with scrupulous attention to detail
          </p>
          <div className="mt-5">
            {newListDatas === undefined && <Loader />}
            {loading ? null : (
              <div className="row justify-content-center mt-5">
                {newListDatas &&
                  newListDatas?.length > 0 &&
                  newListDatas.map((data: any, index: any) => (
                    <div className="col-4 responsiveColHome" key={index}>
                      <SecondCard
                        likeButton={() => handleLike(data)}
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
          <video className="videoPlayAbout" autoPlay loop>
            <source src={HomeVideo} type="video/mp4" />
          </video>
        </div>
        <div className="container mt-5">
          <div className="row choices">
            <div className="col-6 mt-5">
              <h1 className="choiceshead">Watch of Choice</h1>
              <p className="mt-5 choicestext">
                When it comes to watches, it’s ironic that you can spend thousands on an exquisitely
                made mechanical watch, and yet it will be less accurate than a five-quid digital
                bought from a petrol station
              </p>
              <Button onClick={shopNow} name="SHOP WATCHES" testid="button" />
            </div>
            <div className="col-6">
              <img src={choices} alt="" className="lasthomeimage" />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row choices">
            <div className="col-6">
              <img src={choicesone} alt="" className="lasthomeimage" />
            </div>
            <div className="col-6 mt-5">
              <h1 className="choiceshead">Watch of Choice</h1>
              <p className="mt-5 choicestext">
                I had always wanted a watch. Unlike diamonds, watches were practical. They were for
                people on the run, people with appointments to keep and schedules to meet. That was
                the kind of person I wanted to be
              </p>
              <Button onClick={shopNow} name="SHOP WATCHES" />
            </div>
          </div>
        </div>
        <div className="container payLoad">
          <img src={pay} alt="" className="payimg" />
        </div>
      </div>
    </div>
  );
}
export default Home;
