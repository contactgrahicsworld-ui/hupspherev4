// HubSphere Enterprise V4 — Physical SIM Telecalling Lifecycle Bridge
// Interfaces with Android TelecomManager Companion App without third-party VoIP/telephony APIs

import { db, SimCallRecord } from "./mock-db";

export interface RegisterDevicePayload {
  tenantId: string;
  userId: string;
  deviceName: string;
  deviceToken: string;
  sim1Carrier?: string;
  sim1Number?: string;
  sim2Carrier?: string;
  sim2Number?: string;
  batteryLevel?: number;
}

export interface SimCallEventPayload {
  tenantId: string;
  deviceId: string;
  phoneNumber: string;
  direction: "INBOUND" | "OUTBOUND";
  simSlot: 1 | 2;
  durationSeconds: number;
  disposition: string;
  notes?: string;
  callTimestamp: string;
}

export async function processSimCallEvent(payload: SimCallEventPayload): Promise<{ success: boolean; callId: string; linkedLeadId?: string }> {
  // 1. Identify or auto-create CRM Lead by Phone Number
  let linkedLead = db.leads.find(
    l => l.tenantId === payload.tenantId && l.phone.replace(/\D/g, "") === payload.phoneNumber.replace(/\D/g, "")
  );

  if (!linkedLead) {
    linkedLead = {
      id: `lead-auto-${Date.now()}`,
      tenantId: payload.tenantId,
      name: `Inbound Caller (${payload.phoneNumber.slice(-4)})`,
      companyName: "Unregistered Organization",
      email: "",
      phone: payload.phoneNumber,
      source: "PHYSICAL_SIM_CALL",
      score: 60,
      status: "CONTACTED",
      estimatedValue: 0,
      assignedTo: "Telecalling Queue",
      createdAt: new Date().toISOString(),
    };
    db.leads.push(linkedLead);
  }

  // 2. Record the call in SIM telecalling log
  const newCall: SimCallRecord = {
    id: `call-${Date.now()}`,
    tenantId: payload.tenantId,
    deviceId: payload.deviceId,
    phoneNumber: payload.phoneNumber,
    customerName: linkedLead.name,
    direction: payload.direction,
    simSlot: payload.simSlot,
    durationSeconds: payload.durationSeconds,
    disposition: payload.disposition,
    syncedAt: new Date().toISOString(),
  };

  db.simCalls.unshift(newCall);

  return {
    success: true,
    callId: newCall.id,
    linkedLeadId: linkedLead.id,
  };
}
