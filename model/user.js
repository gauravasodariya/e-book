const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    role : {
        role: { 
            type: String, 
            enum: ['reader','author','admin',], 
            default: 'reader' },
    }
})
const user = mongoose.model('user',userSchema);
module.exports = user;