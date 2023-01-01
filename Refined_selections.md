# More refined selections #

+ __Eliminating duplicated records with DISTINCT__

The command `DISTINCT` modifies `SELECT` to display unique records only.

```sql
SELECT DISTINCT some_title FROM someTable;
```

The command applies to the combined set of fields passed to `SELECT`.

+ __Sorting results with ORDER BY__

This modifies `SELECT` to display records in an order by the given field proceeding `ORDER BY` (note, there is a space between `ORDER` and `BY`)

```sql
SELECT some_title FROM someTable ORDER BY some_title;
```

This statement orders the titles by the column itself, in alphabetical order, ascending by default. Numerical characters and the characters !@#$%^&*() would be listed before 'a'.

To emphasise ascending use, `ASC`. To emphasise descending order, use `DESC`.

```sql
SELECT subject, publication FROM someTable ORDER BY issue_number DESC;
```

Note here that `issue_number` is not displayed and need not be.

```sql
SELECT subject, publication, issue_number FROM someTable ORDER BY 2 ASC;
```

The above statement sorts, ascending, by column 2, in this case `publication`.

One can also sort by two or more columns. The display is sorted by the first parameter, followed by the second, and so on.

```sql
SELECT subject, publication, issue_number FROM someTable ORDER BY publication, issue_number;
```

This orders the list on display by `publication` first, and then by `issue_number`.

+ __Specifying the number of results to display with LIMIT__

This is often used along with `ORDER BY`, to be meaningful.

```sql
SELECT subject FROM someTable LIMIT 11;
```

The above statement prints the first 11 rows of `subject`, without any particular criteria. To list the 'top 11' by some criteria, use `ORDER BY`.

```
SELECT subject, issue_number FROM someTable ORDER BY issue_number DESC LIMIT 11;
```

The above statement lists the last 11 fields from `subject` with the highest `issue_number`. `LIMIT` is the last part of the statement.

One can also set the starting point of the `LIMIT` function by passing two numbered parameters, the first is the starting point, and the second is the number to display after the starting point.

```
SELECT subject, issue_number FROM someTable ORDER BY issue_number ASC LIMIT 1,11;
```

This achieves a similar result as the previous statement, however the return starts at the second row (**SQL rows are zero-based**) and then prints the next 11 rows which match the criteria.

```
SELECT subject, issue_number FROM someTable ORDER BY issue_number ASC LIMIT 0,5;
SELECT subject, issue_number FROM someTable ORDER BY issue_number ASC LIMIT 5;
```

The pair of statements above are the same. The `LIMIT x,y` may prove useful if you want to list portions of the table at a given time.

+ __Looking for elements which are part of an entry or field using LIKE__

Instead of looking for entire matches, one can search for entries which contain parts of a string.

```sql
SELECT * FROM someTable WHERE publication LIKE '%phys%';
```

This statement looks for the sequence `phys` in the `publication` title field. The optional `%` wildcard allows for any text before and after the search pattern `phys`.

Other wildcards are available:

- The wildcard _ (one underscore) represents any _single_ character. Two underscores would represent two characters, and so on. The percent sign `%` represent any number of characters.
- Escape sequences enable the search of the wildcard symbols: `\_` and `\%`.

```sql
SELECT * FROM someTable WHERE discount LIKE '15\% of%';
```

The above statement looks for any record which starts with `15% of`.

+ __Some examples__

```sql
SELECT title, pages FROM books ORDER BY pages DESC LIMIT 1;
```

The above statement displays the title and number of pages of one book with the most pages.

```sql
SELECT CONCAT(title, ' - ', released_year) AS 'summary' FROM books ORDER BY released_year DESC LIMIT 3;
```

The above statement lists the three titles which were released most recently as "title - publication_year" in a table called summary.

```sql
SELECT title, author_lname FROM books WHERE author_lname LIKE '% %';
```

The above statement lists books which are have author last names with a space (or authors with multiple last names). Note that the wildcard sequence with two spaces in between `%` yields a different search parameter.

```sql
SELECT title, released_year, stock_quantity FROM books ORDER BY stock_quantity ASC LIMIT 3;
```

The above statement returns a list of books which have the lowest stock quantity.

```sql
select title, author_lname from books order by author_lname ASC, title ASC;
```

The above statement lists books by author's last name and then by title.

