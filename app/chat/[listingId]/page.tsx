"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ChatWindow from "@/components/ChatWindow";
import { db } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { Chat, ChatMessage, Listing, User } from "@/types";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.listingId as string;
  
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(userStr);
    setCurrentUser(user);

    if (db.getAllListings().length === 0) {
      seedDatabase();
    }

    const foundListing = db.getListingById(listingId);
    if (!foundListing) {
      router.push("/listings");
      return;
    }
    setListing(foundListing);

    // Find or create chat
    const existingChats = db.getChatsByUserId(user.id);
    let existingChat = existingChats.find(
      (c) => c.listingId === listingId && (c.studentId === user.id || c.ownerId === user.id)
    );

    if (!existingChat) {
      // Create new chat
      if (user.role === "student") {
        existingChat = db.createChat({
          studentId: user.id,
          ownerId: foundListing.ownerId,
          listingId: listingId,
        });
      } else {
        // If owner is viewing, we need a student - for demo, create with first student
        const students = db.getAllListings()
          .map((l) => l.owner)
          .filter((u) => u.role === "student");
        if (students.length > 0) {
          existingChat = db.createChat({
            studentId: students[0].id,
            ownerId: user.id,
            listingId: listingId,
          });
        }
      }
    }

    if (existingChat) {
      setChat(existingChat);
      const chatMessages = db.getMessagesByChatId(existingChat.id);
      setMessages(chatMessages);
    }
  }, [listingId, router]);

  const handleSendMessage = (message: string) => {
    if (!chat || !currentUser) return;

    const receiverId =
      currentUser.id === chat.studentId ? chat.ownerId : chat.studentId;

    const newMessage = db.createMessage({
      chatId: chat.id,
      senderId: currentUser.id,
      receiverId: receiverId,
      message: message,
      read: false,
    });

    setMessages([...messages, newMessage]);
  };

  if (!chat || !listing || !currentUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Loading chat...</p>
      </div>
    );
  }

  const otherUser =
    currentUser.id === chat.studentId ? chat.owner : chat.student;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/listings/${listingId}`}
          className="inline-flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Listing
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
          <p className="text-gray-600">
            Chatting with {otherUser.name}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md" style={{ height: "600px" }}>
          <ChatWindow
            chatId={chat.id}
            currentUserId={currentUser.id}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

