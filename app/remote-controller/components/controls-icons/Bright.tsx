import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Bright = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M13 2a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V2Zm-5.134.84a1 1 0 0 0-1.732 1l1 1.73a1 1 0 0 0 1.731-1l-.999-1.73Zm10 1a1 1 0 1 0-1.732-1l-1 1.73a1 1 0 1 0 1.733 1l.999-1.73Zm3.294 4.026a1 1 0 1 0-1-1.732l-1.73 1a1 1 0 1 0 1 1.731l1.73-.999ZM3.84 6.134a1 1 0 0 0-1 1.732l1.73 1a1 1 0 1 0 1-1.733l-1.73-.999ZM2 11a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H2Zm18 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM5.57 16.867a1 1 0 0 0-1-1.732l-1.73.999a1 1 0 1 0 1 1.732l1.73-1Zm13.86-1.732a1 1 0 1 0-1 1.732l1.73.999a1 1 0 1 0 1-1.732l-1.73-1Zm-2.563 3.294a1 1 0 0 0-1.732 1l.999 1.731a1 1 0 1 0 1.732-1l-1-1.73Zm-8.002 1a1 1 0 0 0-1.732-1l-.999 1.731a1 1 0 1 0 1.732 1l1-1.73ZM13 20a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm-5-8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Bright;
