const mongoose = require('mongoose')

const cimageSchema = mongoose.Schema(
    {
        imgLink: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        imgName: {
            type: String,
            required: [true,"Please Instance ID"]
            
        },
        
    },
    {
        timestamps: true
    }
)


const CimageDetails = mongoose.model('CimageDetails', cimageSchema);

module.exports = CimageDetails;