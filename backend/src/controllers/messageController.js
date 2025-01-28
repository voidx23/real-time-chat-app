import User from "../models/userModel.js"
import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";


export const getSidebarContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error detected, location:get sidebar contacts", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessages = async (req, res) => {

    try {
        const { id: receiverChatId } = req.params
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverChatId },
                { senderId: receiverChatId, receiverId: senderId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error detected, location:get message controller", error.message);
        res.status(500).json({ message: "Server error" });
    }

}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error detected, location:send message controller", error.message);
        res.status(500).json({ message: "Server error" });
    }
}