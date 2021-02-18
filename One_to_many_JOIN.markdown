# One to Many JOINs #

Create the database and tables, with foreign keys to relate each table

```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100)
);
```

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8 , 2 ),
    customer_id INT,
    FOREIGN KEY (customer_id)
        REFERENCES customers (id)
);
```

```sql
INSERT INTO customers (first_name, last_name, email) 
VALUES ('Boy', 'George', 'george@gmail.com'),
       ('George', 'Michael', 'gm@gmail.com'),
       ('David', 'Bowie', 'david@gmail.com'),
       ('Blue', 'Steele', 'blue@gmail.com'),
       ('Bette', 'Davis', 'bette@aol.com');
```

```sql
INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2016/02/10', 99.99, 1),
       ('2017/11/11', 35.50, 1),
       ('2014/12/12', 800.67, 2),
       ('2015/01/03', 12.50, 2),
       ('1999/04/11', 450.25, 5);
```

+ **Cross joins**

Instead of

```sql
SELECT * FROM orders  WHERE customer_id =
	(SELECT * FROM customers WHERE last_name = 'George'
    );
```

use JOIN 

A cross (implicit) join simply joins each row of one table with each row of another, as:
row1, rowA
row1, rowB,
row1, rowC,
row2, rowA,
row2, rowB,
...

Hence for n rows in one table and m rows in the other table, the cross-join
produces a table with mn rows. There is no meaning to the resultant table.

```sql
SELECT 
    *
FROM
    customers,
    orders;
```

Implicit inner JOINs
Try to match customer_id with both tables

```sql
SELECT 
    *
FROM
    customers,
    orders
WHERE
    customers.id = orders.customer_id;
```

+ **Explicit inner join (using JOIN explicitly)**

The inner refers to the intersection (union) of two sets (applied and implied by default)

```sql
SELECT 
    *
FROM
    customers
        JOIN
    orders ON customers.id = orders.customer_id;
```
 
Generally:

```sql
SELECT column(s) FROM 
table1 JOIN table2 ON someCriteria 
WHERE (someList) 
GROUP BY (someOtherList)
ORDER BY (something);
```

The join statement, written as...

```sql
SELECT * FROM orders
JOIN customers ON orders.customer_id = customer.id;
```

...achieves the same result, however presented the other way round
Always use the unique id's intended to relate tables and no other id which may be present.

```sql
SELECT 
    *
FROM
    customers
        LEFT JOIN
    orders ON orders.customer_id = customers.id;
```

This lists all of customers (the left) and if applicable, the associations 
with orders. Rows, which have a join, are listed more often than those without 
any join. For rows without a join, the corresponding right-hand table records 
are automatically filled in with NULL entries

```sql
SELECT 
    first_name, last_name, IFNULL(SUM(amount), 0) AS total_spent
FROM
    customers
        LEFT JOIN
    orders ON customers.id = orders.customer_id
GROUP BY customers.id
ORDER BY total_spent;
```
The above statement uses IFNULL to substitute NULL with 0
It groups each customer by their id and sum's their total spending

```sql
SELECT 
    *
FROM
    customers
        RIGHT JOIN
    orders ON orders.customer_id = customers.id;
```

+ **Deleting rows and their associated relations on other tables**

```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100)
);
```

```sql 
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8 , 2 ),
    customer_id INT,
    FOREIGN KEY (customer_id)
        REFERENCES customers (id)
        ON DELETE CASCADE
);
```
The ON DELETE CASCADE enables a customer to be deleted along with their assoc. orders record