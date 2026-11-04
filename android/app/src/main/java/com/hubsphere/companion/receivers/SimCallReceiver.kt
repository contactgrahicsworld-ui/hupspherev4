package com.hubsphere.companion.receivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager
import android.util.Log

class SimCallReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == TelephonyManager.ACTION_PHONE_STATE_CHANGED) {
            val stateStr = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
            val number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)

            Log.d("HubSphereSIM", "Call state changed: $stateStr for number: $number")

            when (stateStr) {
                TelephonyManager.EXTRA_STATE_RINGING -> {
                    // Inbound call detected on physical SIM
                }
                TelephonyManager.EXTRA_STATE_OFFHOOK -> {
                    // Call connected
                }
                TelephonyManager.EXTRA_STATE_IDLE -> {
                    // Call ended: Trigger background worker to enqueue offline event and sync with HubSphere API
                }
            }
        }
    }
}
