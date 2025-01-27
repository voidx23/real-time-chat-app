import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [currentContact, setCurrentContact] = useState(null);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const handleSendMessage = (text) => {
        const message = { text, sender: "You", receiver: currentContact.id };
        socket.emit("send-message", message);
        setMessages((prev) => [...prev, message]);
    };

    return (
        <div className="flex">
            <Sidebar contacts="nihal" onSelectContact={setCurrentContact} />
            <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatPage;
