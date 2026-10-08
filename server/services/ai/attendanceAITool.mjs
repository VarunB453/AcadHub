export async function attendanceAITool(payload = {}) {
  return {
    tool: "attendance",
    success: true,
    payload,
    summary: "Attendance analysis requested successfully.",
  };
}
