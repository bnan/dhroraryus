import { Time, WeekDate, Event, EventOption, EventOptionInstance } from '../src/suppClasses'
import { makeDomain, search } from '../src/cSearch'
import { Schedule , scheduleEvaluation } from '../src/schedule'
import assert from 'assert'





describe('Shedule', function(){

	const ARAT = new Event('ARA-T');
	const ARAP = new Event('ARA-P');
	const ACAT = new Event('ACA-T');
	const ACAP = new Event('ACA-P');
	const SEGT = new Event('SEG-T');
	const SEGP = new Event('SEG-P');
	const CVT = new Event('CV-T');
	const CVP = new Event('CV-P');

	const ARAT1 = new EventOption(ARAT, 1,[ new EventOptionInstance( new WeekDate(3, new Time(13,0)) , new WeekDate(3,new Time(15,0))), ]);
	const ARAP3 = new EventOption(ARAP, 3,[ new EventOptionInstance( new WeekDate(2,new Time(17,0)) , new WeekDate(2,new Time(19,0))), ]);
	const ACAP4 = new EventOption(ACAP, 4,[ new EventOptionInstance( new WeekDate(2,new Time(14,0)) , new WeekDate(2,new Time(16,0))), ]);
	const ACAT1 = new EventOption(ACAT, 1,[ new EventOptionInstance( new WeekDate(4,new Time(9,0)) , new WeekDate(4,new Time(11,0))), ]);
	const CVP3 = new EventOption(CVP, 3,[ new EventOptionInstance( new WeekDate(5,new Time(11,0)), new WeekDate(5,new Time(13,0))), ]);
	const CVT1 = new EventOption(CVT, 1,[ new EventOptionInstance( new WeekDate(3,new Time(15,0)), new WeekDate(3,new Time(17,0))), ]);
	const SEGP1 = new EventOption(SEGP , 1,[ new EventOptionInstance( new WeekDate(5, new Time(9,0)), new WeekDate(5,new Time(11,0))), ]);
	let SEGT1 = new EventOption(SEGT , 1,[ new EventOptionInstance( new WeekDate(4,new Time(13,0)), new WeekDate(4,new Time(15,0))), ]);

	const solution = new Map();
	solution.set(ARAT, [ARAT1]);
	solution.set(ARAP, [ARAP3]);
	solution.set(ACAT, [ACAT1]);
	solution.set(ACAP, [ACAP4]);
	solution.set(SEGT, [SEGT1]);
	solution.set(SEGP, [SEGP1]);
	solution.set(CVT, [CVT1]);
	solution.set(CVP, [CVP3]);

	let schedule = new Schedule(solution);


	describe('Heuristics', function(){
		it('Free day preference', function(){
			assert.equal(schedule.prefFreeDays, 1/5);
		});
		it('Long weekend preference', function(){
			assert.equal(schedule.prefLongWeekend, 49/(24*5));
		});
		it('Continuous classes preference', function(){
			const prefContinuous = ((2+2)/(19-14) + (2+2)/(17-13) + (2+2)/(15-9) + (2+2)/(13-9) + 1)/5
			assert.equal(schedule.prefContinuous, prefContinuous);
		});
		it('Free afternoons preference', function(){
			assert.equal(schedule.prefFreeAfternoons, ((20-19)/8+(20-17)/8+(20-15)/8+(20-13)/8 + 8/8)/5);
		});
		it('Free mornings preference', function(){
			assert.equal(schedule.prefFreeMornings, (1+1+(9-7)/5+(9-7)/5 + 1)/5);
		});
		it('Long lunch preference', function(){
			assert.equal(schedule.prefLongLunch, (1+1+1+1+1)/5);
		});
		it('Friday Morning preferece', function(){
			assert.equal(schedule.prefFridayMorning, 1);
		});
	});
});

