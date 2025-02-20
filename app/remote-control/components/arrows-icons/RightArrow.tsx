import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import Colors from "../../../../constants/Colors"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const RightArrow = (props: SvgProps) => (
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
      d="m23.535 16.879-5.656 5.661a1 1 0 0 1-1.414 0 1.006 1.006 0 0 1 0-1.42L20.586 17H10a1 1 0 1 1 0-2h10.586l-4.121-4.121a.999.999 0 1 1 1.414-1.414l5.656 5.656c.24.24.315.568.26.879a.981.981 0 0 1-.26.879ZM28 0H4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"
    />
  </Svg>
)
export default RightArrow
