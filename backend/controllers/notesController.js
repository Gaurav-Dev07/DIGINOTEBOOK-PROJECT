const Notes = require("../models/Notes")
const Joi = require("joi");
const { reset } = require("nodemon");

exports.fetchAllNotes = async (req,res,err) => {
    try{
        const notes = await Notes.find({user : req.user._id})
        return res.status(200).json(notes);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Internal Server Error')
    }
}

exports.addnote = async (req,res,err) => {
    try{
        const noteSchema = Joi.object({
            title : Joi.string().min(3).max(50).required(),
            description : Joi.string().min(14).required(),
            tag : Joi.string().min(3)
        })
        const {error} =  noteSchema.validate(req.body)
        
        if(error) {
            console.log(error)
            return res.status(400).send('validation error')
        }
        
        const note = Notes({
            user : req.user._id,
            title : req.body.title,
            description : req.body.description,
            tag : req.body.tag
        })
        const savedNote = await note.save();

        res.status(200).json(savedNote);
    } catch(err){
        console.log(err)
        console.log('Internal Server Error')
        return res.status(500).send('Internal Server Error')
    }
}

exports.update = async (req,res,err) => {
    const {title,description,tag} = req.body
    const newNote = {} 
    
    if(title) {
        newNote.title = title
    }

    if(description) {
        newNote.description = description
    }

    if(tag) {
        newNote.tag = tag
    }

    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send('Not Found');
        }

        if(note.user.toString() !== req.user._id){
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndUpdate(req.params.id , { $set: newNote } , {new : true})
        return res.status(200).json(note)
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}


exports.delete = async (req,res,err) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send('Not Found');
        }
        
        if(note.user.toString() !== req.user._id){
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).json({message : "note deleted successfully"})
    } catch(err) {
        res.status(500).send('Internal Server Error')
    }
}



