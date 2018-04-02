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

    var firebase = require("firebase");
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBpg8JBWHV9d4OCX5pJEm3qA6oh68SKSTs",
      authDomain: "trello-paw.firebaseapp.com",
      databaseURL: "https://trello-paw.firebaseio.com",
      projectId: "trello-paw",
      storageBucket: "",
      messagingSenderId: "1062369713071"
    };
    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      firebase.database().ref().once('value').then((snapshot) => {
        var jsonObj = snapshot.exportVal();
        this.setState({ lists: Object.values(jsonObj.lists), tasks: Object.values(jsonObj.tasks) });
      }).catch(err => console.log(err));

    })

    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }


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
