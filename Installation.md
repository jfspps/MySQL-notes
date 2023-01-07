# Installing MySQL #

This outlines how to install to Ubuntu 20.04 based distros and quickly set up MySQL 5.7 (or later).

```bash
sudo apt update
```

```bash
sudo apt install mysql-server
```

```bash
sudo systemctl start mysql.service
```

## Securing MySQL ##

The secure installation script assumes that root user authenticates by a password. However, for recent Ubuntu installations (post July 2022), this default is ```auth_socket```.

With Ubuntu, the following command assumes that the OS' ```root``` user and MySQL's ```root``` user are the same. To log in to MySQL we must pass ```sudo``` as:

```bash
sudo mysql
```

The password (if needed) would therefore be the OS' ```root``` user password, which MySQL would not be aware of. We can decouple this and set up a ```root``` in MySQL which does not use the same password as the OS' ```root``` user.

We need to end up not passing ```sudo``` to log in as above and instead set up MySQL to enable the root user to login with a different password, using:

```bash
mysql -u root -p
```

Hence, MySQL's ```root``` user can be assigned a different password to the OS' ```root``` user, which I personally prefer and describe here.

Get into MySQL:

```bash
sudo mysql
```

Then enter precisely as shown to configure authentication by password (we will change the password later):

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

Type "exit" at the MySQL prompt to exit.

You should now be able to subsequently log in to MySQL (and be prompted for a password) as ```root``` using:

```bash
mysql -u root -p
```

To revert back to the Ubuntu installation default, enter the following:

```bash
mysql -u root -p
```

```SQL
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
```

Type "exit" to log out. From here, you would now be required to log in, with the OS' ```root``` user password, as:

```bash
sudo mysql
```

I generally do not revert this, so the remainder of these instructions will assume this.

## The SQL installation script ##

To start up the secure installation script, enter:

```bash
sudo mysql_secure_installation
```

I generally choose:

+ Yes to validate Password component
+ 2 for MEDIUM
+ Enter and re-enter your desired password for ```root```
+ Yes to continue with chosen password
+ Yes to remove anonymous users and test database
+ Yes to disable remote logins
+ Yes to reload privilege tables

If at any time the script crashes or you want to leave, open a new terminal and enter:

```bash
sudo kill $(ps aux | grep mysql_secure_installation | grep -v grep | awk '{print $2}')
```

## Adding a new user ##

I generally do not use ```root``` for typical database access and instead insert and assign privileges to a commanding MySQL user without full root access.

Log in to MySQL:

```bash
mysql -u root -p
```

Then insert a new non-root, power user (no remote connections) changing the values as desired:

```SQL
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

This instructs MySQL to apply the default ```caching_sha2_password``` authentication policy. 

Some database clients, notably PHP, have issues with this policy so in such cases you may have to use the same (older) policy as that set by the above root user:

```SQL
CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

Alternatively, you can alter the policy later, using:

```SQL
ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

Then we grant privileges to all databases and all tables, using:

```SQL
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'username'@'localhost' WITH GRANT OPTION;
```

The form of the database and table literals, above shown as ```*.*``` is ```database.table```. Please refer to the official documentation for a description of the grants listed.

The last (optional) directive ```WITH GRANT OPTION``` allows ```username``` to grant privileges to other MySQL users.
