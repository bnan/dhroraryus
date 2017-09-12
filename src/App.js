import React, { Component } from 'react';

import { Time, WeekDate, Event, EventOption, EventOptionInstance } from './suppClasses'
import { makeDomain, search } from './cSearch'
import { Schedule , scheduleEvaluation } from './schedule'
import { incHeuristicValue, init} from './firebase'

import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Panel, Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import { TimePicker } from './TimePicker';

import logo from './logo.svg';
import './App.css';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const WEEKDAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

class App extends Component {
    constructor(props) {
        init()
        super(props)
        this.state = {
            events: [],
            options: [],
            constraints: [],
            preferences: [],
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

            preferenceContiguous: 0,
            preferenceFreeAfternoons: 0,
            preferenceFreeMornings: 0,
            preferenceLongLunch: 0,
            preferenceLongWeekend: 0,
            preferenceFreeDays: 0,
            preferenceFridayMorning: 0,
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
        const SEGT1 = new EventOption(SEGT , 1,[ new EventOptionInstance( new WeekDate(4,new Time(13,0)), new WeekDate(4,new Time(15,0))), ]);

        this.setState(prevState => ({
            events: [ARAT, ARAP, ACAT, ACAP, EDCT, EDCP, SEGT, SEGP, CVT, CVP],
            options: [ARAT1, ARAP1, ARAP2, ARAP3, ARAP4, ACAP1, ACAP2, ACAP3, ACAP4, ACAT1, CVP1, CVP2, CVP3, CVT1, EDCP1, EDCP2, EDCP3, EDCT1, SEGP1, SEGP2, SEGP3, SEGP4, SEGT1]
        }))
    }

    handleEventAdd() {
        if (!this.state.newEvent) return

        const event = new Event(this.state.newEvent)

        if(!this.state.events.includes(event)) {
            this.setState(prevState => ({
                events: [...prevState.events, event],
                newEvent: ''
            }))
        }
    }

    handleInstanceAdd() {
        const start = new Time(this.state.newInstanceStart.hours(), this.state.newInstanceStart.minutes())
        const end = new Time(this.state.newInstanceEnd.hours(), this.state.newInstanceEnd.minutes())

        const instance = new EventOptionInstance(
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

        const instance = new EventOptionInstance(
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

    handleGenerate() {
        let domain = makeDomain(this.state.options)
        let solutions = search(domain)

        let results = solutions.map(solution => (new Schedule(solution)))
        let weights = [this.state.preferenceContiguous, this.state.preferenceFreeAfternoons, this.state.preferenceFreeMornings, this.state.preferenceLongLunch, this.state.preferenceFreeDays, this.state.preferenceFridayMorning, this.state.preferenceFridayMorning]
        results = results.sort(function(s1, s2) {
          return scheduleEvaluation(s2, ...weights) - scheduleEvaluation(s1, ...weights)
        })

        results = results.slice(0,7)

        let heuristics = new Map()
        heuristics.set('long_lunch', this.state.preferenceLongLunch)
        heuristics.set('long_weekend', this.state.preferenceLongWeekend)
        heuristics.set('free_mornings', this.state.preferenceFreeMornings)
        heuristics.set('free_days', this.state.preferenceFreeDays)
        heuristics.set('free_afternoon', this.state.preferenceFreeAfternoons)
        heuristics.set('contiguous_events', this.state.preferenceContiguous)
        heuristics.set('free_friday_mornings', this.state.preferenceFridayMorning)

        console.log('HEURISTICS', heuristics)
        for (const [k, v] of heuristics) {
            console.log('HEY!!!!!!!!!!', k, v)
            incHeuristicValue(k, v)
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
                        <Panel expanded collapsible header="Events">
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

                                <FormControl componentClass="select" defaultValue={this.state.newInstanceDay} onChange={(e) => this.handleInstanceDayChange(e)}>
                                    <option value="0">Saturday</option>
                                    <option value="1">Sunday</option>
                                    <option value="2">Monday</option>
                                    <option value="3">Tuesday</option>
                                    <option value="4">Wednesday</option>
                                    <option value="5">Thursday</option>
                                    <option value="6">Friday</option>
                                </FormControl>

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
                        <Panel expanded collapsible header="Constraints">
                            <Form inline>
                                <FormGroup>
                                    {'On '}
                                    <FormControl componentClass="select" defaultValue={this.state.newConstraintDay} onChange={(e) => this.handleConstraintDayChange(e)}>
                                        <option value="0">Saturday</option>
                                        <option value="1">Sunday</option>
                                        <option value="2">Monday</option>
                                        <option value="3">Tuesday</option>
                                        <option value="4">Wednesday</option>
                                        <option value="5">Thursday</option>
                                        <option value="6">Friday</option>
                                    </FormControl>
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
                        <Panel expanded collapsible header="Preferences">
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceContiguous} onChange={(e) => this.setState({ preferenceContiguous: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Contiguous, unfragmented events
                                </FormGroup>
                            </Form>
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceFreeAfternoons} onChange={(e) => this.setState({ preferenceFreeAfternoons: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Free afternoons
                                </FormGroup>
                            </Form>
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceFreeMornings} onChange={(e) => this.setState({ preferenceFreeMornings: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Free mornings
                                </FormGroup>
                            </Form>
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceLongLunch} onChange={(e) => this.setState({ preferenceLongLunch: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Long lunch breaks
                                </FormGroup>
                            </Form>
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceFreeDays} onChange={(e) => this.setState({ preferenceFreeDays: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Free days
                                </FormGroup>
                            </Form>
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceFridayMorning} onChange={(e) => this.setState({ preferenceFridayMorning: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Free friday morning for hangovers
                                </FormGroup>
                            </Form>
                            <Form inline>
                                <FormGroup>
                                    <FormControl style={{ width: '40px' }} componentClass="select" defaultValue={this.state.preferenceLongWeekend} onChange={(e) => this.setState({ preferenceLongWeekend: parseInt(e.target.value, 10) })}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </FormControl>
                                    {' '}
                                    Longer weekends
                                </FormGroup>
                            </Form>
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
                            <Panel expanded collapsible header="Results">
                                {this.state.results.map((result, index) => {
                                    return (
                                        <div key={index}>
                                            <BigCalendar
                                                events={result}
                                                defaultView='week'
                                                defaultDate={new Date(2018, 8, 2)}
                                                views={['week']}
                                                toolbar={false}
                                                formats={{dayFormat:'dddd'}}
                                                //min={new Date(2018,8,2,10,30,0,0)}
                                            />
                                        </div>
                                    )
                                })}
                            </Panel>
                        </Col>
                    </Row>
                }
            </Grid>
        );
    }
}

export default App;
