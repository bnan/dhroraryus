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
  if ( typeof domain === 'undefined' )
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
  if (Array.from(domain.values()).some(v => v.length === 0)) {
    return null
  }

  // Return solution if one was found
  if (Array.from(domain.values()).every(v => v.length === 1)) {
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
    for (const key2 of keys.filter(k => k !== key)) {
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

  let mySol = []
  for (var solution of sol)
      mySol.push(new Schedule(solution));

  console.log(mySol)

  /*
  const ART = new Event('ARA-T');
  const ARP = new Event('ARA-P');
  const ACT = new Event('ACA-T');
  const ACP = new Event('ACA-P');
  const EDT = new Event('EDC-T');
  const EDP = new Event('EDC-P');
  const SET = new Event('SEG-T');
  const SEP = new Event('SEG-P');
  const CT = new Event('CV-T');
  const CP = new Event('CV-P');

  const ART1 = new EventOption(ART, 1,[ new EventOptionInstance( new WeekDate(3, new Time(14,0)) , new WeekDate(3,new Time(15,0))), ]);
  const ARP1 = new EventOption(ARP, 1,[ new EventOptionInstance( new WeekDate(2,new Time(11,0)) , new WeekDate(2,new Time(13,0))), ]);
  const ARP2 = new EventOption(ARP, 2,[ new EventOptionInstance( new WeekDate(5,new Time(14,0)) , new WeekDate(5,new Time(19,0))), ]);
  const ARP3 = new EventOption(ARP, 3,[ new EventOptionInstance( new WeekDate(2,new Time(11,0)) , new WeekDate(2,new Time(13,0))), ]);
  const ARP4 = new EventOption(ARP, 4,[ new EventOptionInstance( new WeekDate(5, new Time(10,0)) , new WeekDate(5,new Time(11,0))), ]);

  const ACP1 = new EventOption(ACP, 1,[ new EventOptionInstance( new WeekDate(2,new Time(12,0)) , new WeekDate(2,new Time(13,0))), ]);
  const ACP2 = new EventOption(ACP, 2,[ new EventOptionInstance( new WeekDate(6,new Time(15,0)) , new WeekDate(6,new Time(17,0))), ]);
  const ACP3 = new EventOption(ACP, 3,[ new EventOptionInstance( new WeekDate(2, new Time(10,0)) , new WeekDate(2,new Time(13,0))), ]);
  const ACP4 = new EventOption(ACP, 4,[ new EventOptionInstance( new WeekDate(2,new Time(15,0)) , new WeekDate(2,new Time(17,0))), ]);
  const ACT1 = new EventOption(ACT, 1,[ new EventOptionInstance( new WeekDate(4,new Time(8,0)) , new WeekDate(4,new Time(10,0))), ]);

  const CP1 = new EventOption(CP, 1,[ new EventOptionInstance( new WeekDate(2,new Time(13,0)), new WeekDate(2,new Time(16,0))), ]);
  const CP2 = new EventOption(CP, 2,[ new EventOptionInstance( new WeekDate(2,new Time(13,0)), new WeekDate(2,new Time(14,0))), ]);
  const CP3 = new EventOption(CP, 3,[ new EventOptionInstance( new WeekDate(5,new Time(15,0)), new WeekDate(5,new Time(18,0))), ]);
  const CT1 = new EventOption(CT, 1,[ new EventOptionInstance( new WeekDate(3,new Time(18,0)), new WeekDate(3,new Time(20,0))), ]);

  const EDP1 = new EventOption(EDP , 1,[ new EventOptionInstance( new WeekDate(6, new Time(10, 0)), new WeekDate(6,new Time(12, 0))), ]);
  const EDP2 = new EventOption(EDP , 2,[ new EventOptionInstance( new WeekDate(5,new Time(16,30)), new WeekDate(5,new Time(20,30))), ]);
  const EDP3 = new EventOption(EDP , 3,[ new EventOptionInstance( new WeekDate(6,new Time(14, 0)), new WeekDate(6,new Time(16, 0))), ]);
  const EDT1 = new EventOption(EDT , 1,[ new EventOptionInstance( new WeekDate(5,new Time(13,30)), new WeekDate(5,new Time(15,30))), ]);

  const SEP1 = new EventOption(SEP , 1,[ new EventOptionInstance( new WeekDate(5, new Time(10,0)), new WeekDate(5,new Time(12,0))), ]);
  const SEP2 = new EventOption(SEP , 2,[ new EventOptionInstance( new WeekDate(6, new Time(13,0)), new WeekDate(6,new Time(15,0))), ]);
  const SEP3 = new EventOption(SEP , 3,[ new EventOptionInstance( new WeekDate(6, new Time(15,0)), new WeekDate(6,new Time(17,0))), ]);
  const SEP4 = new EventOption(SEP , 4,[ new EventOptionInstance( new WeekDate(6,new Time(18,0)), new WeekDate(6,new Time(20,0))), ]);
  let SET1 = new EventOption(SET , 1,[ new EventOptionInstance( new WeekDate(4,new Time(17,0)), new WeekDate(4,new Time(19,0))), ]);

  let cl2 = [
    ART1, ARP1, ARP2, ARP3, ARP4,
    ACT1, ACP1, ACP2, ACP3, ACP4,
    CT1, CP1, CP2, CP3,
    EDT1, EDP1, EDP2, EDP3,
    SET1, SEP1, SEP2, SEP3, SEP4
  ]
  let domain2 = makeDomain(cl2)
  let sol2 = search(domain)

  let mySol2 = []
  for( var solution of sol2)
    mySol2.push(new Schedule(solution))

  console.log(mySol2)
  

  let schedule1;
  let schedule2;
  let freeTimeIntersection = 0;
  for (const sched1 of mySol){
    for (const sched2 of mySol2){
      if (Schedule.freeTimeIntersection(sched1, sched2) > freeTimeIntersection){
        freeTimeIntersection = Schedule.freeTimeIntersection(sched1, sched2);
        schedule1 = sched1;
        schedule2 = sched2;
      }
    }
  }
*/





}

