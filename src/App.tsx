import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';
import DockerPanel from './components/DockPanel';



class App extends React.Component {

  state: MyNumberProps = {
    myNumber: 0
  }

  updateNumber = (i: number) => {
    this.setState({ myNumber: i });
  }

  render() {
    return (

      <div className="App">
        <div className="centered" style={{"background": "yellow"}}>
          <div style={{"background":"red", width: "500px", height: "100px"}}>
            <MainMenu updateFunc={this.updateNumber}></MainMenu>
            <SomeForm myNumber={this.state.myNumber}></SomeForm>
            <DockerPanel>
              <div id="d1"></div>
              <div id="d2"></div>
            </DockerPanel>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
