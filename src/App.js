import React, { Component } from 'react';

import { Time, WeekDate, Event, EventOption, EventOptionInstance } from './suppClasses'
import { makeDomain, search } from './cSearch'
import { Schedule } from './schedule'

import { Panel, Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import { TimePicker } from './TimePicker';

import logo from './logo.svg';
import './App.css';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {
    constructor(props) {
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

    componentDidMount() {
        this.prefill()
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
        console.log('ADDING OPTION', this.state.newInstanceStart)

        const start = new Time(this.state.newInstanceStart.hours(), this.state.newInstanceStart.minutes())
        const end = new Time(this.state.newInstanceEnd.hours(), this.state.newInstanceEnd.minutes())

        const instance = new EventOptionInstance(
            new WeekDate(this.state.newInstanceDay, start),
            new WeekDate(this.state.newInstanceDay, end)
        )

        const foundOption = this.state.options.find(option => option.event.name === this.state.newOptionEvent && option.option === this.state.newOptionId)
        console.log('FOUND OPTION????', foundOption)

        // Append if it already exists, otherwise write directly
        if (foundOption) {
            foundOption.instances.concat(instance)
        } else {
            const option = new EventOption(new Event(this.state.newOptionEvent), this.state.newOptionId, [instance])
            this.setState(prevState => ({
                options: [...prevState.options, option]
            }))
        }

    }

    handleEventDelete(index) {
        this.setState({
            events: [...this.state.events.slice(0, index), ...this.state.events.slice(index+1)]
        })

        // TODO: delete other stuff
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

    handleGenerate() {
        let domain = makeDomain(this.state.options)
        let solutions = search(domain).slice(0, 7)
        let results = solutions.map(solution => (new Schedule(solution)).events)
        this.setState({ results })

        console.log('RESULTS!!!!!!!!!!!', results)
    }

    render() {
        return (
            <Grid>
                <img src={logo} className="App-logo" alt="Dhroraryus" />

                <Row>
                    <Col xs={12}>
                        <Panel expanded collapsible header="Events">
                            <Form inline>
                                <FormGroup>
                                    <FormControl
                                        type="text"
                                        value={this.state.newEvent}
                                        placeholder="Enter text"
                                        onChange={(e) => this.handleEventChange(e)}
                                    />
                                    <Button bsStyle="success" onClick={() => this.handleEventAdd()}>
                                        <Glyphicon glyph="plus" /> Add
                                    </Button>
                                </FormGroup>
                            </Form>

                            <ListGroup>
                                {this.state.events.map((event, index) => (
                                    <ListGroupItem key={index}>
                                        {event.name}
                                        <Button onClick={() => this.handleEventDelete(index)} bsStyle="danger">
                                            <Glyphicon glyph="remove" />
                                        </Button>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Panel>
                    </Col>

                    <Col xs={12}>
                        <Panel expanded collapsible header="Options">
                            <Form inline>
                                <FormGroup controlId="formControlsSelect">
                                    <FormControl componentClass="select" onChange={(e) => this.handleOptionEventChange(e)}>
                                        {this.state.events.map((event, index) => (
                                            <option key={index} value={event.name}>{event.name}</option>
                                        ))}
                                    </FormControl>
                                </FormGroup>

                                <FormControl
                                    type="text"
                                    placeholder="ID"
                                    onChange={(e) => this.handleOptionIdChange(e)}
                                />

                                <FormControl componentClass="select" defaultValue={this.state.newInstanceDay} onChange={(e) => this.handleInstanceDayChange(e)}>
                                    <option value="0">Saturday</option>
                                    <option value="1">Sunday</option>
                                    <option value="2">Monday</option>
                                    <option value="3">Tuesday</option>
                                    <option value="4">Wednesday</option>
                                    <option value="5">Thursday</option>
                                    <option value="6">Friday</option>
                                </FormControl>

                                from
                                <TimePicker onChange={(e) => this.handleInstanceStartChange(e)} />
                                to
                                <TimePicker onChange={(e) => this.handleInstanceEndChange(e)} />

                                <Button bsStyle="success" onClick={() => this.handleInstanceAdd()}>
                                    <Glyphicon glyph="plus" /> Add
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6}>
                        <Panel expanded collapsible header="Constraints">
                            <Form inline>
                                <FormGroup>
                                    On
                                    <FormControl componentClass="select" defaultValue={this.state.newInstanceDay} onChange={(e) => this.handleInstanceDayChange(e)}>
                                        <option value="0">Saturday</option>
                                        <option value="1">Sunday</option>
                                        <option value="2">Monday</option>
                                        <option value="3">Tuesday</option>
                                        <option value="4">Wednesday</option>
                                        <option value="5">Thursday</option>
                                        <option value="6">Friday</option>
                                    </FormControl>

                                    from
                                    <TimePicker />
                                    to
                                    <TimePicker />
                                </FormGroup>

                                <Button bsStyle="success">
                                    <Glyphicon glyph="plus" /> Add
                                </Button>
                            </Form>
                        </Panel>
                    </Col>

                    <Col xs={6}>
                        <Panel expanded collapsible header="Preferences">
                            <FormGroup>
                                <Checkbox>Contiguous, unfragmented events</Checkbox>
                                <Checkbox>Free afternoons</Checkbox>
                                <Checkbox>Free mornings</Checkbox>
                                <Checkbox>Free days</Checkbox>
                                <Checkbox>Long lunch breaks</Checkbox>
                            </FormGroup>
                        </Panel>
                    </Col>
                </Row>

                <Button bsStyle="primary" bsSize="large" onClick={() => this.handleGenerate()}>
                    <Glyphicon glyph="cog" /> Generate
                </Button>

                <Row>
                    <Col xs={12}>
                        <Panel expanded collapsible header="Results">
                            {this.state.results.map((result, index) => {
                                console.log('WHAT?????', result, index)
                                return (
                                    <div key={index}>
                                        <BigCalendar
                                            events={result}
                                            defaultView='week'
                                            defaultDate={new Date(2018, 8, 2)}
                                        />
                                    </div>
                                )
                            })}
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
