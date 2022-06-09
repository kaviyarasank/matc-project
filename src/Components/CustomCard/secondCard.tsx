import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';
    import "./card.scss"
    import { AiOutlineHeart } from 'react-icons/ai';
    import * as React from 'react';
import Rating from '@mui/material/Rating';
    // AiOutlineHeart
  
  const SecondCard = (props:any) => {
    // const data= props;
    console.log("props.value",props.value)
    return (
        <div>
        <Card className='card-box'>
          <CardBody className=''>
              <AiOutlineHeart className={props.likes ? "heartTrue" : "heart"} key={props.id} onClick={props.likeButton}/>
          <CardImg  src={props.image} alt="Card image cap" className='cardimages'/>
          <Rating
  name="simple-controlled"
  value={props.value}
 className="rating"
/>
            <Button className='cardButton' onClick={props.addtocart}>{"Add To Cart"}</Button>
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