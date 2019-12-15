const express = require('express');
const { User } = require('../models/users');
const { UserRoles } = require('../models/user-roles');
const router = express.Router();
const { regValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');

//Registration 
router.post('/register', async (req, res, next) => {

    //validating request
    const { error } = await regValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //checking for first user 
    const count = await User.count({});
    console.log('count', count)
    var curRole = count > 0 ? 'noramalUser' : 'admin';

    //check user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User Already Exists')
    }
    else {

        //password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //insert new user into database
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        userRole = new UserRoles({
            role: curRole,
            email: req.body.email
        })
        await user.save();
        await userRole.save();
        res.send(user);

    }

})

//Login
router.post('/login', async (req, res) => {
    //validating requestc
    const { error } = await loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //finding user in the database 
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("User not Found in the Database");
    }

    //validation user password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    res.send(true);
});



module.exports = router;