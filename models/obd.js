const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create openxc Schema & model
const obdSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    value: {
        type: String,
        required: [true, 'value field is required']
    },
    
});


// const openxc = mongoose.model('openxc',openxcSchema);

module.exports = mongoose.model('obd', obdSchema);