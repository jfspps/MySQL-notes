# MySQL #

## Creating Databases Code ##

Open MySQL command line client as Adminstrator and enter your password.

List available databases:

```sql
show databases; 
```

The general command for creating a database:

```sql
CREATE DATABASE database_name; 
```

A specific example (best to use snake_case or camelCase, no whitespace):

```sql
CREATE DATABASE someCrazy_DatabaseName; 
```

## To drop (delete) a database: ##

```sql
DROP DATABASE database_name; 
```

For example:

```sql
DROP DATABASE hello_world; 
```

## Using databases ##

Select a database for current use.

```sql
USE <database name>;
```
     
-- example:

```sql
USE some_app;
```

Note that MySQL commands need not always end with a semicolon, however, all SQL statements must end with a semicolon. Then check which database is in use with

```sql
SELECT database();
```

If there is no database in use then a NULL database will be returned

## SQL Data Types ##

SQL data types can be broadly divided into following categories.

1. Numeric data types such as ``int, tinyint, bigint, float, real``
2. Date and Time data types such as ``Date, Time, Datetime``
3. Character and String data types such as ``char, varchar, text``
4. Unicode character string data types, for example ``nchar, nvarchar, ntext``
5. Binary data types such as ``binary, varbinary``
6. Miscellaneous data types – ``clob, blob, xml, cursor, table``

## Creating, verifying and dropping tables ##

Here is the generalised code which one uses to create tables in the current database:

```sql
CREATE TABLE tablename
  (
    column_name data_type,
    column_name data_type
  );
```

For example, the table called cats (varchar() sets the maximum number of chars):

```sql
CREATE TABLE dogs
  (
    name VARCHAR(75),
    age INT
  );
```

One can then verify that a table was created by running any of the following commands.

This command lists the tables present in a database.

```sql
SHOW TABLES;
```

The next two commands list the column properties of a table:

```sql
SHOW COLUMNS FROM tablename;
```

The DESC (describe) command provides similar output:

```sql
DESC tablename;
```

One can drop (delete) tables in the same way as one drops databases:

```sql
DROP TABLE <tablename>; 
```

A specific example:

```sql
DROP TABLE dogs; 
```

## Comments ##

Press CTRL-slash to toggle comments for a selected script. Or use -- before each line.