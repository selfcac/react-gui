import React, { ReactElement } from "react";
import { FlexDirectionProperty } from "csstype";

export enum DockType {
    TOP, LEFT, RIGHT, BOTTOM
};

export interface DockerProps {
    defaultDock : DockType
    sizeStyle? : React.CSSProperties
}

export interface FastDockerProps {
    sizeStyle? : React.CSSProperties
}

export var DockTop : React.FC<FastDockerProps> = (props ) =>
     {return (<DockPanel defaultDock={DockType.TOP} sizeStyle={props.sizeStyle}>{props.children}</DockPanel>)};
export var DockLeft : React.FC<FastDockerProps> = (props) => 
    {return (<DockPanel defaultDock={DockType.LEFT} sizeStyle={props.sizeStyle}>{props.children}</DockPanel>)};
export var DockRight : React.FC<FastDockerProps> = (props) =>
     {return (<DockPanel defaultDock={DockType.RIGHT} sizeStyle={props.sizeStyle}>{props.children}</DockPanel>)};
export var DockBottom : React.FC<FastDockerProps> = (props) => 
    {return (<DockPanel defaultDock={DockType.BOTTOM} sizeStyle={props.sizeStyle}>{props.children}</DockPanel>)};

export default class DockPanel extends React.Component<DockerProps> {

    getDockFlexString = (type : DockType) : FlexDirectionProperty => {
        return (type === DockType.TOP) ?  "column" :
        (type === DockType.LEFT) ?  "row" :
        (type === DockType.RIGHT) ?  "row-reverse" :
         "column-reverse";
    }

    makeFlexDock = (type : DockType, childFirst :ReactElement, childNext: ReactElement)=> {
        if ( typeof(childFirst) !== 'undefined' && childFirst !== null ) {
            if ( typeof(childNext) !== 'undefined' && childNext !== null ) {

               return (
                    <div className="dockPanel" style={{
                        display:"flex", flexDirection: this.getDockFlexString(type),
                        height: "100%"
                        }}>
                        <div className="dockDocked" style={{flex:"0", ...this.props.sizeStyle}}>{childFirst}</div>
                        <div className="dockFill" style={{flex:"1"}}>{childNext}</div>
                    </div>
               );
            }
        }

       return (<div>problem dock, null?</div>)
    }

    render() {
        let resultChildren = this.props.children;
        let myChildren =  React.Children.toArray(this.props.children);

        if (myChildren.length === 2) {
            // Make last children fill:
            resultChildren = this.makeFlexDock(
                    this.props.defaultDock, // before last
                    myChildren[0] as ReactElement,
                    myChildren[1] as ReactElement); // last element
        }
        else if (myChildren.length > 2) {
            resultChildren = <div>Expecting 2 elements for docks got {myChildren.length}</div>;
        }

        return (resultChildren);
    }
}

