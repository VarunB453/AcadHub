import { getDb } from "../database/mongodb.mjs";

export async function getStudentContext(user) {
  const db = await getDb();
  const roles = user?.roles || [];
  const isStudentOnly = roles.includes("student") &&
    !roles.includes("admin") &&
    !roles.includes("faculty");

  const students = await db
    .collection("students")
    .find(isStudentOnly ? { user_id: user.id } : {})
    .toArray();

  const departments = await db
    .collection("departments")
    .find({})
    .toArray();

  const departmentMap = new Map(
    departments.map((department) => [
      department.id,
      department.name,
    ])
  );

  if (students.length === 0) {
    return `
No students are currently available
in the AcadHub database.
`;
  }

  return `
Current Campus Students

${students
  .map(
    (student, index) => `
${index + 1}.

Name : ${student.full_name}

Student ID : ${student.student_id}

Department : ${
  departmentMap.get(student.department_id) ??
  "Unknown"
}

Semester : ${student.semester}

Status : ${student.status}
`
  )
  .join("\n")}
`;
}