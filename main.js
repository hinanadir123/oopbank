#! /usr/bin/env node
import inquirer from "inquirer";
// bank account class
class Bankaccount {
    accountnumber;
    balance;
    constructor(accountnumber, balance) {
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawel of  $${amount} successfull. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("insufficient balance.");
        }
    }
    // credit money
    deposite(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposite of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // check balance
    checkbalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
// customer class
class Customer {
    firstname;
    lastname;
    Gender;
    age;
    mobileno;
    account;
    constructor(firstname, lastname, Gender, age, mobileno, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.Gender = Gender;
        this.age = age;
        this.mobileno = mobileno;
        this.account = account;
    }
}
// create bank account
const Accounts = [
    new Bankaccount(1001, 50000),
    new Bankaccount(1002, 10000),
    new Bankaccount(1003, 15000),
];
// create customers
const customers = [
    new Customer("Hamza", "khan", "male", 35, 3165245222, Accounts[0]),
    new Customer("Hina", "mughal", "female", 35, 3165245222, Accounts[1]),
    new Customer("Hammada", "khan", "male", 45, 3165245222, Accounts[2])
];
// function interaction with bank account
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter your account number here:"
        });
        const customer = customers.find(customer => customer?.account.accountnumber === accountnumberinput.accountnumber);
        if (customer) {
            console.log(`welcom ${customer.firstname} ${customer.lastname}`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposite", "withdraw", "check balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposite":
                    const depositeamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite:"
                    });
                    customer.account.deposite(depositeamount.amount);
                    break;
                case "withdraw":
                    const withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.deposite(withdrawamount.amount);
                    break;
                case "check balance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log("Existing bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number or user. Please try again.");
        }
    } while (true);
}
service();
