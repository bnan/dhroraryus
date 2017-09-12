import * as firebase from 'firebase'
import {Time} from './suppClasses'

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

  //var heuristicRef = firebase.database().ref('heuristics')

  //var constraintRef = firebase.database().ref('constraints')

  //incHeuristicValue("free_days",0)

  //constraintRef.child("Friday").push({start:"22:00",duration:140})

  /*
  Get Monday Values
  constraintRef.child("Monday").on("value", gotData);

  function gotData(data) {
    var monData = data.val();
    console.log("monData: ",monData)


    //Grab the keys to iterate over the object

    var keys = Object.keys(monData);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // Look at each fruit object!
      var constraint = monData[key];
      console.log(constraint)
    }*/



  //heuristicRef.child("free_afternoon").set([6,0,,0,2,6,4,8,5,7,2])
  //heuristicRef.child("long_lunch").set([0,0,0,0,0,0,0,0,0,0,0])
  //heuristicRef.child("free_mornings").set([0,0,0,0,0,0,0,0,0,0,0])
  //heuristicRef.child("contiguous_events").set([4,5,3,5,2,5,4,3,8,5,1])
  //heuristicRef.child("free_days").set([4,2,3,4,2,1,4,1,2,1,3])
  //incHeuristicValue('free_afternoon',0)

  /*
  databaseRef.child("free_mornings").once('value', function (snapshot) {
    databaseRef.child("free_mornings").set(snapshot.val() + 1);
  });
  databaseRef.child("free_afternoon").once('value', function (snapshot) {
    databaseRef.child("free_afternoon").set(snapshot.val() + 1);
  });
 */


  }


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

export function addConstraint(weekday,start,end){
  var stArray = start.split(":")
  var endArray = end.split(":")

  var duration = Time.interval( new Time(stArray[0],stArray[1]), new Time(endArray[0],endArray[1]))

  getConstraintRef().child(weekday).push({"start":start,"duration":duration})

  }
