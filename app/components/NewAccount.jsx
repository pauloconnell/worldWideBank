const React = require("react");
const Link = require("react-router-dom").Link;

/* the main page for the about route of this app */
function NewAccount(props) {
  console.log("got props", props);

  return (
    <div>
      <h2>Make a new Account</h2>
      <h3>Enter owner Name(s)</h3>

      <form onSubmit={props.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="inputName"
            value={props.inputName}
            onChange={props.handleChange}
            minlength="4"
            maxlength="12"
            required
          />
        </label>
        <label>
          Joint Account 2nd Name:(optional-new Accounts only)
          <input
            type="text"
            name="inputName2"
            value={props.inputName2}
            onChange={props.handleChange}
            minlength="4"
            maxlength="12"
          />
        </label>
        
        <label>
          Password:
          <input
            type="text"
            name="inputPassword"
            value={props.inputPassword}
            onChange={props.handleChange}
            minlength="1"
            maxlength="12"
            required
          />
        </label>
         <label>
          Existing Clients: Enter Customer Id (and existing password)
          <input
            type="text"
            name="inputCustomerId"
            value={props.inputCustomerId}
            onChange={props.handleChange}
            minlength="4"
            maxlength="12"
          />
        </label>
      </form>
      <button id="openAccount" onClick={props.handleNewAccount}>
        New Account
      </button>
    </div>
  );
}

module.exports = NewAccount;
