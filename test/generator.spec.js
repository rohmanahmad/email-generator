const assert = require('assert')

const Generator = require('../generator')

describe('Generator', function () {
    const anjani = new Generator({fname: 'anjani'})
    const yusuke = new Generator({fname: "Yusuke", lname: "Iseya"})
    const stephan = new Generator({fname: "Stephan Danu", lname: "Shakalakalaka"})
    const yunus = new Generator({fname: "yunus"})

    before(async () => {
        console.log('truncate')
        await new Generator({}).truncate()
    })
    after(async () => {
        console.log('truncate')
        await new Generator({}).truncate()
    })
    describe('#generate {fname: "anjani"}', function (){
        it('should return "anjani"', function (done){
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
    
    // describe('#generate {fname: "yunus"}', function () {
    //     it('should return "yunus2@kalimat.ai"', function (done) {
    //         yunus2
    //             .generate()
    //             .then((email) => {
    //                 assert.equal(email, 'yunus2@kalimat.ai')
    //                 done()
    //             })
    //     })
    // })
    // describe('#generate {fname: "yunus"}', function () {
    //     it('should return "yunus3@kalimat.ai"', function (done) {
    //         yunus3
    //             .generate()
    //             .then((email) => {
    //                 assert.equal(email, 'yunus3@kalimat.ai')
    //                 done()
    //             })
    //     })
    // })
})

describe('Dup Generator', function () {
    const yunus2 = new Generator({fname: "yunus"})
    const yunus3 = new Generator({fname: "yunus"})

    describe('#generate {fname: "yunus"}', function () {
        it('should return "yunus1@kalimat.ai"', function (done) {
            try {
                setTimeout(async () => {
                    await new Generator({}).truncate()
                    await new Generator({fname: 'yunus'}).generate()
                    const email = await new Generator({fname: "yunus"}).generate()
                    assert.equal(email, 'yunus1@kalimat.ai')
                    done()
                }, 3000)
            } catch (err) {
                assert.isNotOk(err,'Promise error');
                done()
            }
        })
    })
})