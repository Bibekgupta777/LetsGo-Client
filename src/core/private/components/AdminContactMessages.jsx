import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, User, Calendar } from "lucide-react";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/contact");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📩 Contact Messages</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <Card className="shadow-lg border border-gray-200 rounded-xl">
          <CardContent className="p-4 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-200 text-gray-800">
                <tr className="text-left">
                  <th className="p-3 text-sm font-semibold uppercase">Name</th>
                  <th className="p-3 text-sm font-semibold uppercase">Email</th>
                  <th className="p-3 text-sm font-semibold uppercase">Subject</th>
                  <th className="p-3 text-sm font-semibold uppercase">Message</th>
                  <th className="p-3 text-sm font-semibold uppercase text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr
                    key={message._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b hover:bg-gray-100 transition-all`}
                  >
                    {/* Name */}
                    <td className="p-3 flex items-center gap-2 text-gray-700">
                      <User className="text-gray-500 w-5 h-5" />
                      {message.name}
                    </td>

                    {/* Email */}
                    <td className="p-3">
                      <a
                        href={`mailto:${message.email}`}
                        className="text-blue-600 flex items-center gap-1 hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {message.email}
                      </a>
                    </td>

                    {/* Subject */}
                    <td className="p-3 text-gray-700">{message.subject}</td>

                    {/* Message (tooltip for long messages) */}
                    <td className="p-3 max-w-xs truncate">
                      <span className="block text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {message.message.length > 50 ? (
                          <span title={message.message}>{message.message.slice(0, 50)}...</span>
                        ) : (
                          message.message
                        )}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-3 text-center text-gray-600">
                      <Calendar className="inline w-4 h-4 mr-1 text-gray-500" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminContactMessages;
