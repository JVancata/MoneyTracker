import React, { Component } from 'react';
import Inputs from './Inputs';
import Transaction from './Transaction';
import '../css/w3-css.css';
// eslint-disable-next-line
import '../css/fontawesome';

import { loadTransactions } from '../redux/modules/transactions';

import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import history from '../../history/history';


class App extends Component {
  months = ["Ledena", "Února", "Březena", "Apríla", "Mája", "Června", "Červenca", "Srpna", "Zářía", "Října", "Listí padá", "Prosinec"];
  state = {
    currentBalance: 0,
    editing: -1
  }

  constructor(props) {
    super(props);
    this.props.loadTransactions(this.props.transactions.userId);
  }

  componentWillMount = () => {

    this.calculateCurrentBalance();
  }

  calculateCurrentBalance = () => {
    /*var transactions;
    let currentBalance = 0;

    if (localStorage.transactions) {
      transactions = JSON.parse(localStorage.transactions);
      console.log(transactions)
      for (let month = 0; month < 12; month++) {
        if (transactions[month]) {
          transactions[month].transactions.forEach(transaction => {
            transaction.add ? currentBalance += transaction.amount : currentBalance -= transaction.amount;
          });
        }
      }

      this.setState({ transactions, currentBalance });
    }*/
  }

  onSave = (inputs) => {
    let { transactions, currentBalance, currentMonth } = this.state;


  }

  toggleEdit = (index) => {
    this.setState({ editing: index });
  }

  saveTransactions = (transactions) => {
    localStorage.transactions = JSON.stringify(transactions);
  }

  deleteTransaction = (index) => {
    let { transactions, currentBalance, currentMonth } = this.state;
    transactions[currentMonth].transactions[index].add ? currentBalance -= transactions[currentMonth].transactions[index].amount : currentBalance += transactions[currentMonth].transactions[index].amount;
    transactions[currentMonth].transactions.splice(index, 1);

    this.saveTransactions(transactions);
    this.setState({ transactions, currentBalance });
  }

  updateTransaction = (index, transaction) => {
    let { transactions, currentMonth } = this.state;
    transactions[currentMonth].transactions[index] = transaction;
    this.saveTransactions(transactions);
    this.setState({ transactions });
    this.calculateCurrentBalance();
  }

  renderTransaction = (transaction, index) => {
    let editing = index === this.state.editing ? true : false;

    return (
      <Transaction
        transaction={transaction}
        index={index}
        key={index}
        editing={editing}
        toggleEdit={this.toggleEdit}
      />
    );
  }
  changeCurrentMonth = (change) => {
    change < 0 ? change = 0 : change > 11 ? change = 11 : null;
    this.setState({ currentMonth: change, editing: -1 });
  }
  render() {
    console.log("props", this.props)
    const { transactions, currentMonth } = this.props.transactions;
    //console.log("transactions", transactions);
    return (
      <div className="w3-content w3-row">
        <div className="w3-row w3-padding">
          <button className="w3-button w3-black" onClick={() => { this.changeCurrentMonth(currentMonth - 1) }}>Right</button>
          <span>{this.months[currentMonth]}</span>
          <button onClick={() => { this.changeCurrentMonth(currentMonth + 1) }} className="w3-button w3-black">Left</button>
          <h1>{this.state.currentBalance}</h1>
          <div>{transactions.map((transaction, index) => this.renderTransaction(transaction, index))}</div>
        </div>
        <Inputs />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

export default connect(mapStateToProps, { loadTransactions })(App);