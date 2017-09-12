import React, {Component} from 'react'
import {init as firebaseInit,  getHeuristicRef } from './firebase'
import { CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Grid, Row, Col } from 'react-bootstrap';



export class Stats extends Component {

	constructor(props) {
	    super(props)
	    firebaseInit()
	    this.state = {
	    	free_afternoon_data: [],
	    	long_lunch_data:[],
	    	free_mornings_data:[],
	    	contiguous_events_data:[],
  			free_days_data:[],
  			free_friday_mornings_data:[],
  			long_weekend_data:[],
  			heuristc_meta_data:[]

	    }

	    this.AsyncSet("free_afternoon")
	    this.AsyncSet("long_lunch")
	    this.AsyncSet("free_mornings")
	    this.AsyncSet("contiguous_events")
	    this.AsyncSet("free_days")
	    this.AsyncSet("free_friday_mornings")
	    this.AsyncSet("long_weekend")

	    getHeuristicRef().on("value",(data) => {
	    	var heuristics = data.val();
	    	//Grab the keys to iterate over the object
	    	var keys = Object.keys(heuristics);
	    	data = []
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      var scores = heuristics[key]

		      var sum = 0
		      var total = 0
		      for(var j = 0; j < scores.length;j++){
		      	sum += j*scores[j]
		      	total += scores[j]
		      }

		      var avg = total === 0 ? 0 : sum/total
			  var sanitized_key = ""
			  for (var word of key.split("_")){
			  	console.log(word)
			  	sanitized_key += word.charAt(0).toUpperCase() + word.slice(1)+ " ";
			  }
		      data.push({"heuristic":sanitized_key.trim(),"average":avg})
		    }

		    this.setState({
		  				heuristc_meta_data: data
		  			})
	    })
  	}


  	AsyncSet(heuristic){
  		getHeuristicRef().child(heuristic).on("value", (data) => {
  			var rawData = data.val();
  			//var keys = Object.keys(rawData);
  			data = []
    		for (var i = 0; i <= 10; i++) {
		      // Look at each fruit object!
		      var value = rawData[i];
		      data.push({value:i,total:value===undefined ? 0:value})
		 	}
		 	if(heuristic === "free_afternoon")
	  			this.setState({
	  				free_afternoon_data: data
	  			})
	  		else if(heuristic === "long_lunch")
	  			this.setState({
	  				long_lunch_data: data
	  			})
	  		else if(heuristic === "free_mornings")
	  			this.setState({
	  				free_mornings_data: data
	  			})
	  		else if(heuristic === "contiguous_events")
	  			this.setState({
	  				contiguous_events_data: data
	  			})
	  		else if(heuristic === "free_days")
	  			this.setState({
	  				free_days_data: data
	  			})
	  		else if(heuristic === "free_friday_mornings")
	  			this.setState({
	  				free_friday_mornings_data: data
	  			})
	  		else if(heuristic === "long_weekend")
	  			this.setState({
	  				long_weekend_data: data
	  			})
  		})

  		console.log(this.state.free_afternoon_data)
  		//console.log(this.state.long_lunch_data)
  		//console.log(this.state.free_mornings_data)
  	}

  	render() {
	    return (
	    	 <Grid>
                <Row>
                    <Col xs={6}>
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
                    </Col>
                
			    	<Col xs={6}>
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
				   	</Col>
		      	</Row>

		      	<Row>
		      		<Col xs={6}>
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
				    </Col>
				    <Col xs={6}>
				      	<div>
					    	<h3 >Contiguous Events Values</h3>
					      	<BarChart width={600} height={300} data={this.state.contiguous_events_data}
					            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
						       <XAxis dataKey="value"/>
						       <YAxis/>
						       <CartesianGrid strokeDasharray="3 3"/>
						       <Tooltip/>
						       <Legend />
						       <Bar dataKey="total" fill="#82ca9d"/>
					      	</BarChart>
				      	</div>
				    </Col>
		      	</Row>

		      	<Row>
		      		<Col xs={6}>
				      	<div>
					    	<h3>Free Days Values</h3>
					      	<BarChart width={600} height={300} data={this.state.free_days_data}
					            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
						       <XAxis dataKey="value"/>
						       <YAxis/>
						       <CartesianGrid strokeDasharray="3 3"/>
						       <Tooltip/>
						       <Legend />
						       <Bar dataKey="total" fill="#82ca9d"/>
					      	</BarChart>
				      	</div>
			      	</Col>
			      	<Col xs={6}>
				      	<div>
					    	<h3>Free Friday Morning Values</h3>
					      	<BarChart width={600} height={300} data={this.state.free_friday_mornings_data}
					            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
						       <XAxis dataKey="value"/>
						       <YAxis/>
						       <CartesianGrid strokeDasharray="3 3"/>
						       <Tooltip/>
						       <Legend />
						       <Bar dataKey="total" fill="#82ca9d"/>
					      	</BarChart>
				      	</div>
			      	</Col>

			    </Row>

			    <Row>

			    	<Col xs={6}>
				      	<div>
					    	<h3>Long Weekend Values</h3>
					      	<BarChart width={600} height={300} data={this.state.long_weekend_data}
					            margin={{top: 30, right: 30, left: 20, bottom: 5}}>
						       <XAxis dataKey="value"/>
						       <YAxis/>
						       <CartesianGrid strokeDasharray="3 3"/>
						       <Tooltip/>
						       <Legend />
						       <Bar dataKey="total" fill="#82ca9d"/>
					      	</BarChart>
				      	</div>
			      	</Col>

		      		<Col xs={6}>
				      	<div>
					    	<h3>Popular Heuristics</h3>
					      	<RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={this.state.heuristc_meta_data}>
					          <Radar name="average heuristic score" dataKey="average" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
					          <PolarGrid />
					          <Legend/>
					          <PolarAngleAxis dataKey="heuristic" />
					          <PolarRadiusAxis/>
        					</RadarChart>
				      	</div>
			      	</Col>
				</Row>
	      	</Grid>
	    )
  }
}
