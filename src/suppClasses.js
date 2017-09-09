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
    constructor(day, hour, min){
        this.day    = day;
        this.hour   = hour;
        this.min    = min;
    }

    toString(){
        return ("date: " + this.day + "-- " + this.hour + ":" + this.min);
    }

    static interval(start,end){
        const start_mins  = start.hour * 60 + start.min;
        const end_mins    = end.hour * 60 + end.min;
        let duration      = end_mins - start_mins;
        if (duration < 0)
            duration = duration + 1440;
        return duration;
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

}

export class Event{
    constructor(name) {
        this.name = name;
    }
}

export class EventOption{
    constructor(event, option, instances) {
        this.event = event;
        this.option = option;
        this.instances = instances;
    }
}

export class EventOptionInstance{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
}
