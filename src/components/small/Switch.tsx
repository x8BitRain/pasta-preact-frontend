import { h } from "preact";
import "../../style/small/switch.scss";

const Switch = ({ isOn, handleToggle, text }) => {
  return (
    <div className="switch">
      <p>{text}</p>
      <label className="form-switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <i></i>
      </label>
    </div>
  );
};

export default Switch;
