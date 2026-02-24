import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isContactsLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]); // ✅ added dependency

  if (isContactsLoading) return <UserLoadingSkeleton />;

  if (!allContacts || allContacts.length === 0) return null; // ✅ safe check

  return (
    <>
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(
          contact._id?.toString() // ✅ safer comparison
        );

        return (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* ✅ Show dot ONLY if online */}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
                )}
              </div>

              <h4 className="text-slate-200 font-medium">
                {contact.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactList;