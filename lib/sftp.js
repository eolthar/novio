const SSHConnection = require('./ssh');

class SFTP {
    constructor(options) {
        this.ssh = new SSHConnection(options);
    }

    get(filePath, callback) {
        this.ssh.connect((err) => {
            if (err) {
                return callback(err);
            }

            const openFileCommand = `OPEN ${filePath}`;
            this.ssh.send(openFileCommand, (sendErr) => {
                if (sendErr) {
                    this.ssh.close();
                    return callback(sendErr);
                }

                this.ssh.receive((data) => {
                    this.ssh.close();
                    callback(null, data.toString());
                });
            });
        });
    }
}

module.exports = SFTP;