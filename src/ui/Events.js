import React from 'react'
import { TimePicker } from '../ui/TimePicker';
import { FormDaysOfTheWeek } from '../ui/FormDaysOfTheWeek';
import { Form, FormControl } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import moment from 'moment'

const WEEKDAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export class Events extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            option: '',
            day: '2',
            start: moment(),
            end: moment(),
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }

    handleOptionChange(e) {
        this.setState({ option: e.target.value })
    }

    handleDayChange(e) {
        this.setState({ day: e.target.value })
    }

    handleStartChange(e) {
        this.setState({ start: e })
    }

    handleEndChange(e) {
        this.setState({ end: e })
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">Events</h5>
                <div className="card-body">
                    <Form inline>
                        <input
                            type="text"
                            value={this.state.name}
                            placeholder="Event"
                            onChange={(e) => this.handleNameChange(e)}
                            style={{ width: '150px' }}
                            className="form-control"
                        />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.option}
                            placeholder="Option"
                            onChange={(e) => this.handleOptionChange(e)}
                        />
                        {' on '}
                        <FormDaysOfTheWeek defaultValue={this.state.day} onChange={(e) => this.handleDayChange(e)} />
                        {' from '}
                        <TimePicker onChange={(e) => this.handleStartChange(e)} />
                        {' to '}
                        <TimePicker onChange={(e) => this.handleEndChange(e)} />
                        {' '}
                        <button type="button" className="btn btn-success" onClick={() => this.props.handleAdd(this.state.name, this.state.option, this.state.day, this.state.start, this.state.end)}>
                            Add
                        </button>

                        { this.props.events.length > 0 &&
                            <Table responsive striped bordered condensed hover style={{ marginTop: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Option</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.props.events.map((event, i) =>
                                        event.instances.map((instance, j) =>
                                            <tr key={i + '' + j}>
                                                <td>{event.event.name}</td>
                                                <td>{event.option}</td>
                                                <td>{WEEKDAYS[instance.start.day]} at {instance.start.time.hour}:{instance.start.time.min}</td>
                                                <td>{WEEKDAYS[instance.end.day]} at {instance.end.time.hour}:{instance.end.time.min}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.props.handleDelete(i)}>
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    </Form>
                </div>
            </div>
        )
    }
}

