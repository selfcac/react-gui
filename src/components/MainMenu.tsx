import { Icon, Menu } from 'antd'
import React from 'react';
import { ClickParam } from 'antd/lib/menu';

export interface MenuProps {
    updateFunc : (i: number) => void;
}

export interface MenuState {

}

export default class MainMenu extends React.Component<MenuProps, MenuState> {
    
    state : MenuState  = {

    }

    MyClick =  (param: ClickParam) => {
        this.props.updateFunc(5);
    }

    render() {
        return (
            <Menu mode="horizontal">
            <Menu.Item key="One" onClick={this.MyClick}> 
              <Icon type="mail"></Icon>
              One sssssssss
            </Menu.Item>
            <Menu.Item key="Two"> Two </Menu.Item>
          </Menu>
        );
    }

    
}
