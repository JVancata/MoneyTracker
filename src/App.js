import React, { Component } from 'react';
import Inputs from './Components/Inputs';
import './Css/w3-css.css';

class App extends Component {
  state = {
    currentBalance: 100,
    transactions: [
      //{description: "Nic", amount: 0, add: true} true = +, false = -
    ],
    inputs: {
      "description": "",
      "amount": "",
      "add": false
    }
  }

  componentWillMount = () => {
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

  onSave = (event) => {
    let { transactions } = this.state;
    let { currentBalance } = this.state;
    const { inputs } = this.state;

    inputs.amount = parseInt(inputs.amount);

    transactions.push({ description: inputs.description, amount: inputs.amount, add: inputs.add });

    inputs.add ? currentBalance += inputs.amount : currentBalance -= inputs.amount;
    this.setState({ transactions, currentBalance });
    this.saveTransactions(transactions);
    console.log(this.state.transactions);
  }

  onChange = (event) => {
    let { inputs } = this.state;
    event.target.type !== "checkbox" ? inputs[event.target.name] = event.target.value : inputs[event.target.name] = !inputs.add;
    this.setState({
      inputs
    });
  }
  deleteTransaction = (index) => {
    console.log(index);

    let { transactions, currentBalance } = this.state;
    transactions[index].add ? currentBalance -= transactions[index].amount : currentBalance += transactions[index].amount;
    transactions.splice(index, 1);

    this.saveTransactions(transactions);
    this.setState({ transactions, currentBalance });
  }
  saveTransactions = (transactions) => {
    localStorage.transactions = JSON.stringify(transactions);
  }
  renderTransaction = (transaction, index) => {
    return (
      <div className={transaction.add ? "w3-row w3-pale-green w3-padding" : "w3-row w3-pale-red w3-padding"} key={index}>
        <div className="w3-col s7">{transaction.description}</div>
        <div className="w3-col s4">{transaction.add ? " +" : " -"}{transaction.amount}</div>
        <div className="w3-col s1">
          <button className="w3-red w3-btn" onClick={() => this.deleteTransaction(index)}>X</button>
        </div>
      </div>
    );
  }
  saveInputs = (inputs) => {
    inputs.amount = parseInt(inputs.amount);
  }
  render() {
    const { transactions } = this.state;
    return (
      <div className="w3-content w3-row">
        <div className="w3-row w3-padding">
          <h1>{this.state.currentBalance}</h1>
          <div>{transactions.map((transaction, index) => this.renderTransaction(transaction, index))}</div>
        </div>
        <Inputs saveInputs={this.saveInputs} />
      </div>
    );
  }
}

export default App;
