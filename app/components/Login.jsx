const React = require("react");
const Link = require("react-router-dom").Link;
const NewAccount = require("./NewAccount");

/* the main page for the about route of this app */
const Login = function(props) {
  var newAccountVis = false;
  return (
    <div>
      <h2>
        Please Login <br />
        or Click button to Make a new Account
      </h2>
      <h3>Enter owner Name(s)</h3>

      <form onSubmit={props.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={props.inputName}
            onChange={props.handleChange}
            minlength="4"
            maxlength="18"
            required
          />
        </label>
        {newAccountVis ? (
          <label>
            Joint Account 2nd Name:
            <input
              type="text"
              name="inputName2"
              value={props.inputName2}
              onChange={props.handleChange}
              minlength="4"
              maxlength="12"
            />
          </label>
        ) : null}

        <label>
          Password:
          <input
            type="text"
            name="password"
            value={props.inputPassword}
            onChange={props.handleChange}
            minlength="1"
            maxlength="12"
            required
          />
        </label>
        <input type="submit" value="Submit" />

        {props.newAccount ? <NewAccount /> : <br />}
      </form>
      <br />
      <button id="newAccount" onClick={props.handleButton}>
        New Account
      </button>
    </div>
  );
};

module.exports = Login;
