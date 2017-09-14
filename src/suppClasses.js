// Bunch of Supp Classes
 
/*
    Saturday    : 0
    Sunday      : 1
    Monday      : 2
    TUesday     : 3
    Wednesday   : 4
    Thursady    : 5
    Friday      : 6
*/
export class WeekDate{
    constructor(day, time){
        this.day = day;
        this.time = time; 
    }

    toString(){
        const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday']
        return ("[" + weekdays[this.day] + "] " + this.time.hour + ":" + this.time.min);
    }
    /*
        if a < b    : return -1
        if a == b   : return 0
        if a > b    : return 1

        TODO: fix this for different days
    */
    static compare(a, b){
        if (a.day === 6 && b.day === 0)
            return -1;
        if (a.day === 0 && b.day === 6)
            return 1;
        if (a.day<b.day)
            return -1;
        if (a.day>b.day)
            return 1;
        return Time.compare(a.time,b.time);
    }

}

export class Time{
    constructor(hour, min){
        this.hour = hour;
        this.min  = min;
    }
    toString(){
        return (this.hour + ":" + this.min)
    }
    static interval(start,end){
        const start_mins  = start.hour * 60 + start.min;
        const end_mins    = end.hour * 60 + end.min;
        let duration      = end_mins - start_mins;
        if (duration < 0)
            duration = duration + 1440;
        return duration;
    }
    static compare(a,b){
        if (a.hour<b.hour)
            return -1;
        if (a.hour>b.hour)
            return 1;
        if (a.min<b.min)
            return -1;
        if (a.min>b.min)
            return 1;
        return 0;
    }

    static intersectionTime(intervalA, intervalB){
       // console.log("Interval A: ", intervalA)
       // console.log("Interval B: ", intervalB)
        if ((Time.compare(intervalA[0],intervalB[1]) < 0) && (Time.compare(intervalB[0], intervalA[1]) <0))
            return Time.interval(intervalB[0], intervalA[1])
        if ((Time.compare(intervalB[0], intervalA[1])<0) && (Time.compare(intervalA[0], intervalB[1]) < 0))
            return Time.interval(intervalA[0], intervalB[1])
        return 0
    }


}

export class TimeInterval{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
}


export class Event{
    constructor(name, isConstraint = false) {
        this.name = name;
        this.isConstraint = isConstraint
    }
}

export class EventOption{
    constructor(event, option, instances = []) {
        this.event = event;
        this.option = option;
        this.instances = instances;
    }
}

