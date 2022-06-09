import { Card, CardImg, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';
  import "./card.scss"

interface data{
name:string,
price:string,
image:string,
addtocarts:any
  }

const CardComponent = (props:data) => {
  return (
    <div>
      <Card className='card-box'>
        <CardBody className='cardbodybox'>
        <CardImg  src={props.image} alt="Card image cap" className='cardimages'/>
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