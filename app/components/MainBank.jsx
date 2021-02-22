const React = require("react");
const Link = require("react-router-dom").Link;
const ShowAccount = require("./ShowAccount");
const Converter = require("./Converter");
const Open = require("./Open");
const Login = require("./Login");
const NewAccount = require("./NewAccount");
//import "./app.css";

/* the main page for this app */
class MainBank extends React.Component {
  constructor(props) {
    super(props);
    // accounts format= [balance, password, account#, customerId, owner1, owner2]
    // currentOwner format = [name, index]
    this.state = {
      accounts: [],
      newAccount: false,
      flag: true,
      currentOwner: null,
      // inputAccount: 0,
      inputCustomerId: 0,
      inputName: "",
      inputName2: "",
      inputPassword: "",
      inputForeign: 0,
      inputTransferAccount: "",
      currency: null,
      showCurrencyConverter: false,
      orderAmount: 0,
      isTransfer: "",
      cToUs: 0.5,
      usToC: 2,
      cToMp: 10,
      mpToC: 0.1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdrawl = this.handleWithdrawl.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
  }

  componentDidMount() {
    this.setState({
      accounts: [
        // format for accounts is [balance, password, account#, customerId, owner1, owner2]
        [10, "a", "1", "1", "Paul", "Tara"],
        [12, "a", "3", "3", "Teagan"],
        [100, "password", 1234, 777, "Stewie Griffin"],
        [35000, "password", 2001, 504, "Glenn Quagmire"],
        [7425, "password", 1010, 2, "Joe Swanson"],
        [150, "password", 123, 123, "Peter Griffin"],
        [15000, "password", 5500, 2, "Joe Swanson"]
      ]
    });
  }
  componentWillUnmount() {}

  handleChange(evt) {
    // clean this up using name=evt.target = name in State
    console.log("changed", evt.target.value);
    console.log(evt.target.name);
    if (evt.target.name == "name") {
      this.setState({ inputName: evt.target.value });
    } else if (evt.target.name == "name2") {
      this.setState({ inputName2: evt.target.value });
    } else if (evt.target.name == "customerId") {
      this.setState({ inputCustomerId: evt.target.value });
    } else if (evt.target.name == "inputCustomerId") {
      this.setState({ inputCustomerId: evt.target.value });
    } else if (evt.target.name == "password") {
      this.setState({ inputPassword: evt.target.value });
    } else if (evt.target.name == "transfer") {
      this.setState({ inputTransferAccount: evt.target.value });
    } else if (evt.target.name == "depositWd") {
      if (!Number(parseFloat(evt.target.value))) {
        alert("Your amount must be a number");
        this.setState({ orderAmount: 0 });
      }
      this.setState({ orderAmount: evt.target.value });
    } else if (evt.target.name == "foreign") {
      if (!Number(parseFloat(evt.target.value))) {
        alert("Your amount must be a number");
        this.setState({ orderAmount: 0 });
      }
      this.setState({ inputForeign: evt.target.value });
    }
  }

  handleNewAccount(e) {
    console.log("button pressed", e.target.id);
    var tempVal = 0;
    var goodName = false;
    var accountNames;
    // var goodAccountNum = 0;
    var goodId;
    var goodPassword;

    // format for accounts is [balance, password, account#, customerId, owner1, owner2]
    //  error checking to ensure no duplicate accounts
    if (this.state.inputCustomerId) {
      // if user entered customerId
      this.state.accounts.forEach((account, index) => {
        // get this account and check password
        if (
          account[1] == this.state.inputPassword &&
          account[3] == this.state.inputCustomerId
        ) {
          goodName = true;
          goodPassword = this.state.inputPassword;
          goodId = this.state.inputCustomerId;
          accountNames = [account[4], account[5]];
        }
      });
    } else {
      goodName = true; // to execute next section without customerId
    } // ie. goodName could be false if password above failed,
    // else will send error message below
    if (goodName) {
      var customerId; // used to find highest current number to select next
      //let accountNum; //  "  "      "    "    "      "
      let goodAccountNum = 0;
      let temp = [...this.state.accounts];
      if (goodId) {
        customerId = goodId;
      }
      // use existing customerId or find largest and add 1
      this.state.accounts.forEach((account, index) => {
        // get the largest customerID if we didn't get one already
        if (!goodId && account[3] >= customerId) {
          customerId = account[3] + 1;
        }
        if (account[2] >= goodAccountNum) {
          goodAccountNum = account[2] + 1;
        }
      });

      // we have good account names, customer id and account number...save it.
      var tempLength;
      console.log(
        "goodAccountNum is",
        goodAccountNum,
        "customerId is ",
        customerId
      );

      if (this.state.name2 != "") {
        temp.push([
          0,
          this.state.inputPassword,
          goodAccountNum, // next account number
          customerId, // next customerId
          this.state.inputName,
          this.state.inputName2 // saved Joint account
        ]);
        tempLength = temp.length; // used to store index of current Customer
      } else {
        temp.push([
          0,
          this.state.inputPassword,
          goodAccountNum,
          customerId,
          accountNames
        ]);
        tempLength = temp.length; // used to store index of current Customer
      }
      console.log("Opening new bank account", accountNames);
      this.setState(
        {
          accounts: [...temp],
          currentOwner: [this.state.inputName, tempLength - 1]
        },
        () =>
          alert(
            "your account number is " +
              goodAccountNum +
              " CustomerId is " +
              customerId
          )
      );
      //}else alert("incorrect Customer Id or password");
    } else alert("incorrect Customer Id or password");
  }
  handleDeposit(evt) {
    console.log("deposit of " + this.state.orderAmount); //+  this.state.accounts[this.state.currentOwner[1]]);
    if (!Number(this.state.orderAmount)) {
      alert("Your amount must be a number");
      this.setState({ orderAmount: 0 }); //
    }
    let temp = [...this.state.accounts];

    console.log("copied state to update account", temp);
    let thisIndex = this.state.currentOwner[1];
    console.log("Index of CurrentOwner was set at pos[1] ", thisIndex);

    temp[thisIndex] = [
      parseFloat(temp[thisIndex][0]) + parseFloat(this.state.orderAmount),
      temp[thisIndex][1],
      temp[thisIndex][2]
    ];
    console.log(
      "updated the account in temp arry with new balance,next setState with temp ",
      temp
    );
    this.setState({ accounts: [...temp], orderAmount: 0 });
  }
  handleTransfer(evt) {
    console.log(
      "Transfer of " +
        this.state.orderAmount +
        " to account:" +
        this.state.inputTransferAccount
    );
    if (
      !Number(parseFloat(this.state.orderAmount)) ||
      !this.state.orderAmount
    ) {
      alert("Please enter transfer amount (amount must be a number)");
      this.setState({ orderAmount: 0 }); //
    } else if (!this.state.inputTransferAccount) {
      alert("Must Enter valid account number ");
    } else {
      // search for this account owner to get index:
      var transferAccountIndex;
      this.state.accounts.forEach((account, index) => {
        if (
          this.state.accounts[index][2] == this.state.inputTransferAccount // ensure account number exists
        ) {
          transferAccountIndex = index;
          console.log(
            "found owner of account, Depositing ",
            this.state.orderAmount
          );
        }
      });

      if (!transferAccountIndex) {
        alert("Please enter valid account number");
        this.setState({ inputTransferAccount: "" });
      } else {
        var temp = [...this.state.accounts];

        console.log("copied state to update account", temp);
        let thisIndex = this.state.currentOwner[1];
        console.log(
          "Now decrese currentOwner account and do transfer of ",
          this.state.orderAmount
        );
        // accounts format : [balance, password, account#, customerId, owner1, owner2]
        temp[thisIndex] = [
          parseFloat(temp[thisIndex][0]) - parseFloat(this.state.orderAmount),
          temp[thisIndex][1],
          temp[thisIndex][2],
          temp[thisIndex][3],
          temp[thisIndex][4],
          temp[thisIndex][5]
        ];
        temp[transferAccountIndex] = [
          parseFloat(temp[transferAccountIndex][0]) +
            parseFloat(this.state.orderAmount),
          temp[transferAccountIndex][1],
          temp[transferAccountIndex][2],
          temp[transferAccountIndex][3],
          temp[transferAccountIndex][4],
          temp[transferAccountIndex][5]
        ];

        console.log(
          "updated the account in temp arry with new balance,next setState with temp ",
          temp
        );
        alert(
          "Transfer successful to account # " +
            this.state.inputTransferAccount +
            " account is now $" +
            temp[transferAccountIndex][0]
        );
        this.setState({
          accounts: [...temp],
          orderAmount: 0,
          inputTransferAccount: 0
        });
      }
    }
  }

  handleWithdrawl() {
    console.log("withdrawl of ", this.state.orderAmount);
    let temp = [...this.state.accounts];

    console.log("copied state to update account", temp);
    let thisIndex = this.state.currentOwner[1];
    //Index of CurrentOwner was set at pos[1] of currentOwner

    temp[thisIndex] = [
      parseFloat(temp[thisIndex][0]) - parseFloat(this.state.orderAmount),
      temp[thisIndex][1],
      temp[thisIndex][2]
    ];
    console.log(
      "updated the account in temp arry with new balance,next setState with temp ",
      temp
    );

    let cashBack = this.state.orderAmount;
    // convert withdrawl to alternative currency if selected
    if (this.state.currency == "US") {
      cashBack =
        parseFloat(cashBack).toFixed(2) *
        parseFloat(this.state.cToUs).toFixed(2);
    } else if (this.state.currency == "Mexican Peso") {
      cashBack = (parseFloat(cashBack) * parseFloat(this.state.cToMp)).toFixed(
        2
      );
    }
    console.log("this is your withdrawl of $", cashBack, this.state.currency);
    alert("this is your withdrawl of $" + cashBack + this.state.currency);

    this.setState({ accounts: [...temp], orderAmount: 0 });
  }

  handleButton(evt) {
    console.log("button pressed", evt.target.id);
    var tempVal = 0;
    // clean this up with switch statement
    if (evt.target.id == "newAccount") {
      this.setState({ newAccount: true }, () =>
        alert("enter new account details")
      );
      // handle new account click
      // if(this.state.newAccount){
      // error checking to ensure no duplicate accounts
      // }

      // this will go in handle submit:

      //       let temp = [...this.state.accounts];
      //       if (this.state.name2 != "") {
      //         temp.push([
      //           0,
      //           this.state.inputPassword,
      //           this.state.inputName,
      //           this.state.inputName2
      //         ]);
      //       } else {
      //         temp.push([0, this.state.inputPassword, [this.state.inputName]]);
      //       }
      //       console.log("Opening new bank account");
      //       this.setState({ accounts: temp });
    } else if (evt.target.id == "us") {
      // handle us conversion
      // handle currency conversion US
      if (this.state.inputForeign) {
        tempVal = (
          parseFloat(this.state.inputForeign) * parseFloat(this.state.usToC)
        ).toFixed(2);
        console.log("we have computed US: ", tempVal);

        this.setState({ orderAmount: tempVal, currency: "US" });
      } else {
        // if no amount present, user selecting desired withdrawl currency
        this.setState({ currency: "US" });
      }
    } else if (evt.target.id == "mp") {
      // handle mexican conversion
      // handle currency conversion Mexican
      if (this.state.inputForeign) {
        tempVal = (
          parseFloat(this.state.inputForeign) * parseFloat(this.state.mpToC)
        ).toFixed(2);
        console.log("we have computed ", tempVal);
        this.setState({ orderAmount: tempVal, currency: "Mexican Peso" });
      } else {
        // if no amount present, user selecting desired withdrawl currency
        this.setState({ currency: "Mexican Peso" });
      }
    } else if ((evt.target.id = "currencyConverter")) {
      this.setState({
        showCurrencyConverter: !this.state.showCurrencyConverter
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('Login was submitted from form ' );
    if (!this.state.currentOwner) {
      // flag held in state will be set =false if login successful
      this.state.accounts.forEach((account, index) => {
        // check index 4 (and 5 for joint account) for account owner name
        console.log(
          "Compare ",
          this.state.accounts[0][4],
          this.state.inputName
        );

        if (
          this.state.accounts[index][4] == this.state.inputName ||
          this.state.accounts[index][5] == this.state.inputName
        ) {
          console.log(
            "found owner of account, checking password",
            this.state.inputName
          );
          if (this.state.inputPassword == this.state.accounts[index][1]) {
            // [index][1] is password // accounts format : [balance, password, account#, customerId, owner1, owner2]
            console.log("password passed login granted");
            this.setState(
              { currentOwner: [this.state.inputName, index], flag: false },
              () => {
                console.log(
                  "successful login ",
                  this.state.currentOwner[0],
                  this.state.flag
                );
                //return;
              }
            ); //Note currentOwner holds INDEX of this account in pos[1]
            // with current owner set, will display <ShowAccount/>
          } else {
            console.log("failed at password");
          }
        } else {
          console.log("Not this userName");
        }
      }); // end of forEach

      // reset form and send error message if flag =true(not logged in)
      this.setState({ inputName: "", inputPassword: "" }, function() {
        {
          this.state.flag ? alert("login failed, please try again") : null;
        }
      });
    } else {
      console.log(
        "handleSubmit from currency buttons- default page refresh stopped",
        event.target
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to World Wide Bank Canada</h1>

        {!this.state.currentOwner ? (
          <div>
            {this.state.newAccount ? (
              <NewAccount
                handleSubmit={e => this.handleSubmit(e)}
                handleChange={e => this.handleChange(e)}
                handleButton={e => this.handleButton(e)}
                handleNewAccount={e => this.handleNewAccount(e)}
                inputName={this.state.inputName}
                inputName2={this.state.inputName2}
                inputCustomerId={this.state.inputCustomerId}
                inputCustomerId={this.state.inputCustomerId}
                inputPassword={this.state.inputPassword}
                newAccount={this.state.newAccount}
              />
            ) : (
              <Login
                handleSubmit={e => this.handleSubmit(e)}
                handleChange={e => this.handleChange(e)}
                handleButton={e => this.handleButton(e)}
                handleNewAccount={e => this.handleNewAccount(e)}
                inputName={this.state.inputName}
                inputName2={this.state.inputName2}
                inputPassword={this.state.inputPassword}
                newAccount={this.state.newAccount}
              />
            )}
            Our Bank currently has {this.state.accounts.length} customers in
            Canada
            <ul>
              For Testing only:
              {this.state.accounts.map(item => (
                <li key={item[1]}>
                  {item[4]} {item[5] ? item[5] : null}
                  <br />
                  Password: {item[1]}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <br />
        )}
        <br></br>
        {this.state.currentOwner ? (
          <div>
            <ShowAccount
              accounts={this.state.accounts}
              accountAmount={this.state.accounts[this.state.currentOwner[1]][0]}
              accountName={this.state.currentOwner[0]}
              thisAccount={this.state.accounts[this.state.currentOwner[1]]}
              orderAmount={this.state.orderAmount}
              isTransfer={this.state.isTransfer}
              inputTransferAccount={this.state.inputTransferAccount}
              inputAccount={this.state.inputAccount}
              handleChange={e => this.handleChange(e)}
              handleDeposit={e => this.handleDeposit(e)}
              handleTransfer={e => this.handleTransfer(e)}
              handleWithdrawl={e => this.handleWithdrawl(e)}
              handleSubmit={e => this.handleSubmit(e)}
              handleButton={e => this.handleButton(e)}
            />
            {this.state.showCurrencyConverter ? (
              <Converter
                handleChange={e => this.handleChange(e)}
                handleSubmit={e => this.handleSubmit(e)}
                handleButton={e => this.handleButton(e)}
                inputForiegn={this.state.inputForiegn}
                currency={this.state.currency}
              />
            ) : (
              <br />
            )}
          </div>
        ) : (
          <br />
        )}
      </div>
    );
  }
}

module.exports = MainBank;
