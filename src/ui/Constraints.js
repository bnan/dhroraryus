import React from 'react'
import { TimePicker } from './TimePicker';
import { FormDaysOfTheWeek } from './FormDaysOfTheWeek';
import moment from 'moment'

export class Constraints extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            day: '2', // default to monday
            start: moment(),
            end: moment(),
        }
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
                <h5 className="card-header">Constraints</h5>
                <div className="card-body">
                    <form className="form-inline">
                        {'On '}
                        <FormDaysOfTheWeek defaultValue={this.state.day} onChange={(e) => this.handleDayChange(e)} />
                        {' from '}
                        <TimePicker onChange={(e) => this.handleStartChange(e)} />
                        {' to '}
                        <TimePicker onChange={(e) => this.handleEndChange(e)} />
                        {' '}

                        <button type="button" className="btn btn-success" onClick={() => this.props.handleAdd(this.state.day, this.state.start, this.state.end)}>
                            Add
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
