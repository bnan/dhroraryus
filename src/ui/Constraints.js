import React from 'react'

import { TimePicker } from './TimePicker';
import { FormDaysOfTheWeek } from './FormDaysOfTheWeek';
import { Panel, Button } from 'react-bootstrap';
import { Form, FormGroup } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
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
            <Panel header="Constraints">
                <Form inline>
                    <FormGroup>
                        {'On '}
                        <FormDaysOfTheWeek defaultValue={this.state.day} onChange={(e) => this.handleDayChange(e)} />
                        {' from '}
                        <TimePicker onChange={(e) => this.handleStartChange(e)} />
                        {' to '}
                        <TimePicker onChange={(e) => this.handleEndChange(e)} />
                    </FormGroup>
                    {' '}
                    <Button bsStyle="success" onClick={() => this.props.handleAdd(this.state.day, this.state.start, this.state.end)}>
                        <Glyphicon glyph="plus" /> Add
                    </Button>
                </Form>
            </Panel>
        )
    }
}
