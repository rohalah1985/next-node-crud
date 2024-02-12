const mongoose=require('mongoose')
const Schema=mongoose.Schema


const listSchema=new Schema({
    name: String,
    age: Number
})

const List=mongoose.model('List',listSchema)

module.exports=List