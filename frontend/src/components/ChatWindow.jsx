import React, { useState, useEffect, useRef } from "react";

const ChatWindow = ({ messages, setMessages, currentContact, handleBackClick }) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null); // To scroll to the latest message

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                sender: "Me",
                content: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Adding a timestamp
            };

            // Add the new message to the state array
            setMessages((prevMessages) => [...prevMessages, newMsg]);

            setNewMessage(""); // Clear the input after sending
        }
    };

    // Scroll to bottom whenever a new message is added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // This effect runs when messages change

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col w-full bg-gray-800 h-full">
            <div className="bg-gray-700 pl-10 flex p-3 justify-start items-center space-x-4">
                <div className="lg:hidden">
                    <button onClick={handleBackClick} className="text-white p-2">
                        <svg
                            width="30px"
                            height="50px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                                fill="#000000"
                            />
                        </svg>
                    </button>
                </div>
                <img className="rounded-4xl" src={currentContact.profilePicture} alt="" />
                <h1 className="text-xl text-gray-300 font-bold">{currentContact.name}</h1>
            </div>
            {/* Display Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === "Me" ? "justify-end pr-10" : "justify-start pl-10"}`}
                    >
                        <div
                            className={`rounded-xl p-2 max-w-[50%] ${message.sender === "Me" ? "bg-blue-500 text-white" : "bg-gray-600 text-white"
                                }`}
                        >
                            <p>{message.content}</p>
                            <span className="text-[11px] text-gray-300 mt-1 flex justify-end">{message.timestamp}</span>
                        </div>
                    </div>
                ))}
                {/* Scroll to the bottom */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input to type a new message */}
            <div className="p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown} // Handle the Enter key
                        placeholder="Type a message"
                        className="w-full p-2 bg-gray-700 text-white rounded-lg"
                    />
                    <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
