import { useState } from "react";
import axios from "axios";

const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

const api = axios.create({
  baseURL: OPENAI_API_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer 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`,
    "Content-Type": "application/json",
  },
});

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("", {
        prompt: message,
        max_tokens: 60,
      });
      setResponse(res.data.choices[0].text.trim());
      setMessage(""); // clear the input field after receiving the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border border-gray-300 rounded p-2 mb-2 w-300">
      <h1 className="text-2xl font-bold text-white mb-4"> Metis AI Agent</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
          value={message}
          onChange={handleInputChange}
          placeholder="Ask Metis"
          rows={4}
        />

        <button
          className="bg-primary text-white font-bold py-2 px-4  rounded-lg bg-blue-800"
          type="submit"
        >
          Send
        </button>
        <div className="grid">{response}</div>
      </form>
    </div>
  );
};

export default ChatBox;
