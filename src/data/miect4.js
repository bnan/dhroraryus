import { Time, WeekDate, Event, EventOption, TimeInterval } from '../suppClasses'

const EST = new Event('ES-T')
const ESP = new Event('ES-P')
const DDRT = new Event('DDR-T')
const DDRP = new Event('DDR-P')
const CRT = new Event('CR-T')
const CRP = new Event('CR-P')
const SDT = new Event('SD-T')
const SDP = new Event('SD-P')

const EST1 = new EventOption(EST, 1, [new TimeInterval(new WeekDate(2, new Time(9, 0)), new WeekDate(2, new Time(11, 0)))])
const ESP1 = new EventOption(ESP, 1, [new TimeInterval(new WeekDate(4, new Time(13, 0)), new WeekDate(4, new Time(15, 0)))])
const ESP2 = new EventOption(ESP, 2, [new TimeInterval(new WeekDate(4, new Time(11, 0)), new WeekDate(4, new Time(13, 0)))])
const ESP3 = new EventOption(ESP, 3, [new TimeInterval(new WeekDate(2, new Time(11, 0)), new WeekDate(2, new Time(13, 0)))])
const ESP4 = new EventOption(ESP, 4, [new TimeInterval(new WeekDate(2, new Time(14, 0)), new WeekDate(2, new Time(16, 0)))])

const DDRT1 = new EventOption(DDRT, 1, [new TimeInterval(new WeekDate(4, new Time(9, 0)), new WeekDate(4, new Time(11, 0)))])
const DDRP1 = new EventOption(DDRP, 1, [new TimeInterval(new WeekDate(5, new Time(11, 0)), new WeekDate(5, new Time(13, 0)))])
const DDRP2 = new EventOption(DDRP, 2, [new TimeInterval(new WeekDate(2, new Time(11, 0)), new WeekDate(2, new Time(13, 0)))])
const DDRP3 = new EventOption(DDRP, 3, [new TimeInterval(new WeekDate(5, new Time(15, 0)), new WeekDate(5, new Time(17, 0)))])
const DDRP4 = new EventOption(DDRP, 4, [new TimeInterval(new WeekDate(4, new Time(11, 0)), new WeekDate(4, new Time(13, 0)))])

const CRT1 = new EventOption(CRT, 1, [new TimeInterval(new WeekDate(3, new Time(13, 0)), new WeekDate(3, new Time(15, 0)))])
const CRP1 = new EventOption(CRP, 1, [new TimeInterval(new WeekDate(5, new Time(9, 0)), new WeekDate(5, new Time(11, 0)))])
const CRP2 = new EventOption(CRP, 2, [new TimeInterval(new WeekDate(5, new Time(11, 0)), new WeekDate(5, new Time(13, 0)))])
const CRP3 = new EventOption(CRP, 3, [new TimeInterval(new WeekDate(5, new Time(13, 0)), new WeekDate(5, new Time(15, 0)))])

const SDT1 = new EventOption(SDT, 1, [new TimeInterval(new WeekDate(3, new Time(16, 0)), new WeekDate(3, new Time(18, 0)))])
const SDP1 = new EventOption(SDP, 1, [new TimeInterval(new WeekDate(5, new Time(15, 0)), new WeekDate(5, new Time(17, 0)))])
const SDP2 = new EventOption(SDP, 2, [new TimeInterval(new WeekDate(6, new Time(9, 30)), new WeekDate(6, new Time(11, 30)))])
const SDP3 = new EventOption(SDP, 3, [new TimeInterval(new WeekDate(5, new Time(13, 0)), new WeekDate(5, new Time(15, 0)))])
const SDP4 = new EventOption(SDP, 4, [new TimeInterval(new WeekDate(5, new Time(9, 0)), new WeekDate(5, new Time(11, 0)))])

export const miect4 = [EST1, ESP1, ESP2, ESP3, ESP4, DDRT1, DDRP1, DDRP2, DDRP3, DDRP4, CRT1, CRP1, CRP2, CRP3, SDT1, SDP1, SDP2, SDP3, SDP4]

