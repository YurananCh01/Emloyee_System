import mysql from 'mysql';

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_system'
});

connect.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connect.threadId);
});

export default connect;
