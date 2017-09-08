import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
//import { ControlLabel, HelpBlock } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import * as Datetime from 'react-datetime';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            schedules: [],
            constraints: [],
            preferences: [],
            newEvent: ''
        }
    }

    handleEventChange(e) {
        this.setState({ newEvent: e.target.value })
    }

    handleEventAdd() {
        const newEvent = this.state.newEvent
        if(newEvent && !this.state.events.includes(newEvent)) {
            this.setState(prevState => ({
                events: [...prevState.events, newEvent]
            }))
        }
    }

    handleEventDelete(index) {
        console.log('DELETING', index)
        this.setState({
            events: [...this.state.events.slice(0, index), ...this.state.events.slice(index+1)]
        })

        // TODO: delete other stuff
    }

    handleOptionAdd() {
        console.log('ADDING OPTION')
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
                                    &nbsp;
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
                                    <FormControl componentClass="select" placeholder="select">
                                        {this.state.events.map((event, index) => (
                                            <option key={index} value={event}>{event}</option>
                                        ))}
                                    </FormControl>
                                </FormGroup>

                                <FormControl
                                    type="text"
                                    placeholder="ID"
                                />

                                <Datetime dateFormat={false} />
                                <Datetime dateFormat={false} />

                                <Button bsStyle="success" onClick={() => this.handleOptionAdd()}>
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
                                <FormGroup controlId="formControlsSelect">
                                    On&nbsp;
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </FormControl>
                                    &nbsp;from&nbsp;
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </FormControl>
                                    &nbsp;to&nbsp;
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </FormControl>
                                </FormGroup>
                                &nbsp;
                                <Button bsStyle="success">
                                    <Glyphicon glyph="plus" /> Add
                                </Button>
                            </Form>
                        </Panel>
                    </Col>

                    <Col xs={6}>
                        <Panel expanded collapsible header="Preferences">
                            <FormGroup>
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
