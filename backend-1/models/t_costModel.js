const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt') 
const { has } = require('lodash')

// const db_link = 'mongodb+srv://apurba:apu64880@cluster0.35orip6.mongodb.net/?retryWrites=true&w=majority'
const db_link_traffic = 'mongodb+srv://apurba64880:apu64880@cluster0.bt6ig9s.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(db_link_traffic)
.then(function(db){
    console.log('db connected')
})
.catch(function(err){
    console.log(err)
})

// schema

const t_costSchema = mongoose.Schema({

    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }, 
    cost: {
        type: String
    },
    lastUpdated: {
        type: Date
    }
})


// model

const t_costModel = mongoose.model('T_Cost', t_costSchema)

module.exports = t_costModel