const React = require("react");
const Link = require("react-router-dom").Link;

/* the main page for the about route of this app */
function ShowAccount(props) {
  console.log("got props", props);
  var deposit = "";
  var withdrawl = "";

  return (
    <div>
      <h1>Welcome {props.accountName}</h1>
      <h2>
        Account #:{props.thisAccount[2]}
        <br />
        Customer ID:{props.thisAccount[3]} <br />
        Balance: $ <strong>{props.accountAmount}</strong> Canadian
      </h2>
      <br></br>
      <label>
        Current Order Amount ($Canadian)
        <input
          name="depositWd"
          type="number"
          value={props.orderAmount}
          onChange={props.handleChange}
        ></input>
      </label>
      *Enter foreign amount in Currency Coverter below
      <button onClick={e => props.handleDeposit(e)}>Deposit</button>
      <div
        style={{
          background: "#9bc400",
          width: "99%",
          border: "2px solid black"
        }}
      >
        <button onClick={e => props.handleTransfer(e)}>Transfer</button>
        Account number to transfer to:
        <input
          width="95%"
          name="transfer"
          type="number"
          value={props.inputTransferAccount}
          onChange={props.handleChange}
        ></input>
      </div>
      <div style={{ background: "skyblue" }}>
        <button onClick={props.handleWithdrawl}>Withdrawl</button>
        Optional-choose withdrawl currency:
        <button id="us" onClick={props.handleButton}>
          US Dollars
        </button>
        <button id="mp" onClick={props.handleButton}>
          Mexican Peso
        </button>
      </div>
      <br />
      <button id="currencyConverter" onClick={props.handleButton}>
        Use Foreign Currency
      </button>
      <br />
      <br />
      <ul>
        <h2>Current Accounts:</h2>
        <br />
        For Testing only:
        {props.accounts.map(item => (
          <li key={item[1]}>
            ${item[0]}
            <br />
            Account # {item[2]}
            {item[4]} {item[5] ? item[5] : null}
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
