import React, { ReactNode } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import { DockTop, DockRight, DockLeft } from './components/DockPanel';
import { List, Row, Col, Tag, Checkbox, Button, Popover, Icon, Badge, Menu, Dropdown } from 'antd';
import Search from 'antd/lib/input/Search';
import { DataSource, dsDataType } from './data-components/DataSource';
import { FullHeightDiv, FullHeightClass as FullHeightClassName } from './components/FullHeight';
import { ClickParam } from 'antd/lib/menu';
import ReactResizeDetector from 'react-resize-detector';

export interface MyNumberProps2 {
  myNumber : number
  visibleDropDown : boolean
  filterCount : number
  filterArray : boolean[]

  w : number
  h: number
}


class App extends React.Component<{},MyNumberProps2> {

  data : DataSource = new DataSource();

  state: MyNumberProps2 = {
    myNumber: 0,

    visibleDropDown : false,
    filterCount : 0,
    filterArray : [false,false,false],

    w : 0,
    h: 0,
  }

  updateNumber = (i: number) => {
    this.setState({ myNumber: i });
    this.data.addData("Hello");
  }

  componentDidMount() {
    this.data.addData("Hello");
    this.data.addData("Hello");
    this.data.addSubscriber(()=>{this.setState(this.state)})

    window.addEventListener("resize",(ev)=>{
      console.log("Resized!");
      this.forceUpdate();      
    });
  }

  getFilterFunc(substring : string) {
    return (item : dsDataType)=> {
      return item.toLowerCase().indexOf(substring.toLowerCase()) > -1;
    };
  }

  toggleFilterDropDown = () => {
    this.setState({visibleDropDown: !this.state.visibleDropDown});
  }

  addDomain() {
     // Popup?
  }

  renderItem(item: dsDataType, index: number) : ReactNode {
    return (
      <List.Item actions={[(<a>Edit</a>), (<a>Edit</a>)]} >
        <List.Item.Meta
          title = {item.toString()}
          description = {(
                <div><Checkbox disabled={true}>Allowed</Checkbox><Tag>hello</Tag></div>
            )}
        />
      </List.Item>
    );
  }

  updateFilter = (i : number) => {
    let fArray = this.state.filterArray;
    fArray[i] = !fArray[i];
    let count = this.state.filterCount;
    if (fArray[i])
      count++;
    else
      count--;
    this.setState({filterArray: fArray, filterCount: count})
  }

  filterMenu = (
    <Menu>
      <Menu.Item key={0}>
        <Checkbox onClick={(e)=>this.updateFilter(0)}>Filter 1</Checkbox>
      </Menu.Item>
      <Menu.Item key={1}>
        <Checkbox onClick={(e)=>this.updateFilter(1)}>Filter 1</Checkbox>
      </Menu.Item>
      <Menu.Item key={2}>
        <Checkbox onClick={(e)=>this.updateFilter(2)}>Filter 1</Checkbox>
      </Menu.Item>
    </Menu>
  );

  render() {
    
    return (

      <div className="App" style={{ height: "100vh", maxHeight:  "100vh", width: "100vw" }}>
          <DockTop wrapperStyle={{height: "100%"}}>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
              <Row className={FullHeightClassName}>
                <Col span={8}  className={FullHeightClassName}>
                    <DockTop >
                        <DockRight wrapperStyle={{padding: "10px"}}>
                          <DockRight>
                            <DockLeft>
                            <Button type="primary" style={{marginLeft: "10px", marginRight: "10px"}}>+</Button>
                            <Dropdown overlay={this.filterMenu} trigger={["hover"]} placement="bottomRight"
                              visible={this.state.visibleDropDown}>
                              <Badge count={this.state.filterCount} style={{marginRight: "10px"}}>
                                <Button onClick={this.toggleFilterDropDown} 
                                 ><Icon type="filter"/></Button>
                              </Badge>
                            </Dropdown>
                            </DockLeft>
                          <Search 
                          placeholder="search domain" 
                          onSearch={value => this.data.applyFilter(this.getFilterFunc(value))} 
                          /* enterButton  */
                          />
                          </DockRight>
                        </DockRight>
                          <div style={{ height: "100%"}}>
                            <ReactResizeDetector handleHeight  render=
                            {({height})=> (
                               <FullHeightDiv>
                                      <div style={{ height:  height*0.5, maxHeight: height*0.5,
                                    overflowY:  "auto", padding: "0 10px",
                                    }} >
                                        <List dataSource={this.data.filteredData} renderItem={this.renderItem} ></List>
                                    </div>
                                    
                                  <div style={{  height:  "50%",  maxHeight: "50%" , padding: "10px" }}>
                                      <FullHeightDiv style={{background: "red"}}>
                                        Content
                                      </FullHeightDiv>
                                  </div>
                               </FullHeightDiv>
                             )} />
                          </div>
                    </DockTop>
                </Col>
                <Col span={8} className={FullHeightClassName}><b>col-8</b></Col>
                <Col span={8} className={FullHeightClassName}><b>col-8</b></Col>
              </Row>
          </DockTop>
    </div>
    );
  }
}

export default App;
