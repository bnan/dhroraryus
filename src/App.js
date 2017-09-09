import React, { Component } from 'react';

import {test} from './cSearch'
import {Date, Event, EventOption, EventOptionInstance} from './suppClasses'
import {init as firebaseInit, incLongLunch} from './firebase'

import { Panel, Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import { TimePicker } from './TimePicker';

import logo from './logo.svg';
import './App.css';



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            options: [],
            instances: [],
            constraints: [],
            preferences: [],
            newEvent: '',
            newOptionId: '',
            newOptionEvent: '',
            newInstanceDay: '',
            newInstanceStart: '',
            newInstanceEnd: '',
        }
    }


    handleEventAdd() {
        const newEvent = this.state.newEvent
        if(newEvent && !this.state.events.includes(newEvent)) {
            this.setState(prevState => ({
                events: [...prevState.events, newEvent],
                newEvent: ''
            }))
        }
    }

    handleInstanceAdd() {
        console.log('ADDING OPTION')
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
                                        {event}
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
                                            <option key={index} value={event}>{event}</option>
                                        ))}
                                    </FormControl>
                                </FormGroup>

                                <FormControl
                                    type="text"
                                    placeholder="ID"
                                    onChange={(e) => this.handleOptionIdChange(e)}
                                />

                                <FormControl componentClass="select" onChange={(e) => this.handleInstanceDayChange(e)}>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
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
                                    <FormControl componentClass="select">
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
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

                <Button bsStyle="primary" bsSize="large">
                    <Glyphicon glyph="cog" /> Generate
                </Button>
            </Grid>
        );
    }
}

export default App;
