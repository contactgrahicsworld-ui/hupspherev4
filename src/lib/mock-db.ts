// HubSphere Enterprise V4 — Resilient In-Memory & File Database Provider
// Guarantees zero runtime crashes even when Supabase PostgreSQL credentials are pending

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

// Global In-Memory Store
export const db = {
  tenants: [
    {
      id: "tenant-ved-01",
      name: "Ved Packaging Industries Ltd",
      slug: "ved-packaging",
      plan: "ENTERPRISE",
      status: "ACTIVE",
      aiMonthlyLimit: 25000,
      aiUsageCount: 1492,
      simDeviceLimit: 10,
    },
    {
      id: "tenant-apex-02",
      name: "Apex Logistics Global",
      slug: "apex-logistics",
      plan: "PRO",
      status: "ACTIVE",
      aiMonthlyLimit: 10000,
      aiUsageCount: 420,
      simDeviceLimit: 5,
    },
  ] as TenantRecord[],

  leads: [
    {
      id: "lead-01",
      tenantId: "tenant-ved-01",
      name: "Rajesh Verma",
      companyName: "Mahindra Corrugated Box Division",
      email: "rajesh@mahindra.example",
      phone: "+91 98210 11223",
      source: "WEBSITE_INQUIRY",
      score: 88,
      status: "PROPOSAL_SENT",
      estimatedValue: 650000,
      assignedTo: "SalesPro AI",
      createdAt: new Date().toISOString(),
    },
    {
      id: "lead-02",
      tenantId: "tenant-ved-01",
      name: "Sunil Mehta",
      companyName: "Prime Polymers Ltd",
      email: "sunil@primepoly.example",
      phone: "+91 97112 33445",
      source: "SIM_TELECALLING",
      score: 65,
      status: "CONTACTED",
      estimatedValue: 320000,
      assignedTo: "Amit Sharma",
      createdAt: new Date().toISOString(),
    },
    {
      id: "lead-03",
      tenantId: "tenant-ved-01",
      name: "Deepak Chawla",
      companyName: "Global Packaging Exports",
      email: "deepak@globalpack.example",
      phone: "+91 94110 55667",
      source: "REFERRAL",
      score: 95,
      status: "NEGOTIATION",
      estimatedValue: 2850000,
      assignedTo: "Priya Singh",
      createdAt: new Date().toISOString(),
    },
    {
      id: "lead-04",
      tenantId: "tenant-ved-01",
      name: "Anil Ambani Agro",
      companyName: "Zenith Agro Fruits",
      email: "procurement@zenithagro.example",
      phone: "+91 98111 88990",
      source: "EXPO_2026",
      score: 99,
      status: "WON",
      estimatedValue: 3420000,
      assignedTo: "Sales Director Deshmukh",
      createdAt: new Date().toISOString(),
    },
  ] as LeadRecord[],

  deals: [
    {
      id: "deal-01",
      tenantId: "tenant-ved-01",
      leadId: "lead-01",
      title: "50,000 Heavy Duty Corrugated Cartons",
      amount: 650000,
      stage: "PROPOSAL",
      expectedClose: "2026-11-20",
    },
    {
      id: "deal-02",
      tenantId: "tenant-ved-01",
      leadId: "lead-03",
      title: "Annual Kraft Paper Box Supply Contract",
      amount: 2850000,
      stage: "NEGOTIATION",
      expectedClose: "2026-11-15",
    },
    {
      id: "deal-03",
      tenantId: "tenant-ved-01",
      leadId: "lead-04",
      title: "1 Lakh Printed Fruit Export Crates",
      amount: 3420000,
      stage: "WON",
      expectedClose: "2026-11-02",
    },
  ] as DealRecord[],

  simCalls: [
    {
      id: "sim-call-01",
      tenantId: "tenant-ved-01",
      deviceId: "dev-samsung-01",
      phoneNumber: "+91 98210 11223",
      customerName: "Rajesh Verma",
      direction: "OUTBOUND",
      simSlot: 1,
      durationSeconds: 258,
      disposition: "INTERESTED",
      syncedAt: new Date().toISOString(),
    },
    {
      id: "sim-call-02",
      tenantId: "tenant-ved-01",
      deviceId: "dev-oneplus-02",
      phoneNumber: "+91 97112 33445",
      customerName: "Sunil Mehta",
      direction: "OUTBOUND",
      simSlot: 2,
      durationSeconds: 105,
      disposition: "CALL_BACK",
      syncedAt: new Date().toISOString(),
    },
  ] as SimCallRecord[],

  employees: [
    {
      id: "emp-01",
      tenantId: "tenant-ved-01",
      employeeCode: "EMP-001",
      name: "Amit Sharma",
      department: "Sales & Telecalling",
      designation: "Senior Telecaller",
      basicSalary: 38000,
      attendanceStatus: "PRESENT",
    },
    {
      id: "emp-02",
      tenantId: "tenant-ved-01",
      employeeCode: "EMP-002",
      name: "Priya Singh",
      department: "CRM Operations",
      designation: "Account Executive",
      basicSalary: 45000,
      attendanceStatus: "PRESENT",
    },
    {
      id: "emp-03",
      tenantId: "tenant-ved-01",
      employeeCode: "EMP-003",
      name: "Vikas Malhotra",
      department: "Production & Printing",
      designation: "Plant Supervisor",
      basicSalary: 52000,
      attendanceStatus: "PRESENT",
    },
  ] as EmployeeRecord[],
};
