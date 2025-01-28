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
            message: "hello, are you there?",
            profilePicture: "https://placehold.co/50",
            messages: [
                { sender: "Jane", content: "hello, are you there?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                { sender: "Me", content: "I'm doing well, thanks!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }

            ]
        },
    ];

    const [messages, setMessages] = useState([]);
    const [currentContact, setCurrentContact] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleContactClick = (contact) => {
        setCurrentContact(contact);
        setMessages(contact.messages);
        setIsSidebarVisible(false); // Hide sidebar on small screens when a contact is selected
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform bg-gray-900 lg:relative lg:translate-x-0  ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
            >
                <Sidebar contacts={contacts} onSelectContact={handleContactClick} />
            </div>

            {/* Chat Window */}
            <div className="flex-1 lg:ml-1/4 bg-gray-800">

                {currentContact && (
                    <ChatWindow
                        messages={messages}
                        setMessages={setMessages}
                        currentContact={currentContact}
                        handleBackClick={toggleSidebar}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatPage;
