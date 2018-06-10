import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../redux/modules/transactions';

class Inputs extends Component {
    state = {
        "description": "",
        "amount": "",
        "add": false
    }
    onChange = (event) => {

        switch (event.target.name) {
            case "description":
                this.setState({ description: event.target.value });
                break;
            case "amount":
                this.setState({ amount: event.target.value });
                break;
            case "add":
                this.setState({ add: !this.state.add });
                break;
            default:
                break;
        }

    }
    handleSave = () => {
        const { description, amount, add } = this.state;
        if (description.length <= 0) return;
        if (!(parseInt(amount) >= 0)) return;
        this.props.addTransaction({ transaction: { description, amount: parseInt(amount), add, month: this.props.transactions.currentMonth }, userId: this.props.transactions.userId });
    }
    render() {
        const { description, amount, add } = this.state;

        return (
            <div name="inputs" className="w3-row w3-padding-small">
                <div className="w3-col s6">
                    <input onChange={this.onChange} value={description} className="w3-input" type="text" name="description" placeholder="Description" />
                </div>
                <div className="w3-col s4">
                    <input onChange={this.onChange} value={amount} className="w3-input" type="number" name="amount" placeholder="0 Kč" />
                </div>
                <div className="w3-col s2">
                    <input onChange={this.onChange} checked={add} className="w3-check" type="checkbox" name="add" />
                    <label>Příjem?</label>
                </div>
                <div className="w3-col S12">
                    <button onClick={this.handleSave} className="w3-input w3-black w3-btn">Add</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    transactions: state.transactions
});

export default connect(mapStateToProps, { addTransaction })(Inputs);

