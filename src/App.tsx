import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu';
import SomeForm, { MyNumberProps } from './components/SomeForm';



class App extends React.Component  {
  
  state : MyNumberProps = {
    myNumber : 0
  }

  updateNumber = (i: number) => {
    this.setState({myNumber: i});
  }

  render () {
    return (

      <div className="App">
        <MainMenu updateFunc={this.updateNumber}></MainMenu>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> <br />
          <SomeForm myNumber={this.state.myNumber}></SomeForm>
        </div>
      </div>
    );
  }
}

export default App;
