const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const usersController = {}



usersController.register = (req, res) => {
    
    const body = req.body
    const user = new User(body)
    bcryptjs.genSalt()
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    user.save()  
        .then((user) => {
        res.json(user)
        })
        .catch((err) => {
        res.json(err)
    })
            })
    }) 
}

usersController.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({
                    errors :"invalide email and password"
                })
            }
            // res.json(user)  for crypt pass word compair
            bcryptjs.compare(body.password, user.password)
                .then((match) => {
                    if (match) {
                    // res.json(user) appling jwt token
                        const tokenData = {
                            _id: user._id,
                            email: user.email,
                            username:user.username,
                        }
                        const token = jwt.sign(tokenData, "dct123", { expiresIn: "2d" })
                        res.json({
                            token :`Bearer ${token}`
                        })
                    } else {
                        res.json({errors:"invalide email ab=nd password"})
                }
            })
        })
        .catch((err) => {
        res.json(err)
    })
}

module.exports=usersController   



//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
//https://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@github.com/sajanandkandgule/NODE-MVC.git