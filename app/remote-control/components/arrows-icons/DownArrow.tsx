import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import Colors from "../../../../constants/Colors"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const DownArrow = (props: SvgProps) => (
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
      d="m22.535 17.88-5.656 5.66a.962.962 0 0 1-.879.25.962.962 0 0 1-.879-.25l-5.656-5.66a1 1 0 1 1 1.414-1.415L15 20.59V10a1 1 0 1 1 2 0v10.59l4.121-4.125a1 1 0 1 1 1.414 1.415ZM28 0H4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"
    />
  </Svg>
)
export default DownArrow
