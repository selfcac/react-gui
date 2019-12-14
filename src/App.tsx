import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';
import { DockTop, DockLeft, DockRight, DockBottom } from './components/DockPanel';
import CenterPanel from './components/CenterPanel';
import { List, Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';
import { DataSource, DataType } from './data-components/DataSource';

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

  renderItem(item: DataType, index: number) : ReactNode {
    return (<div>{item.toString()}</div>);
  }

  render() {
    return (

      <div className="App" style={{ height: "100vh", width: "100vw" }}>
          <DockTop>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
            <div className="fullHeight">
              <Row className="fullHeight">
                <Col span={8} className="fullHeight" >
                  <div style={{padding: "10px"}} className="fullHeight">
                    <div style={{ height: "50%" }} >
                      <DockTop>
                        <Search placeholder="search domain" onSearch={value => console.log(value)} enterButton />
                        <List dataSource={this.data.filteredData} renderItem={this.renderItem} ></List>
                      </DockTop>
                    </div>
                    <div style={{ background: "red", height: "50%" }}>a</div>
                  </div>
                </Col>
                <Col span={8} className="fullHeight"><b>col-8</b></Col>
                <Col span={8} className="fullHeight"><b>col-8</b></Col>
              </Row>
            </div>
          </DockTop>
      </div>
    );
  }
}

export default App;
