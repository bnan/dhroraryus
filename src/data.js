import { Time, WeekDate, Event, EventOption, TimeInterval } from './suppClasses'

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

const ARAT1 = new EventOption(ARAT, 1,[ new TimeInterval( new WeekDate(3, new Time(13,0)) , new WeekDate(3,new Time(15,0))), ]);
const ARAP1 = new EventOption(ARAP, 1,[ new TimeInterval( new WeekDate(2,new Time(15,0)) , new WeekDate(2,new Time(17,0))), ]);
const ARAP2 = new EventOption(ARAP, 2,[ new TimeInterval( new WeekDate(5,new Time(11,0)) , new WeekDate(5,new Time(13,0))), ]);
const ARAP3 = new EventOption(ARAP, 3,[ new TimeInterval( new WeekDate(2,new Time(17,0)) , new WeekDate(2,new Time(19,0))), ]);
const ARAP4 = new EventOption(ARAP, 4,[ new TimeInterval( new WeekDate(5, new Time(9,0)) , new WeekDate(5,new Time(11,0))), ]);

const ACAP1 = new EventOption(ACAP, 1,[ new TimeInterval( new WeekDate(2,new Time(11,0)) , new WeekDate(2,new Time(13,0))), ]);
const ACAP2 = new EventOption(ACAP, 2,[ new TimeInterval( new WeekDate(6,new Time(14,0)) , new WeekDate(6,new Time(16,0))), ]);
const ACAP3 = new EventOption(ACAP, 3,[ new TimeInterval( new WeekDate(2, new Time(9,0)) , new WeekDate(2,new Time(11,0))), ]);
const ACAP4 = new EventOption(ACAP, 4,[ new TimeInterval( new WeekDate(2,new Time(14,0)) , new WeekDate(2,new Time(16,0))), ]);
const ACAT1 = new EventOption(ACAT, 1,[ new TimeInterval( new WeekDate(4,new Time(10,0)) , new WeekDate(4,new Time(12,0))), ]);

const CVP1 = new EventOption(CVP, 1,[ new TimeInterval( new WeekDate(2,new Time(15,0)), new WeekDate(2,new Time(17,0))), ]);
const CVP2 = new EventOption(CVP, 2,[ new TimeInterval( new WeekDate(2,new Time(13,0)), new WeekDate(2,new Time(15,0))), ]);
const CVP3 = new EventOption(CVP, 3,[ new TimeInterval( new WeekDate(5,new Time(11,0)), new WeekDate(5,new Time(13,0))), ]);
const CVT1 = new EventOption(CVT, 1,[ new TimeInterval( new WeekDate(3,new Time(15,0)), new WeekDate(3,new Time(17,0))), ]);

const EDCP1 = new EventOption(EDCP , 1,[ new TimeInterval( new WeekDate(6, new Time(9, 0)), new WeekDate(6,new Time(11, 0))), ]);
const EDCP2 = new EventOption(EDCP , 2,[ new TimeInterval( new WeekDate(5,new Time(16,30)), new WeekDate(5,new Time(18,30))), ]);
const EDCP3 = new EventOption(EDCP , 3,[ new TimeInterval( new WeekDate(6,new Time(11, 0)), new WeekDate(6,new Time(13, 0))), ]);
const EDCT1 = new EventOption(EDCT , 1,[ new TimeInterval( new WeekDate(5,new Time(14,30)), new WeekDate(5,new Time(16,30))), ]);

const SEGP1 = new EventOption(SEGP , 1,[ new TimeInterval( new WeekDate(5, new Time(9,0)), new WeekDate(5,new Time(11,0))), ]);
const SEGP2 = new EventOption(SEGP , 2,[ new TimeInterval( new WeekDate(6, new Time(11,0)), new WeekDate(6,new Time(13,0))), ]);
const SEGP3 = new EventOption(SEGP , 3,[ new TimeInterval( new WeekDate(6, new Time(9,0)), new WeekDate(6,new Time(11,0))), ]);
const SEGP4 = new EventOption(SEGP , 4,[ new TimeInterval( new WeekDate(6,new Time(14,0)), new WeekDate(6,new Time(16,0))), ]);
const SEGT1 = new EventOption(SEGT , 1,[ new TimeInterval( new WeekDate(4,new Time(13,0)), new WeekDate(4,new Time(15,0))), ]);

export const ect = [ARAT1, ARAP1, ARAP2, ARAP3, ARAP4, ACAP1, ACAP2, ACAP3, ACAP4, ACAT1, CVP1, CVP2, CVP3, CVT1, EDCP1, EDCP2, EDCP3, EDCT1, SEGP1, SEGP2, SEGP3, SEGP4, SEGT1]
