// import React, { useEffect } from "react";
// import { useChatStore } from "../store/useChatStore";
// import UserLoadingSkeleton from "./UserLoadingSkeleton";

// const ContactList = () => {
//   const {
//     getAllContact, // ✅ fixed name
//     allContacts,
//     setSelectedUser,
//     isContactsLoading, // ✅ fixed state name
//   } = useChatStore();

//   useEffect(() => {
//     getAllContact();
//   }, []);

//   if (isContactsLoading) return <UserLoadingSkeleton />;

//   return (
//     <>
//       {allContacts.map((contact) => (
//         <div
//           key={contact._id}
//           className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
//           onClick={() => setSelectedUser(contact)}
//         >
//           <div className="flex items-center gap-3">
//             {/* ✅ fixed avatar class */}
//             <div className="avatar online">
//               <div className="size-12 rounded-full">
//                 <img
//                   src={contact.profilePic || "/avatar.png"}
//                   alt={contact.fullName}
//                 />
//               </div>
//             </div>

//             <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ContactList;



import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ContactList = () => {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isContactsLoading,
  } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isContactsLoading) return <UserLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            
            {/* ✅ Manual Online Avatar */}
            <div className="relative w-12 h-12">
              <img
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>

            <h4 className="text-slate-200 font-medium">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;