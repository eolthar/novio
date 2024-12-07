const SFTP = require('./lib/sftp');
const SSHConnection = require('./lib/ssh');

module.exports = {
    get: (options, filePath, callback) => {
        const sftp = new SFTP(options);
        sftp.get(filePath, callback);
    },

    exec: (options, command, callback) => {
        const ssh = new SSHConnection(options);

        ssh.connect((err) => {
            if (err) {
                return callback(err);
            }

            ssh.send(command, (sendErr) => {
                if (sendErr) {
                    ssh.close();
                    return callback(sendErr);
                }

                ssh.receive((data) => {
                    ssh.close();
                    callback(null, data.toString());
                });
            });
        });
    }
};