export function getAIIntent(prompt = "") {
  const normalized = String(prompt).trim().toLowerCase();

  if (!normalized) {
    return "general";
  }

  if (normalized.includes("attendance")) return "attendance";
  if (normalized.includes("faculty")) return "faculty";
  if (normalized.includes("student")) return "student";
  if (normalized.includes("course")) return "courses";

  return "general";
}
