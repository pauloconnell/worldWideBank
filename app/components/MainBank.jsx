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
    // currentOwner format = [name, index, customerId, acct#s]  note: acct #'s only added if transfer clicked
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
      inputTransferFromAccount: "0",
      currency: "Canadian",
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
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.setState({
      accounts: [
        // format for accounts is [balance, password, account#, customerId, owner1, owner2]
        [10, "a", "1", "1", "Paul", "Tara"],
        [12, "a", "3", "3", "Teagan"],
        [100, "a", 1234, 777, "Stewie Griffin"],
        [35000, "a", 2001, 504, "Glenn Quagmire"],
        [7425, "a", 1010, 2, "Joe Swanson"],
        [150, "a", 123, 123, "Peter Griffin"],
        [15000, "a", 5500, 2, "Joe Swanson"]
      ]
    });
  }
  componentWillUnmount() {}

  handleChange(evt) {
    // clean this up using name=evt.target = name in State

    console.log("changed", evt.target.name, evt.target.value);
    //console.log(evt.target.name);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleNewAccount(e) {
    console.log("button pressed", e.target.id);
    var tempVal = 0;
    var accountNames;
    var customerId = 0; // used to find highest current number to select next customerId #
    var goodId;
    var goodName = false;
    var goodPassword;

    // format for accounts is [balance, password, account#, customerId, owner1, owner2]
    //  error checking to ensure entered customer id matches associated password
    if (this.state.inputCustomerId) {
      // if user entered customerId to create additional account for existing customer:
      this.state.accounts.forEach((account, index) => {
        // get this account and check password
        if (
          account[1] == this.state.inputPassword &&
          account[3] == this.state.inputCustomerId
        ) {
          goodName = true;
          goodPassword = this.state.inputPassword;
          goodId = this.state.inputCustomerId; // record verified customer Id
          accountNames = [account[4]];
          if (account[5]) accountNames.push(account[5]);
        }
      });
    } else {
      goodName = true; // if not existing customer-proceed to next stage
      accountNames = [this.state.inputName, this.state.inputName2];
    } // ie. goodName could be false if password above failed,
    // and thus will skip down to send error message below
    if (goodName) {
      let goodAccountNum = 0;
      let temp = [...this.state.accounts];
      if (goodId) {
        // only set if verified password above
        customerId = goodId; // load in customerId from above (if found)
      }
      // loop through accounts to get highest account #, add 1 and use here (same if no customer # yet)
      this.state.accounts.forEach((account, index) => {
        // get the largest customerID if we didn't get one already from above
        if (!goodId && account[3] >= customerId) {
          // if we already have one, skip
          customerId = account[3] + 1;
          console.log("customer id could be ", customerId);
        } // format for accounts is [balance, password, account#, customerId, owner1, owner2]
        if (account[2] >= goodAccountNum) {
          // either way, find the next biggest account num
          goodAccountNum = account[2] + 1; // then add one to use for this account
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

      // update temp array then use to set state
      temp.push([
        0,
        this.state.inputPassword,
        goodAccountNum, // next account number
        customerId, // next customerId
        accountNames
      ]);
      tempLength = temp.length; // used to store index of current Customer

      console.log("Opening new bank account", accountNames);
      this.setState(
        {
          accounts: [...temp],
          currentOwner: [this.state.inputName, tempLength - 1, customerId]
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
    } else {
      let temp = [...this.state.accounts];

      console.log("copied state to update account"); //, temp);
      let thisIndex = this.state.currentOwner[1];
      // console.log("Index of CurrentOwner was set at pos[1] ", thisIndex);

      temp[thisIndex][0] = [
        parseFloat(temp[thisIndex][0]) + parseFloat(this.state.orderAmount)
      ];
      //console.log("updated the account in temp arr with new balance, next setState with temp ", temp);
      this.setState({ accounts: [...temp], orderAmount: 0 });
    }
  }
  handleTransfer(evt) {
    console.log(
      "Transfer of $" +
        this.state.orderAmount +
        " to account:" +
        this.state.inputTransferAccount
    );
    // validate inputs:
    if (
      !Number(parseFloat(this.state.orderAmount)) ||
      !this.state.orderAmount
    ) {
      alert("Please enter transfer amount (amount must be a number)");
      this.setState({ orderAmount: 0 }); //
    } else if (
      !Number(parseFloat(this.state.inputTransferAccount)) ||
      !this.state.inputTransferAccount
    ) {
      alert("Must Enter valid account number 1");
      this.setState({ inputTransferAccount: 0 });
    } else if (
      //this.state.inputTransferFromAccount != null &&
      !this.state.inputTransferFromAccount //!Number(parseFloat(this.state.inputTransferFromAccount))
    ) {
      alert("Must Enter your valid account number To transfer from");
      this.setState({ inputTransferFromAccount: 0 });
    } else {
      // search for this account owner  get index:

      var transferTo = false; // will ensure to account exists
      var transferToAccountIndex;
      var transferFromAccountIndex;
      var validatedAccountOwner;
      var transferFromAccount = this.state.inputTransferFromAccount;
      var transferToAccount = this.state.inputTransferAccount;
      //if (transferFromAccount == 0) {
      // if TranferFrom is empty - fill it in
      // accounts format : [balance, password, account#, customerId, owner1, owner2]
      //  transferFromAccount = this.state.currentOwner[3][0]; // use default account
      //  transferFromAccountIndex = this.state.currentOwner[3][1]; // use default index
      // }
      // accounts format : [balance, password, account#, customerId, owner1, owner2]
      //currentOwner format: name, index, custId, acct#
      if (transferFromAccount > 0) {
        this.state.accounts.forEach((account, index) => {
          if (account[2] == transferToAccount) {
            transferTo = true;
            transferToAccountIndex = index; // got TransferTo index
          }

          if (account[2] == transferFromAccount) {
            // find From account details
            if (account[3] == this.state.currentOwner[2]) {
              // ensure  From account owner matches current OwnerId

              // currentOwner format = [name, index, customerId, [acct#s, index]]
              transferFromAccountIndex = index;

              console.log(
                transferFromAccount,
                transferFromAccountIndex,
                "Confirmed owner of this account",
                account.toString()
              );
              // let tempOtherAccount = [...this.state.currentOwner];
              // tempOtherAccount.push([account[2], index]); // load up all account numbers(with index) for this owner
              //  this.setState({ currentOwner: tempOtherAccount }); // save to currentOwner state
              validatedAccountOwner = true; // currentOwner owns the other account
              console.log(
                transferFromAccountIndex,
                "=From index, found owner of account, Depositing: $",
                this.state.orderAmount
              );
            } else alert("Please only transfer from your own accounts");
          }
        });

        console.log(
          "transferFromAccountIndex",
          transferFromAccountIndex,
          transferToAccountIndex
        );
        // if (!validatedAccountOwner) {
        //   alert(
        //     "Must Enter valid account number-you can only transfer from your accounts Line 240 "
        //   );
        //   validatedAccountOwner = false;
        //   this.setState({ inputTransferFromAccount: 0 });
        // }
      } else {
        // if no FromAccount set, use current account
        // find index of To account in master accounts[]
        this.state.accounts.forEach((account, index) => {
          if (account[2] == transferToAccount) {
            transferTo = true;
            transferToAccountIndex = index; // got TransferTo index
          }
        });
        transferFromAccount = this.state.currentOwner[3]; // use default account
        transferFromAccountIndex = this.state.currentOwner[4]; // use default index
        validatedAccountOwner = true;
        console.log(
          "transfer from this account",
          transferFromAccount,
          transferFromAccountIndex
        );
      }
      if (transferFromAccountIndex == "null") {
        alert("Please enter valid account number 4", transferFromAccount);
        this.setState({ inputTransferAccount: "0" });
      } else if (validatedAccountOwner) {
        // only update state if user owns transferFrom account
        var temp = [...this.state.accounts];

        console.log("copied state to update account", temp);

        // let thisIndex = this.state.currentOwner[1]; // currentOwner format = [name, index, customerId, acct#y, indexy]]
        //console.log("Now decrease From account and do transfer of ",this.state.orderAmount,"from",temp[transferFromAccountIndex],"to",temp[transferToAccountIndex]);
        //
        // this.state.currentOwner.forEach((item, index) => {
        //   if (item[0] == this.state.inputTransferAccount) {
        //     transferFromAccountIndex = index;
        //   }
        // });

        // if (
        //    this.state.accounts[thisIndex][2] ==
        //    this.state.inputTransferFromAccount
        //  ) {
        //  }
        // accounts format : [balance, password, account#, customerId, owner1, owner2]
        (temp[transferFromAccountIndex][0] = [
          parseFloat(temp[transferFromAccountIndex][0]) -
            parseFloat(this.state.orderAmount)
        ]),
          (temp[transferToAccountIndex][0] = [
            parseFloat(temp[transferToAccountIndex][0]) +
              parseFloat(this.state.orderAmount)
          ]);

        console.log(
          "updated the account in temp arry with new balance,next setState with temp ",
          temp
        );
        alert(
          "Transfer successful to account # " +
            this.state.inputTransferAccount +
            " account is now $" +
            temp[transferFromAccountIndex][0]
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
    } else if (evt.target.id == "Ca") {
      console.log("back to Canadian ", tempVal);
      this.setState({ orderAmount: tempVal, currency: "Canadian" });
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
              // setting default account(currentOwner) to hold name, index in accounts[], and customerId
              {
                currentOwner: [
                  //currentOwner format: name, index, custId, acct#, index, accty, indexy, ect
                  this.state.inputName,
                  index,
                  this.state.accounts[index][3], // customerId

                  this.state.accounts[index][2], // account #s
                  index // with index of account on master accounts[]
                ],
                flag: false,
                inputFromAccount: this.state.accounts[index][2] // holds transfer from account
              },
              () => {
                console.log("successful login ", this.state.currentOwner[0]);
                //return;
              }
            ); //Note currentOwner holds INDEX of this account in pos[1]
            // with current owner set, will display <ShowAccount/>
          } else {
            console.log("failed at password");
          }
        } else {
          //console.log("Not this userName");
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
  handleLogout(event) {
    console.log("Logging out");
    this.setState({
      inputName: "",
      inputPassword: "",
      newAccount: false,
      flag: true,
      currentOwner: null
    });
  }
  render() {
    return (
      <div ><center>
    
        
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
                 Owner:{item[4]} Joint Owner:{item[5] ? item[5] : null}
                  <br />
                  Customer ID# {item[3]}<br />
                  Account # {item[2]}<br />
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
              inputTransferFromAccount={this.state.inputTransferFromAccount}
              inputAccount={this.state.inputAccount}
              currency={this.state.currency}
              showCurrencyConverter={this.state.showCurrencyConverter}
              handleChange={e => this.handleChange(e)}
              handleDeposit={e => this.handleDeposit(e)}
              handleTransfer={e => this.handleTransfer(e)}
              handleWithdrawl={e => this.handleWithdrawl(e)}
              handleSubmit={e => this.handleSubmit(e)}
              handleButton={e => this.handleButton(e)}
              handleLogout={e => this.handleLogout(e)}
            />
          </div>
        ) : (
          <br />
        )}
        </center>
      </div>
    );
  }
}

module.exports = MainBank;
