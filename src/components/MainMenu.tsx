import { Icon, Menu , message} from 'antd'
import React from 'react';
import { ClickParam } from 'antd/lib/menu';

const {SubMenu} = Menu;


export interface MenuProps {
    updateFunc: (i: number) => void;
}

export interface MenuState {

}

export default class MainMenu extends React.Component<MenuProps, MenuState> {

    state: MenuState = {

    }

    MyClick = (param: ClickParam) => {
        this.props.updateFunc(5);
        message.info("Updated to 5",5);
    }

    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="One" onClick={this.MyClick}>
                    <Icon type="mail"></Icon>
                    One sssssssss
                </Menu.Item>
                <Menu.Item key="One2" onClick={this.MyClick}>
                    2222222
                </Menu.Item>
                <SubMenu title={<span>"I5"</span>}>
                    <Menu.ItemGroup>
                        <Menu.Item>i1</Menu.Item>
                        <Menu.Item>i222</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        );
    }


}
