import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PlusSVG = ({ color, ...other }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    viewBox="0 -960 960 960"
    width={24}
    {...other}
  >
    <Path
      fill={color}
      d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
    />
  </Svg>
);
export default PlusSVG;
