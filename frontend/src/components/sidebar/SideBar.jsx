import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ contacts, onSelectContact }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Function to filter contacts based on the search query
    const filteredContacts = contacts
        .filter(
            (contact) =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.message.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)); // Sort contacts by latest message (lastUpdated)

    return (
        <div className=" text-white bg-gray-900 h-screen p-4 border-r-2 border-gray-700 flex flex-col">
            {/* Heading */}
            <h2 className="text-xl font-bold mb-4">Contacts</h2>

            {/* Search Bar */}
            <div className="relative my-5">
                <input
                    type="search"
                    id="default-search"
                    className="block w-full px-4 py-2 text-md text-gray-200 border-2 border-gray-700 rounded-3xl bg-gray-900 outline-none"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="text-white absolute end-1 bottom-1.5 font-medium rounded-lg text-sm px-4 py-2"
                >
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </button>
            </div>

            {/* Scrollable Contacts */}
            <div className="flex-1 overflow-y-auto sidebar-scrollbar">
                {filteredContacts.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => onSelectContact(contact)}
                        className="p-5 mb-2 flex items-center  text-gray-400 rounded shadow hover:bg-gray-800"

                    >
                        <div className="flex items-center gap-3">
                            <img
                                className="rounded-4xl"
                                src={contact.profilePicture}
                                alt="profile"
                            />
                            <div>
                                <h3 className="font-semibold">{contact.name}</h3>
                                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis w-64">{contact.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
