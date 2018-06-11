import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteTransaction, updateTransaction, toggleEdit } from '../redux/modules/transactions';

class Transaction extends Component {
    state = {
        description: "",
        amount: 0,
        add: false,
        _id: "",
        offline: false,
        editing: false,
        month: 0
    }
    componentWillReceiveProps = () => {
        const { transaction, index, editing } = this.props;
        this.setState({
            ...this.state,
            description: transaction.description,
            amount: transaction.amount,
            add: transaction.add,
            _id: transaction._id,
            month: transaction.month,
            offline: transaction.offline,
            editing,
            index
        });
    }
    onChange = (event) => {

        switch (event.target.name) {
            case "description":
                this.setState({ description: event.target.value });
                break;
            case "amount":
                this.setState({ amount: event.target.value });
                break;
            default:
                break;
        }
    }

    editDone = () => {
        const { _id, description, amount, add, offline, month } = this.state;
        this.props.updateTransaction({ transaction: { _id, description, amount, add, offline, month }, userId: this.props.transactions.userId });
    }
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.editDone();
        }
    }
    render = () => {
        const { description, amount } = this.state;
        const { transaction, editing } = this.props;

        return (
            <div className={transaction.add ? "w3-row w3-pale-green w3-padding" : "w3-row w3-pale-red w3-padding"} key={transaction._id}>
                <div className="w3-col s7" onClick={() => this.props.toggleEdit(transaction._id)}>{!editing ? <p>{transaction.description}</p> : <input onKeyPress={this._handleKeyPress} onChange={this.onChange} type="text" name="description" value={description} />} </div>
                <div className="w3-col s3" onClick={() => this.props.toggleEdit(transaction._id)}>{!editing ? <p>{transaction.amount}</p> : <input onKeyPress={this._handleKeyPress} onChange={this.onChange} type="number" name="amount" value={amount} />}</div>
                <div className="w3-col s2">
                    <button className="w3-col s6 w3-red w3-btn" onClick={() => this.props.deleteTransaction({ transaction: transaction, userId: this.props.transactions.userId })}><i className="fas fa-times"></i></button>
                    {editing && <button className="w3-col s6 w3-green w3-btn" onClick={this.editDone}><i className="fas fa-check"></i></button>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    transactions: state.transactions
});
export default connect(mapStateToProps, { deleteTransaction, updateTransaction, toggleEdit })(Transaction);