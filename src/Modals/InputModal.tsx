import React from "react";
import { ModalResult } from "./ModalResultEnum";
import { Modal, Input } from "antd";


type InputModelCallback =  (dialogResult: ModalResult, resultObject: string) => void;

export interface InputModalProps {
    visible: boolean
    title: string
    description: string
    defaultValue?: string
    onClose: InputModelCallback
}



export class InputModal extends React.Component<InputModalProps> {

    state = {
        lastVisible: false,
    }

    componentDidUpdate() {
        if (!this.state.lastVisible && this.props.visible)

    }

    handleOK = () => {
        this.props.onClose(ModalResult.OK, )
    }

    handleCancel = () => {

    }

    render() {
        return (
            <Modal
            title={this.props.title}
            visible={this.props.visible}
            onOk={ this.handleOK}
            onCancel={this.handleCancel}
            >
                <span>{this.props.description}</span> <br/>
                <Input.Password type="text" defaultValue={this.props.defaultValue} />;
            </Modal>
        )
    }
}