"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ASK_AI_ENDPOINT, SERVER_URL } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { useAuthStore } from "@/lib/auth-store";

/**
 * AskAiChat component allows users to ask questions about medications or medical terms.
 * It sends the question to an AI service and displays the response.
 */
interface Message {
  role: string;
  content: string;
}
const AskAiChat = () => {
  const { token } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload = { question: input };
      
      const authHeaderValue = `Bearer ${token}`;

      const res = await fetch(SERVER_URL + ASK_AI_ENDPOINT, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeaderValue,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data, "data");

      const aiMessage = { role: "assistant", content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border rounded-2xl shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-3">Ask AI</h2>
      <div className="h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-100 text-right ml-auto"
                : "bg-green-100 mr-auto"
            } max-w-xs`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Thinking…</div>}
      </div>

      <div className="flex mt-3 gap-2">
        <Input
          type="text"
          placeholder="Ask about a medication or term..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <SendHorizonal size={18} />
        </Button>
      </div>
    </div>
  );
};

export default AskAiChat;
