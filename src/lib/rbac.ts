// HubSphere Enterprise V4 — 13 Enterprise Roles & Permissions Matrix
// Enforces server-side RBAC authorization and tenant isolation

export type EnterpriseRole =
  | "SUPER_ADMIN"
  | "PLATFORM_OWNER"
  | "TENANT_ADMIN"
  | "SALES_DIRECTOR"
  | "SALES_REPRESENTATIVE"
  | "HR_DIRECTOR"
  | "HR_EXECUTIVE"
  | "FINANCE_DIRECTOR"
  | "ACCOUNTANT"
  | "OPERATIONS_MANAGER"
  | "TELECALLER"
  | "AI_SUPERVISOR"
  | "EMPLOYEE";

export const PERMISSIONS = {
  // CRM Permissions
  CRM_LEAD_VIEW: "crm:lead:view",
  CRM_LEAD_CREATE: "crm:lead:create",
  CRM_LEAD_EDIT: "crm:lead:edit",
  CRM_LEAD_DELETE: "crm:lead:delete",
  CRM_DEAL_VIEW: "crm:deal:view",
  CRM_DEAL_MANAGE: "crm:deal:manage",
  CRM_EXPORT: "crm:export",

  // HRMS Permissions
  HRMS_EMPLOYEE_VIEW: "hrms:employee:view",
  HRMS_EMPLOYEE_MANAGE: "hrms:employee:manage",
  HRMS_ATTENDANCE_VIEW: "hrms:attendance:view",
  HRMS_ATTENDANCE_PUNCH: "hrms:attendance:punch",
  HRMS_LEAVE_APPROVE: "hrms:leave:approve",
  HRMS_PAYROLL_RUN: "hrms:payroll:run",

  // ERP & Finance
  ERP_INVOICE_CREATE: "erp:invoice:create",
  ERP_LEDGER_VIEW: "erp:ledger:view",
  ERP_STOCK_MANAGE: "erp:stock:manage",

  // SIM Telecalling
  SIM_CALL_DISPATCH: "sim:call:dispatch",
  SIM_LOG_VIEW: "sim:log:view",
  SIM_DEVICE_PAIR: "sim:device:pair",

  // AI Workforce
  AI_EXECUTE_NOVA: "ai:execute:nova",
  AI_EXECUTE_VOX: "ai:execute:vox",
  AI_EXECUTE_SALESPRO: "ai:execute:salespro",
  AI_EXECUTE_PEOPLEMIND: "ai:execute:peoplemind",
  AI_EXECUTE_INSIGHT: "ai:execute:insight",

  // Super Admin
  SUPERADMIN_TENANT_MANAGE: "superadmin:tenant:manage",
  SUPERADMIN_BILLING_MANAGE: "superadmin:billing:manage",
  SUPERADMIN_AUDIT_VIEW: "superadmin:audit:view",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = typeof PERMISSIONS[PermissionKey];

// Standard Role Permission Mapping
export const ROLE_PERMISSIONS: Record<EnterpriseRole, string[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  PLATFORM_OWNER: Object.values(PERMISSIONS),
  TENANT_ADMIN: Object.values(PERMISSIONS).filter(p => !p.startsWith("superadmin:")),
  SALES_DIRECTOR: [
    PERMISSIONS.CRM_LEAD_VIEW,
    PERMISSIONS.CRM_LEAD_CREATE,
    PERMISSIONS.CRM_LEAD_EDIT,
    PERMISSIONS.CRM_LEAD_DELETE,
    PERMISSIONS.CRM_DEAL_VIEW,
    PERMISSIONS.CRM_DEAL_MANAGE,
    PERMISSIONS.CRM_EXPORT,
    PERMISSIONS.SIM_CALL_DISPATCH,
    PERMISSIONS.SIM_LOG_VIEW,
    PERMISSIONS.AI_EXECUTE_SALESPRO,
    PERMISSIONS.AI_EXECUTE_NOVA,
  ],
  SALES_REPRESENTATIVE: [
    PERMISSIONS.CRM_LEAD_VIEW,
    PERMISSIONS.CRM_LEAD_CREATE,
    PERMISSIONS.CRM_LEAD_EDIT,
    PERMISSIONS.CRM_DEAL_VIEW,
    PERMISSIONS.SIM_CALL_DISPATCH,
    PERMISSIONS.SIM_LOG_VIEW,
    PERMISSIONS.AI_EXECUTE_SALESPRO,
  ],
  HR_DIRECTOR: [
    PERMISSIONS.HRMS_EMPLOYEE_VIEW,
    PERMISSIONS.HRMS_EMPLOYEE_MANAGE,
    PERMISSIONS.HRMS_ATTENDANCE_VIEW,
    PERMISSIONS.HRMS_LEAVE_APPROVE,
    PERMISSIONS.HRMS_PAYROLL_RUN,
    PERMISSIONS.AI_EXECUTE_PEOPLEMIND,
    PERMISSIONS.AI_EXECUTE_NOVA,
  ],
  HR_EXECUTIVE: [
    PERMISSIONS.HRMS_EMPLOYEE_VIEW,
    PERMISSIONS.HRMS_ATTENDANCE_VIEW,
    PERMISSIONS.HRMS_LEAVE_APPROVE,
    PERMISSIONS.AI_EXECUTE_PEOPLEMIND,
  ],
  FINANCE_DIRECTOR: [
    PERMISSIONS.ERP_INVOICE_CREATE,
    PERMISSIONS.ERP_LEDGER_VIEW,
    PERMISSIONS.ERP_STOCK_MANAGE,
    PERMISSIONS.HRMS_PAYROLL_RUN,
    PERMISSIONS.AI_EXECUTE_INSIGHT,
  ],
  ACCOUNTANT: [
    PERMISSIONS.ERP_INVOICE_CREATE,
    PERMISSIONS.ERP_LEDGER_VIEW,
    PERMISSIONS.ERP_STOCK_MANAGE,
  ],
  OPERATIONS_MANAGER: [
    PERMISSIONS.ERP_STOCK_MANAGE,
    PERMISSIONS.SIM_LOG_VIEW,
    PERMISSIONS.CRM_LEAD_VIEW,
  ],
  TELECALLER: [
    PERMISSIONS.CRM_LEAD_VIEW,
    PERMISSIONS.CRM_LEAD_EDIT,
    PERMISSIONS.SIM_CALL_DISPATCH,
    PERMISSIONS.SIM_LOG_VIEW,
  ],
  AI_SUPERVISOR: [
    PERMISSIONS.AI_EXECUTE_NOVA,
    PERMISSIONS.AI_EXECUTE_VOX,
    PERMISSIONS.AI_EXECUTE_SALESPRO,
    PERMISSIONS.AI_EXECUTE_PEOPLEMIND,
    PERMISSIONS.AI_EXECUTE_INSIGHT,
  ],
  EMPLOYEE: [
    PERMISSIONS.HRMS_ATTENDANCE_PUNCH,
  ],
};

export function hasPermission(role: EnterpriseRole, permission: PermissionValue): boolean {
  if (role === "SUPER_ADMIN" || role === "PLATFORM_OWNER") return true;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function enforceTenantIsolation(requestTenantId: string, resourceTenantId: string): boolean {
  if (!requestTenantId || !resourceTenantId) return false;
  return requestTenantId === resourceTenantId;
}
