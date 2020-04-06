# Commonly used string functions in MySQL #

Note that many of these functions can be executed in some combination.

+ __Concatenation with CONCAT__

```sql
SELECT CONCAT('Hi', ' ', 'there');
```

One can add any reasonable number of arguements to form a concatenated string. Entire columns can be combined e.g.

```sql
SELECT CONCAT(column1, " ", column2);
```

Note that CONCAT output is treated as a column. One can utilise two columns, concat() the columns and print them under custom column heading (table is called register):

```sql
SELECT firstName AS 'First', lastName AS 'Last', CONCAT(firstName, ' ', lastName) AS 'full name' FROM register;
```

If a consistently used separator is used (" " or '-' etc.) then one can use `CONCAT_WS(separator, all_other_substrings)`.

+ __Extracting part of a string using SUBSTRING__

```sql
SELECT SUBSTRING(string, x, y) FROM tableName;
```

This function is one-based, not zero-based. It extracts the x-th to y-th characters (inclusive) of string.

```sql
SELECT SUBSTRING('Hey Dude!', 5, 8);
```

The above statement returns a table with the string 'Dude'.  A statement:

```sql
SELECT SUBSTRING('Hey Dude!', -5);
```

...would print out the first 5 first characters starting from the end of the string. Recall, that double quotes can be used if the string contains single quotes. Likewise single quotes should be used when double quotes are part of the string.

```sql
SELECT SUBSTRING("I'm full of apostrophes''''", -4);
```

The above statement would print "''''". 

As a side, `SUBSTR()` is identical to `SUBSTRING()`.

+ __Replacing strings or parts of strings with REPLACE__

```sql
SELECT REPLACE('I am a useless statement', 'useless', 'helpful');
```

The above statement looks for any instance of the second argument and replaces any instance with the third argument. The arguments are case sensitive.

REPLACE can in many ways be used to extend strings by replacing whitespace with meaningful words.

```sql
SELECT REPLACE(' man_and bananas', ' ', ' the ');
```

+ __Reversing strings with REVERSE__

``sql
SELECT REVERSE('1234567890');
```

The above statement yields the string '0987654321'.

+ __Deducing the length of a string with CHAR_LENGTH__

Return an integer of the number of CHAR's of a string.

```sql
SELECT CHAR_LENGTH("greetings");
```

The above statement returns 9.

+ __Setting upper and lower case with UPPER and LOWER__

Both functions perform as implied, changing the case of all char's of a string.

```sql
SELECT UPPER('try ME);
SELECT LOWER("NO try ME");
```

The above statements result in 'TRY ME' and "no try me".