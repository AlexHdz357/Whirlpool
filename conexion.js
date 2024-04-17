const Connection = require('tedious').Connection;
const Request = require('tedious').Request;


const config = {
    server: 'LAPTOP-6VJG77D3',
    authentication: {
        type: 'default',
        options: {
            userName: "tofu123",
            password: "tempura123@"
        }
    },
    options: {
        port: 1433,
        database: 'whirlpool',
        trustServerCertificate: true
    }
}

const connection = new Connection(config);

connection.connect();

connection.on('connect', (err)=>{
    if(err){
        console.log("Error al conectar a la base de datos");
        throw err;
    }
});

module.exports = connection;
