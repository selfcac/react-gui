import React from "react";
import { ModalResult } from "./ModalResultEnum";
import { Modal, Input } from "antd";


type InputModelCallback =  (dialogResult: ModalResult, resultObject: string) => void;



export class InputModal {
    private callback : InputModelCallback = () => {};
    private listener : (visible:boolean)  => void = () => {};

    title: string = "";
    description: string = "";
    defaultValue: string = "";

    constructor(title: string, desc: string, defaultValue? : string) {
        this.title = title;
        this.description = desc;
        this.defaultValue = (defaultValue) ? defaultValue : "";
    }

    setUpdateListener = (callback: (visible:boolean) => void) => {
        this.listener = callback;
    }

    showDialog = (callback: InputModelCallback) => {
        this.callback = callback;
        this.listener(true);
    }


    getCallback = () : InputModelCallback => {
        return (dialogResult: ModalResult, resultObject: string) => { 
            this.listener(false) // close dialog
            this.callback(dialogResult, resultObject);
        }
    }
}

export interface InputModalProps {
    manager : InputModal
}

export interface InputModalState {
    open: boolean
    myValue : string
}


export class CInputModal extends React.Component<InputModalProps,InputModalState> {

    state = {
        open: false,
        myValue : "",
    }

    shouldComponentUpdate(nextProps: Readonly<InputModalProps>, nextState: Readonly<InputModalState>, nextContext: any) : boolean
    {
        return (this.state.open !== nextState.open || this.state.myValue !== nextState.myValue);
    }

    componentDidMount () {
        this.props.manager.setUpdateListener((visible: boolean) => {
            if ( visible)            
                this.setState({myValue: "", open: visible })
            else 
                this.setState({open: visible })
        });
    }
    
    handleOK = () => {
       this.props.manager.getCallback()(ModalResult.OK, this.state.myValue);
    }

    handleCancel = () => {
        this.props.manager.getCallback()(ModalResult.CANCEL, "");
    }

    render() {
        return this.state.open ? (
            <Modal
            title={this.props.manager.title}
            visible={this.state.open}
            onOk={ this.handleOK}
            onCancel={this.handleCancel}
            >
                <p>{this.props.manager.description}</p> <br/>
                    <Input 
                        type="text" 
                        defaultValue={this.props.manager.defaultValue}
                        value ={this.state.myValue} onChange={(e)=>{this.setState({myValue: e.target.value})}}
                        autoFocus
                    />
            </Modal>
        ) : (<div></div>);
    }
}