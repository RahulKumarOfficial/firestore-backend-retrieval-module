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
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    this.state = {
      db : firebase.firestore(),
      arrayOfLists : [""]
    }
  }
  
  displayData(){  
    this.state.db.collection("Generated_names").where("value",">=","a")
    .onSnapshot((querySnapshot) => {          
      var generatedList = [];   
        querySnapshot.forEach(doc=> {
          var mainData = doc.data().value;
          if(mainData.includes(Date.now()))
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
       <ul className="w3-ul w3-center w3-hoverable w3-padding-small w3-small w3-cyan">{this.state.arrayOfLists}</ul>
      </div>
    );
  }
}

export default App;

