import { Card, CardImg,CardBody, Button } from 'reactstrap';
    import "./card.scss"
    import * as React from 'react';
import Rating from '@mui/material/Rating';
import "../CustomButton/Button.scss";
    // AiOutlineHeart
  
  const SecondCard = (props:any) => {
    const[likes, setLikes] = React.useState(false);
    const handleLikes=()=>{
      setLikes(!likes)
      props.likeButton()
    }

    return (
        <div>
        <Card className='card-box'>
          <CardBody className=''>
          <i className={`fa-solid fa-thumbs-up  ${likes ? "heartTrue" : "heart" }`} onClick={handleLikes} key={props.id}></i>
          <CardImg  src={props.image} alt="Card image cap" className='cardimages'/>
          <Rating
  name="simple-controlled"
  value={props.value}
 className="rating"
/>
        {/* <div className="center">
        <button className="border-0 bg-light" onClick={props.addtocart}><span data-attr="Add">Add</span><span data-attr="To">To</span><span data-attr="Cart"></span></button>
    </div> */}
            <button className='cardButton border-0' data-testid="card-button" onClick={props.addtocart}>{"Add To Cart"}</button>
          </CardBody>
        </Card>
        <div className='cardtextdiv mt-3'>
        <p className='cardtext'>{props.name}</p>
          <p className='prices'>{props.price}</p>
          </div>
        </div>
    );
  };
  
  export default SecondCard;