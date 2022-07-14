import './Button.scss';

function Button(props: any) {
  return (
    <div>
      <button onClick={props.onClick} className="choicesbutton" data-testid={props.testid}>
        {props.name}
      </button>
    </div>
  );
}
export default Button;
