import React, { Component } from 'react';

class Transaction extends Component {
    state = {
        inputs: {
            "description": "",
            "amount": 0,
            "add": false
        },
        editing: false,
        index: 0
    }
    componentWillMount = () => {
        const { transaction, index, editing } = this.props;
        this.setState({
            inputs: {
                description: transaction.description,
                amount: transaction.amount,
                add: transaction.add
            },
            editing,
            index
        });
    }
    onChange = (event) => {
        let { inputs } = this.state;
        inputs[event.target.name] = event.target.value;
        this.setState({ inputs });
    }
    render = () => {
        const { inputs, index} = this.state;
        const {editing} = this.props; 
        console.log(inputs);
        console.log(editing);
        return (
            <div className={inputs.add ? "w3-row w3-pale-green w3-padding" : "w3-row w3-pale-red w3-padding"} key={index}>
                <div className="w3-col s7" onClick={() => this.props.toggleEdit(index)}>{!editing ? <p>{inputs.description}</p> : <input onChange={this.onChange} type="text" name="description" value={inputs.description} />} </div>
                <div className="w3-col s4" onClick={() => this.props.toggleEdit(index)}>{!editing ? <p>{inputs.amount}</p> : <input onChange={this.onChange} type="number" name="amount" value={inputs.amount} />}</div>
                <div className="w3-col s1">
                    <button className="w3-red w3-btn" onClick={() => this.props.deleteTransaction(index)}>X</button>
                </div>
            </div>
        );
    }
}
export default Transaction;