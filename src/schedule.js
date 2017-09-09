import {Time} from './suppClasses'

export class Schedule{
    constructor(solution) {
    	this.schedule = this.processWorkdays(solution);
    	this.events  = this.getEvents(solution);
    }

    processWorkdays(solution){

    	const temp_workdays = new Map();
    	const week_days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    	for (var week_day of week_days)
    		temp_workdays.set(week_day, []);
    	for (var event of solution.keys())
    		for (var instance of solution.get(event)[0].instances)
    			temp_workdays.get(week_days[instance.start.day]).push(instance);

    	const workdays = new Map();
    	for (var day of temp_workdays.keys())
    		workdays.set(day, new Workday(temp_workdays.get(day)));
    	return workdays;
    }

    getEvents(solution){
    	const eventOptions = Array.from(solution.values()).map(eventOption => eventOption[0])
    	const events = []

    	for (const event of eventOptions){
    		for (const instance of event.instances){
				events.push({
		    		title: event.event.name,
		    		start: instance.start,
		    		end: instance.end
		    	})
			}
    	}
    	return events;
    }
}

// todo: how to handle with events that starts in one day but ends in another
export class Workday{
	constructor(events){
		this.events 			= events;
		this.workload 	= 0;
		this.begin_morning		= NaN;  
		this.end_morning		= NaN;
		this.begin_afternoon 	= NaN;
		this.end_afternoon		= NaN;
        this.free_day = true;
        this.lunch_time = false;
        this.parseWorkDay();
	}


    parseWorkDay(){
      let noon = new Time(12,0)

      let bM = new Time(12,0)
      let eM = new Time(0,0)
      let bA = new Time(24,0)
      let eA = new Time(12,0)
      for ( var event of this.events){
        console.log(event)
        this.free_day = false
        this.workload += Time.interval(event.start.time, event.end.time);
        if ( Time.compare(event.start.time,noon) < 0){
          // Morning
          if ( Time.compare(event.start.time, bM) < 0)
            bM = event.start.time
            console.log(bM)
          if ( Time.compare(event.end.time, eM) > 0)
            eM = event.end.time
        }else{
          // Afternoon
          if ( Time.compare(event.start.time, bA) < 0)
            bA = event.start.time
          if ( Time.compare(event.end.time, eA) > 0)
            eA = event.end.time
        }
      }

      if ( Time.interval(eM,bA) > 0)
        this.lunch_time = true

      if ( Time.compare( bM, new Time(12,0)) != 0 )
        this.begin_morning = bM;
      if ( Time.compare( eM ,new Time(0,0)) != 0)
        this.end_morning = eM;
      if ( Time.compare( bA ,new Time(24,0)) != 0)
        this.begin_afternoon = bA;
      if ( Time.compare( eA ,new Time(12,0)) != 0)
        this.end_afternoon = eA;
    }
}







