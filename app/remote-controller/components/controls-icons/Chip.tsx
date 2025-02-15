import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Chip = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="white" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 8h-3.183M21 12h-3m3 4h-3.183M6.183 8H3m5-1.817V3m0 18v-3.183M12 6V3m0 18v-3m4-11.817V3m0 18v-3.183M6 12H3m3.183 4H3m7.8 2h2.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C18 15.72 18 14.88 18 13.2v-2.4c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C15.72 6 14.88 6 13.2 6h-2.4c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C6 8.28 6 9.12 6 10.8v2.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C8.28 18 9.12 18 10.8 18Zm-.8-8h4v4h-4v-4Z"
    />
  </Svg>
);
export default Chip;
