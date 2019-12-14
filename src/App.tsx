import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';
import { DockTop, DockLeft, DockRight, DockBottom } from './components/DockPanel';
import CenterPanel from './components/CenterPanel';
import { List, Input, Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';

class App extends React.Component {

  state: MyNumberProps = {
    myNumber: 0
  }

  updateNumber = (i: number) => {
    this.setState({ myNumber: i });
  }

  render() {
    return (

      <div className="App" style={{ height: "100vh", width: "100vw" }}>
          <DockTop>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
            <div className="fH">
              <Row className="fH">
                <Col span={8} className="fH" >
                  <div style={{padding: "10px"}} className="fH">
                    <div style={{ height: "50%" }} >
                      <DockTop>
                        <Search placeholder="search domain" onSearch={value => console.log(value)} enterButton />
                        <List></List>
                      </DockTop>
                    </div>
                    <div style={{ background: "red", height: "50%" }}>a</div>
                  </div>
                </Col>
                <Col span={8} className="fH"><b>col-8</b></Col>
                <Col span={8} className="fH"><b>col-8</b></Col>
              </Row>
            </div>
          </DockTop>
      </div>
    );
  }
}

export default App;
