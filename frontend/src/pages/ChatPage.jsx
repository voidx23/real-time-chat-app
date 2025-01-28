import { useState } from "react";
import Sidebar from "../components/sidebar/SideBar";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
    const contacts = [
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "+1 555-123-4567",
            status: "online",
            message: "hello, how are you?",
            profilePicture: "https://placehold.co/50",
            messages: [
                { sender: "John", content: "hello, how are you?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                { sender: "Me", content: "I'm doing well, thanks!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "+1 555-987-6543",
            status: "offline",
            message: "hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?",
            profilePicture: "https://placehold.co/50",
            messages: [
                { sender: "Jane", content: "hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?hello, are you there?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                { sender: "Me", content: "I'm doing well, thanks!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }

            ]
        },
        // Add more contacts here
    ];


    const [messages, setMessages] = useState([]);
    const [currentContact, setCurrentContact] = useState(null);

    const handleContactClick = (contact) => {
        setCurrentContact(contact);
        setMessages(contact.messages); // Set the messages of the selected contact
    };
    const handleBackClick = () => {
       
        setIsSidebarVisible(true);
    };

    return (
        <div className="flex">
            <Sidebar
                contacts={contacts}
                onSelectContact={handleContactClick}

            />
            {currentContact && (
                <ChatWindow
                    messages={messages}
                    setMessages={setMessages}
                    currentContact={currentContact}
                    handleBackClick={handleBackClick}
                />
            )}
        </div>
    );
};

export default ChatPage;
