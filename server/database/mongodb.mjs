import { MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";

import { MONGODB_URI, DB_NAME } from "../config/env.mjs";

let client = null;
let db = null;
let initialized = false;

export async function getDb() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add it to your .env file."
    );
  }

  if (!client) {
    client = new MongoClient(MONGODB_URI);
    try {
  await client.connect();
  console.log("✅ MongoDB Connected");

  await client.db("admin").command({ ping: 1 });
  console.log("✅ MongoDB Ping Successful");
} catch (err) {
  console.error("❌ Mongo Connection Failed");
  throw err;
}
  }

  if (!db) {
    db = client.db(DB_NAME);
  }

  if (!initialized) {
    console.log("client:", !!client);
    console.log("db:", !!db);
    await initializeDatabase();
    initialized = true;
  }

  return db;
}

async function initializeDatabase() {
  await Promise.all([
    db.collection("users").createIndex(
      { email: 1 },
      { unique: true }
    ),

    db.collection("departments").createIndex(
      { code: 1 },
      { unique: true }
    ),

    db.collection("students").createIndex(
      { student_id: 1 },
      { unique: true }
    ),

    db.collection("faculty").createIndex(
      { faculty_id: 1 },
      { unique: true }
    ),

    db.collection("courses").createIndex(
      { course_code: 1 },
      { unique: true }
    ),
  ]);

  const now = new Date().toISOString();
  const defaultDepartments = [
    { name: "Computer Science", code: "CSE" },
    { name: "Electronics", code: "ECE" },
    { name: "Mechanical", code: "ME" },
    { name: "Civil", code: "CE" },
  ];

  for (const department of defaultDepartments) {
    await db.collection("departments").updateOne(
      { code: department.code },
      {
        $setOnInsert: {
          id: randomUUID(),
          ...department,
          head_name: null,
          created_at: now,
        },
      },
      { upsert: true }
    );
  }
}