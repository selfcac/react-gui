import React, { ReactElement } from "react";
import { Interface } from "readline";
import { number } from "prop-types";
import { FlexDirectionProperty } from "csstype";

export enum DockType {
    TOP, LEFT, RIGHT, BOTTOM
};

export interface DockerProps {
    defaultDock : DockType
}

export var DockTop : React.FC = (props) => {return (<DockPanel defaultDock={DockType.TOP}>{props.children}</DockPanel>)};
export var DockLeft : React.FC = (props) => {return (<DockPanel defaultDock={DockType.LEFT}>{props.children}</DockPanel>)};
export var DockRight : React.FC = (props) => {return (<DockPanel defaultDock={DockType.RIGHT}>{props.children}</DockPanel>)};
export var DockBottom : React.FC = (props) => {return (<DockPanel defaultDock={DockType.BOTTOM}>{props.children}</DockPanel>)};

export default class DockPanel extends React.Component<DockerProps> {

    getDockFlexString = (type : DockType) : FlexDirectionProperty => {
        return (type == DockType.TOP) ?  "column" :
        (type == DockType.LEFT) ?  "row" :
        (type == DockType.RIGHT) ?  "row-reverse" :
         "column-reverse";
    }


    makeFlexDock = (type : DockType, childFirst : React.ReactNode, childNext: React.ReactNode)=> {
        if ( typeof(childFirst) !== 'undefined' && childFirst !== null ) {
            if ( typeof(childNext) !== 'undefined' && childNext !== null ) {
                return (
                    <div style={{display:"flex", flexDirection: this.getDockFlexString(type)}} >
                        {React.cloneElement(childFirst as ReactElement, {flex: 0})}
                        {React.cloneElement(childNext  as ReactElement, {flex: 1})}
                    </div>
                );
            }
        }

       return (<div>problem dock</div>)
    }

    render() {
        let resultChildren = this.props.children;
        let myChildren =  React.Children.toArray(this.props.children);

        if (myChildren.length > 1) {
            // Make last children fill:
            resultChildren = this.makeFlexDock(
                    this.props.defaultDock, // before last
                    myChildren[(myChildren.length-1)-1],
                    myChildren[(myChildren.length-1)] ); // last element
        }

        return (resultChildren);
    }
}

