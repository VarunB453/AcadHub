import { getDb } from "../database/mongodb.mjs";

export async function getAttendanceContext(user) {
  const db = await getDb();
  const roles = user?.roles || [];
  const isStudentOnly = roles.includes("student") &&
    !roles.includes("admin") &&
    !roles.includes("faculty");

  const attendance = await db
    .collection("attendance")
    .find(isStudentOnly ? { student_user_id: user.id } : {})
    .toArray();

  const students = await db
    .collection("students")
    .find(isStudentOnly ? { user_id: user.id } : {})
    .toArray();

  if (attendance.length === 0) {
    return `
No attendance records are available.
`;
  }

  const attendanceMap = new Map();

  for (const record of attendance) {
    if (!attendanceMap.has(record.student_id)) {
      attendanceMap.set(record.student_id, {
        present: 0,
        total: 0,
      });
    }

    const stats = attendanceMap.get(record.student_id);

    stats.total++;

    if (
      record.status.toLowerCase() ===
      "present"
    ) {
      stats.present++;
    }
  }

  let context = `
Current Attendance Summary

`;

  for (const student of students) {
    const stats =
      attendanceMap.get(student.id);

    if (!stats) continue;

    const percentage = (
      (stats.present / stats.total) *
      100
    ).toFixed(1);

    context += `
Name : ${student.full_name}

Student ID : ${student.student_id}

Attendance : ${percentage}%

Present : ${stats.present}

Total Classes : ${stats.total}

`;
  }

  return context;
}