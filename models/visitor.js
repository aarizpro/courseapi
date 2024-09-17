const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema(
    {
        vName: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        vEmail: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        vMobile: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        vAbout: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        vDate: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        vTime: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        couName: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        couDuration: {
            type: String,
            required: [true,"Please Instance ID"]
            
        },
        couType: {
            type: String,
            required: [true,"Please accessToken"]
            
        },
        couPrice: {
            type: String,
            required: [true,"Please Enter Agency Email"]
        },
        
        
    },
    {
        timestamps: true
    }
)


const VisitDetails = mongoose.model('VisitDetails', visitorSchema);

module.exports = VisitDetails;