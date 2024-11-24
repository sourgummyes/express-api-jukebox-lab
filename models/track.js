const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
    title:{
        type: String,
        required: true},
    artist:{
        type: String,
        required: true},

},
{ timestamps: true }    
)

const Track = mongoose.model('Track', trackSchema)

module.exports = Track;