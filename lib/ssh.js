const TCPConnection = require('./tcp');

class SSHConnection {
    constructor(options) {
        this.options = options;
        this.tcp = new TCPConnection(options.host, options.port || 22);
    }

    connect(callback) {
        this.tcp.connect((err) => {
            if (err) return callback(err);

            this.tcp.receive((banner) => {
                console.log('Server Banner:', banner.toString());

                const clientVersion = 'SSH-2.0-MySFTPClient\r\n';
                this.tcp.send(clientVersion, callback);
            });
        });
    }

    send(command, callback) {
        this.tcp.send(command + '\n', callback);
    }

    receive(callback) {
        this.tcp.receive(callback);
    }

    close() {
        this.tcp.close();
    }
}

module.exports = SSHConnection;