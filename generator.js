'use strict'

const {writeFileSync, readFileSync} = require('fs')

const {ENV} = process.env
const isTest = ENV === 'test'

class DB {
    async adapter () {
        try {
            return await this.getData()
        } catch (err) {
            throw err
        }
    }
    
    async getData (username) {
        try {
            let currentData = JSON.parse(readFileSync('data.json', {encoding: 'utf-8'}))
            if (username && typeof username === 'string' && username.length > 0) {
                currentData = currentData.filter(x => x.username === username)
            }
            return currentData
        } catch (err) {
            throw err
        }
    }

    async writeData (data = {}) {
        try {
            const oldData = await this.adapter()
            const newData = oldData.concat(data)
            writeFileSync(
                'data.json',
                JSON.stringify(newData),
                {encoding: 'utf-8'}
            )
        } catch (err) {
            throw err
        }
    }

    async truncate () {
        writeFileSync(
            'data.json',
            '[]',
            {encoding: 'utf-8'}
        )
    }
}

class Generator extends DB {
    constructor (config = {}) {
        super(DB)
        this.config = config
    }

    /* 
    anjani => anjani@kalimat.ai √
    Yusuke Iseya => yusuke.iseya@kalimat.ai √
    Stephan Danu Shakalakalaka => stephan.shakalakalaka@kalimat.ai √
    Yunus => yunus@kalimat.ai √
    Yunus => yunus1@kalimat.ai √
    */
    async getUsername () {
        try {
            let {fname, lname} = this.config
            if (!fname) throw new Error('fname is required')
            if (fname && fname.trim().length < 1) throw new Error('fname is required')
            fname = (fname || '')
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, ' ')
                .trim()
                .split(' ')
                [0]
            lname = (lname || '')
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, ' ')
                .trim()
                .split(' ')
                .pop()
            const username = fname + (lname ? `.${lname}` : '')
            return username
        } catch (err) {
            throw err
        }
    }

    async isExists (username = '') {
        try {
            const data = await this.getData(username)
            if (data && data.length > 0) return true
            return false
        } catch (err) {
            throw err
        }
    }

    async generate () {
        try {
            let username = await this.getUsername()
            let append = 0
            let email = ''
            let exists = await this.isExists(username)
            while (exists) {
                append += 1
                if (!isTest) console.log('...trying get another username:', username + append)
                exists = await this.isExists(username + append)
            }
            username += (append || '')
            email = username + '@kalimat.ai'
            const data = {
                username,
                email
            }
            await this.writeData(data)
            return email
        } catch (err) {
            throw err
        }
    }
}

module.exports = Generator
