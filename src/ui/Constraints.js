import React from 'react'

import { FormScore } from './ui/FormScore';
import { TimePicker } from './ui/TimePicker';
import { FormDaysOfTheWeek } from './ui/FormDaysOfTheWeek';

class Preferences extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newConstraintDay: '2',
            newConstraintStart: moment(),
            newConstraintEnd: moment(),
        }
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

    return() {
        return (
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
        )
    }
}
