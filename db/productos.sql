-- ===============================================
-- BASE DE DATOS TIENDA CON IMÁGENES DE WIKIPEDIA
-- ===============================================

CREATE DATABASE IF NOT EXISTS proyecto_tienda;
USE proyecto_tienda;

CREATE TABLE users(
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT(6) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user VARCHAR(50) NOT NULL, 
    date DATETIME NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE order_product(
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,    
    amount INT NOT NULL,
    FOREIGN KEY (id_order) REFERENCES orders(id),
    FOREIGN KEY (id_product) REFERENCES products(id)
);

DELIMITER $
CREATE TRIGGER reduce_product_stock
AFTER INSERT ON order_product
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.amount
    WHERE id = NEW.id_product;
END$
DELIMITER ;

ALTER TABLE products
ADD CONSTRAINT chk_stock_min CHECK (stock >= 0);

INSERT INTO products (name, price, stock, image) VALUES
('Doritos Nacho Cheese', 3.99, 150, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\doritos.png'),
('Lay\'s Classic', 2.89, 200, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\lays.png'),
('Cheetos Crunchy', 3.49, 120, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\cheetos.png'),
('Pringles Original', 4.29, 80, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\pringles.png'),
('Kit Kat Bar', 2.99, 100, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\kitkat.png'),
('Oreo Cookies', 4.99, 90, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\oreos.png'),
('M&M\'s Peanut', 3.79, 110, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Plain-M%26Ms-Pile.jpg/300px-Plain-M%26Ms-Pile.jpg'),
('Snickers Bar', 2.49, 140, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\snickers.png'),
('Twix Cookie Bar', 2.79, 95, 'C:\\Users\\forwa\\Desktop\\Proyecto Tienda\\assets\\twix.jpg'); 
