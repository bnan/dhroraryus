import {WeekDate, Time, Event, EventOption, EventOptionInstance} from './suppClasses'
import {Schedule} from './schedule'

// Return event
export function createEvent(eventName)
{
  return new Event(eventName);
}

// Returns eventOption
export function createEventOption(event, optionId)
{
  return new EventOption(event, optionId);
}

export function addOptionInstance(eventOption, sDay, sHour, sMin, eDay, eHour, eMin)
{
  let instance = new EventOptionInstance(new WeekDate(sDay, new Time(sHour, sMin)), new WeekDate(eDay, new Time(eHour, eMin)))
  eventOption.instances.push(instance)
  return eventOption;
}


function overlapConstraint(c1, c2)
{
  for (const e1 of c1.instances) {
    for (const e2 of c2.instances) {
      if ((WeekDate.compare(e1.start, e2.end) < 0) && (WeekDate.compare(e2.start, e1.end) < 0)) {
        return true
      }
    }
  }
}

// Returns domain of eventOptions
export function makeDomain(eventOptions, domain)
{
  if ( typeof domain == 'undefined' )
    domain = new Map();

  let value = NaN;
  for ( var c in eventOptions ){
    if ( !domain.has(eventOptions[c].event.name)) {
      domain.set(eventOptions[c].event.name, [eventOptions[c],]);
    }
    else {
      value = domain.get(eventOptions[c].event.name);
      value.push(eventOptions[c]);
      domain.set(eventOptions[c].event.name, value);
    }
  }
  return domain
}

// Returns dictionaries with the solutions
export function search(domain)
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
        if (!overlapConstraint(value, c))
          tmp.push(c)
      }
      newDomain.set(key2, tmp)
    }

    const s = search(newDomain)

    if (s != null) {
      solutions = solutions.concat(s)
    }
  }
  return solutions
}

export function test(){
  const ARAT = new Event('ARA-T');
  const ARAP = new Event('ARA-P');
  const ACAT = new Event('ACA-T');
  const ACAP = new Event('ACA-P');
  const EDCT = new Event('EDC-T');
  const EDCP = new Event('EDC-P');
  const SEGT = new Event('SEG-T');
  const SEGP = new Event('SEG-P');
  const CVT = new Event('CV-T');
  const CVP = new Event('CV-P');

  const ARAT1 = new EventOption(ARAT, 1,[ new EventOptionInstance( new WeekDate(3, new Time(13,0)) , new WeekDate(3,new Time(15,0))), ]);
  const ARAP1 = new EventOption(ARAP, 1,[ new EventOptionInstance( new WeekDate(2,new Time(15,0)) , new WeekDate(2,new Time(17,0))), ]);
  const ARAP2 = new EventOption(ARAP, 2,[ new EventOptionInstance( new WeekDate(5,new Time(11,0)) , new WeekDate(5,new Time(13,0))), ]);
  const ARAP3 = new EventOption(ARAP, 3,[ new EventOptionInstance( new WeekDate(2,new Time(17,0)) , new WeekDate(2,new Time(19,0))), ]);
  const ARAP4 = new EventOption(ARAP, 4,[ new EventOptionInstance( new WeekDate(5, new Time(9,0)) , new WeekDate(5,new Time(11,0))), ]);

  const ACAP1 = new EventOption(ACAP, 1,[ new EventOptionInstance( new WeekDate(2,new Time(11,0)) , new WeekDate(2,new Time(13,0))), ]);
  const ACAP2 = new EventOption(ACAP, 2,[ new EventOptionInstance( new WeekDate(6,new Time(14,0)) , new WeekDate(6,new Time(16,0))), ]);
  const ACAP3 = new EventOption(ACAP, 3,[ new EventOptionInstance( new WeekDate(2, new Time(9,0)) , new WeekDate(2,new Time(11,0))), ]);
  const ACAP4 = new EventOption(ACAP, 4,[ new EventOptionInstance( new WeekDate(2,new Time(14,0)) , new WeekDate(2,new Time(16,0))), ]);
  const ACAT1 = new EventOption(ACAT, 1,[ new EventOptionInstance( new WeekDate(4,new Time(10,0)) , new WeekDate(4,new Time(12,0))), ]);

  const CVP1 = new EventOption(CVP, 1,[ new EventOptionInstance( new WeekDate(2,new Time(15,0)), new WeekDate(2,new Time(17,0))), ]);
  const CVP2 = new EventOption(CVP, 2,[ new EventOptionInstance( new WeekDate(2,new Time(13,0)), new WeekDate(2,new Time(15,0))), ]);
  const CVP3 = new EventOption(CVP, 3,[ new EventOptionInstance( new WeekDate(5,new Time(11,0)), new WeekDate(5,new Time(13,0))), ]);
  const CVT1 = new EventOption(CVT, 1,[ new EventOptionInstance( new WeekDate(3,new Time(15,0)), new WeekDate(3,new Time(17,0))), ]);

  const EDCP1 = new EventOption(EDCP , 1,[ new EventOptionInstance( new WeekDate(6, new Time(9, 0)), new WeekDate(6,new Time(11, 0))), ]);
  const EDCP2 = new EventOption(EDCP , 2,[ new EventOptionInstance( new WeekDate(5,new Time(16,30)), new WeekDate(5,new Time(18,30))), ]);
  const EDCP3 = new EventOption(EDCP , 3,[ new EventOptionInstance( new WeekDate(6,new Time(11, 0)), new WeekDate(6,new Time(13, 0))), ]);
  const EDCT1 = new EventOption(EDCT , 1,[ new EventOptionInstance( new WeekDate(5,new Time(14,30)), new WeekDate(5,new Time(16,30))), ]);

  const SEGP1 = new EventOption(SEGP , 1,[ new EventOptionInstance( new WeekDate(5, new Time(9,0)), new WeekDate(5,new Time(11,0))), ]);
  const SEGP2 = new EventOption(SEGP , 2,[ new EventOptionInstance( new WeekDate(6, new Time(11,0)), new WeekDate(6,new Time(13,0))), ]);
  const SEGP3 = new EventOption(SEGP , 3,[ new EventOptionInstance( new WeekDate(6, new Time(9,0)), new WeekDate(6,new Time(11,0))), ]);
  const SEGP4 = new EventOption(SEGP , 4,[ new EventOptionInstance( new WeekDate(6,new Time(14,0)), new WeekDate(6,new Time(16,0))), ]);
  let SEGT1 = new EventOption(SEGT , 1,[ new EventOptionInstance( new WeekDate(4,new Time(13,0)), new WeekDate(4,new Time(15,0))), ]);

  SEGT1 = addOptionInstance(SEGT1,6,18,0,6,19,0);

  let cl = [
    ARAT1, ARAP1, ARAP2, ARAP3, ARAP4,
    ACAT1, ACAP1, ACAP2, ACAP3, ACAP4,
    CVT1, CVP1, CVP2, CVP3,
    EDCT1, EDCP1, EDCP2, EDCP3,
    SEGT1, SEGP1, SEGP2, SEGP3, SEGP4
  ]

  let domain = makeDomain(cl)
  let sol = search(domain)

  let schedule = new Schedule(sol[0]);

  let mySol = []
  for (var solution of sol)
      mySol.push(new Schedule(solution));

  console.log(mySol)
}

