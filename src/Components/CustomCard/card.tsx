import { Card, CardImg,CardBody, Button } from 'reactstrap';
  import "./card.scss"
  import Rating from '@mui/material/Rating';

interface data{
value: number,
name:string,
price:string,
image:string,
addtocarts:any,
key:string
  }

const CardComponent = (props:data) => {
  return (
    <div>
      <Card className='card-box' key={props.key}>
        <CardBody className='cardbodybox'>
        <CardImg  src={props.image} alt="Card image cap" className='cardimages'/>
        <Rating
  name="simple-controlled"
  value={props.value}
 className="rating"
/>
{/* <div className="center">
        <button className="border-0 bg-light"  onClick={props.addtocarts}><span data-attr="Buy">Buy</span><span data-attr="To">To</span><span data-attr="Cart"></span></button>
    </div> */}
          <Button className='cardButton' onClick={props.addtocarts}>Add To Cart</Button>
        </CardBody>
      
      </Card>
      <div className='cardtextdiv mt-3'>
        <p className='cardtext'>{props.name}</p>
          <p className='prices'>{props.price}</p>
          </div>
    </div>
  );
};

export default CardComponent;