import React, { Component } from 'react';
import Inputs from './Inputs';
import Transaction from './Transaction';
import '../Css/w3-css.css';
// eslint-disable-next-line
import '../Css/fontawesome';

class App extends Component {
  state = {
    currentBalance: 0,
    transactions: {
      0: {
        transactions: []
      },
      1: {
        transactions: []
      },
      2: {
        transactions: []
      },
      3: {
        transactions: []
      },
      4: {
        transactions: []
      },
      5: {
        transactions: []
      },
      6: {
        transactions: []
      },
      7: {
        transactions: []
      },
      8: {
        transactions: []
      },
      9: {
        transactions: []
      },
      10: {
        transactions: []
      },
      11: {
        transactions: []
      }
      //{description: "Nic", amount: 0, add: true} true = +, false = -
    },
    currentMonth: 2,
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
    var transactions;
    let currentBalance = 0;

    if (localStorage.transactions) {
      transactions = JSON.parse(localStorage.transactions);
      console.log(transactions)
      for (let month = 0; month < 12; month++) {
        console.log(transactions[month])
        console.log("hh")

        if (transactions[month]) {
          console.log("je")
          transactions[month].transactions.forEach(transaction => {
            transaction.add ? currentBalance += transaction.amount : currentBalance -= transaction.amount;
          });
        }
      }

      this.setState({ transactions, currentBalance });
    }
  }

  onSave = (inputs) => {
    let { transactions, currentBalance, currentMonth } = this.state;

    transactions[currentMonth].transactions.push({ "description": inputs.description, "amount": Math.abs(inputs.amount), "add": inputs.add });

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
        deleteTransaction={this.deleteTransaction}
        updateTransaction={this.updateTransaction}
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
    this.setState({ currentMonth: change });
  }
  render() {
    const { transactions, currentMonth } = this.state;
    return (
      <div className="w3-content w3-row">
        <div className="w3-row w3-padding">
          <button class="w3-button w3-black" onClick={() => { this.changeCurrentMonth(currentMonth - 1) }}>Right</button><span>{currentMonth}</span><button onClick={() => { this.changeCurrentMonth(currentMonth + 1) }} class="w3-button w3-black">Left</button>
          <h1>{this.state.currentBalance}</h1>
          {transactions[currentMonth] && <div>{transactions[currentMonth].transactions.map((transaction, index) => this.renderTransaction(transaction, index))}</div>}
        </div>
        <Inputs saveInputs={this.onSave} />
      </div>
    );
  }
}

export default App;
