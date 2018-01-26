import React from 'react'

import { FormScore } from './FormScore';
import { Panel, Form, FormGroup } from 'react-bootstrap';

export class Preferences extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        return (
            <Panel header="Preferences">
                {Object.keys(this.props.preferences).map((p, index) => (
                    <Form key={index} inline>
                        <FormGroup>
                            <FormScore defaultValue={this.props.preferences[p]} onChange={(e) => this.props.handleChange(e, p)} />
                            {' ' + p}
                        </FormGroup>
                    </Form>
                ))}
            </Panel>
        )
    }
}
