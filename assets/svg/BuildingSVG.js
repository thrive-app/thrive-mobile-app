import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BuildingSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    viewBox="0 -960 960 960"
    width={24}
    {...props}
  >
    <Path fill="#474747" d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z" />
  </Svg>
);
export default BuildingSVG;
