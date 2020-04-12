# Operators in MySQL #

+ __Not equal !=__

List rows which are not qual to something:

```sql
SELECT * FROM someTable WHERE someColumn != someValue;
```

+ __NOT LIKE__

This omits rows which contain some part of a phrase:

```sql
SELECT researchTopic FROM someTable WHERE researchTopic NOT LIKE '%chemistry%';
```

+ __Greater than > and greater than or equal to >=__

Used when handling numbers, for example

```sql
SELECT fundingOnOffer FROM someTable WHERE fundingOnOffer > 100;
```

The operator >= can be called in the same way.  Both oeprators can be used to return booleans:

```sql
SELECT 1 > 0;
```

The above call returns a row with the value 1, which SQL signifies as TRUE (very much like all programming languages). FALSE is given by zero 0.

Comparison of strings returns 0 if they are alphabetically distinct, while returning 1 if they are the same.

```sql
SELECT 'M' >= 'm';
SELECT 'Mm' >= 'mM';
SELECT 'M' = 'm';
```

All calls above return 1, since MySQL comparison are case-insensitive. Letters are based on their alphabetical position:

```sql
SELECT 'a' > 'l';
SELECT 'l' > 'a';
```

The former call returns 0 and the latter call returns 1.

+ __Less than < and less than or equal to <=__

Pretty much analogous use to greater than...

+ __Logical AND &&__

This checks for two conditions returning true if both conditions are true. The operator is either `AND` or `&&` in MySQL.

```sql
SELECT fundingOnOffer FROM someTable WHERE fundingOnOffer > 100 AND region = 'someRegion';
SELECT fundingOnOffer FROM someTable WHERE fundingOnOffer > 100 && region = 'someRegion';
```

The operator AND && can be applied to a more than two conditions:

```sql
SELECT 0 >= 0 AND 7 < 9 && 'a' = 'A';
```

The above statement returns 1.

+ __Logical OR ||__

Prettu much analogous use to AND &&...

+ __Selecting values in BETWEEN two limits__

Instead of combining `>`, `<`, and logical operator `AND`, one can use `BETWEEN`:

```sql
SELECT availableTime FROM someTable WHERE lowerLimit <= chosenTime && chosenTime <= upperLimit;
SELECT availableTime FROM someTable WHERE chosenTime BETWEEN lowerLimit AND upperLimit;
```

`BETWEEN`, like `<=` and `>=`, is inclusive.

The negative of BETWEEN is NOT BETWEEN

```sql
SELECT availableTime FROM someTable WHERE chosenTime NOT BETWEEN xmas AND newYear;
```

When using string values with BETWEEN, use the CAST() function to cast the string to a DATE and/or TIME:

```sql
SELECT availableTime FROM someTable WHERE CAST(chosenTime AS DATETIME) NOT BETWEEN xmas AND newYear;
```

The above call assumes that `chosenTime` is a string entered by the user. The columns `xmas` and `newYear` are appropriately formatted. If the user only enter a date, say '1980-03-01', for `chosenTime` then the time value is set to 00:00:00 by default.

In some cases, casting is not always required but is the recommended path.

+ __Membership checking with IN and NOT IN__

```sql
SELECT publicationTitle FROM someTable WHERE 
	yearPublished = 1990 OR
	yearPublished = 1993 OR
	yearPublished = 2000;
```

Instead of using OR to check for a record that satisfies membership of multiple columns (fields), on can use IN:

```sql
SELECT applicationForm FROM someTable WHERE authorName IN('name1', 'name2', 'name3');
SELECT publicationTitle FROM someTable WHERE yearPublished IN(1990, 1993, 2000);
```

We negate IN with NOT IN. For instance, suppose a call returns all titles which are not from 1990, 1993 and 2000, then:

```sql
SELECT publicationTitle FROM someTable WHERE 
	yearPublished != 1990 AND
	yearPublished != 1993 AND
	yearPublished != 2000;
```

One can use NOT IN instead:

```sql
SELECT publicationTitle FROM someTable WHERE 
	yearPublished NOT IN(1990, 1993, 2000);
```

One can extend with AND:

```sql
SELECT publicationTitle FROM someTable WHERE 
	subject != 'College' AND
	yearPublished NOT IN(1990, 1993, 2000);
```

+ __Modulo %__

One can perform the modulus of a number to return a remainder in much the same way as it operates in programming languages.

```sql
SELECT numbers AS 'modulo 2' FROM someTable WHERE 
	inputInt > 55 AND
	inputInt = isEven % 2;
```

+ __Running multiple conditional statements with CASE__

This command transfers from case() in programming languages. This works quite well when filling in new columns automatically:

```sql
SELECT someTitle
	CASE
	WHEN someValue = someCriteria THEN newValue = 'pass'
	ELSE newValue = 'fail'
	END AS 'Column Heading'
FROM someTable;
```

It is highly recommended to set the title of the column (in this case as 'Column Heading') otherwise the entire CASE statement will form the column heading. The output is `pass` or `fail`, depending on the value of `someCriteria`.

One can apply mutiple `WHEN` and `THEN` statements.

```sql
SELECT someTitle,
	CASE
	WHEN someValue BETWEEN low1 AND mid1 THEN newValue = 'pass'
	WHEN someValue BETWEEN mid2 AND mid3 THEN newValue = 'merit'
	WHEN someValue BETWEEN mid4 AND high THEN newValue = 'distinction'
	ELSE newValue = 'fail'
	END AS 'Grade'
FROM someTable;
```

Once one of the WHEN statements have been satisfied, MySQL then proceeds with the next row and starts from the beginning of the CASE block. Do not forget the comma preceding the CASE statement!

```sql
SELECT publicationTitle AS 'Publication', CASE
    WHEN title LIKE '%chemistry%' then 'Chemistry'
    when title = 'Monograph' || title like 'A study%' then 'Monograph'
    else 'Misc'
    end as 'Category'
    from publicationsTable;
```
