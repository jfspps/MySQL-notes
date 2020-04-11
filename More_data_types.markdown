# More data types in SQL #

+ __CHAR__

This is a fixed length string, up to 255 characters. The data is padded with spaces up to some predetermined file size however when extracted, the spaces are omitted. Effectively, the original string is returned. 

```sql
CREATE TABLE tableName(name CHAR(50), address(200));
```

The length of a `CHAR` column is determined by the length of the first rwo. Subsequent rows which are added to the column are limited by this length. Strings which are longer than the `CHAR` length are automatically truncated (this also applies to `VARCHAR`).

If strict SQL mode is not enabled and you assign a value to a CHAR or VARCHAR column that exceeds the column's maximum length, the value is truncated to fit and a warning is generated.

Compared to `VARCHAR`, `CHAR` is generally the faster of the two.

+ __DECIMAL__

This creates a decimal format for columm data. The following parameters are maximum number of digits (including after the decimal and <66) and then how many digits after the decimal place (< 31 and < max_number_of_digits).

```sql
CREATE TABLE tableName(value_1 DECIMAL(5, 4));
```

When the maximum decimal is inserted into a column, then the largest possible decimal is inserted instead. When more digits after the decimal are inserted, then the number is rounded up.

```sql
INSERT INTO tableName(value_1) VALUES(1.999999);
```

There are six post-decimal digits so the row with value_1 with `1.999999` is stored as `2.0000`, with four zeros.

+ __FLOAT__ and __DOUBLE__

Float and double store very large decimals but with less precision, compared to decimal, with the advantage of requiring less memory. 

`DOUBLE` is about twice the storage size of `FLOAT`. If precision is important, one should use `DECIMAL`. The number of digits actually stored is limited, though when the user extracts a `FLOAT` or `DECIMAL`, the order of magnitude is preserved but with loss of precision:

```sql
CREATE TABLE tableName(value_2 FLOAT, value_3 DOUBLE);
INSERT INTO tableName(value_2, value_3) 
	VALUES(12094873284.4324, 2094234274723420734.290834);
```
  
Selecting these values would return `12094900000` and `2.0942342747234207e18`.

+ __DATE__, __TIME__ and __DATETIME__

The `DATE` format is YYYY-MM-DD. The `TIME` format is HH:MM:SS. The type `DATETIME` combines both values, with a format YYYY-MM-DD HH:MM:SS. Their use is very similar (apply the set format).

```sql
CREATE TABLE tableName(currentDate DATE, randomDT);
INSERT INTO tableName(currentDate, randomDT) 
	VALUES('1980-11-03', '2000-01-23 17:03:45');
```

+ __CURDATE__, __CURTIME__ and __CURDATETIME__

These functions perform as expected. Use `SELECT CURDATE();` to find the current date, etc.

These functions can be used in place of `'1980-11-03'` parameters in `VALUES()`, above.

```sql
CREATE TABLE tableName(currentDate DATE, randomDT);
INSERT INTO tableName(currentDate, randomDT) 
	VALUES(CURDATE(), CURDATETIME());
```

+ __How to format dates__

These functions extract parts of the `DATE`, `TIME` and `DATETIME` values.

  a. `DAY(CURDATE())` returns the number of the month for the current day
  b. `DAYNAME(CURDATE())` returns the name of the current day
  c. `DAYOFWEEK(CURDATE())` returns the number of the week for the current day (Sunday = 0)
  d. `DAYOFYEAR(CURDATE()`) returns the number of the year for the current day

Attempting to extract day numbers from `TIME` based values returns `NULL`.

Continuing, there are other functions, e.g. `MONTHNAME()` and `DATE_FORMAT(date, format)`. See the [MySQL docs](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-format) for a list of specifiers.

```sql
SELECT DATE_FORMAT('2009-10-04 22:23:00', '%W %M %Y');
SELECT DATE_FORMAT('1997-10-04 22:23:00',
                 '%H %k %I %r %T %S %w'); 
```

We will get `'Sunday October 2009'` from the first and `'22 22 10 10:23:00 PM 22:23:00 00 6'` from the second call.

There is also `TIME_FORMAT()` which works similarly.

+ __Performing time and date related comparisons, and NOW()__

`DATEDIFF(date1, date2)` takes two dates and returns the number of days difference. The return value can be positive or negative, with return value calculated by `date1 - date2`.

`DATE_ADD(date, INTERVAL n)` returns the `date + INTERVAL n timeUnit`. The parameter `timeUnit` could be MONTH, WEEK, SECOND, MICROSECOND. See the docs.

```sql
SELECT DATE_ADD(NOW(), INTERVAL 11 MONTH) FROM someTable;
```

The above statement adds eleven months to the current date and time (given by `NOW()`)and returns the format YYYY-MM-DD (since CURDATE() was called). 

Note that it is also possible and perhaps simpler to write a math expression (with `+` and `-`), to produce the equivalent response:

```sql
SELECT NOW() + INTERVAL 11 MONTH FROM someTable;
```

The math expressions can be strung with more terms (HOUR or SECOND etc.)

+ __Managing timestamps with TIMESTAMP and CURRENT_TIMESTAMP__

TIMESTAMP is very similar to DATETIME except for:

  a. DATETIME has a much larger time period range whereas TIMESTAMP starts at the year 1970 and finishes around year 2038. 
  b. TIMESTAMP requires less memory to store

TIMESTAMP is useful for sotring time and date when records are created or edited. For example:

```sql
CREATE TABLE scores(assignment VARCHAR(100), marks INT, 
	created TIMESTAMP DEFAULT NOW());
```

Note that the user need not add the created field since it is automatically filled in. An extension to these statements can update a different field called edited to update when the row is updated:

```sql
CREATE TABLE scores(assignment VARCHAR(100), marks INT, 
	created TIMESTAMP DEFAULT NOW(), 
	edited TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP);
```

One could also just use NOW() instead of CURRENT_TIMESTAMP, the results are the same.