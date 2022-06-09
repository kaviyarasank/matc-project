import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';
    import "./card.scss"
    import { AiOutlineHeart } from 'react-icons/ai';
    // AiOutlineHeart
  
  const SecondCard = (props:any) => {
    // const data= props;
    return (
        <div>
        <Card className='card-box'>
          <CardBody className=''>
              <AiOutlineHeart className='heart' onClick={props.likeButton}/>
          <CardImg  src={props.image} alt="Card image cap" className='cardimages'/>
            <Button className='cardButton' onClick={props.addtocart}>Add To Cart</Button>
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