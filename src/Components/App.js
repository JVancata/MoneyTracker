import React, { Component } from 'react';
import Inputs from './Inputs';
import Transaction from './Transaction';
import '../Css/w3-css.css';
import '../Css/fontawesome';

class App extends Component {
  state = {
    currentBalance: 0,
    transactions: [
      //{description: "Nic", amount: 0, add: true} true = +, false = -
    ],
    inputs: {
      "description": "",
      "amount": "",
      "add": false
    },
    editing: -1
  }

  componentWillMount = () => {
    this.calculateCurrentBalance();
  }

  calculateCurrentBalance = () => {
    let transactions;
    let currentBalance = 0;

    if (localStorage.transactions) {
      transactions = JSON.parse(localStorage.transactions);
      transactions.forEach(transaction => {
        transaction.add ? currentBalance += transaction.amount : currentBalance -= transaction.amount;
      });
      this.setState({ transactions, currentBalance });
    }
  }

  onSave = (inputs) => {
    let { transactions } = this.state;
    let { currentBalance } = this.state;

    transactions.push({ "description": inputs.description, "amount": inputs.amount, "add": inputs.add });

    inputs.add ? currentBalance += inputs.amount : currentBalance -= inputs.amount;
    this.setState({ transactions, currentBalance });
    this.saveTransactions(transactions);
  }

  onChange = (event) => {
    let { inputs } = this.state;
    event.target.type !== "checkbox" ? inputs[event.target.name] = event.target.value : inputs[event.target.name] = !inputs.add;
    this.setState({
      inputs
    });
  }

  toggleEdit = (index) => {
    this.setState({ editing: index });
  }

  saveTransactions = (transactions) => {
    localStorage.transactions = JSON.stringify(transactions);
  }

  deleteTransaction = (index) => {
    let { transactions, currentBalance } = this.state;
    transactions[index].add ? currentBalance -= transactions[index].amount : currentBalance += transactions[index].amount;
    transactions.splice(index, 1);

    this.saveTransactions(transactions);
    this.setState({ transactions, currentBalance });
  }

  updateTransaction = (index, transaction) => {
    let { transactions } = this.state;
    transactions[index] = transaction;
    this.saveTransactions(transactions);
    this.setState({ transactions });
    this.calculateCurrentBalance();

  }
  
  renderTransaction = (transaction, index) => {
    let editing = index === this.state.editing ? true : false;
    return (
      <Transaction deleteTransaction={this.deleteTransaction} updateTransaction={this.updateTransaction} transaction={transaction} index={index} key={index} editing={editing} toggleEdit={this.toggleEdit} />
    );
  }
  render() {
    const { transactions } = this.state;
    return (
      <div className="w3-content w3-row">
        <div className="w3-row w3-padding">
          <h1>{this.state.currentBalance}</h1>
          <div>{transactions.map((transaction, index) => this.renderTransaction(transaction, index))}</div>
        </div>
        <Inputs saveInputs={this.onSave} />
      </div>
    );
  }
}

export default App;
