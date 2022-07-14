import React, { useState, useEffect } from 'react';
import './Carousal.scss';

const items = [
  {
    icon: '01. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    copy: 'https://m.media-amazon.com/images/I/61FXcXkidxL.jpg'
  },
  {
    icon: '01. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    copy: 'https://m.media-amazon.com/images/I/51huqm9ZJ7L.jpg'
  },
  {
    icon: '01. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    copy: 'https://m.media-amazon.com/images/I/81dI08mZslL.jpg'
  },
  {
    icon: '01. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    copy: 'https://m.media-amazon.com/images/I/51lb0UyOhSL.jpg'
  }
];

const Card = (props: any) => {
  return (
    <li className="card">
      <img src={props.copy} alt="" className="caroImg" />
    </li>
  );
};

const CarousalShop = () => {
  const [moveClass, setMoveClass] = useState('');
  const [carouselItems, setCarouselItems] = useState<any>(items);

  useEffect(() => {
    document.documentElement.style.setProperty('--num', carouselItems.length);
  }, [carouselItems]);

  const handleAnimationEnd = () => {
    if (moveClass === 'prev') {
      shiftNext([...carouselItems]);
    } else if (moveClass === 'next') {
      shiftPrev([...carouselItems]);
    }
    setMoveClass('');
  };

  const shiftPrev = (copy: any) => {
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    setCarouselItems(copy);
  };

  const shiftNext = (copy: any) => {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    setCarouselItems(copy);
  };

  return (
    <div className="carouselwrapper module-wrapper">
      <div className="ui">
        <button onClick={() => setMoveClass('next')} className="prev">
          <span className="material-icons">chevron_left</span>
        </button>
        <button onClick={() => setMoveClass('prev')} className="next">
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
        {carouselItems.map((data: any) => (
          // eslint-disable-next-line react/jsx-key
          <Card icon={data.icon} copy={data.copy} />
        ))}
      </ul>
    </div>
  );
};
export default CarousalShop;
