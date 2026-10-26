import { useChatContext } from "./ChatContext";

import { motion } from "framer-motion";

export default function WelcomeScreen() {
  const { sendMessage } = useChatContext();

  const suggestions = [
    {
      title: "Find Student",
      subtitle: "Search student records",
      prompt: "Show all students in the campus.",
    },
    {
      title: "Attendance Analytics",
      subtitle: "Generate attendance reports",
      prompt: "Generate attendance analytics.",
    },
    {
      title: "Create Notice",
      subtitle: "Draft a campus notice",
      prompt: "Help me draft a campus notice.",
    },
    {
      title: "Upcoming Events",
      subtitle: "View scheduled events",
      prompt: "Show upcoming campus events.",
    },
    {
      title: "Faculty Details",
      subtitle: "Search faculty information",
      prompt: "Show all faculty members.",
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 py-8">
      <div className="mt-6 text-center">
        <h2 className="text-3xl font-bold">AcadHub AI</h2>
        <p className="mt-3 text-muted-foreground">Welcome 👋</p>
        <p className="mt-2 text-sm text-muted-foreground leading-6">
          Your intelligent campus assistant. Ask questions, generate reports,
          manage students, attendance, notices and events.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick Actions
        </h3>

        <div className="space-y-3">
          {suggestions.map((item) => (
            <motion.button
              key={item.title}
              onClick={() => sendMessage(item.prompt)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-between rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:border-blue-500 hover:shadow-md"
            >
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}