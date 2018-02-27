import React, { Component } from 'react';

class Transaction extends Component {
    render = () => {
        const { transaction, index } = this.props;
        return (
            <div className={transaction.add ? "w3-row w3-pale-green w3-padding" : "w3-row w3-pale-red w3-padding"} key={index}>
                <div className="w3-col s7">{transaction.description}</div>
                <div className="w3-col s4">{transaction.add ? " +" : " -"}{transaction.amount}</div>
                <div className="w3-col s1">
                    <button className="w3-red w3-btn" onClick={() => this.props.deleteTransaction(index)}>X</button>
                </div>
            </div>
        );
    }
}
export default Transaction;