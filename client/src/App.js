import React, { Component } from 'react';
import Container from './Container'
import logo from './logo.svg';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      lists : [],
      tasks : []
    };
  }

  componentDidMount() {
    this.callApi()
    .then(res => {
      this.setState({ lists: res.lists, tasks: res.tasks });
      // this.setState({ tasks: res.tasks });
    })
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/board');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  renderElements() {

    if (this.state.lists.length > 0) {
      let array = [];
      let tasks = this.state.tasks
      for (let list of this.state.lists) {
        array.push(<Container id={list.id} text={list.text} list={tasks.filter((task) => task.list === list.id)} /> );

      }
      return array;
    }
    else return [];
  }

  render() {

    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "20px"
    }



    const articles = this.renderElements();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Trello [Group 4] </h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <div style={{...style}}>
          {articles}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
