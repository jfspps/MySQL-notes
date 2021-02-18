# Triggers in MySQL #

Triggers are portions of SQL code which are run before or after a record or entry is updated, inserted or deleted. Generally, it is better to handle this on the UI side (the controller) as opposed to implementing this in SQL on the MySQL server. Clearly, if one is only programming in MySQL without a frontend, then triggers are the only way to check data before or after SQL statements are executed.

For admin purposes, one can build a list of SQL triggers in a separate .SQL files, separate from the tables SQL file. In MySQL workbench, this could run as a script after the tables and data are entered.

```sql
DELIMITER $$

CREATE TRIGGER must_be_adult
     BEFORE INSERT ON users FOR EACH ROW
     BEGIN
          IF NEW.age < 18
          THEN
              SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Must be an adult!';
          END IF;
     END;
$$

DELIMITER ;
```

Running this code sets up the database to only accept new users who are 18 years old or above.

The command `BEFORE` sets the trigger execution so that `INSERT` is run only if the conditional statements are satisfied. The command `ON` refers to the table `users`. The command `AFTER` would run the check after the `INSERT ON` is satisfied (which in this case is meaningless).

The keyword `NEW` is the placeholder to the new entry, with `age` as the column or field.

The keyword `SQLSTATE` identifies a SQL (ANSI SQL) five-alphanumeric value. Each state is associated with a message string, describing the error. MySQL then adds a third component, a numerical error code. See the [MySQL docs](https://dev.mysql.com/doc/refman/8.0/en/error-reference.html) to list thousands of MySQL error codes, with the `SQLSTATE` code and the text message. In fact, these error messages are sent anytime errors arise with database handling.

The `SQLSTATE 45000` is a programmer defined error which is sent with a custom message, in this case, `'Must be an adult!`.

The keyword `DELIMITER` groups semi-colon separated statements, so that SQL statements are only executed at the end of the `DELIMITER` block.

In general, trigger blocks take the form:

```sql
DELIMITER $$

CREATE TRIGGER trigger_name
     trigger_time trigger_event ON table_name FOR EACH ROW
     BEGIN
     END;
$$

DELIMITER ;
```

Triggers may prove useful by __logging database access and updating__ and storing previous settings. The logs can be stored in a separate database.

## Handling triggers ##

One can list all triggers with `SHOW TRIGGERS;` 

Dropping triggers is achieved by writing `DROP TRIGGER trigger_name';`.

A cautionary note here: triggers are sometimes a debugging nightmare! Use with care!