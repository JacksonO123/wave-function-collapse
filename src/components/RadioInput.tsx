import './RadioInput.css';

type RadioInputProps = {
  children: string;
  checked: boolean;
  onClick?: () => void;
};

const RadioInput = (props: RadioInputProps) => {
  return (
    <div
      class="radio-wrapper"
      onClick={() => props.onClick?.()}
    >
      <input
        type="radio"
        checked={props.checked}
      />
      <span>{props.children}</span>
    </div>
  );
};

export default RadioInput;
