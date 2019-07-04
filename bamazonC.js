var mysql = require("mysql");
var inquirer = require("inquirer");

const Table = require("cli-table2");
const chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connection successful");
    
    displayItems();
});

var chosenItem = {};

var resetCart = function() {
    chosenItem = {};
}

var displayItems = function() {
    connection.query(`SELECT * FROM products`, function(err, result) {
        var listTable = new Table({
            head: ["Item ID", "Product Name", "Price"],
            colWidths: [10, 52, 12],
            
        });

        for (var i = 0; i < result.length; i++) {
            listTable.push([result[i].item_id, result[i].product_name, "$" + result[i].price]);
        }
        
        console.log("\n" + listTable.toString() + "\n");
        
        askForProductId();
    });
};

var askForProductId = function() {
    inquirer.prompt({
        name: "itemId",
        type: "input",
        message: "Enter the ID of the product you would like to purchase:",
        
        validate: function(value) {
            if (!isNaN(value) && (value > 0 && value <= 10)) {
                return true;
            }
            else {
                console.log(chalk.red(" => Please enter a number from 1-10"));
                return false;
            }
        }
    
    }).then(function(answer) {
        connection.query(
            "SELECT item_id, product_name, price, stock_quantity, product_sales FROM products WHERE ?",
            { item_id: answer.itemId },
            function(err, result) {
                confirmItem(result[0].product_name, result);
           });
    });
};

var confirmItem = function(product, record) {
    inquirer.prompt({
        name: "confirmItem",
        type: "confirm",
        message: "You chose" + chalk.blue.bold("'" + product + "'. ") + "Is this correct?"
    }).then(function(answer) {
        if (answer.confirmItem) {
            chosenItem = {
                item_id: record[0].item_id,
                product_name: record[0].product_name,
                price: record[0].price,
                stock_quantity: record[0].stock_quantity,
                product_sales: record[0].product_sales
            };
            
            askHowMany(chosenItem.item_id);
        } else {
            askForProductId();
        }
    });
};

var askHowMany = function(chosenID) {
    inquirer.prompt({
        name: "howMany",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
            if (!isNaN(value) && value > 0) {
                return true;
            }
            else {
                console.log(chalk.red(" => Oops, please enter a number greater than 0"));
                return false;
            }
        }
    }).then(function(answer) {
        connection.query(
            "SELECT stock_quantity FROM products WHERE ?",
            { item_id: chosenItem.item_id },
            function(err, result) {
                if (result[0].stock_quantity < answer.howMany) {
                    console.log(chalk.blue.bold("\n\tSorry, insufficient quantity in stock!\n"));
                    
                    inquirer.prompt({
                        name: "proceed",
                        type: "confirm",
                        message: "Would you still like to purchase this product?"
                    }).then(function(answer) {
                        if (answer.proceed) {
                            askHowMany(chosenItem.item_id);
                        }
                        else {
                            console.log(chalk.blue.bold("\n\tThanks for visiting! We hope to see you again soon.\n"));
                            connection.end();
                        }
                    });
                }
                else {
                    chosenItem.howMany = answer.howMany;
                    console.log(chalk.blue.bold("\n\tOrder processing..."));
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - answer.howMany,
                                product_sales: chosenItem.product_sales + (chosenItem.price * answer.howMany)
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function() {
                            console.log(chalk.blue.bold("\n\tOrder confirmed!!! Your total was $" + (chosenItem.price * chosenItem.howMany).toFixed(2) + ".\n"));
                        
                            promptNewPurchase();
                    });
                }
        });
    });
}

var promptNewPurchase = function() {
    inquirer.prompt({
        name: "newPurchase",
        type: "confirm",
        message: "Would you like to make another purchase?"
    }).then(function(answer) {
        if (answer.newPurchase) {
            resetCart();
            askForProductId();
        }
        else {
            console.log(chalk.blue.bold("\n\tWe appreciate your business. Have a great day!\n"));
            connection.end();
        }
    });
};
