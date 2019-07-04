--ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DECIMAL(10, 2),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
    ('Orion Observer 80ST ', 'Electronics', 129.99, 40),
    ('Cordless Water Flosser, Nicefeel', 'Oral Care', 33.99, 100),
    ('Toddler pillow', 'Pillows', 13.59, 500),
    ('Echo (2nd Generation)', 'Electronics', 69.99, 100),
    ('Lava Rock Bracelet', 'Jewelry', 17.49, 143),
    ('Comelyjewel Fashion Jewelry Charm', 'Jewelry', 12.99, 35),
    ('Pearl Stud Earrings & Silver Chain Pendant', 'Jewelry', 19.99, 100),
    ('2-in-1 Water Dental Flosser & Electric Toothbrush ', 'Oral Care', 36.99, 190),
    ('Seiko Radio Sync Solar Watch', 'Watches', 299.95, 150),
    ('Weil & Harburg Karkin Mens Chronograph Watch', 'Watches', 198.00, 10);
SELECT * FROM products;
