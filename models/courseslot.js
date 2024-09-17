const mongoose = require('mongoose')

const clotSchema = mongoose.Schema(
    {
        cName: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        cSlot: {
            type: String,
            required: [true,"Please Instance ID"]
            
        },
        
    },
    {
        timestamps: true
    }
)


const ClotDetails = mongoose.model('ClotDetails', clotSchema);

module.exports = ClotDetails;