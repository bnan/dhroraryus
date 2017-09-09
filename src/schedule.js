import {WeekDate} from './suppClasses'

export class Schedule{
	/*
		solution =	{	event1 	: [eventOption choosen],
				  		event2	: [eventOption choosen],
				  		...
		 		  	}

		schedule =	{ 
						'Monday' : [eventOption1, eventOption2],
						...
					}
	*/
    constructor(solution) {
    	this.schedule = this.processWorkdays(solution);
    	this.events  = this.getEvents(solution);
    }
 
    parse(solution){
    	let shedule = [];
    	for (var event of solution.keys())
    		shedule.push(solution.get(event[0]));
	}
	/*
		returns  { 
					'Monday' : [EventOption1, EventOption2],
					...
				}

	*/
    processWorkdays(solution){
    	let temp_workdays = new Map();
    	const week_days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    	for (var week_day of week_days)
    		temp_workdays.set(week_day, []);
    	for (var event of solution.keys())
    		for (var instance of solution.get(event)[0].instances)
    			temp_workdays.get(week_days[instance.start.day]).push(solution.get(event)[0]);

    	let workdays = new Map();
    	for (var day of temp_workdays.keys())
    		workdays.set(day, new Workday(temp_workdays.get(day)));
    	return workdays;
    }
    /*
		return {
					'title' : event name,
					'start' : start week date,
					'end' 	: end week date

			   }
    */
    getEvents(solution){
    	let events = []
    	var event;
    	for (var eventOption of solution.keys()){
    		event = new Map();
    		event.set('title', 	solution.get(eventOption)[0].event.name);
    		event.set('start', 	solution.get(eventOption)[0].instances[0].start);
    		event.set('end', 	solution.get(eventOption)[0].instances[0].end);
    		events.push(event);
    	}
    	return events;

    }
}

// todo: how to handle with events that starts in one day but ends in another
export class Workday{
	constructor(events){
		this.events 			= events;
		//this.daily_workload 	= this.daily_workload();
		//this.begin_morning		= ;  
		//this.end_morning		= ;
		//this.begin_afternoon 	= ;
		//this.end_afternoon		= ;

	}
	daily_workload(){
		let workload = 0;
		for (var event of this.events)
			workload += WeekDate.interval(event.start, event.end);
		return workload;
	}


}
