# Aggregate functions in MySQL #

Examples of built-in calculations provided by MySQL.

+ __Counting the number of records or records with given values using COUNT__

```sql
SELECT COUNT(*) FROM someTable;
```

This returns the number of rows in the table, someTable. The new column displayed is called `COUNT(*)` unless one invokes `AS 'newTitle'`.

```sql
SELECT COUNT(DISTINCT authors, publication) FROM someTable;
```

The above statement returns the number of unique `authors` _and_ unique `publication` entries in someTable. Further search criteria can be set using `WHERE someColumn LIKE someCriteria`.

+ __Re-grouping data into single rows with GROUP BY__

The call `GROUP BY someValue` groups all rows which all have the same someValue (for example, a string in a given field e.g. `GROUP BY artistName`). The following statement would group all the rows with the same `publication_date` into one group. The group is then represented by the first row (or whatever MySQL considers is the first row) so any calls to a specific column (field) result in extraction of the first row fields.

```sql
SELECT authorName FROM someTable GROUP BY publication_date;
```

What is more useful is a call to functions like `COUNT`. Running `COUNT` returns the number of rows in the group, for example:

```sql
SELECT COUNT(*), publication_date FROM someTable GROUP BY publication_date ORDER BY publication_date;
```

+ __Finding the MIN and MAX__

The functions `MIN` and `MAX` work as suggested and in the same way as `COUNT`.

```sql
SELECT MAX(publication_date) FROM someTable;
```

To display the title of a record which has the `MAX(someValue)`, then use a __subquery__:

```sql
SELECT title, author FROM someTable WHERE publication_date = (
SELECT MAX(publication_date) FROM someTable);
```

The inner query returns the latest publication date. This return (an `INT`) is then linked with the outer query so as to display the `title` and `author`. Subquery running is generally slow and the previous statement could be executed using:

```sql
SELECT title, author FROM someTable ORDER BY publication_date DESC LIMIT 1;
```

+ __Using MIN and MAX with GROUP BY__

Grouping rows allows one to then find the MIN and/or MAX of a given field in the group.

```sql
SELECT author, MIN(publication_date) FROM someTable GROUP BY author, author_address;
```

The above statement groups the the rows by the author's name and address, and then displays the author's name and publication date of their first publication. Each group has the same author's name so one can display the first representative of the group with the earliest publication date. If one were to select the title of the publication, in this statement then it would only display the group representative's title, which may not be the first publication by the author.

Similar uses for MAX can be carried across.

+ __Summing entries with SUM__

SUM can be used in isolation to sum all records of an INT, for example, publication date or issue number or page count.

```sql
SELECT SUM(page_count) FROM someTable;
```

The above statement returns the total number of pages (from the page_count column) from the table. SUM can also be used with GROUP BY to sum all grouped rows' data, where INT exists.

```sql
SELECT author, SUM(page_count) FROM someTable GROUP BY author;
```

The above statement therefore lists all authors total page count.

+ __Finding the mean average using AVG__

The call to AVG returns a decimal of the mean, even if the mean is a whole number. AVG can be called and paired with GROUP BY just like SUM, MIN and MAX.