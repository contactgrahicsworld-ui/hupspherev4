// HubSphere Enterprise V4 — Clean Production Database Store
// Zero Fake / Placeholder Data — Dynamic Real Business Records Only

export interface TenantRecord {
  id: string;
  name: string;
  slug: string;
  plan: "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
  status: "ACTIVE" | "SUSPENDED" | "TRIAL";
  aiMonthlyLimit: number;
  aiUsageCount: number;
  simDeviceLimit: number;
}

export interface LeadRecord {
  id: string;
  tenantId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  source: string;
  score: number;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "NEGOTIATION" | "WON" | "LOST";
  estimatedValue: number;
  assignedTo: string;
  createdAt: string;
}

export interface DealRecord {
  id: string;
  tenantId: string;
  leadId: string;
  title: string;
  amount: number;
  stage: "NEW" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST";
  expectedClose: string;
}

export interface SimCallRecord {
  id: string;
  tenantId: string;
  deviceId: string;
  phoneNumber: string;
  customerName: string;
  direction: "INBOUND" | "OUTBOUND";
  simSlot: number;
  durationSeconds: number;
  disposition: string;
  syncedAt: string;
}

export interface EmployeeRecord {
  id: string;
  tenantId: string;
  employeeCode: string;
  name: string;
  department: string;
  designation: string;
  basicSalary: number;
  attendanceStatus: "PRESENT" | "LATE" | "ABSENT";
}

// Global In-Memory Store — Cleaned of all fake records
export const db = {
  tenants: [
    {
      id: "tenant-primary",
      name: "Primary Enterprise Workspace",
      slug: "primary-workspace",
      plan: "ENTERPRISE",
      status: "ACTIVE",
      aiMonthlyLimit: 50000,
      aiUsageCount: 0,
      simDeviceLimit: 25,
    },
  ] as TenantRecord[],

  leads: [] as LeadRecord[],
  deals: [] as DealRecord[],
  simCalls: [] as SimCallRecord[],
  employees: [] as EmployeeRecord[],
};
