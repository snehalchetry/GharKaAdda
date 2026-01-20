"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { ChatMessage } from "@/types";
import { formatDate } from "@/lib/utils";

interface ChatWindowProps {
  chatId: string;
  currentUserId: string;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function ChatWindow({
  chatId,
  currentUserId,
  messages,
  onSendMessage,
}: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId === currentUserId
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === currentUserId
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                >
                  {formatDate(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

