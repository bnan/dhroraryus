import React from 'react'
import { TimePicker } from '../ui/TimePicker';
import { WeekDays, FormDaysOfTheWeek } from '../ui/FormDaysOfTheWeek';
import moment from 'moment'

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
            <div className="mb-3 card">
                <h5 className="card-header">Events</h5>
                <div className="card-body">
                    <form className="form-inline">
                        <div className="dropdown show">
                            <button className="mr-1 btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Import
                            </button>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => this.props.handleImport()}>MIECT 4º ano</a>
                            </div>
                        </div>
                        {' or manually specify '}
                        <input
                            type="text"
                            value={this.state.name}
                            placeholder="Event"
                            onChange={(e) => this.handleNameChange(e)}
                            className="mr-1 ml-1 form-control"
                        />
                        {' '}
                        <input
                            type="text"
                            value={this.state.option}
                            placeholder="Option"
                            onChange={(e) => this.handleOptionChange(e)}
                            className="mr-1 form-control"
                        />
                        {' on '}
                        <div className="mr-1 ml-1">
                            <FormDaysOfTheWeek defaultValue={this.state.day} onChange={(e) => this.handleDayChange(e)} />
                        </div>
                        {' from '}
                        <div className="mr-1 ml-1">
                            <TimePicker onChange={(e) => this.handleStartChange(e)} />
                        </div>
                        {' to '}
                        <div className="mr-1 ml-1">
                            <TimePicker onChange={(e) => this.handleEndChange(e)} />
                        </div>
                        {' '}
                        <button type="button" className="btn btn-success" onClick={() => this.props.handleAdd(this.state.name, this.state.option, this.state.day, this.state.start, this.state.end)}>
                            Add
                        </button>

                        {this.props.events.length > 0 &&
                            <div className="table-responsive">
                                <table className="mt-3 table table-striped table-bordered table-hover">
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
                                                    <td>{WeekDays[instance.start.day]} at {instance.start.time.hour}:{instance.start.time.min}</td>
                                                    <td>{WeekDays[instance.end.day]} at {instance.end.time.hour}:{instance.end.time.min}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => this.props.handleDelete(i)}>
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}

