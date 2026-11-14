import type {
  AppRole,
} from "@/integrations/mongodb/types";
import {
  BriefcaseBusiness,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type {
  DepartmentOption,
  SignupFormData,
} from "./types";

/* =========================================
   ADMIN
========================================= */

export const ADMIN_EMAIL =
  "rahulyadavrasalpur@gmail.com";

/* =========================================
   ROLE OPTIONS
========================================= */

export const ROLE_OPTIONS: {
  role: AppRole;
  label: string;
  icon: typeof ShieldCheck;
}[] = [
  {
    role: "student",
    label: "Student",
    icon: UserRound,
  },

  {
    role: "faculty",
    label: "Faculty",
    icon: BriefcaseBusiness,
  },

  {
    role: "admin",
    label: "Admin",
    icon: ShieldCheck,
  },
];

export const REGISTRATION_DEPARTMENTS: DepartmentOption[] = [
  { id: "CSE", name: "Computer Science", code: "CSE" },
  { id: "ECE", name: "Electronics", code: "ECE" },
  { id: "ME", name: "Mechanical", code: "ME" },
  { id: "CE", name: "Civil", code: "CE" },
];

/* =========================================
   DEFAULT FORM
========================================= */

export const DEFAULT_FORM: SignupFormData =
{
  fullName: "",

  email: "",

  password: "",

  confirmPassword: "",

  role: "student",

  studentId: "",

  semester: "1",

  enrollmentYear:
    String(
      new Date().getFullYear()
    ),

  facultyId: "",

  designation: "",

  mobile: "",

  departmentId: "",
};