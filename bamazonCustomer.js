var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yunker",
    database: "bamazon"
});

var productSelection = "";
var quantitySelection = 0;
var inventory = "";

connection.connect(function(err){
    if (err) throw err;
    bamazonStore();
    });


function bamazonStore(){
    connection.query(
      `SELECT * 
      FROM bamazon.products;`,
      function(err, response){
          if (err) throw err;
          console.log("----------- Bamazon Store -----------");
          for(var i =0; i< response.length; i++){
          console.log("ID: "+response[i].item_id + " | Stock: "+response[i].stock_quantity +" | Product: " + response[i].product_name + " | Price: $" + response[i].price);      
      };
      console.log("--------------------------------------");
      start();
      inventory = response;
  });
};
// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "product",
        type: "input",
        message: "What product ID are you interested in?",
        // choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.product === "1" || answer.product === "2" || answer.product === "3" || answer.product === "4" || answer.product === "5" || answer.product === "6" || answer.product === "7"|| answer.product === "8" || answer.product === "9" || answer.product === "10") {
          productSelection = answer.product-1;
          quantity(productSelection);
        }
        else {
          console.log("Sorry, try again.");
          start();
        }
      });
  };

  function quantity(productSelection) {
    inquirer
      .prompt({
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
        // choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
         if (answer.quantity < inventory[productSelection].stock_quantity+1 && answer.quantity > 0){
          console.log("Congratulations! Your order is confirmed. \nYou purchased " + answer.quantity + " " + inventory[productSelection].product_name + "s");
          quantitySelection = answer.quantity;
          console.log("Total Amount = $"+ quantitySelection * inventory[productSelection].price +"\n");
          updateProduct();
         } else {
        console.log("Oops, try again.\n");
        start();
        };
      });
    };

    function updateProduct() {
      newQuantity = inventory[productSelection].stock_quantity - quantitySelection
      connection.query("UPDATE bamazon.products SET ? WHERE ?",
      [
        {
          stock_quantity: newQuantity
        },
        {
          item_id: productSelection+1
        }
      ],
      function(err, res) {
        if (err) throw err;
        bamazonStore();
      });
    }; 
    