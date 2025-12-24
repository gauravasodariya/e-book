const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.objectId,
        ref : user
    }
})
const comment = mongoose.model('comment',commentSchema)
module.exports = comment
