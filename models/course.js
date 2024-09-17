const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
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
        couAbout: {
            type: String,
            required: [true,"Please Enter Agency Image"]
        },
        
    },
    {
        timestamps: true
    }
)


const CourseDetails = mongoose.model('CourseDetails', courseSchema);

module.exports = CourseDetails;