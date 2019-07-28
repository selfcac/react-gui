import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';
import DockPanel, { DockType, DockTop, DockLeft, DockBottom } from './components/DockPanel';



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
        <DockTop>
          <div className="fill" style={{background: "red"}}>a</div>
          <DockLeft>
            <div className="fill" style={{background: "green"}}>b</div>
            <DockBottom>
              <div className="fill" style={{background: "pink"}}>c</div>
              <div className="fill" style={{background: "yellow"}}>d</div>
            </DockBottom>
          </DockLeft>
        </DockTop>

        {/* <div className="centered" style={{"background": "yellow"}}>
          <div style={{"background":"red", width: "500px", height: "100px"}}>
            <MainMenu updateFunc={this.updateNumber}></MainMenu>
            <SomeForm myNumber={this.state.myNumber}></SomeForm>
            
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
