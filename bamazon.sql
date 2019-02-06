CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Himalayan Crystal Salt Lamp", "Home & Garden", 17, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot II", "Electronics", 50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Anker Portable Charger", "Electronics", 20, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cuisineart Coffee Grinder", "Home & Garden", 17, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("New Balance Shoes", "Clothing & Jewelry", 40, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle PaperWhite", "E-readers & Books", 130, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ELF", "Movies & Entertainment", 10, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KASA Smart Outlet", "Electronics", 12, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Memory Foam Seat Cushion", "Home & Garden", 50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamin D3", "Health & Wellness", 11, 125);

SELECT * FROM products;