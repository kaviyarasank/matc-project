import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardImg } from "reactstrap";
import Accordion from "react-bootstrap/Accordion";
import "./LikedItems.scss";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { clearLikes } from "../../Redux/LikeAction";
import { AppDispatch } from "../../Redux/Store";
import { useNavigate } from "react-router-dom"
import Rating from '@mui/material/Rating';
import { useCallback } from "react";
import { addToCart } from "../../Redux/CardAction";

function LikedItems() {
    const res = useSelector((state: any) => state?.like);
    console.log("resssssssssssss", res)
    const dispatch = useDispatch<AppDispatch>();

    const closeLikedItems = (id: any) => {
        dispatch(clearLikes(id))
    }

    let navigate = useNavigate();
    const handleShop = () => {
        navigate('/');
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
            count: 1
        }
        addProducts(cartProduct);

    }
    
    return (
        <div className="likeFirstDiv">
            {res?.length > 0 ? (
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        {res && res?.length > 0 && res?.map((data: any) => (
                            <div className="col-4 mt-5">
                                <Card className='card-boxLike'>
                                    <AiOutlineCloseSquare className="closemodal" onClick={() => closeLikedItems(data?.id)} />
                                    <CardBody className='cardbodybox'>
                                        <CardImg src={data.image} alt="Card image cap" className='cardimages' />
                                        <Button className='cardButtonlike' onClick={() => handleAdd(data)}>{"Add To Cart"}</Button>
                                        <Accordion>
                                            <Accordion.Item eventKey={data?.id} className="my-2">
                                                <Accordion.Header>Details</Accordion.Header>
                                                <Accordion.Body>
                                                    <p className='cardtext'>Name : {data?.name}</p>
                                                    <p className='prices'> Price : {data?.price_string}</p>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={data?.rating}
                                                        className="rating"
                                                    />
                                                     <p className='cardtext'>Reviews : {data?.total_reviews}</p>
                                                     <p className='cardtext'>Stock : {data?.availability_quantity}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>

                </div>
            ) : (
                <div className="emptysecDiv">
                    <img src="https://24printing.ae/empty_wishlist.jpg" alt="" className="text-center mx-auto d-block" />
                    <p className="emptyPara mt-3">
                        Return to the store to add items for your delivery slot. <br />
                        Before proceed to checkout you must add some products to your shopping cart.<br />
                        You will find a lot of interesting products on our shop page.</p>
                    <button className="emptyButton" onClick={handleShop}>Continue Shop</button>
                </div>
            )
            }
        </div>
    )
}
export default LikedItems;