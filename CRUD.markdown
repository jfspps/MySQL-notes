## Create, Read, Update and Destroy CRUD ##

__Create__ a database using CREATE and INSERT

Retrieval (__reading__) of data is largely handled by SELECT

This selects all fields from the table:

```sql
SELECT * FROM tablename;
```

Selecting and showing multiple fields, in the order called, can be achieved with comma-separated lists:

```sql
SELECT * field_1, field_2, field_5 FROM tablename;
```

One can select by a given criteria using WHERE:

```sql
SELECT * FROM tablename WHERE columnName = someValue;
```

The columnName need not be part of the * token. For example (case-insensitive so far):

```sql
SELECT age FROM dogs WHERE name = 'Wolfie';
```

One can compare values of two columns:

```sql
SELECT name, breed FROM dogs WHERE age = some_id;
```

The table column labels can be assigned an alias which are displayed in a given output, using AS. This is particularly useful when two tables are joined which have the same name for a column (e.g. both have an 'age' column). Below, AS is demonstrated simply as a change in the column title but applied more usefully when JOIN is discussed:

```sql
SELECT age AS 'Dog age', name AS 'Dog name' FROM dogs;
```

__Update__ is achieved using UPDATE and SET (and WHERE). For example:

```sql
UPDATE tableName SET columnName = someValue WHERE columnName2 = someValue2;
```

This updates all entries, where the value in columnName2 is someValue2, with new values someValue in the field called columnName. Here is a specific example (the two columns need not be the same):

```sql
UPDATE dogs SET breed = 'unknown' WHERE breed = NULL;
```

This would replace all NULL entries under the breed column with a non-NULL value of 'unknown'. It is strongly advised that SELECT statements are run to test the criteria before running UPDATE (and DELETE, which follows).

__Destroying__ records is achieved using DELETE. The form is similar to SELECT. For example, one could check then delete by running:

```sql
SELECT * FROM dogs WHERE name = 'Wolfie';
DELETE FROM dogs WHERE name = 'Wolfie';
```

Note that values from other records are not altered. Many tables come with PRIMARY KEY columns, these are not altered if one or more rows are deleted. This is important since other tables may be relying on the unique IDs to access to specific records.