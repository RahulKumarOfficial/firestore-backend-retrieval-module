import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");

    //firestore connection keys
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDeIn7wTvRRXoFdvXRMJOiM7gWv9sr6Fkk",
      authDomain: "fir-check-cloud.firebaseapp.com",
      databaseURL: "https://fir-check-cloud.firebaseio.com",
      projectId: "fir-check-cloud",
      storageBucket: "fir-check-cloud.appspot.com",
      messagingSenderId: "736521760623"
    };
    firebase.initializeApp(config);
    this.state = {
      db : firebase.firestore(),
      arrayOfLists : []
    }
  }

  displayData(){
    
    this.state.db.collection("Generated_names").where("value",">=","a")
    .onSnapshot((querySnapshot) => {
      console.clear();
      var generatedList = [];   
        querySnapshot.forEach(doc=> {
            generatedList.push(<li>{doc.data().value}</li>);
        });
          
        this.setState({
          arrayOfLists:generatedList
        })
    });
  
    
    
  }


  render() {
    return (
      <div className="App">
       <p>{this.displayData()}</p>
       <p>{this.state.arrayOfLists}</p>
      </div>
    );
  }
}

export default App;

