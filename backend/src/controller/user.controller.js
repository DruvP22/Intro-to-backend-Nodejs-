import { User } from "../models/user.js";

const registerUser = async(req, res) => { 
    try {
        const {username, email, password} = req.body;

        //basic validation

        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are important"});
        }

        //check if user already in there
        const exisiting = await User.findOne({ email: email.toLowerCase() });
        if(exisiting) {
            return res.status(400).json({message: "The User already exists"})
        }

        //creating user
        const user  = await User.create({

            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered",
            user: {id: user._id, email: user.email, username: user.username}, 
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

const loginUser = async(req,res) => {
    //check if user alreadt exists
    try {
        const {email,password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({message: "User not found"});

        //compare password
        
    } catch (error) {
        
    }

};
export { 
    registerUser,
}