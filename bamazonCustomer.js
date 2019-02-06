var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    buyPrompt(res);
  });
}

function buyPrompt(res) {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "\nUse Item Id to Select Product."
      },
      {
        name: "quantity",
        type: "input",
        message: "\nPlease enter number of units to purchase.\n"
      }
    ])
    .then(function(data) {
      id = data.id;
      quantity = data.quantity;
      stockQuantity(data.id, data.quantity);
    });
}

function stockQuantity(id, quantity) {
  connection.query(
    "SELECT stock_quantity, price FROM products WHERE id = " + id,
    function(err, res) {
      if (err) throw err;
      purchase(res[0].stock_quantity, quantity, res[0].price, id);
    }
  );
}

function purchase(quantityRemaining, quantityRequest, price, id) {
  if (quantityRemaining < quantityRequest) {
    inquirer
      .prompt({
        name: "editRequest",
        type: "rawlist",
        message:
          "Insufficient quantity to fullfill order. Would you like to change your request to a smaller value?",
        choices: ["Yes", "No"]
      })
      .then(function(data) {
        if (data.confirm === "No") {
          console.log("Thank you for your business!");
          connection.end();
        } else {
          runSearch();
        }
      });
  } else {
    total = total + price * quantity;
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity -  " +
        quantity +
        " WHERE ?",
      [
        {
          item_id: id
        }
      ],
      function(err, res) {
        if (err) throw err;

        inquirer
          .prompt({
            name: "confirm",
            type: "rawlist",
            message:
              "\nYour total for this transaction is: $" +
              (price * quantity).toString() +
              ". Would you like to make another purchase?",
            choices: ["Yes", "No"]
          })
          .then(function(data) {
            if (data.confirm === "No") {
              console.log("\nThe total for today is: $" + total.toString());
              connection.end();
            } else {
              runSearch();
            }
          });
      }
    );
  }
}
