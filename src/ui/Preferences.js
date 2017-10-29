import React from 'react'
import { FormScore } from './ui/FormScore';

class Preferences extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    return() {
        return (
            <Panel header="Preferences">
                {Object.keys(this.props.preferences).map((p, index) => (
                    <Form key={index} inline>
                        <FormGroup>
                            <FormScore defaultValue={this.props.preferences[p]} onChange={(e) => this.props.onChange(e, p)} />
                            {' ' + p}
                        </FormGroup>
                    </Form>
                ))}
            </Panel>
        )
    }
}
