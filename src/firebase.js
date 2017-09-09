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
  
  var heuristicRef = firebase.database().ref('heuristics')

  var constraintRef = firebase.database().ref('constraints')
  
  //heuristicRef.child("free_afternoon").set([6,0,,0,2,6,4,8,5,7,2])
  //heuristicRef.child("long_lunch").set([0,0,0,0,0,0,0,0,0,0,0])
  //heuristicRef.child("free_mornings").set([0,0,0,0,0,0,0,0,0,0,0])
  //incHeuristicValue('free_afternoon',0)


  // checks value
  //heuristicRef.child("free_afternoon").on("value", gotData);
  
  //function gotData(data) {
    //var heuristics = data.val();
   

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
//}
//updates value
export function incHeuristicValue(heuristic,score){
  var heuristicValRef = firebase.database().ref('heuristics').child(heuristic).child(score)

  heuristicValRef.once('value', function (snapshot) {
    heuristicValRef.set(snapshot.val() + 1);
  });
}

export function getHeuristicRef(){
  return firebase.database().ref('heuristics')
}

export function getConstraintRef(){
  return firebase.database().ref('constraints')
}
