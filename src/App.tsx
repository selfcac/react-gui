import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';
import { DockTop, DockLeft, DockRight, DockBottom } from './components/DockPanel';
import CenterPanel from './components/CenterPanel';
import { List, Input } from 'antd';

class App extends React.Component {

  state: MyNumberProps = {
    myNumber: 0
  }

  updateNumber = (i: number) => {
    this.setState({ myNumber: i });
  }

  render() {
    return (

      <div className="App" style={{height: "100vh", width: "100vw"}}>

        <CenterPanel
           style={{
             height: "90%", width: "50%", 
             borderRadius: "10px",padding:"5px",
             background: "white", boxShadow: "2px 4px 6px black" }} 
           bgStyle={{backgroundImage: 'url(bg.jpg)'}}
           >
          <DockTop>
            <MainMenu updateFunc={this.updateNumber} ></MainMenu>
            <div className="fillHeight">
              <List>
                <Input></Input>
              </List>
            </div>
          </DockTop>
        </CenterPanel>

       
      </div>
    );
  }
}

export default App;
