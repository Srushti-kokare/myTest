const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
      
     file:{ type:String,required:true},   
     fileCode:{ type:Number, required:true },
     userId:{type:String},
     filePath:{type:String },

},{timestamps:true}
    )

module.exports = mongoose.model('Files',fileSchema)