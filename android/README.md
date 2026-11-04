# HubSphere Enterprise V4 — Android SIM Companion Application

## Overview
This native Android companion connects physical dual-SIM handsets directly to the HubSphere V4 multi-tenant platform via official `Android TelecomManager` APIs.

Zero third-party telephony APIs (No Twilio, Exotel, or Plivo required).

## Features
- **Physical SIM Auto-Detection:** Automatically enumerates SIM 1 and SIM 2 carrier info.
- **Telecom ConnectionService:** Enables one-click browser-to-SIM calling.
- **Offline Call Queue:** Queues call timestamps, duration, and disposition locally via Room SQLite if internet is unavailable, auto-syncing when connectivity resumes.
- **CRM Association:** Auto-matches telephone numbers with HubSphere CRM leads.

## Build Requirements
- Android Studio Ladybug / Koala
- Gradle 8.5+
- Kotlin 1.9+
- Android SDK 34 (Android 14) minimum supported Android 8.0 (API 26)

## Build Instructions
```bash
cd android
./gradlew assembleRelease
```
The compiled APK will be output to `android/app/build/outputs/apk/release/app-release.apk`.
