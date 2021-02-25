# Starter React Router App on Glitch

Scenario:
The World Wide Bank is a growing bank based in Canada that accepts money in North American
currencies.
The Bank’s customers can:<br>
-create 1 or more checking accounts, including joint accounts<br>
-The checking account balance is always tracked in Canadian currency.<br>
-Deposits and withdraws can be made in Canadian dollars, US dollars or Mexican Pesos. <br>
-The applicable exchange rate is applied when depositing or withdrawing a foreign currency. <br>
-Funds can be transferred between two different accounts. <br>

# Design Doc:

create <MainBank /> component with state to hold all accounts and handle all actions to setState<br>
create <NewAccount /> to open new accounts-render conditionally upon button click<br>
create <login /> to setState with currentOwner and register the index of this account in the accounts[]-which contains all account info
once login or newAccount is created, <login /> hides and this renders:
<ShowAccount /> to show account balance and allow deposit/withdrawl
<br>
create conditionally rendered < Converter /> accepts US, or MP and converts it to canadian and puts that amount in the main \$input field.<br />
simply deposits the canadian amount on deposit, <br />
or if withdrawl, (and US or MP button was clicked) the canadian withdrawl amount will be converted to the currency as per button click<br />
Alert will display amount of withdrawl in desired currency.
<br>

## By [Glitch](https://glitch.com/)

Glitch is the friendly commmunity where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

[Find out more](https://glitch.com/about).

\ ゜ o ゜)ノ
