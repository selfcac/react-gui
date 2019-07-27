import React from "react";

export default class DockerPanel extends React.Component {

    render() {
        if ( typeof(this.props.children) !== 'undefined' && this.props.children !== null ) {
           if ( this.props.children instanceof React.Component ) {
                console.log(this.props.children);
           }
        }

        return (<div></div>);
    }
}