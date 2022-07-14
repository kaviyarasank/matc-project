import './Clock.scss';
import timezone from '../../assets/loginLogo.png';

function Clock() {
  var myCurrentDate = new Date();

  return (
    <div>
      <div className="wrapper">
        <div className="watch-strap">
          <div className="strap-circle"></div>
          <div className="strap"></div>
          <div className="watch-strap-holder left-up"></div>
          <div className="watch-strap-holder left-bottom"></div>
          <div className="watch-strap-holder right-up"></div>
          <div className="watch-strap-holder right-bottom"></div>
          <div className="watch-lace">
            <span className="top"></span>
            <span className="bottom"></span>
          </div>
        </div>
        <div className="watch-case">
          <div className="reflection"></div>
          <div className="reflection bottom"></div>
          <div className="watch-center">
            <div className="watch-tips">
              <span className="hours"></span>
              <span className="minutes"></span>
              <span className="seconds"></span>
            </div>
            <div className="watch-date">{myCurrentDate.toString()?.slice(0, 10)}</div>
            <div className="watch-alert">
              <img src={timezone} alt="" />
            </div>
            <div className="watch-week">
              <span className="week-arrow"></span>
              <ul>
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </ul>
            </div>
            <div className="watch-day">
              <div className="sun"></div>
            </div>
            <div className="watch-week days">
              <span className="week-arrow"></span>
              <ul>
                <div>3</div>
                <div>6</div>
                <div>9</div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Clock;
