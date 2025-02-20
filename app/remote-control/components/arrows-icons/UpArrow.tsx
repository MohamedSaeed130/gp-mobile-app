import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const UpArrow = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M22.535 15.535a.999.999 0 0 1-1.414 0L17 11.414V22a1.001 1.001 0 0 1-2 0V11.414l-4.121 4.121a.999.999 0 1 1-1.414-1.414l5.656-5.656a.981.981 0 0 1 .879-.26.981.981 0 0 1 .879.26l5.656 5.656a.999.999 0 0 1 0 1.414ZM28 0H4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"
    />
  </Svg>
)
export default UpArrow
