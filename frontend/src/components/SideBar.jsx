import React from "react";

const Sidebar = ({ contacts, onSelectContact }) => {
  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact(contact)}
          className="p-2 mb-2 cursor-pointer bg-white rounded shadow hover:bg-blue-100"
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
