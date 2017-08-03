# awesome-twitter.sql
awesome-twitter.sql


# Epilogue

This workshop is a relatively small one and meant to serve as a conceptual bridge between working with the database directly (SQL via a shell client) and programming an application with an object-relational-mapper (ORM, e.g. Sequelize). We saw that using the pg database driver, we could make SQL queries from inside our Node application, and use the results.

Most of the conversion was relatively simple, but to rewrite the post route required coordinating multiple asynchronous results. Even in series, as was necessary here, this might have been a little challenging. We're going to learn more about this when we study promises in future workshops.

# Main Takeaways

The postgres DBMS process acts as a server (via TCP/IP) for the postgres protocol; it converts incoming requests to file system operations and sends back responses
The pg module is a postgres driver written for Node; it implements the postgres protocol, enabling us to use JavaScript to send queries to the postgres process.
A persistent database lets us store data on the disk, so that even between application server instances (e.g. restarting the server) our information does not disappear.
Writing raw SQL queries as long strings in our JS app is not exactly elegant, but it gets the job done.
Coordinating multiple asynchronous results presents logical and syntactical challenges.
Lexicon

It is not critical to know all the jargon in-depth. It is more important to gain a practical command of the available tools, followed by a conceptual grasp of the components and how they fit together. For your reference, however, we attempt to disambiguate some of the terminology below. Unfortunately, the word "postgres" is sometimes loosely used to mean any of the following:

# Generic Term	Explanation	PostgreSQL example / notes
- DBMS	
-- A standardized solution / tool for storing data. A format, and program that can safely & quickly manage stored data in that format.	the entire PostgreSQL system in a holistic sense
- database server	
-- a process which listens to a TCP port for incoming database requests, and converts those requests into safe and fast filesystem actions	postgres process
- database protocol	
-- the rules of how to connect and exchange messages with a database server, implemented in drivers / clients	postgres protocol; most devs never look at it
- query language	
-- the syntax for messages which a given database server can understand and act on, transmitted via the database protocol	postgres; like SQL, but with some unique syntax, e.g. returning; devs sometimes write it by hand
- database driver	
-- a software library which bridges the a certain db server and application code written in a particular language; lets that app become a database client	Node-Postgres, aka pg; lets your Node app become a postgres client
- database client	
-- a process which can connect to a certain db server, sending queries and handling resulting data	psql and Postico; used by humans, not by apps
