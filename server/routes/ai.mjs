import {
  send,
  sendError,
  parseBody,
} from "../utils/response.mjs";

import { detectIntent } from "../utils/aiIntent.mjs";
import { getStudentContext } from "../services/studentAITool.mjs";
import { getFacultyContext } from "../services/facultyAITool.mjs";
import { getAttendanceContext } from "../services/attendanceAITool.mjs";
import { getAuthUser } from "../middleware/authMiddleware.mjs";

const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

export async function handleAI(req, res) {
  console.log("\n========== AI REQUEST ==========");

  if (req.method !== "POST") {
    return sendError(
      res,
      405,
      "Method not allowed."
    );
  }

  try {
    const user = await getAuthUser(req);
    if (!user) {
      return sendError(res, 401, "Authentication required.");
    }

    const { message } =
      await parseBody(req);

    if (typeof message !== "string" || !message.trim()) {
      return sendError(
        res,
        400,
        "Message is required."
      );
    }

    if (message.length > 4000) {
      return sendError(res, 413, "Message is too long.");
    }

    const intent =
      detectIntent(message);

    let context = "";

    switch (intent) {
      case "students": {
        context =
          await getStudentContext(user);

        break;
      }
      case "faculty": {
        context =
          await getFacultyContext(user);

        break;
      }

      case "attendance": {
        context = await getAttendanceContext(user);

        break;
      }

      case "notice":
        context =
          "Notice tool coming soon.";
        break;

      case "event":
        context =
          "Event tool coming soon.";
        break;

      default:
        context = "";
    }

    const response = await fetch(
      GROQ_API_URL,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model:
            "openai/gpt-oss-120b",

          temperature: 0.4,

          max_tokens: 1024,

          messages: [
            {
              role: "system",

              content: `
You are AcadHub AI.

AcadHub is an AI-powered Campus Management System.

You assist students,
faculty and administrators.

Always answer professionally.

If campus data is provided below,
use ONLY that data.

If no campus data is available,
answer normally.

Campus Data:

${context}
`,
            },

            {
              role: "user",

              content: message,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return sendError(
        res,
        response.status,
        "Groq API request failed."
      );
    }

    const data =
      await response.json();

    const reply =
      data.choices?.[0]?.message
        ?.content ??
      "No response generated.";

    return send(res, 200, {
      success: true,
      reply,
    });

  } catch (error) {
    console.error(
      "\n======= SERVER ERROR ======="
    );

    console.error(error);

    console.error(
      "============================"
    );

    return sendError(
      res,
      500,
      "AcadHub AI is unavailable."
    );
  }
}