import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const notificationSound = new Audio("/sounds/notification.mp3");

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,

  isContactsLoading: false,
  isChatsLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") ?? "true"),

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(newValue));
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // =============================
  // GET CONTACTS
  // =============================
  getAllContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data.contacts || res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isContactsLoading: false });
    }
  },

  // =============================
  // GET CHATS
  // =============================
  getMyChatPartners: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data.chats || res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isChatsLoading: false });
    }
  },

  // =============================
  // GET MESSAGES
  // =============================
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // =============================
  // SEND MESSAGE (Optimistic UI)
  // =============================
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData,
      );

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? res.data : msg,
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  // =============================
  // SUBSCRIBE TO REAL-TIME MESSAGES
  // =============================
  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    const { socket, authUser } = useAuthStore.getState();

    if (!selectedUser || !socket) return;

    socket.off("receiveMessage"); // prevent duplicate listeners

    socket.on("receiveMessage", (newMessage) => {
      // Only add message if it belongs to current chat
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }

      // Play sound only if message is NOT sent by current user
      if (isSoundEnabled && newMessage.senderId !== authUser._id) {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(() => {});
      }
    });
  },

  // =============================
  // UNSUBSCRIBE
  // =============================
  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.off("receiveMessage");
  },
}));
