Smart Sandero v24 - Two-device bridge test build

This package is based on the supplied Smart Sandero v24 files.
The approved dashboard layout and existing navigation pages are retained.

NEW: Experimental two-device connection
- iPhone 13: open the app in Safari and choose "این دستگاه آیفون اصلی است".
- HP Stream 8: open the same published app in Firefox and choose "این دستگاه نمایشگر تبلت است".
- Enter the code shown on the iPhone into the tablet and connect.
- Both devices must have internet access and be on the same Wi-Fi/hotspot network.
- PeerJS is loaded from jsDelivr and uses PeerJS cloud signaling; after signaling, the data connection is peer-to-peer (WebRTC).
- The iPhone remains the GPS/data source. The tablet displays the synchronized app state and forwards touch gestures and input values.

IMPORTANT TEST BUILD LIMITATIONS
- This is an experimental bridge, not yet verified on the user's iPhone/HP Stream hardware.
- Keep the iPhone Safari page open and active while testing; iOS may suspend background tabs.
- Touch forwarding is best-effort. Some browser-protected actions, OS dialogs, app launches, camera/microphone permissions, and system controls cannot be remotely operated.
- Map gestures and all app controls need real-device testing. Different screen aspect ratios may affect touch-coordinate alignment.
- No vehicle OBD data is fabricated; values remain blank unless a supported data source provides them.
- The map still needs internet access for online tiles/styles.

PUBLISHING
Replace the corresponding files in the GitHub Pages repository (Sandro) with ALL files in this ZIP.
Then open the main app with a cache-busting URL, for example:
https://kaveh747.github.io/Sandro/?v=24-bridge1

Do not upload only index.html: upload the updated sw.js and the other original app files together.
