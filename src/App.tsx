import React, { ReactNode } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import { MyNumberProps } from './components/SomeForm';
import { DockTop, DockLeft, DockRight, DockBottom } from './components/DockPanel';
import { List, Row, Col, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import { DataSource, dsDataType } from './data-components/DataSource';
import { FullHeightDiv, FullHeightClass as FullHeightClassName } from './components/FullHeight';

class App extends React.Component {

  data : DataSource = new DataSource();

  state: MyNumberProps = {
    myNumber: 0
  }

  updateNumber = (i: number) => {
    this.setState({ myNumber: i });
    this.data.addData("Hello");
  }

  componentDidMount() {
    this.data.addData("Hello");
    this.data.addData("Hello");
    this.data.addSubscriber(()=>{this.setState(this.state)})
  }

  getFilterFunc(substring : string) {
    return (item : dsDataType)=> {
      return item.toLowerCase().indexOf(substring.toLowerCase()) > -1;
    };
  }

  renderItem(item: dsDataType, index: number) : ReactNode {
    return (<List.Item>{item.toString()} <Tag>hello</Tag></List.Item>);
  }

  render() {
    return (

      <div className="App" style={{ height: "100vh", width: "100vw" }}>
          <DockTop>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
            <FullHeightDiv>
              <Row className={FullHeightClassName}>
                <Col span={8} className={FullHeightClassName}>
                  <FullHeightDiv style={{padding: "10px"}} >
                    <DockTop>
                        <Search 
                          placeholder="search domain" 
                          onSearch={value => this.data.applyFilter(this.getFilterFunc(value))} 
                          style = {{padding: "10px"}}
                          /* enterButton  */
                        />
                        <div className={FullHeightClassName}>
                          <div style={{ height: "50%",  maxHeight: "50%", overflow:  "auto", padding: "10px" }} >
                              <List dataSource={this.data.filteredData} renderItem={this.renderItem} ></List>
                          </div>
                          < div style={{  height: "50%", padding: "10px" }}>
                              <div style={{background: "red"}} className={FullHeightClassName}>
                                Content
                              </div>
                          </div>
                        </div>
                    </DockTop>
                  </FullHeightDiv>
                </Col>
                <Col span={8} className={FullHeightClassName}><b>col-8</b></Col>
                <Col span={8} className={FullHeightClassName}><b>col-8</b></Col>
              </Row>
            </FullHeightDiv>
          </DockTop>
      </div>
    );
  }
}

export default App;
