# Inserting data into SQL tables #

Insert values into a table using the following general form:

```sql
INSERT INTO table_name(column_name) VALUES (data);
```

For example:

```sql
INSERT INTO dogs(name, age) VALUES ('Bobby', 12);
```

The order of the values entered need not match the order in the table. However, the order table_name parameters and values parameters must match.

One can insert multiple rows using:

```sql
INSERT INTO table_name 
            (column_name, column_name) 
VALUES      (value, value), 
            (value, value), 
            (value, value);
```

The form of the input above need not be written with whitespace but is the preferred format when dealing with views (saved SQL commands). The same rules about ordering apply.

### Quotes in varchar's ###

If you're wondering how to insert a string (VARCHAR) value that contains quotations, then here's how.

- Escape the quotes with a backslash: 

```sql
"This text has \"quotes\" in it" or 'This text has \'quotes\' in it'
```

- Alternate single and double quotes: 

```sql
"This text has 'quotes' in it" or 'This text has "quotes" in it'
```

### Warning messages in MySQL ###

Extra long strings or invalid data types give warnings, which can be shown right after the console message using:

```sql
SHOW WARNINGS;
```

### NULL, NOT NULL and DEFAULT ###
NULL is undefined. Setting columns as NOT NULL forces MySQL to reject all NULL entries (i.e. a value is required) and then tries to set the DEFAULT if set.

If there are no default values set and the column is labelled NOT NULL (see below) when a table is created, then MySQL will insert zero for INT data types and empty strings '' for VARCHAR().

```sql
INSERT INTO table_name(column_name) VALUES (data NOT NULL);
```

Entries with no values entered are considered NULL and handled depending on the table settings, for example:

```sql
INSERT INTO table_name(column_name) VALUES ();
```

Setting a default value is achieved with:

```sql
CREATE TABLE dogs
  (
    name VARCHAR(35) DEFAULT 'not known to us',
    age INT DEFAULT 99
  );
```

If a NULL is passed to the above, then they are set as NULL. 

The following statements reject NULL input and subsequently set the defaults:

```sql
CREATE TABLE dogs
  (
    name VARCHAR(35) NOT NULL DEFAULT 'not known to us',
    age INT NOT NULL DEFAULT 99
  );
```

### Primary Keys ###
A column marked by the PRIMARY KEY column must contain rows with unique values. All other columns can contain duplicated values.

```sql
CREATE TABLE some_table
  (
    field_id INT NOT NULL,
    name VARCHAR(100),
    age INT,
    PRIMARY KEY (field_id)
  );
```

The table some_table above contains a column, field_id, which must contain unique (non-NULL) integer values. They need not be increasing or decreasing across the rows but must be unique. Primary keys are used to relate one table with another since they are always unique (more later).

To automatically increment the field_id value by one, set the field_id column as AUTO_INCREMENT, as shown below:

```sql
CREATE TABLE some_table
  (
    field_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    PRIMARY KEY (field_id)
  );
```

Doing so means we need not enter a specific value for field_id and if we don't, the next value (usually compared to the last entry) is automatically added.