import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,

  isContactsLoading: false,
  isChatsLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: JSON.parse(
    localStorage.getItem("isSoundEnabled") ?? "true"
  ),

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(newValue));
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // ✅ GET CONTACTS
  getAllContact: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");

      // ✅ assuming backend returns { contacts: [...] }
      set({ allContacts: res.data.contacts || res.data });

    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  // ✅ GET CHATS
  getMyChatPartners: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");

      // ✅ assuming backend returns { chats: [...] }
      set({ chats: res.data.chats || res.data });

    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      set({ isChatsLoading: false });
    }
  },
}));