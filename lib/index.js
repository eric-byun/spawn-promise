const childProcess = require('child_process');

const spawn = async (command, args, options) => {
    const child = childProcess.spawn(command, args, options);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', data => {
        stdout += data.toString();
    })

    child.stderr.on('data', data => {
        stderr += data.toString();
    })

    return new Promise((resolve, reject) => {
        child.on('error', (code) => {
            reject(code);
        });
        child.on('close', (code) => {
            if(code === 0) {
                resolve(stdout);
            } else {
                const err = new Error(`child exited with code ${code}`)
                err.code = code
                err.message = stderr
                reject(err)
            }
        });
    });
}

module.exports = spawn;
