import React from "react";
import { InputNumber } from "antd";

export interface MyNumberProps {
    myNumber : number
}

export default class SomeForm extends React.Component<MyNumberProps> {


    render () {
        return (
            <InputNumber value={this.props.myNumber}  ></InputNumber>
        );
    }

}