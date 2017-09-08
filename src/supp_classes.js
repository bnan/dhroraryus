
export class Date{
    constructor(day, hour, min){
        this.day = day
        this.hour = hour;
        this.min = min;
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
    constructor(day, start, end){
        this.day = day;
        this.start = start;
        this.end = start;
    }
}
