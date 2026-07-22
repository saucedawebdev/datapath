/**
 * Northstar Commerce — SQL dataset for playground and exercises.
 */
export const northstarDataset = {
  id: 'northstar-commerce',
  name: 'Northstar Commerce',
  description: 'Fictional mid-market retailer — customers, orders, products, marketing, and support data.',
  seedSql: `
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  region TEXT NOT NULL,
  segment TEXT NOT NULL,
  signup_date TEXT NOT NULL
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit_cost REAL NOT NULL,
  list_price REAL NOT NULL
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  status TEXT NOT NULL,
  channel TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE marketing_campaigns (
  campaign_id INTEGER PRIMARY KEY,
  campaign_name TEXT NOT NULL,
  channel TEXT NOT NULL,
  start_date TEXT NOT NULL,
  spend REAL NOT NULL
);

CREATE TABLE support_tickets (
  ticket_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  opened_date TEXT NOT NULL,
  category TEXT NOT NULL,
  resolved_date TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO customers VALUES
(1,'Ava','Martinez','ava.m@example.com','West','Premium','2022-01-15'),
(2,'Noah','Patel','noah.p@example.com','Midwest','Standard','2022-03-22'),
(3,'Emma','Johnson','emma.j@example.com','South','Premium','2022-06-10'),
(4,'Liam','Chen','liam.c@example.com','Northeast','Standard','2022-08-05'),
(5,'Sophia','Williams','sophia.w@example.com','West','Standard','2023-01-18'),
(6,'Ethan','Brown','ethan.b@example.com','Midwest','Premium','2023-04-02'),
(7,'Mia','Davis','mia.d@example.com','South','Standard','2023-07-14'),
(8,'Lucas','Garcia','lucas.g@example.com','Northeast','Premium','2023-09-30');

INSERT INTO products VALUES
(101,'Desk Organizer','Office',8.50,19.99),
(102,'LED Desk Lamp','Lighting',22.00,49.99),
(103,'Ergonomic Chair','Furniture',180.00,399.99),
(104,'Wireless Keyboard','Electronics',35.00,79.99),
(105,'Notebook Set','Stationery',4.00,12.99),
(106,'Monitor Stand','Furniture',28.00,59.99),
(107,'USB-C Hub','Electronics',18.00,44.99),
(108,'Standing Mat','Office',25.00,54.99);

INSERT INTO orders VALUES
(1001,1,'2024-01-05','delivered','web'),
(1002,1,'2024-02-12','delivered','web'),
(1003,2,'2024-01-18','delivered','mobile'),
(1004,3,'2024-02-01','delivered','web'),
(1005,3,'2024-03-08','shipped','web'),
(1006,4,'2024-01-22','delivered','partner'),
(1007,5,'2024-02-15','delivered','web'),
(1008,6,'2024-03-01','delivered','mobile'),
(1009,7,'2024-03-10','processing','web'),
(1010,8,'2024-03-18','delivered','web');

INSERT INTO order_items VALUES
(1,1001,101,2,19.99),(2,1001,105,1,12.99),
(3,1002,103,1,399.99),(4,1003,104,1,79.99),
(5,1004,102,1,49.99),(6,1004,106,1,59.99),
(7,1005,107,2,44.99),(8,1006,108,1,54.99),
(9,1007,101,3,19.99),(10,1008,103,1,399.99),
(11,1009,105,2,12.99),(12,1010,102,1,49.99);

INSERT INTO marketing_campaigns VALUES
(1,'Spring Sale Email','email','2024-03-01',2500.00),
(2,'Social Retargeting','social','2024-02-15',1800.00),
(3,'Partner Co-op','partner','2024-01-10',3200.00);

INSERT INTO support_tickets VALUES
(1,1,'2024-02-20','shipping','2024-02-22'),
(2,3,'2024-03-05','returns','2024-03-07'),
(3,5,'2024-03-12','product','2024-03-14');
`,
};

export const datasets = [northstarDataset];

export default northstarDataset;
