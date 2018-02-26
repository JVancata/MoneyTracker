import React, { Component } from 'react';

class Inputs extends Component {
    state = {
        inputs: {
            "description": "",
            "amount": "",
            "add": false
        }
    }
    onChange = (event) => {
        let { inputs } = this.state;
        event.target.type !== "checkbox" ? inputs[event.target.name] = event.target.value : inputs[event.target.name] = !inputs.add;
        this.setState({ inputs });
    }
    handleSave = () => {
        let { inputs } = this.state;
        inputs.amount = parseInt(inputs.amount);
        this.props.saveInputs(inputs);

    }
    render() {
        const { transactions } = this.state;
        return (
            <div name="inputs" className="w3-row w3-padding-small">
                <div className="w3-col s6">
                    <input onChange={this.onChange} value={this.state.inputs.description} className="w3-input" type="text" name="description" placeholder="Description" />
                </div>
                <div className="w3-col s4">
                    <input onChange={this.onChange} value={this.state.inputs.amount} className="w3-input" type="number" name="amount" placeholder="0 Kč" />
                </div>
                <div className="w3-col s2">
                    <input onChange={this.onChange} checked={this.state.inputs.add} className="w3-check" type="checkbox" name="add" />
                    <label>Příjem?</label>
                </div>
                <div className="w3-col S12">
                    <button onClick={this.handleSave} className="w3-input w3-black w3-btn">Add</button>
                </div>
            </div>
        );
    }
}

export default Inputs;
