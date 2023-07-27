const mongoose=require('mongoose');

const commentSchema = new monggose.Schema({
    content:{
        type: 'string',
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'User'
    },

    post:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);
modudule.exports = Comment;