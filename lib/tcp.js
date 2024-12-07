const net = require('net');

class TCPConnection {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.client = null;
    }

    connect(callback) {
        this.client = net.createConnection({ host: this.host, port: this.port }, () => {
            console.log(`Connected to ${this.host}:${this.port}`);
            callback(null);
        });

        this.client.on('error', (err) => {
            console.error('TCP Error:', err.message);
            callback(err);
        });

        this.client.on('end', () => {
            console.log('Connection ended');
        });
    }

    send(data, callback) {
        this.client.write(data, callback);
    }

    receive(callback) {
        this.client.once('data', (data) => {
            callback(data);
        });
    }

    close() {
        if (this.client) {
            this.client.end();
        }
    }
}

module.exports = TCPConnection;