const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
    {
        insLink: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        insName: {
            type: String,
            required: [true,"Please Instance ID"]
            
        },
        insMobile: {
            type: String,
            required: [true,"Please accessToken"]
            
        },
        insEmail: {
            type: String,
            required: [true,"Please Enter Agency Email"]
        },
        insImgurl: {
            type: String,
            required: [true,"Please Enter Agency Image"]
        },
        insMessage: {
            type: String,
            required: [true,"Please Enter Agency Image"]
        },
        insAboutme: {
            type: String,
            required: [true,"Please Enter Agency Image"]
        },
    },
    {
        timestamps: true
    }
)


const ProfileDetails = mongoose.model('ProfileDetails', profileSchema);

module.exports = ProfileDetails;