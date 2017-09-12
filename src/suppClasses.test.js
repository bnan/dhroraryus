import { Time, WeekDate } from '../src/suppClasses'
import assert from 'assert'

describe('Time', function(){

	const timeA = new Time(10, 0)
	const timeB = new Time(18, 0)
	const timeC = new Time(18, 1)
	const timeD = new Time(17, 59)

	describe('#compare()', function(){
		it('Comparing ' + timeA + ' to ' + timeB + ' must return -1', function(){
			assert.equal(Time.compare(timeA, timeB), -1);
		});
		it('Comparing ' + timeB + ' to ' + timeC + ' must return -1', function(){
			assert.equal(Time.compare(timeB, timeC), -1);
		});

		it('Comparing ' + timeC + ' to ' + timeB + ' must return 1', function(){
			assert.equal(Time.compare(timeC, timeB), 1);
		});

		it('Comparing ' + timeD + ' to ' + timeC + ' must return -1', function(){
			assert.equal(Time.compare(timeD, timeC), -1);
		});

		it('Comparing ' + timeC + ' to ' + timeC + ' must return 0', function(){
			assert.equal(Time.compare(timeC, timeC), 0);
		});
	});
	describe('#interval()', function(){
		it('Interval between ' + timeA + ' and ' + timeB + ' must be ' + 8*60, function(){
			assert.equal(Time.interval(timeA, timeB), 8*60);
		});
		it('Interval between ' + timeB + ' and ' + timeA + ' must be ' + ((24-18)+(10))*60, function(){
			assert.equal(Time.interval(timeB, timeA), ((24-18)+(10))*60);
		});
		it('Interval between ' + timeB + ' and ' + timeC + ' must be ' + 1, function(){
			assert.equal(Time.interval(timeB, timeC), 1);
		});
		it('Interval between ' + timeC + ' and ' + timeB + ' must be ' + ((24-18)*60-1)+(18*60), function(){
			assert.equal(Time.interval(timeC, timeB), ((24-18)*60-1)+(18*60));
		});
	});

});

