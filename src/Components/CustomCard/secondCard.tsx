import { Card, CardImg, CardBody } from 'reactstrap';
import './card.scss';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import '../CustomButton/Button.scss';
import { Button } from 'button-customs';

const SecondCard = (props: any) => {
  const [likes, setLikes] = React.useState(false);
  const handleLikes = () => {
    setLikes(!likes);
    props.likeButton();
  };

  return (
    <div>
      <Card className="card-box">
        <CardBody className="">
          <i
            className={`fa-solid fa-thumbs-up  ${likes ? 'heartTrue' : 'heart'}`}
            onClick={handleLikes}
            key={props.id}></i>
          <CardImg src={props.image} alt="Card image cap" className="cardimages" />
          <Rating name="simple-controlled" value={props.value} className="rating" />
          <div className="cardButton">
            <Button
              name={'Add To Cart'}
              onClick={props.addtocart}
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

export default SecondCard;
