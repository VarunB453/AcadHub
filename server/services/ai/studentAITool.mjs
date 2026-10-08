export async function studentAITool(payload = {}) {
  return {
    tool: "student",
    success: true,
    payload,
    summary: "Student insight generated successfully.",
  };
}
