// ═══════════════════════════════════════════════════════════════════════════
// Payload: HID Injection Test
// Target:  All Operating Systems
// Time:    ~5 seconds
// Purpose: Verify MoMo-Mimic device is working correctly
// Author:  MoMo-Mimic Team
// ═══════════════════════════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ SETTINGS                                                                 │
// └─────────────────────────────────────────────────────────────────────────┘
layout("us");
typingSpeed(50, 100);   // Human-like typing speed for visibility

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 1: INITIALIZATION                                                  │
// └─────────────────────────────────────────────────────────────────────────┘
delay(2000);            // Wait for USB enumeration

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 2: OPEN TEXT EDITOR                                                │
// └─────────────────────────────────────────────────────────────────────────┘
// Windows: Notepad
press("GUI-r");
delay(500);
type("notepad");
press("ENTER");
delay(1500);

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ PHASE 3: TYPE TEST MESSAGE                                               │
// └─────────────────────────────────────────────────────────────────────────┘
type("========================================");
press("ENTER");
type("     MoMo-Mimic HID Test");
press("ENTER");
type("========================================");
press("ENTER");
press("ENTER");
type("Device Status: WORKING");
press("ENTER");
press("ENTER");
type("If you can read this message,");
press("ENTER");
type("your MoMo-Mimic device is functioning");
press("ENTER");
type("correctly and HID injection works!");
press("ENTER");
press("ENTER");
type("----------------------------------------");
press("ENTER");
type("Keyboard Layout: US");
press("ENTER");
type("Typing Speed: 50-100ms delay");
press("ENTER");
type("USB Gadget: HID Keyboard");
press("ENTER");
type("----------------------------------------");
press("ENTER");
press("ENTER");
type("Special Characters Test:");
press("ENTER");
type("!@#$%^&*()_+-=[]{}|;':\",./<>?`~");
press("ENTER");
press("ENTER");
type("Numbers: 0123456789");
press("ENTER");
type("Lowercase: abcdefghijklmnopqrstuvwxyz");
press("ENTER");
type("Uppercase: ABCDEFGHIJKLMNOPQRSTUVWXYZ");
press("ENTER");
press("ENTER");
type("========================================");
press("ENTER");
type("     Test Complete!");
press("ENTER");
type("========================================");

// ┌─────────────────────────────────────────────────────────────────────────┐
// │ NOTES                                                                    │
// └─────────────────────────────────────────────────────────────────────────┘
// This payload opens Notepad and types a test message
// Use this to verify:
// - USB HID enumeration works
// - Keyboard layout is correct
// - Typing speed is acceptable
// - Special characters work
//
// For Linux/macOS testing, modify to use:
// Linux: CTRL+ALT+T for terminal, then gedit/nano
// macOS: GUI+SPACE for Spotlight, then TextEdit

