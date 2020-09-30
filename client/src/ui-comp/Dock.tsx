import React, { ReactElement } from "react";
import { FlexDirectionProperty } from "csstype";

enum DocksTypes {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}

export const Docks = {
    "TOP" : {"x-dock":DocksTypes.TOP},
    "BOTTOM" :{"x-dock":DocksTypes.BOTTOM},
    "LEFT" : {"x-dock":DocksTypes.LEFT},
    "RIGHT" : {"x-dock":DocksTypes.RIGHT}
}

const errorEl = (msg:string) => {
    return (<b style={{color:"red"}}>{msg}</b>)
}

const makeFlexDock = (kids :ReactElement[], index: number, divStyle: React.CSSProperties) => {
    if (index < 0 || index >= kids.length)
        return (<></>);

    if (index == kids.length - 1) {
        return kids[index];
    }

    if (!kids[index].props["x-dock"]) {
        return errorEl(
            "No dock info found like {...Docks.TOP}, key:" 
            + kids[index].key
        )
    }
    else {
        const xDock = kids[index].props["x-dock"];
        let cssStyle : React.CSSProperties = {display: "flex", flex: "1 0"};
        let childStyle : React.CSSProperties = {};

        if (index == 0)
            cssStyle = {...cssStyle,...divStyle}

        if (xDock == DocksTypes.TOP) {
            cssStyle["flexDirection"] = "column";
            childStyle = {width: "100%", maxWidth: "100%"}
        } else if(xDock == DocksTypes.BOTTOM) {
            cssStyle["flexDirection"] = "column-reverse";
            childStyle = {width: "100%", maxWidth: "100%"}
        } else if(xDock == DocksTypes.LEFT) {
            cssStyle["flexDirection"] = "row";
            childStyle = {height: "100%", "maxHeight": "100%"}
        } else if(xDock == DocksTypes.RIGHT) {
            cssStyle["flexDirection"] = "row-reverse";
            childStyle = {height: "100%" , "maxHeight": "100%", width: "100%", maxWidth: "100%"}
        } else {
            return errorEl("Unkown x-dock value '" + xDock + "'")
        }

        return (
            <div style={{...cssStyle,...{
                    height: "100%" , maxH: "100%", minHeight: 0,
                    width: "100%", maxWidth: "100%", minWidth: 0
                }}}>
                {kids[index]}
                {makeFlexDock(kids,index+1,childStyle)}
            </div>
        )
    }
}

export interface DockPanelProps {
    
}

export const DockPanel :React.FC<any> = (props) => {
    const kids = React.Children.toArray(props.children);
    let result = errorEl("Error Docking init.");

    if (kids.length > 0) {
        result = makeFlexDock(kids,0, {})

        
    }

    return result;
}