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

        <CenterPanel
          style={{
            height: "90%", width: "50%",
            borderRadius: "10px", padding: "5px",
            background: "white", boxShadow: "2px 4px 6px black"
          }}
          bgStyle={{ backgroundImage: 'url(bg.jpg)' }}
        >
          <DockTop>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
            <div className="fH">
              <Row className="fH">
                <Col span={12} className="fH" >
                  <div style={{ height: "50%" }} >
                    <DockTop>
                      <Search placeholder="search domain" onSearch={value => console.log(value)} enterButton />
                      <List></List>
                    </DockTop>
                  </div>
                  <div style={{ background: "red", height: "50%" }}>a</div>
                </Col>
                <Col span={12} className="fH">col-12</Col>
              </Row>
            </div>
          </DockTop>
        </CenterPanel>


      </div>
    );
  }
}

export default App;
