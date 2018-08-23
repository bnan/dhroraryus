import React from 'react'

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
                            <input className="form-control mr-1 mb-1" type="number" min="0" max="10" value={this.props.preferences[p]} onChange={(e) => this.props.handleChange(e, p)} /> {p}
                        </form>
                    ))}
                </div>
            </div>
        )
    }
}
