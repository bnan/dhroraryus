import React, { Component } from 'react';

import { Time, WeekDate, Event, EventOption, TimeInterval } from './suppClasses'
import { makeDomain, search } from './cSearch'
import { Schedule , scheduleEvaluation } from './schedule'
import { incHeuristicValue, init} from './firebase'

import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Panel, Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import { TimePicker } from './ui/TimePicker';
import { FormDaysOfTheWeek } from './ui/FormDaysOfTheWeek';
import { FormScore } from './ui/FormScore';
import { Calendar } from './ui/Calendar';
import logo from './logo.svg';
import './App.css';

import moment from 'moment'

const WEEKDAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

class App extends Component {
    constructor(props) {
        init()
        super(props)
        this.state = {
            options: [],
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
            results: [],

            newEvent: '',
            newOptionId: '',
            newOptionEvent: '',

            newInstanceDay: '2',
            newInstanceStart: moment(),
            newInstanceEnd: moment(),

            newConstraintDay: '2',
            newConstraintStart: moment(),
            newConstraintEnd: moment(),
        }
    }

    prefill() {
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

        this.setState(prevState => ({
            events: [ARAT, ARAP, ACAT, ACAP, EDCT, EDCP, SEGT, SEGP, CVT, CVP],
            options: [ARAT1, ARAP1, ARAP2, ARAP3, ARAP4, ACAP1, ACAP2, ACAP3, ACAP4, ACAT1, CVP1, CVP2, CVP3, CVT1, EDCP1, EDCP2, EDCP3, EDCT1, SEGP1, SEGP2, SEGP3, SEGP4, SEGT1]
        }))
    }

    handleInstanceAdd() {
        const start = new Time(this.state.newInstanceStart.hours(), this.state.newInstanceStart.minutes())
        const end = new Time(this.state.newInstanceEnd.hours(), this.state.newInstanceEnd.minutes())

        const instance = new TimeInterval(
            new WeekDate(this.state.newInstanceDay, start),
            new WeekDate(this.state.newInstanceDay, end)
        )

        const f = (option) => (option.event.name === this.state.newOptionEvent && option.option === this.state.newOptionId)
        const foundOption = this.state.options.find(option => f(option))

        // Append if it already exists, otherwise write directly
        if (foundOption) {
            console.log('FOUND!!!!!!!!! CONCAT')

            let opts = []
            for (let opt of this.state.options) {
                if (f(opt)) {
                    opt.instances = opt.instances.concat(instance)
                }
                opts = opts.concat(opt)
            }

            this.setState({ options: opts })
        } else {
            console.log('NOT FOUND!!!!!!!!!!!!!!!!!!!!!!')
            const option = new EventOption(new Event(this.state.newOptionEvent), this.state.newOptionId, [instance])
            this.setState(prevState => ({
                options: [...prevState.options, option]
            }))
        }

    }

    handleConstraintAdd() {
        const start = new Time(this.state.newConstraintStart.hours(), this.state.newConstraintStart.minutes())
        const end = new Time(this.state.newConstraintEnd.hours(), this.state.newConstraintEnd.minutes())

        const instance = new TimeInterval(
            new WeekDate(this.state.newConstraintDay, start),
            new WeekDate(this.state.newConstraintDay, end)
        )

        const option = new EventOption(new Event('C', true), Math.random().toString(36).substring(7), [instance])

        this.setState(prevState => ({
            options: [...prevState.options, option]
        }))
    }

    handleOptionDelete(index) {
        this.setState({
            options: [...this.state.options.slice(0, index), ...this.state.options.slice(index+1)]
        })
    }

    handleEventChange(e) {
        this.setState({ newEvent: e.target.value })
    }

    handleOptionIdChange(e) {
        this.setState({ newOptionId: e.target.value })
    }

    handleOptionEventChange(e) {
        this.setState({ newOptionEvent: e.target.value })
    }

    handleInstanceDayChange(e) {
        this.setState({ newInstanceDay: e.target.value })
    }

    handleInstanceStartChange(e) {
        this.setState({ newInstanceStart: e })
    }

    handleInstanceEndChange(e) {
        this.setState({ newInstanceEnd: e })
    }

    handleConstraintDayChange(e) {
        this.setState({ newConstraintDay: e.target.value })
    }

    handleConstraintStartChange(e) {
        this.setState({ newConstraintStart: e })
    }

    handleConstraintEndChange(e) {
        this.setState({ newConstraintEnd: e })
    }

    handlePreferenceChange(e, p) {
        const preferences = this.state.preferences
        preferences[p] = e.target.value
        this.setState({ preferences })
    }

    handleGenerate() {
        let domain = makeDomain(this.state.options)
        let solutions = search(domain)
        let results = solutions.map(solution => (new Schedule(solution)))

        // Sort by preferences
        let weights = Object.values(this.state.preferences)
        results = results.sort((s1, s2) => scheduleEvaluation(s2, ...weights) - scheduleEvaluation(s1, ...weights))
        results = results.slice(0,7)

        for (const p of Object.keys(this.state.preferences)) {
            incHeuristicValue(p, this.state.preferences[p])
        }

        results = results.map(r => r.events)
        this.setState({ results })
    }

    render() {
        return (
            <Grid>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <img src={logo} className="App-logo" alt="Dhroraryus" />
                </div>

                <Row>
                    <Col xs={12}>
                        <Panel header="Events">
                            <Form inline>
                                <DropdownButton bsStyle="primary" bsSize="sm" title="Import" id="dropdown-size-large">
                                    <MenuItem eventKey="1" onClick={() => this.prefill()}>4º ano Engenharia de Computadores e Telemática @ DETI UA</MenuItem>
                                    <MenuItem eventKey="2">1º ano Engenharia Informática @ DETI UA</MenuItem>
                                    <MenuItem eventKey="3">2º ano Engenharia Eletrónica e Telecomunicações @ DETI UA</MenuItem>
                                </DropdownButton>
                                {' or manually specify '}
                                <FormControl
                                    type="text"
                                    value={this.state.newOptionEvent}
                                    placeholder="Event"
                                    onChange={(e) => this.handleOptionEventChange(e)}
                                    style={{ width: '150px' }}
                                />
                                {' '}
                                <FormControl
                                    type="text"
                                    value={this.state.newOptionId}
                                    placeholder="ID"
                                    onChange={(e) => this.handleOptionIdChange(e)}
                                    style={{ width: '50px' }}
                                />
                                {' on '}
                                <FormDaysOfTheWeek defaultValue={this.state.newInstanceDay} onChange={(e) => this.handleInstanceDayChange(e)} />
                                {' from '}
                                <TimePicker onChange={(e) => this.handleInstanceStartChange(e)} />
                                {' to '}
                                <TimePicker onChange={(e) => this.handleInstanceEndChange(e)} />
                                {' '}
                                <Button bsStyle="success" onClick={() => this.handleInstanceAdd()}>
                                    <Glyphicon glyph="plus" /> Add
                                </Button>

                                { this.state.options.length > 0 &&
                                    <Table responsive striped bordered condensed hover style={{ marginTop: '20px' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Event</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.options.map((option, i) =>
                                                option.instances.map((instance, j) =>
                                                    <tr key={i}>
                                                        <td>{i}</td>
                                                        <td>{option.event.name + option.option}</td>
                                                        <td>{WEEKDAYS[instance.start.day]} at {instance.start.time.hour}:{instance.start.time.min}</td>
                                                        <td>{WEEKDAYS[instance.end.day]} at {instance.end.time.hour}:{instance.end.time.min}</td>
                                                        <td>
                                                            <Button bsSize="small" onClick={() => this.handleOptionDelete(i)} bsStyle="danger">
                                                                <Glyphicon glyph="remove" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                }
                            </Form>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6}>
                        <Panel header="Constraints">
                            <Form inline>
                                <FormGroup>
                                    {'On '}
                                    <FormDaysOfTheWeek defaultValue={this.state.newConstraintDay} onChange={(e) => this.handleConstraintDayChange(e)} />
                                    {' from '}
                                    <TimePicker onChange={(e) => this.handleConstraintStartChange(e)} />
                                    {' to '}
                                    <TimePicker onChange={(e) => this.handleConstraintEndChange(e)} />
                                </FormGroup>
                                {' '}
                                <Button bsStyle="success" onClick={() => this.handleConstraintAdd()}>
                                    <Glyphicon glyph="plus" /> Add
                                </Button>
                            </Form>
                        </Panel>
                    </Col>

                    <Col xs={12} md={6}>
                        <Panel header="Preferences">
                            {Object.keys(this.state.preferences).map((p, index) => (
                                <Form key={index} inline>
                                    <FormGroup>
                                        <FormScore defaultValue={this.state.preferences[p]} onChange={(e) => this.handlePreferenceChange(e, p)} />
                                        {' ' + p}
                                    </FormGroup>
                                </Form>
                            ))}
                        </Panel>
                    </Col>
                </Row>

                <div style={{ marginBottom: '40px' }}>
                    <Button disabled={this.state.options.length === 0} block bsStyle="primary" bsSize="large" onClick={() => this.handleGenerate()}>
                        <Glyphicon glyph="cog" /> Generate
                    </Button>
                </div>

                {this.state.results.length > 0 &&
                    <Row>
                        <Col xs={12}>
                            <Panel header="Results">
                                {this.state.results.map((result, index) => (
                                    <Calendar
                                        key={index}
                                        events={result}
                                    />
                                ))}
                            </Panel>
                        </Col>
                    </Row>
                }
            </Grid>
        );
    }
}

export default App;
