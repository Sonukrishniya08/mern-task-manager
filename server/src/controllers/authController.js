const bcrypt =
require("bcryptjs");

const User =
require("../models/User");

exports.register =
async(req,res)=>{

const {
email,
password
} = req.body;

const hashedPassword =
await bcrypt.hash(
password,
10
);

const user =
await User.create({

email,

password:
hashedPassword

});

res.status(201)
.json(user);

};

const jwt =
require("jsonwebtoken");

exports.login =
async(req,res)=>{

const {
email,
password
}=req.body;

const user =
await User.findOne({
email
});

if(!user){

return res
.status(400)
.json({
message:
"Invalid Credentials"
});
}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res
.status(400)
.json({
message:
"Invalid Credentials"
});
}

const token =
jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);

res.json({
token
});

};