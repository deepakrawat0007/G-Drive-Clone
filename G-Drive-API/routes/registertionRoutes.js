const router = require('express').Router();
const User = require('../modal/UserSchema');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 16 })
    , async (req, res) => {
        try {
            const { name, email, password} = req.body

            const isUser = await User.findOne({ email: email })    //checking if user alredy exist with given mail id

            if (isUser) {
                return res.status(403).json({message:"User Already Exists With Given Email"})
            } else {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        "error": errors.array()
                    })
                } else {
                    bcrypt.hash(password, 10, async function (err, hash) {
                        if (err) {
                            return res.status(400).json({
                                "Error": err.message
                            })
                        } else {

                            const user = new User({
                                name: name,
                                email: email,
                                password: hash
                            });
                            user.save().then(() => {
                                return res.status(200).json({
                                    "user": user
                                })
                            })
                        }
                    })
                }
            }
        } catch (e) {
            return res.status(400).json({
                message: e.message
            });
        }
    })

module.exports = router