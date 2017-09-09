import * as firebase from 'firebase'

export const init = () => {
  let config = {

    apiKey: "AIzaSyDosOFuq6UrFskr-swG2TVzJmgSWkpS47A",
    authDomain: "banana-408ec.firebaseapp.com",
    databaseURL: "https://banana-408ec.firebaseio.com",
    projectId: "banana-408ec",
    storageBucket: "banana-408ec.appspot.com",
    messagingSenderId: "649543163122"
  }
  firebase.initializeApp(config)
  
  var databaseRef = firebase.database().ref('heuristics')

  databaseRef.child("long_lunch").on("value", gotData);
  
  function gotData(data) {
    var heuristics = data.val();
    document.getElementById("llcount").innerHTML = "Long lunch schedules: " + heuristics
    // Grab the keys to iterate over the object
    /*
    var keys = Object.keys(fruits);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // Look at each fruit object!
      var fruit = fruits[key];
    }*/
    
  }
  /*
  databaseRef.child("free_mornings").once('value', function (snapshot) {
    databaseRef.child("free_mornings").set(snapshot.val() + 1);
  });
  databaseRef.child("free_afternoon").once('value', function (snapshot) {
    databaseRef.child("free_afternoon").set(snapshot.val() + 1);
  });
 */
}

export function incLongLunch(){
  var databaseRef = firebase.database().ref('heuristics')

  databaseRef.child("long_lunch").once('value', function (snapshot) {
    databaseRef.child("long_lunch").set(snapshot.val() + 1);
  });

}