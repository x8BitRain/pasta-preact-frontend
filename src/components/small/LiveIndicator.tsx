import { h } from "preact";
import "../../style/small/liveIndicator.scss";

const LiveIndicator = isLive => {
  return (
    <div class="ring-container">
      <div
        class={isLive.isLive ? "ringring" : "ringring ring-off"}
        alt="https://codepen.io/vram1980/pen/Kyaie thanks!!"
      ></div>
      <div class={isLive.isLive ? "circle" : "circle circle-off"}></div>
    </div>
  );
};

export default LiveIndicator;
