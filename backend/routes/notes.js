const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const notesController = require('../controllers/notesController')

router.get('/' , (req,res) => {
    res.send("this is notes router");
})
//user can get all notes using this route :login required 
router.get('/fetchallnotes',auth,notesController.fetchAllNotes)

// route for adding a note of particular user
router.post('/addnote',auth,notesController.addnote)

//route for updating a note of particular user
router.put('/updatenote/:id',auth,notesController.update)

//route for deleting a note of particular user
router.delete('/deletenote/:id',auth,notesController.delete)

module.exports = router;