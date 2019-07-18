'use strict'

const Generator = require('./generator')

function getArgs () {
    try {
        let argv = process.argv.slice(2)
        if (argv.length < 1)
            throw new Error('Invalid Command.\nexample: \nnode index.js --fname="[first name]" --lname="[last name]"')
        let myArgument = {}
        for (let arg of argv) {
            const splitter = arg.split('=')
            const kArgv = (splitter[0] || 'inv').replace('--', '')
            const vArgv = (splitter[1] || '?').replace('--', '')
            myArgument[kArgv] = vArgv
        }
        return myArgument
    } catch (err) {
        throw err
    }
}

try {
    const args = getArgs()
    new Generator(args)
        .generate()
        .then(email => console.log('new email created:', email))
        .catch(e => console.log(e.message))
} catch (err) {
    console.error(err.message)
}