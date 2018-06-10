import React, { Component } from 'react';
import Inputs from './Inputs';
import Transaction from './Transaction';
import '../css/w3-css.css';
// eslint-disable-next-line
import '../css/fontawesome';

import { loadTransactions, changeMonth, deleteTransaction, updateUser } from '../redux/modules/transactions';

import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import history from '../../history/history';


class App extends Component {
  months = ["Ledena", "Února", "Březena", "Apríla", "Mája", "Června", "Červenca", "Srpna", "Zářía", "Října", "Listí padá", "Prosinec"];
  state = {
    currentBalance: 0,
    editing: ""
  }

  constructor(props) {
    super(props);
    this.props.loadTransactions(this.props.transactions.userId);
  }

  calculateCurrentBalance = () => {
    const { monthTransactions } = this.props.transactions;
    let currentBalance = 0;
    monthTransactions.forEach(transaction => {
      transaction.add ? currentBalance += transaction.amount : currentBalance -= transaction.amount;
    });
    return currentBalance;
  }

  /*onSave = (inputs) => {
    let { transactions, currentBalance, currentMonth } = this.state;
  }*/


  renderTransaction = (transaction, index) => {
    let editing = transaction._id === this.props.transactions.editing ? true : false;
    console.log(editing)
    return (
      <Transaction
        transaction={transaction}
        key={transaction._id}
        editing={editing}
      />
    );
  }
  changeCurrentMonth = (change) => {
    change < 0 ? change = 0 : change > 11 ? change = 11 : null;
    this.setState({ editing: "" });
    this.props.changeMonth(change);
  }
  render() {
    const { monthTransactions, currentMonth } = this.props.transactions;

    return (
      <div className="w3-content w3-row">
        <div className="w3-row w3-padding">
          <button className="w3-button w3-black" onClick={() => { this.changeCurrentMonth(currentMonth - 1) }}>Right</button>
          <span>{this.months[currentMonth]}</span>
          <button onClick={() => { this.changeCurrentMonth(currentMonth + 1) }} className="w3-button w3-black">Left</button>

          <input type="text" className="w3-input" onChange={(e) => this.props.updateUser(e.target.value)} placeholder="Your user ID" value={this.props.transactions.userId}></input>

          <h1>{this.calculateCurrentBalance()}</h1>
          <div>{monthTransactions.map((transaction, index) => this.renderTransaction(transaction))}</div>
        </div>
        <Inputs />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

export default connect(mapStateToProps, { loadTransactions, changeMonth, deleteTransaction, updateUser })(App);