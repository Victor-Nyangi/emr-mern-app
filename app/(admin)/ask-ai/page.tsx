"use client";

import { useState } from "react";
import { ArrowUpIcon, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ASK_AI_ENDPOINT, SERVER_URL } from "@/utilities/endpoints";
import { useAuthStore } from "@/lib/auth-store";
import { ChatForm } from "@/components/engagement/ai-chat-form";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * AskAiChat component allows users to ask questions about medications or medical terms.
 * It sends the question to an AI service and displays the response.
 */
interface Message {
  role: string;
  content: string;
}

const header = (
  <header className="m-auto flex max-w-96 py-6 flex-col gap-5 text-center">
    <h1 className="text-2xl font-semibold leading-none tracking-tight">
      Life of Health AI
    </h1>
    <p className="text-muted-foreground text-sm">
      This is an AI chatbot that will guide you and offer any support you need
      interacting with our platform.
    </p>
    <p className="text-muted-foreground text-sm">
      Send a message to get started.
    </p>
  </header>
);

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
    <div className="flex w-full p-4 flex-col items-stretch h-svh max-h-svh">
      <h2 className="text-xl font-semibold">Ask AI</h2>
      <div className="overflow-y-auto py-6space-y-2 text-sm">
        {messages.length ? (
          <>
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
          </>
        ) : (
          header
        )}
        {loading && <div className="text-gray-500 italic">Thinking…</div>}
      </div>
      <div className="border-input mt-6 bg-background focus-within:ring-ring/10 relative mx-6 mb-6 flex content-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0">
        <AutoResizeTextarea
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder="Ask about a medication or term..."
          className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSend}
              variant="ghost"
              size="sm"
              className="absolute bottom-1 right-1 size-6 rounded-full"
            >
              <ArrowUpIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={12}>Submit</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default AskAiChat;
