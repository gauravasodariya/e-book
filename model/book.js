const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.objectId,
        ref : user
    },
    category_id : {
        type : mongoose.Schema.Types.objectId,
        ref : category
    },
    description : {
        type : String
    },
    rating : {
        type : String
    }
})
const book = mongoose.model('book',bookSchema)
module.exports = book