const mongoose = require('mongoose')

const quotesSchema = mongoose.Schema(
    {
        quoteMessage: {
            type: String,
            required: [true,"Enter CustomerAgency Details"]
            
        },
        quoteAuthor: {
            type: String,
            required: [true,"Please Instance ID"]
            
        },
        
    },
    {
        timestamps: true
    }
)


const QuoteDetails = mongoose.model('QuoteDetails', quotesSchema);

module.exports = QuoteDetails;