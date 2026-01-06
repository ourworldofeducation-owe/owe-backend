import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import parentRoutes from "./routes/parent.routes.js";

import attendanceRoutes from "./routes/attendance.routes.js";
import feesRoutes from "./routes/fees.routes.js";
import remarksRoutes from "./routes/remarks.routes.js";
import assignmentsRoutes from "./routes/assignments.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// AUTH
app.use("/api/auth", authRoutes);

// ADMIN CORE
app.use("/api/admin", adminRoutes);

// ADMIN FEATURES
app.use("/api/admin/attendance", attendanceRoutes);
app.use("/api/admin/fees", feesRoutes);
app.use("/api/admin/remarks", remarksRoutes);
app.use("/api/admin/assignments", assignmentsRoutes);

// PARENT
app.use("/api/parent", parentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
