drop database bamazon;

create database bamazon;

create table bamazon.products(
  item_id INTEGER NOT NULL AUTO_INCREMENT primary key,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price decimal (10,2) null,
  stock_quantity integer(10)
  );
  
