import React from 'react'
import { FormScore } from './FormScore';

export class Preferences extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">Preferences</h5>
                <div className="card-body">
                    {Object.keys(this.props.preferences).map((p, index) => (
                        <form key={index} className="form-inline">
                            <div className="form-group">
                                <FormScore defaultValue={this.props.preferences[p]} onChange={(e) => this.props.handleChange(e, p)} />
                                {' ' + p}
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        )
    }
}
