const assert = require('assert')
const fs = require('fs')
const path = require('path')
const Generator = require('../generator')
const dbFile = path.join(__dirname, '../data.json')

describe('Generator Test', function () {
    const anjani = new Generator({fname: 'anjani'})
    const yusuke = new Generator({fname: "Yusuke", lname: "Iseya"})
    const stephan = new Generator({fname: "Stephan Danu", lname: "Shakalakalaka"})
    const rohman = new Generator({fname: "Akhmad", lname: "Abdul Rohman"})
    const yunus = new Generator({fname: "yunus"})

    before(function (done) {
        fs
            .writeFile(dbFile, '[]', 'utf-8', function () {
                done()
            })
    })
    after(function (done) {
        fs
            .writeFile(dbFile, '[]', 'utf-8', function () {
                done()
            })
    })
    describe('#generate {fname: "anjani"}', function (){
        it('should return "anjani@kalimat.ai"', function (done){
            anjani
                .generate()
                .then(function (email) {
                    assert.equal(email, 'anjani@kalimat.ai')
                    done()
                })
        })
    })
    describe('#generate {fname: "Yusuke", lname: "Iseya"}', function (){
        it('should return "yusuke.iseya@kalimat.ai"', function (done){
            yusuke
                .generate()
                .then(function (email) {
                    assert.equal(email, 'yusuke.iseya@kalimat.ai')
                    done()
                })
        })
    })
    describe('#generate {fname: "Stephan Danu", lname: "Shakalakalaka"}', function (){
        it('should return "stephan.shakalakalaka@kalimat.ai"', function (done){
            stephan
                .generate()
                .then(function (email) {
                    assert.equal(email, 'stephan.shakalakalaka@kalimat.ai')
                    done()
                })
        })
    })
    describe('#generate {fname: "Akhmad", lname: "Abdul Rohman"}', function (){
        it('should return "akhmad.rohman@kalimat.ai"', function (done){
            rohman
                .generate()
                .then(function (email) {
                    assert.equal(email, 'akhmad.rohman@kalimat.ai')
                    done()
                })
        })
    })
    describe('#generate {fname: "yunus"}', function (){
        it('should return "yunus@kalimat.ai"', function (done){
            yunus
                .generate()
                .then(function (email) {
                    assert.equal(email, 'yunus@kalimat.ai')
                    done()
                })
        })
    })
})

describe('Duplicate Test', function () {
    describe('#generate {fname: "yunus"}', function () {
        before (function (done) {
            const data = [0].map( x => ({username: `yunus${x || ''}`, email: `yunus${x || ''}@kalimat.ai`}))
            fs
                .writeFile(dbFile, JSON.stringify(data), 'utf-8', function () {
                    done()
                })
        })
        it('should return "yunus1@kalimat.ai"', function (done) {
            setTimeout(async () => {
                const email = await new Generator({fname: 'yunus'}).generate()
                assert.equal(email, 'yunus1@kalimat.ai')
                done()
            }, 1)
        })
    })
    describe('#generate {fname: "yunus"}', function () {
        before (function (done) {
            const data = [0, 1].map( x => ({username: `yunus${x || ''}`, email: `yunus${x || ''}@kalimat.ai`}))
            fs
                .writeFile(dbFile, JSON.stringify(data), 'utf-8', function () {
                    done()
                })
        })
        it('should return "yunus2@kalimat.ai"', function (done) {
            setTimeout(async () => {
                const email = await new Generator({fname: 'yunus'}).generate()
                assert.equal(email, 'yunus2@kalimat.ai')
                done()
            }, 1)
        })
    })
    describe('#generate {fname: "yunus"}', function () {
        before (function (done) {
            const data = [0, 1, 2].map( x => ({username: `yunus${x || ''}`, email: `yunus${x || ''}@kalimat.ai`}))
            fs
                .writeFile(dbFile, JSON.stringify(data), 'utf-8', function () {
                    done()
                })
        })
        it('should return "yunus3@kalimat.ai"', function (done) {
            setTimeout(async () => {
                const email = await new Generator({fname: 'yunus'}).generate()
                assert.equal(email, 'yunus3@kalimat.ai')
                done()
            }, 1)
        })
    })
    after (function (done) {
        fs
            .writeFile(dbFile, '[]', 'utf-8', function () {
                done()
            })
    })
})