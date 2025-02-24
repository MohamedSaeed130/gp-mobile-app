import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import Colors from "../../../constants/Colors";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const LeftArrow = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill={Colors.primary}
      fillRule="evenodd"
      d="M22 17H11.414l4.121 4.12c.391.39.391 1.03 0 1.42a1 1 0 0 1-1.414 0l-5.656-5.661a.981.981 0 0 1-.26-.879.981.981 0 0 1 .26-.879l5.656-5.656a.999.999 0 1 1 1.414 1.414L11.414 15H22a1 1 0 1 1 0 2Zm6-17H4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"
    />
  </Svg>
);
export default LeftArrow;
