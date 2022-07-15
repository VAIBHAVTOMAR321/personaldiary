const Signup = require("../Model/SignUp");
const Diary = require("../Model/Diary");
exports.signup = (req, res) => {
    //check if user already exists
    Signup.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(404).send(err);
        }
        if (user) {
            res.status(400).json({
                message: "User already exists",
            });
        } else {
            //create new user
            const newUser = new Signup({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            new Diary({
                name: req.body.name,
            }),
            
            //save new user
            newUser.save((err, user) => {
                if (err) {
                    res.status(404).send(err);
                }
                res.status(200).json({
                    message: "User created successfully",
                });
            }
            );
        }
    }
    );
}



