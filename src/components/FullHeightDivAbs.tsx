import React, { ReactElement } from "react";
import { FHProps } from "./FullHeight";


export const FullHeightDivAbs : React.FC<FHProps>  = (props) =>
{
    return (<div style={{
        position: "absolute", top: 0, bottom:0, left:0, right:0
        ,...props.style}} className={props.className}>{props.children}</div>)
}
