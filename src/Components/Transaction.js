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
        let { inputs, index } = this.state;
        event.target.name === "amount" ?  inputs[event.target.name] = parseInt(event.target.value):inputs[event.target.name] = event.target.value;
        this.props.updateTransaction(index, inputs);
        this.setState({ inputs });
    }
    toggleEdit = (index) => {
        this.props.toggleEdit(index);
    }
    editDone = () => {
        this.props.toggleEdit(-1);
    }
    render = () => {
        const { inputs, index } = this.state;
        const { editing } = this.props;
        return (
            <div className={inputs.add ? "w3-row w3-pale-green w3-padding" : "w3-row w3-pale-red w3-padding"} key={index}>
                <div className="w3-col s7" onClick={() => this.toggleEdit(index)}>{!editing ? <p>{inputs.description}</p> : <input onChange={this.onChange} type="text" name="description" value={inputs.description} />} </div>
                <div className="w3-col s3" onClick={() => this.toggleEdit(index)}>{!editing ? <p>{inputs.amount}</p> : <input onChange={this.onChange} type="number" name="amount" value={inputs.amount} />}</div>
                <div className="w3-col s2">
                    <button className="w3-col s6 w3-red w3-btn" onClick={() => this.props.deleteTransaction(index)}><i className="fas fa-times"></i></button>
                    {editing && <button className="w3-col s6 w3-green w3-btn" onClick={this.editDone}><i className="fas fa-check"></i></button>}
                </div>
            </div>
        );
    }
}
export default Transaction;