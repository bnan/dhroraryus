import React, { Component } from 'react';
import {Date, Event, EventOption, EventOptionInstance} from './supp_classes'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    this.populate();

    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      </div>
    );
  }

  populate(){
    const ARAT = new Event('ARA-T');
    const ARAP = new Event('ARA-P');
    const ACAT = new Event('ACA-T');
    const ACAP = new Event('ACA-P');
    const EDCT = new Event('EDC-T');
    const EDCP = new Event('EDC-P');
    const SEGT = new Event('EDC-T');
    const SEGP = new Event('EDC-P');
    const CVT = new Event('CV-T');
    const CVP = new Event('CV-P');

    const ARAT1 = new EventOption(ARAT,1,[ new EventOptionInstance( new Date(3,13,0) , new Date(3,15,0)), ])

    const ARAP1 = new EventOption(ARAP, 1,[ new EventOptionInstance( new Date(2,15,0) , new Date(2,17,0)), ])
    const ARAP2 = new EventOption(ARAP, 2,[ new EventOptionInstance( new Date(5,11,0) , new Date(5,13,0)), ])
    const ARAP3 = new EventOption(ARAP, 3,[ new EventOptionInstance( new Date(2,17,0) , new Date(2,19,0)), ])
    const ARAP4 = new EventOption(ARAP, 4,[ new EventOptionInstance( new Date(5, 9,0) , new Date(5,11,0)), ])

    const ACAP1 = new EventOption(ACAP, 1,[ new EventOptionInstance( new Date(2,11,0) , new Date(2,13,0)), ])
    const ACAP2 = new EventOption(ACAP, 2,[ new EventOptionInstance( new Date(6,14,0) , new Date(6,16,0)), ])
    const ACAP3 = new EventOption(ACAP, 3,[ new EventOptionInstance( new Date(2, 9,0) , new Date(2,11,0)), ])
    const ACAP4 = new EventOption(ACAP, 4,[ new EventOptionInstance( new Date(2,14,0) , new Date(2,16,0)), ])
    const ACAT1 = new EventOption(ACAT,1,[ new EventOptionInstance( new Date(4,10,0) , new Date(4,12,0)), ])

    let cl = [ARAT1, ARAP1, ARAP2, ARAP3, ARAP4, ACAT1, ACAP1, ACAP2, ACAP3, ACAP4]

    var domain = new Map();

    for ( var c in cl ){
      if ( !domain.has(cl[c].event)) {
        domain.set(cl[c].event, [cl[c].option,]);
      }
      else {
        let value = domain.get(cl[c].event);
        value.push(cl[c].option);
        domain.set(cl[c].event, value);
      }
    }

    let sol = search(domain, [overlapConstraint])
    console.log(sol)
  }



}


// Returns dictionaries with the solutions
function search(domain, constraints)
{
  // Return null if there is no solution
  if (Array.from(domain.values()).some(v => v.length == 0)) {
    return null
  }

  // Return solution if one was found
  if (Array.from(domain.values()).every(v => v.length == 1)) {
    return [domain]
  }

  // Orders keys in order of increasing length of domain
  const keys = Array.from(domain.keys()).concat().sort(e => domain.get(e).length)

  const key = keys.filter( k => domain.get(k).length > 1)[0]
  console.log(key)
  // Missing picking value by most constraints created
  let solutions = []

  for (const value of domain.get(key)) {
    // Copy map
    const newDomain = new Map(domain)
    // Pick a value
    newDomain.set(key, [value])

    // Other variables values are the ones that are not constrained by picked value
    for (const key2 of keys.filter(k => k != key)) {
      const tmp = []
      for (const c of newDomain.get(key2)) {
          if (!overlapConstraint(value, c) || !overlapConstraint(c, value)) {
            tmp.push(c)
          }
      }
      newDomain.set(key2, tmp)
    }

    const s = search(newDomain, constraints)

    if (s != null) {
      solutions = solutions.concat(s)
    }
  }

  return solutions
}

function overlapConstraint(c1, c2)
{
  console.log(c1)
  console.log(c2)
  //for (const e1 of c1.instances) {
  //  for (const e2 of c2.instances) {
  //    if (e1.day == e2.day && e1.end > e2.start) {
  //      return true
  //    }
  //  }
  //}

  return false
}

export default App;
