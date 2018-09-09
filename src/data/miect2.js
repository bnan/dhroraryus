import { Time, WeekDate, Event, EventOption, TimeInterval } from '../suppClasses'

const ACT = new Event('AC-T')
const ACP = new Event('AC-P')
const MPEIT = new Event('MPEI-T')
const MPEIP = new Event('MPEI-P')
const MCETP = new Event('MCE-T')
const MCEPL = new Event('MCE-PL')
const MCEPN = new Event('MCE-PN')
const P3T = new Event('P3-T')
const P3P = new Event('P3-P')

const ACTP3   = new EventOption(ACT, 3,  [new TimeInterval(new WeekDate(2, new Time(17, 30)), new WeekDate(2, new Time(19, 0))),
                                          new TimeInterval(new WeekDate(4, new Time(13, 30)), new WeekDate(4, new Time(15, 0)))])

const ACTP4   = new EventOption(ACT, 4,  [new TimeInterval(new WeekDate(2, new Time(14, 30)), new WeekDate(2, new Time(16, 0))),
                                          new TimeInterval(new WeekDate(3, new Time(14, 30)), new WeekDate(3, new Time(16, 0)))])

const ACP5a = new EventOption(ACP, 51,   [new TimeInterval(new WeekDate(2, new Time(9, 0)), new WeekDate(2, new Time(11, 0)))])
const ACP5c = new EventOption(ACP, 53,   [new TimeInterval(new WeekDate(2, new Time(14, 0)), new WeekDate(2, new Time(16, 0)))])
const ACP4a = new EventOption(ACP, 41,   [new TimeInterval(new WeekDate(3, new Time(9, 0)), new WeekDate(3, new Time(11, 0)))])
const ACP3c = new EventOption(ACP, 33,   [new TimeInterval(new WeekDate(3, new Time(11, 0)), new WeekDate(3, new Time(13, 0)))])
const ACP2 = new EventOption(ACP, 2,     [new TimeInterval(new WeekDate(3, new Time(16, 0)), new WeekDate(3, new Time(18, 0)))])
const ACP1 = new EventOption(ACP, 1,     [new TimeInterval(new WeekDate(4, new Time(9, 0)), new WeekDate(4, new Time(11, 0)))])
const ACP6a = new EventOption(ACP, 61,   [new TimeInterval(new WeekDate(4, new Time(9, 0)), new WeekDate(4, new Time(11, 0)))])

const MPEIT1 = new EventOption(MPEIT, 1, [new TimeInterval(new WeekDate(2, new Time(16, 0)), new WeekDate(2, new Time(17, 30))),
                                          new TimeInterval(new WeekDate(3, new Time(16, 0)), new WeekDate(3, new Time(17, 30)))])

const MPEIT2 = new EventOption(MPEIT, 2, [new TimeInterval(new WeekDate(2, new Time(16, 0)), new WeekDate(2, new Time(17, 30))),
                                          new TimeInterval(new WeekDate(5, new Time(11, 0)), new WeekDate(5, new Time(12, 30)))])

const MPEIP6 = new EventOption(MPEIP, 6, [new TimeInterval(new WeekDate(2, new Time(9, 0)), new WeekDate(2, new Time(11, 0)))])
const MPEIP3 = new EventOption(MPEIP, 3, [new TimeInterval(new WeekDate(3, new Time(14, 0)), new WeekDate(3, new Time(16, 0)))])
const MPEIP7 = new EventOption(MPEIP, 7, [new TimeInterval(new WeekDate(5, new Time(9, 0)), new WeekDate(5, new Time(11, 0)))])
const MPEIP5 = new EventOption(MPEIP, 5, [new TimeInterval(new WeekDate(5, new Time(14, 0)), new WeekDate(5, new Time(16, 0)))])

const MCETA = new EventOption(MCETP, 1,  [new TimeInterval(new WeekDate(2, new Time(11, 0)), new WeekDate(2, new Time(12, 30))),
                                          new TimeInterval(new WeekDate(5, new Time(9, 0)), new WeekDate(5, new Time(10, 30)))])

const MCETB = new EventOption(MCETP, 2,  [new TimeInterval(new WeekDate(2, new Time(11, 0)), new WeekDate(2, new Time(12, 30))),
                                          new TimeInterval(new WeekDate(6, new Time(9, 30)), new WeekDate(6, new Time(11, 0)))])

const MCEPL1 = new EventOption(MCEPL, 1, [new TimeInterval(new WeekDate(3, new Time( 9, 0)), new WeekDate(3, new Time(11, 0)))])
const MCEPN1 = new EventOption(MCEPN, 1, [new TimeInterval(new WeekDate(3, new Time( 9, 0)), new WeekDate(3, new Time(11, 0)))])
const MCEPL2 = new EventOption(MCEPL, 2, [new TimeInterval(new WeekDate(3, new Time(11, 0)), new WeekDate(3, new Time(13, 0)))])
const MCEPL4 = new EventOption(MCEPL, 4, [new TimeInterval(new WeekDate(3, new Time(14, 0)), new WeekDate(3, new Time(16, 0)))])
const MCEPL5 = new EventOption(MCEPL, 5, [new TimeInterval(new WeekDate(3, new Time(16, 0)), new WeekDate(3, new Time(18, 0)))])
const MCEPN2 = new EventOption(MCEPN, 2, [new TimeInterval(new WeekDate(6, new Time(11, 0)), new WeekDate(6, new Time(13, 0)))])
const MCEPL3 = new EventOption(MCEPL, 3, [new TimeInterval(new WeekDate(6, new Time(11, 0)), new WeekDate(6, new Time(13, 0)))])

const P3T1 = new EventOption(P3T, 1,     [new TimeInterval(new WeekDate(4, new Time(11, 0)), new WeekDate(4, new Time(12, 30))),
                                          new TimeInterval(new WeekDate(5, new Time(16, 0)), new WeekDate(5, new Time(17, 30)))])

const P3P2 = new EventOption(P3P, 2,     [new TimeInterval(new WeekDate(2, new Time(14, 0)), new WeekDate(2, new Time(16, 0)))])
const P3P3 = new EventOption(P3P, 3,     [new TimeInterval(new WeekDate(3, new Time(11, 0)), new WeekDate(3, new Time(13, 0)))])
const P3P5 = new EventOption(P3P, 5,     [new TimeInterval(new WeekDate(4, new Time( 9, 0)), new WeekDate(4, new Time(11, 0)))])

export const miect2 = [ACTP3,ACTP4,ACP5a,ACP5c,ACP4a,ACP3c,ACP2,ACP1,ACP6a,MPEIT1,MPEIT2,MPEIP6,MPEIP3,MPEIP7,MPEIP5,MCETA,MCETB,MCEPL1,MCEPN1,MCEPL2,MCEPL4,MCEPL5,MCEPN2,MCEPL3,P3T1,P3P2,P3P3,P3P5]


