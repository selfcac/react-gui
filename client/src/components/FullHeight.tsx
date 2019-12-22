import React from "react";


export interface FHProps {
    className? : string | undefined
    style? : React.CSSProperties
}

export const FullHeightDiv : React.FC<FHProps>  = (props) =>
{
    return (<div style={{ height: "100%",...props.style}} className={props.className}>{props.children}</div>)
}

export const FullHeightClass = "fullHeight";