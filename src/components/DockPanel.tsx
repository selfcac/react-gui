import React, { ReactElement } from "react";
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
        return (type === DockType.TOP) ?  "column" :
        (type === DockType.LEFT) ?  "row" :
        (type === DockType.RIGHT) ?  "row-reverse" :
         "column-reverse";
    }


    makeFlexDock = (type : DockType, childFirst :ReactElement, childNext: ReactElement)=> {
        if ( typeof(childFirst) !== 'undefined' && childFirst !== null ) {
            if ( typeof(childNext) !== 'undefined' && childNext !== null ) {

                let newFirstProps = {style: {flex: 0}, ...childFirst.props };
                newFirstProps.style.flex = 0;

                let newNextProps = {style: {flex: 1}, ...childNext.props };
                newNextProps.style.flex = 1;
                
                return (
                    <div style={{display:"flex", flexDirection: this.getDockFlexString(type)}} >
                        {React.cloneElement(childFirst , newFirstProps)}
                        {React.cloneElement(childNext  , newNextProps)}
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

