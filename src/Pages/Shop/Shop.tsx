import SecondCard from '../../Components/CustomCard/secondCard';
import './Shop.scss';
import React from 'react';
import { fetchPlayerList } from '../../Redux/Action';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../../Components/Loader/loader';
import { addToCart } from '../../Redux/CardAction';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { likeState } from '../../Redux/LikeAction';
import CarousalShop from './Carousal';
import { checkAuth } from '../../Helper/CheckAuth';

function Shop() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const notify = () =>
    toast.success('Product Added Successfully', {
      className: 'toast-success'
    });
  const playerList = useSelector((state: any) => state.team.playerList);
  let newShopProductsList = playerList?.data?.results?.map((data: any) => {
    return {
      ...data,
      id: uuid()
    };
  });
  const fetch = useCallback(() => {
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
    fetch();
    checkAuth();
  }, [fetch]);

  useEffect(() => {
    if (newShopProductsList === undefined) {
      setLoading(true);
    }
  }, [newShopProductsList]);

  useEffect(() => {
    if (newShopProductsList) {
      setLoading(false);
    }
  }, [newShopProductsList]);

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAdd = (product: React.MouseEvent<HTMLOptionElement>) => {
    let cartProduct = {
      ...product,
      count: 1
    };
    notify();
    addProducts(cartProduct);
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
    <div className="shop">
      <div className="firstDiv">
        <div className="carosual">
          <CarousalShop />
        </div>
      </div>
      <div className="secondDiv container">
        {newShopProductsList === undefined && <Loader />}
        {loading ? null : (
          <div className="row justify-content-center mt-5">
            {newShopProductsList &&
              newShopProductsList?.length > 0 &&
              newShopProductsList.map((data: any, index: any) => (
                <div className="col-4 responsiveColHome" key={index}>
                  <SecondCard
                    likeButton={() => handleLike(data)}
                    name={data.name?.slice(0, 30)}
                    image={data.image}
                    price={data.price_string}
                    addtocart={() => handleAdd(data)}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Shop;
