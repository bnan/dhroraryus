import React from 'react';

import { Time, WeekDate, Event, EventOption, TimeInterval } from './suppClasses'
import { makeDomain, search } from './cSearch'
import { Schedule , scheduleEvaluation } from './schedule'

import logo from './logo.svg';
import './App.css';

import { Events } from './ui/Events'
import { Constraints } from './ui/Constraints'
import { Preferences } from './ui/Preferences'
import { Calendar } from './ui/Calendar'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            constraints: [],
            preferences: {
                'Contiguous, unfragmented events': 0,
                'Free afternoons': 0,
                'Free mornings': 0,
                'Long lunch breaks': 0,
                'Longer weekends': 0,
                'Free days': 0,
                'Free friday morning for hangovers': 0,
            },
            schedules: [],
        }
    }

    handleEventAdd(name, option, day, start, end) {
        const instance = new TimeInterval(
            new WeekDate(day, new Time(start.hours(), start.minutes())),
            new WeekDate(day, new Time(end.hours(), end.minutes()))
        )

        const events = this.state.events.slice()
        const foundEvent = events.find(e => e.event.name === name && e.option === option)

        if (foundEvent) {
            foundEvent.instances = [...foundEvent.instances, instance]
            this.setState({
                events: events
            })
        } else {
            this.setState(prevState => ({
                events: [...prevState.events, new EventOption(new Event(name), option, [instance])]
            }))
        }
    }

    handleOptionDelete(index) {
        this.setState({
            events: [...this.state.events.slice(0, index), ...this.state.events.slice(index+1)]
        })
    }

    handleConstraintAdd(day, start, end) {
        const instance = new TimeInterval(
            new WeekDate(day, new Time(start.hours(), start.minutes())),
            new WeekDate(day, new Time(end.hours(), end.minutes()))
        )

        const event = new EventOption(new Event('C', true), Math.random().toString(36).substring(7), [instance])

        this.setState(prevState => ({
            events: [...prevState.events, event]
        }))
    }

    handlePreferenceChange(e, p) {
        const preferences = this.state.preferences
        preferences[p] = e.target.value
        this.setState({ preferences })
    }

    handleGenerate() {
        // Compute solutions
        let domain = makeDomain(this.state.events)
        let solutions = search(domain)
        let schedules = solutions.map(solution => new Schedule(solution))

        // Sort by preferences
        let weights = Object.values(this.state.preferences)
        schedules = schedules.sort((s1, s2) => scheduleEvaluation(s2, ...weights) - scheduleEvaluation(s1, ...weights))

        // Set the events of the first 10 schedules
        this.setState({
            schedules: schedules.slice(0, 10).map(s => s.events)
        })
    }

    render() {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', padding: '2vw' }}>
                    <img src={logo} className="App-logo" alt="Dhroraryus" />
                </div>

                <div className="row">
                    <div className="col-sm">
                        <Events
                            events={this.state.events}
                            handleAdd={(name, option, day, start, end) => this.handleEventAdd(name, option, day, start, end)}
                            handleDelete={(index) => this.handleOptionDelete(index)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <Constraints constraints={this.state.constraints} handleAdd={(day, start, end) => this.handleConstraintAdd(day, start, end)} />
                    </div>

                    <div className="col-sm">
                        <Preferences preferences={this.state.preferences} handleChange={(e, p) => this.handlePreferenceChange(e, p)} />
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-lg btn-block" disabled={this.state.events.length === 0} onClick={() => this.handleGenerate()}>
                    Generate
                </button>

                {this.state.schedules.length > 0 &&
                    <div className="row">
                        <div className="col-sm">
                            <div className="card">
                                <h5 className="card-header">Schedules</h5>
                                <div className="card-body">
                                    {this.state.schedules.map((schedule, index) => (
                                        <Calendar
                                            key={index}
                                            events={schedule}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default App;
