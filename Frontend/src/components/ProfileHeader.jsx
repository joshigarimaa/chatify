// import { useState, useRef } from "react";
// import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";

// const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

// const ProfileHeader = () => {
//   const { logout, authUser, updateProfile } = useAuthStore();
//   console.log(authUser);
//   const { isSoundEnabled, toggleSound } = useChatStore();

//   const [selectedImg, setSelectedImg] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       await updateProfile({ profilePic: base64Image });
//     };
//   };

//   return (
//     <div className="p-6 border-b border-slate-700/50">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* ✅ Correct DaisyUI Avatar Structure */}
//           <div className="avatar online">
//             <div className="w-14 rounded-full relative group overflow-hidden">
//               <img
//                 src={selectedImg || authUser?.profilePic || "/avatar.png"}
//                 alt="User"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() => fileInputRef.current.click()}
//               />
//               <div
//                 className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 <span className="text-white text-xs">Change</span>
//               </div>
//             </div>
//           </div>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             ref={fileInputRef}
//             className="hidden"
//           />

//           <div>
//             <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
//               {authUser?.fullName}
//             </h3>
//             <p className="text-slate-400 text-xs">Online</p>
//           </div>
//         </div>

//         <div className="flex gap-4 items-center">
//           <button
//             className="text-slate-400 hover:text-slate-200 transition-colors"
//             onClick={logout}
//           >
//             <LogOutIcon className="size-5" />
//           </button>

//           <button
//             className="text-slate-400 hover:text-slate-200 transition-colors"
//             onClick={() => {
//               mouseClickSound.currentTime = 0;
//               mouseClickSound.play().catch(() => {});
//               toggleSound();
//             }}
//           >
//             {isSoundEnabled ? (
//               <Volume2Icon className="size-5" />
//             ) : (
//               <VolumeOffIcon className="size-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;
















import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* ✅ Manual Avatar With Green Dot */}
          <div className="relative w-14 h-14">
            <div className="w-14 h-14 rounded-full relative group overflow-hidden">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="User"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              />
              <div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-white text-xs">Change</span>
              </div>
            </div>

            {/* 🟢 Green Online Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />

          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser?.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;