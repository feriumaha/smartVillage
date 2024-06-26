var pg = require('pg-promise')();
var db = pg('postgresql://postgres.vleqbtylqasobwevxjng:[k81MBgxMKjwQCXWb]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres');
var fs = require('fs');
var go = fs.readFileSync('./query/queries.sql');
var q = JSON.parse(go);


module.exports = {

};