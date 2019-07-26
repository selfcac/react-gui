import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';



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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
