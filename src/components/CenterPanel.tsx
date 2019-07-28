import React from "react";

export interface CenterPanelProps {
    className? : string | undefined
    style? : React.CSSProperties
    bgStyle? : React.CSSProperties
}

export default class CenterPanel extends React.Component<CenterPanelProps> {

    render() {
        return (
            <div style={{
                height: "100%", display: "flex", justifyContent: "center", alignItems: "center", ...this.props.bgStyle
            }} >
                <div style={{ ...this.props.style}} className={this.props.className}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}