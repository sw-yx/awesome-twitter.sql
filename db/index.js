// setting up the node-postgres driver
var pg = require('pg');
var postgresUrl = 'postgres://localhost/dbname';
var client = new pg.Client(postgresUrl);

// connecting to the `postgres` server
client.connect();

client.add = function (name, content, cb) {

    var tweetId;
    client.query('SELECT * FROM users WHERE name = $1', [name], function (err, result) {
        if (err) return next(err); // pass errors to Express
        if (result.rows.length<1) {
            //2. if dne, add it to users table, get user.id
            client.query('INSERT INTO users (name, picture_url) VALUES ($1, $2) RETURNING id', [name, "http://i.imgur.com/XDjBjfu.jpg"], function(err, result) {
                if (err) return console.log(err);
                var id = result.rows[0].id;
                    //3. add user.id and content to tweet tbl
                client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING id', [id, content], function(err, result) {
                    if (err) return console.log("hi inserting tweet", err);
                    tweetId = result.rows[0].id;
                    newTweet = {name: name, content: content, id: tweetId};
                    cb(newTweet)
                });
            });
        } else {
            //2b. if does exist, get user.id
            // user name does exist
            console.log(result);
            var id = result.rows[0].id;
            //3. add user.id and content to tweet tbl
            client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING id', [id, content], function(err, result) {
                if (err) return console.log("hi inserting tweet", err);
                tweetId = result.rows[0].id;
                newTweet = {name: name, content: content, id: tweetId};
                cb(newTweet)
            });
        }
    }) 
    //4. return obj (user.id and content)
}
// make the client available as a Node module
module.exports = client;

