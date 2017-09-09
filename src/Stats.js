import React, {Component} from 'react'
import { Link } from 'react-router'
import {init as firebaseInit,  getHeuristicRef, getConstraintRef} from './firebase'
import { Grid, Row, Col } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar } from 'recharts';



export class Stats extends Component {

	constructor(props) {
	    super(props)
	    firebaseInit()
	    
	    this.state = {
	    	free_afternoon_data: [],
	    	long_lunch_data:[],
	    	free_mornings_data:[]
	    }

	    this.AsyncSet("free_afternoon")
	    this.AsyncSet("long_lunch")
	    this.AsyncSet("free_mornings")

  	}

  	AsyncSet(heuristic){

  		getHeuristicRef().child(heuristic).on("value", (data) => {
  			var rawData = data.val();
  			var keys = Object.keys(rawData);
  			var data = []
    		
    		for (var i = 0; i <= 10; i++) {
		      // Look at each fruit object!
		      var value = rawData[i];
		      console.log(value)

		      data.push({value:i,total:value===undefined ? 0:value})
		 	}
		 	
		 	if(heuristic == "free_afternoon")
	  			this.setState({
	  				free_afternoon_data: data
	  			})
	  		else if(heuristic == "long_lunch")
	  			this.setState({
	  				long_lunch_data: data
	  			})
	  		else if(heuristic == "free_mornings")
	  			this.setState({
	  				free_mornings_data: data
	  			})
  		})

  		console.log(this.state.free_afternoon_data)
  		//console.log(this.state.long_lunch_data)
  		//console.log(this.state.free_mornings_data)

  	}

  	render() {
	    return (
	    	<div>
		    	<div>
			    	<h3>Free Afternoon Values</h3>
			      	<BarChart width={600} height={300} data={this.state.free_afternoon_data}
			            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
				       <XAxis dataKey="value"/>
				       <YAxis/>
				       <CartesianGrid strokeDasharray="3 3"/>
				       <Tooltip/>
				       <Legend />
				       <Bar dataKey="total" fill="#82ca9d"/>
			      	</BarChart>
		      	</div>

		      	<div>
			    	<h3>Free Morning Values</h3>
			      	<BarChart width={600} height={300} data={this.state.free_mornings_data}
			            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
				       <XAxis dataKey="value"/>
				       <YAxis/>
				       <CartesianGrid strokeDasharray="3 3"/>
				       <Tooltip/>
				       <Legend />
				       <Bar dataKey="total" fill="#82ca9d"/>
			      	</BarChart>
		      	</div>

		      	<div>
			    	<h3>Long Lunch Values</h3>
			      	<BarChart width={600} height={300} data={this.state.long_lunch_data}
			            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
				       <XAxis dataKey="value"/>
				       <YAxis/>
				       <CartesianGrid strokeDasharray="3 3"/>
				       <Tooltip/>
				       <Legend />
				       <Bar dataKey="total" fill="#82ca9d"/>
			      	</BarChart>
		      	</div>
	      	</div>
	    )
  }
}