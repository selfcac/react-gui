import React, { Component } from 'react'
import { Menu, Checkbox, Dropdown, Badge, Button, Icon, Result } from 'antd';

export interface FilterMenuProps {
  FilterList : FilterMenuList
  onFilterUpdated : () => void;
}

export class FilterMenuList {
    stateList : Array<boolean> = [];
    nameList : Array<string> = [];

    constructor(names: Array<string>) {
        this.nameList = names;
        this.stateList = names.map(()=>false);
    }

    setState(index: number, state: boolean) {
        this.stateList[index] = state;
    }

    getState(index: number) : boolean {
        return this.stateList[index];
    }

    getName(index: number) : string {
        return this.nameList[index];
    }

    getAllStates() : Array<boolean> {
        return this.stateList;
    }

}



export type ItemFilterFunction<T> = Array<(item:T, currentState: boolean)=>boolean>;

export class SimpleFunctionFilter<T> {
    myFilters : ItemFilterFunction<T> = []

    constructor(list: ItemFilterFunction<T>) {
        this.myFilters = list;
    }

    filterItem(item:T, stateList : Array<boolean>, startState:boolean = false) {
        let result: boolean = startState;
        if (stateList.length != this.myFilters.length)
            throw "State list count not equal filter list count.";
        
        stateList.forEach((shouldFilter,index,arr) => {
            if (shouldFilter) {
                result = this.myFilters[index](item, result);
            }
        });

        return result;
    }
}

export class FilterMenu extends Component<FilterMenuProps> {
    
    state = {
        visibleDropDown : false,
        filterCount : 0,
    }
    
    updateFilter = (i : number) => {
        let count = this.state.filterCount;
        
        this.props.FilterList.setState(i,
            !this.props.FilterList.getState(i)
            );

        if (this.props.FilterList.getState(i))
            count++;
        else
            count--;

        this.setState({filterCount: count})
        this.props.onFilterUpdated();
    }

    toggleFilterDropDown = () => {
        this.setState({visibleDropDown: !this.state.visibleDropDown});
    }

    render() {

        let filterMenu = (
            <Menu>
             { 
             this.props.FilterList.getAllStates().map((val,index,arr) => 
                 (
                    <Menu.Item key={index}>
                        <Checkbox onClick={(e)=>this.updateFilter(index)}>{this.props.FilterList.getName(index)}</Checkbox>
                    </Menu.Item>
                 )
             )
             }
            </Menu>
        );

        return (
            <Dropdown overlay={filterMenu} placement="bottomRight" visible={this.state.visibleDropDown}>
                <Badge count={this.state.filterCount} style={{marginRight: "10px"}}>
                    <Button onClick={this.toggleFilterDropDown}>
                        <Icon type="filter"/>
                    </Button>
                </Badge>
            </Dropdown>
        );
    }
}