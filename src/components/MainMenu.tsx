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
        //message.info("Updated to 5",5);
    }

    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="menuRstPolicy" onClick={this.MyClick}>
                    <Icon type="undo" />
                    Reset policy
                </Menu.Item>
                <SubMenu key="menuPolicy" title={<span>Policy</span>}>
                    <Menu.ItemGroup>
                        <Menu.Item key="menuLoadPolicy">
                            <Icon type="folder-open" />
                            Load Policy
                        </Menu.Item>
                        <Menu.Item key="menuSavePolicy">
                            <Icon type="save" />
                            Save Policy
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="menuLoadLog" onClick={this.MyClick}>
                    <Icon type="align-left" />
                    Load Log file
                </Menu.Item>
                <Menu.Item key="menuAbout" onClick={this.MyClick}>
                    <Icon type="info-circle" />
                    About <i>selfcac</i>
                </Menu.Item>
            </Menu>
        );
    }


}
