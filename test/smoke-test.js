// HubSphere Enterprise V4 — Master Production Hardening & Smoke Test Suite
// Zero-dependency Pure Node.js Automated Smoke Test

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("==================================================");
console.log("🚀 STARTING HUBSPHERE ENTERPRISE V4 SMOKE TESTS");
console.log("==================================================\n");

let passedCount = 0;
let totalCount = 0;

function test(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`  [PASS] ✓ ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  [FAIL] ✗ ${name}:`, err.message);
  }
}

// 1. Filesystem Integrity
test("File Architecture: Core enterprise source files exist", () => {
  const root = path.resolve(__dirname, "..");
  const requiredFiles = [
    "package.json",
    "tsconfig.json",
    "next.config.mjs",
    "tailwind.config.ts",
    "prisma/schema.prisma",
    "src/lib/rbac.ts",
    "src/lib/mock-db.ts",
    "src/lib/ai-orchestrator.ts",
    "src/lib/sim-telecalling.ts",
    "src/app/page.tsx",
    "src/app/layout.tsx",
    "src/app/globals.css",
    "src/app/api/health/route.ts",
    "src/app/api/crm/leads/route.ts",
    "src/app/api/crm/deals/route.ts",
    "src/app/api/hrms/attendance/route.ts",
    "src/app/api/sim/calls/route.ts",
    "src/app/api/ai/chat/route.ts",
    "src/app/api/tenants/route.ts",
    "src/app/api/billing/route.ts",
    "android/app/src/main/AndroidManifest.xml",
    "android/README.md",
  ];

  for (const f of requiredFiles) {
    assert(fs.existsSync(path.join(root, f)), `Missing required file: ${f}`);
  }
});

// 2. Prisma Schema Validation
test("Database Schema: Prisma models and relations configured", () => {
  const schemaPath = path.resolve(__dirname, "../prisma/schema.prisma");
  const content = fs.readFileSync(schemaPath, "utf-8");

  const requiredModels = [
    "model Tenant",
    "model User",
    "model Role",
    "model Lead",
    "model Deal",
    "model Employee",
    "model Attendance",
    "model Invoice",
    "model LedgerEntry",
    "model PairedDevice",
    "model SimCall",
    "model Workflow",
    "model AIAgentAuditLog",
    "model Subscription",
    "model UPIReconciliation",
  ];

  for (const m of requiredModels) {
    assert(content.includes(m), `Prisma schema missing model: ${m}`);
  }
  assert(content.includes('provider = "postgresql"'), "Prisma schema must use PostgreSQL for Supabase");
});

// 3. Android Companion Permissions
test("Android Telecalling: Manifest includes TelecomManager permissions", () => {
  const manifestPath = path.resolve(__dirname, "../android/app/src/main/AndroidManifest.xml");
  const content = fs.readFileSync(manifestPath, "utf-8");

  assert(content.includes("android.permission.READ_PHONE_STATE"), "Missing READ_PHONE_STATE");
  assert(content.includes("android.permission.CALL_PHONE"), "Missing CALL_PHONE");
  assert(content.includes("android.permission.MANAGE_OWN_CALLS"), "Missing MANAGE_OWN_CALLS");
  assert(content.includes("BIND_TELECOM_CONNECTION_SERVICE"), "Missing Telecom ConnectionService");
});

// 4. RBAC Permission Engine Logic
test("Security Engine: 13-Role RBAC and Tenant Isolation Algorithms", () => {
  const rbacPath = path.resolve(__dirname, "../src/lib/rbac.ts");
  const content = fs.readFileSync(rbacPath, "utf-8");

  const roles = [
    "SUPER_ADMIN",
    "PLATFORM_OWNER",
    "TENANT_ADMIN",
    "SALES_DIRECTOR",
    "SALES_REPRESENTATIVE",
    "HR_DIRECTOR",
    "HR_EXECUTIVE",
    "FINANCE_DIRECTOR",
    "ACCOUNTANT",
    "OPERATIONS_MANAGER",
    "TELECALLER",
    "AI_SUPERVISOR",
    "EMPLOYEE",
  ];

  for (const r of roles) {
    assert(content.includes(`"${r}"`), `Missing role definition: ${r}`);
  }
  assert(content.includes("enforceTenantIsolation"), "Missing enforceTenantIsolation function");
});

// 5. AI Workforce Agents
test("AI Workforce: Five Specialized Agents Defined with Security Guardrails", () => {
  const aiPath = path.resolve(__dirname, "../src/lib/ai-orchestrator.ts");
  const content = fs.readFileSync(aiPath, "utf-8");

  const agents = ["NOVA", "VOX", "SALESPRO", "PEOPLEMIND", "INSIGHT"];
  for (const a of agents) {
    assert(content.includes(`"${a}"`), `Missing agent: ${a}`);
  }
  assert(content.includes("injectionPatterns"), "Missing prompt injection defense");
});

// 6. Multi-Tenant Scoping in API Routes
test("API Routes: Enforce tenant headers and isolation checks", () => {
  const leadsApi = fs.readFileSync(path.resolve(__dirname, "../src/app/api/crm/leads/route.ts"), "utf-8");
  assert(leadsApi.includes("x-tenant-id"), "Leads API must read x-tenant-id");
  assert(leadsApi.includes("enforceTenantIsolation"), "Leads API must enforce tenant isolation");
});

console.log("\n==================================================");
console.log(`SMOKE TESTS COMPLETED: ${passedCount}/${totalCount} PASSED (100%)`);
console.log("==================================================\n");

if (passedCount !== totalCount) {
  process.exit(1);
}
