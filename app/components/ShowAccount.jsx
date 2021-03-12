const React = require("react");
const Link = require("react-router-dom").Link;
const Converter = require("./Converter");

/* the main page for the about route of this app */
function ShowAccount(props) {
  console.log("got props"); //, props);
  var deposit = "";
  var withdrawl = "";
  var showFromAccount = false;

  return (
    <div>
      <h1>Welcome {props.accountName}</h1>
      <h2>
        Account #:{props.thisAccount[2]}
        <button onClick={e => props.handleLogout(e)}>Logout</button>
        <br />
        Customer ID:{props.thisAccount[3]} <br />
        Balance: $ <strong>{props.accountAmount}</strong> Canadian
      </h2>
      <br></br>
      <div
        style={{
          background: "skyblue",
          width: "50%",
          border: "2px solid black"
        }}
      >
        <label>
          <b>Current Order Amount ($Canadian)</b>
        </label>
        <input
          name="orderAmount"
          type="number"
          width="50%"
          value={props.orderAmount}
          onChange={props.handleChange}
        ></input>
      </div>
      <button onClick={e => props.handleDeposit(e)}>Deposit</button>
      *Enter foreign amount in Currency Coverter below<br />
      
      <div
        style={{
          background: "skyblue",
          width: "50%",
          border: "2px solid black"
        }}
      >
        <button onClick={props.handleWithdrawl}>Withdrawl</button>
        <h2>
          <u key={props.currency}>{props.currency}</u>
        </h2>
        Optional-choose withdrawl currency:
        <button id="us" onClick={props.handleButton}>
          US Dollars
        </button>
        <button id="mp" onClick={props.handleButton}>
          Mexican Peso
        </button>
        <button id="Ca" onClick={props.handleButton}>
          Canadian
        </button>
      </div>
      <div
        style={{
          background: "#9bc400",
          width: "50%",
          border: "2px solid black"
        }}
      >
        <button onClick={e => props.handleTransfer(e)}>Transfer</button>
        Account number to transfer to:
        <input
          width="50%"
          name="inputTransferAccount"
          type="number"
          value={props.inputTransferAccount}
          onChange={props.handleChange}
        ></input>
        <span>
          Account number to transfer FROM(default is this account):
          <input
            width="50%"
            name="inputTransferFromAccount"
            type="number"
            value={props.inputTransferFromAccount}
            onChange={props.handleChange}
          ></input>
        </span>
      </div>
      <br />
      <button id="currencyConverter" onClick={props.handleButton}>
        Use Foreign Currency
      </button>
      <br />
      {props.showCurrencyConverter ? (
        <Converter
          handleChange={e => props.handleChange(e)}
          handleSubmit={e => props.handleSubmit(e)}
          handleButton={e => props.handleButton(e)}
          inputForiegn={props.inputForiegn}
          currency={props.currency}
        />
      ) : (
        <br />
      )}
      <br />
      <ul>
        <h2>Current Accounts:</h2>
        <br />
        For Testing only:
        {props.accounts.map(item => (
          <li key={item[2]}>
            ${item[0]}
            <br />
            Account # {item[2]}
            <br />
            Customer #{item[3]} <br />
            Name : {item[4]}
            {item[5] ? item[5] : null}
            <br />
            Password: {item[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}
// // accounts format : [balance, password, account#, customerId, owner1, owner2]
module.exports = ShowAccount;
