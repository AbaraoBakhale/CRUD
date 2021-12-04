var Userdb = require('../module/modele')
// --------------------------------POST METHS:- Request means create database--------------------------------------------------
// Create and save new user.
exports.create = (req, res) => {
    // validate a request.
    if (!req.body) {
        res.status(400).send({ message: "Content can  not be empty!" });
        return
    }
    // New User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })
    // Save user in the database.
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some error create while creating operation."
            });

        });

}
//---------------------------------GET Method-------------------------------------------------------
// retrive and returns user.?retrive and return a single user.
exports.find = (req, res) => {
    // if we want fetch specific data from database then copy id paste in params then send in postman
    if(req.query.id){
const id=req.query.id;

Userdb.findById(id)
.then(data=>{
if(!data){
    res.status(404).send({message:"Not found user with id"+id});

}else{
    res.send(data)
}
})
.catch(err=>{
    res.status(500).send({message:"Error retriving user id"+id})
})
    }else{
    Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Err Occurred while retriving user information" })
        })
    }
}
// -------------------------PUT METHOD:-update the data in database--------------------------------------------------------------------
// Update a new identified user by user id.
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data To Update can not be empty" });
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}.maybe use not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user Information" })
        })
}
// -------------------------DELETE DATA------------------------------------------
// Delete user with specified user id the request.
exports.delete = (req, res) => {
const id=req.params.id;

Userdb.findByIdAndDelete(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot Delete with id ${id}.maybe id is wronf`})
    }else{
        res.send({
            message:"User was deleted successfully!"
        })
    }
})
.catch(err=>{
    res.status(500)({
        message:"Cannot delete user id="+id
    });
});
}
