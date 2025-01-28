import { generateToken } from "../config/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js"

export const signup = async (req, res) => {

    const { fullName, email, password, profilePic } = req.body

    try {

        if (!fullName || !email || !password) return res.status(400).json({ message: "All input fields are required" });

        if (password.length < 8) return res.status(400).json({ message: "Password must be atleast 8 characters" });

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "An account with this email already exists" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createUser = new User({
            fullName,
            email,
            password: hashedPassword,
            // profilePic
        })



        if (createUser) {

            generateToken(createUser._id, res);
            await createUser.save();

            res.status(200).json({
                _id: createUser._id,
                fullName: createUser.fullName,
                email: createUser.email,
                profilePic: createUser.profilePic,
            })
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error detected, location:signup controller", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) return res.status(400).json({ message: "All input fields are required" });

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Password incorrect" });

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })


    } catch (error) {

        console.log("Error detected, location:login controller", error.message);
        res.status(500).json({ message: "Server error" });
    }

};

export const logout = (req, res) => {
    try {
        console.log("first")
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        console.log("Error detected, location:logout controller", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName } = req.body;

        const userId = req.user._id;
        const user = await User.findById(userId);

        // if (user.fullName != fullName) {

        // }


        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error detected, location:profile update controller", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error detected, location:check auth", error.message);
        res.status(500).json({ message: "Server error" });
    }
}