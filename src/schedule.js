import {Time} from './suppClasses'

export class Schedule{
    constructor(solution) {
    	this.schedule = this.processWorkdays(solution);
    	this.events  = this.getEvents(solution);
    	this.prefContinuous = NaN;
    	this.prefFreeAfternoons = NaN;
    	this.prefFreeMornings = NaN;
    	this.prefLongLunch = NaN;
    	this.prefFreeDays = NaN;
    	this.prefLongWeekend = NaN;
    	this.prefFridayMorning = false;

        this.parseSchedule()
    }

    parseSchedule(){
        let prefCont = 0
        let prefFreeAfternoons = 0
        let prefFreeMornings = 0
        let prefLongLunch = 0
        let prefFreeDays = 0

        for ( var w of this.schedule.keys()){
        	if (w === 'Saturday' || w === 'Sunday')
        		continue;

            let workday = this.schedule.get(w)
            prefCont += prefContinuous(workday)
            prefFreeAfternoons += prefFreeAfternoon(workday)
            prefFreeMornings += prefFreeMorning(workday)
            prefLongLunch += prefLongLunchtimes(workday)
            if (this.schedule.get(w).free_day)
            	prefFreeDays += 1

        }
        this.prefContinuous = prefCont/5
        this.prefFreeAfternoons = prefFreeAfternoons/5
        this.prefFreeMornings = prefFreeMornings/5
        this.prefLongLunch = prefLongLunch/5
        this.prefFreeDays = prefFreeDays/5
        this.prefFridayMorning = prefFreeMorning(this.schedule.get('Friday'))
        this.prefLongWeekend = prefLongWeekend(this.schedule)


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
		    		title: event.event.name + event.option,
		    		start: new Date(2018, 8, 1 + parseInt(instance.start.day), instance.start.time.hour, instance.start.time.min, 0, 0),
		    		end: new Date(2018, 8, 1 + parseInt(instance.end.day), instance.end.time.hour, instance.end.time.min, 0, 0)
		    	})
			}
    	}
    	return events;
    }
}


export function scheduleEvaluation(s,weightContinuous = 0, weightFreeAfternoons = 0, weightFreeMornings = 0, weightLongLunch = 0, weightFreeDays = 1, weightFridayMorning = 0){
    	return weightContinuous * s.prefContinuous + weightFreeAfternoons * s.prefFreeAfternoons + weightFreeMornings * s.prefFreeMornings 
    	       + weightLongLunch * s.prefLongLunch + weightFreeDays * s.prefFreeDays + weightFridayMorning * s.prefFridayMorning;

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
        this.free_intervals = this.getFreeIntervals();
	}


    parseWorkDay(){
      let noon = new Time(12,0)

      let bM = new Time(12,0)
      let eM = new Time(0,0)
      let bA = new Time(24,0)
      let eA = new Time(12,0)
      for ( var event of this.events){
        this.free_day = false
        this.workload += Time.interval(event.start.time, event.end.time);
        if ( Time.compare(event.start.time,noon) < 0){
          // Morning
          if ( Time.compare(event.start.time, bM) < 0)
            bM = event.start.time
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

    getFreeIntervals(){
    	const free_times = [];
    	const events_sorted = this.events.sort(function(a,b){
    		return a.start.time.hour - b.start.time.hour;
    	})
    	if (events_sorted.length > 0){
    		free_times.push([new Time(0,0), events_sorted[0].start.time]);
    		let prev_end = events_sorted[0].end.time;
    		let i = 1;
    		while (i<events_sorted.length){
    			console.log("ENTERED HERE!")
    			if (Time.compare(prev_end, events_sorted[i].start.time) != 0)
    				free_times.push([prev_end, events_sorted[i].start.time]);
    			prev_end = events_sorted[i].end.time;
    			i += 1;
    		}
    		free_times.push([prev_end, new Time(24,0)]);
    		return free_times;
    	} else {
    		free_times.push([new Time(0,0),new Time(24,0)]);
    		return free_times;
    	}
    }

}

function prefFreeAfternoon(workday){
	if (workday.end_afternoon instanceof Time)
      return Time.interval(workday.end_afternoon, new Time(20,0)) / (8*60); // eight hours for the afternoon := 20-12 
  	return 1;
}

function prefFreeMorning(workday){
	if(workday.begin_morning instanceof Time)
		return Time.interval(new Time(7, 0), workday.begin_morning) / (5*60); // five hours for the morning := 12-7 ")
	return 1;
}

function prefContinuous(workday){
    let diff = 0;
    if ( !(workday.begin_morning instanceof Time) && !(workday.begin_afternoon instanceof Time)){
      return 0
    }

    if (!(workday.begin_morning instanceof Time)){
      diff = Time.interval(workday.begin_afternoon, workday.end_afternoon)
      return (workday.workload/diff)
    }

    if (!(workday.end_afternoon instanceof Time)){
      diff = Time.interval(workday.begin_morning, workday.end_morning)
      return (workday.workload/diff)
    }

    diff = Time.interval(workday.begin_morning, workday.end_afternoon)
    return (workday.workload/diff)
}

function prefLongLunchtimes(workday){
	let r = 0.5
    if (workday.lunch_time)
    	if  (Time.interval(workday.end_morning, workday.begin_afternoon) > 60)
 			r = 1
 		else 
 			r = 0
  	if (!(workday.begin_morning instanceof Time) || !(workday.begin_afternoon))
  		r = 1
    return r
}

function prefLongWeekend(schedule){
	const week_days = Array.from(schedule.keys())

	let forward_time = 0
	let i = 2
	while(schedule.get(week_days[i]).free_day){
		forward_time += 24*60;
		i += 1;
	}
	const next_filled_day = schedule.get(week_days[i])
	if ( next_filled_day.begin_morning instanceof Time)
		forward_time += Time.interval(new Time(0,0), next_filled_day.begin_morning)
	else
		forward_time += Time.interval(new Time(0,0), next_filled_day.begin_afternoon)

	let backward_time = 0
	i = 6
	while(schedule.get(week_days[i]).free_day){
		backward_time += 24*60;
		i -= 1;
	}

	const previous_filled_day = schedule.get(week_days[i])
	if ( previous_filled_day.end_afternoon instanceof Time){
		backward_time += Time.interval(previous_filled_day.end_afternoon, new Time(24, 0))
	}else
		backward_time += Time.interval(previous_filled_day.end_morning, new Time(24, 0))

	return (forward_time + backward_time)/(24*60*5)
	
}
