import { Card, CardImg, CardBody } from 'reactstrap';
import './card.scss';
import Rating from '@mui/material/Rating';
import { Button } from 'button-customs';

interface data {
  value: number;
  name: string;
  price: string;
  image: string;
  addtocarts: any;
}

const CardComponent = (props: data) => {
  return (
    <div>
      <Card className="card-box">
        <CardBody className="cardbodybox">
          <CardImg src={props.image} alt="Card image cap" className="cardimages" />
          <Rating name="simple-controlled" value={props.value} className="rating" />
          <div className="cardButton">
            <Button
              name={'Add To Cart'}
              onClick={props.addtocarts}
              height={'40px'}
              width={'100%'}
              borderRadius={'10px'}
              testid={'card-button'}
              textAlign={'center'}
              color={'#ffffff'}
              background={'red'}
              transition={''}
              boxShadow={''}
              border={'none'}
              backgroundSize={''}
              fontSize={'15px'}
            />
          </div>
        </CardBody>
      </Card>
      <div className="cardtextdiv mt-3">
        <p className="cardtext">{props.name}</p>
        <p className="prices">{props.price === undefined ? '$ 0' : props.price}</p>
      </div>
    </div>
  );
};

export default CardComponent;
