# PIIShield — Hackathon Demo Guide

> **Rule**: Use synthetic test data only. Never paste real personal information.

1. **Landing Page**: Start on the Overview route (`DETECT. REDACT. PROTECT.`) and click **Open Scanner**.
2. **Load Synthetic Sample**: Click **Load Synthetic Sample** to populate synthetic Email, Phone, IPv4, PAN, Aadhaar, and Luhn-valid Card records.
3. **Privacy X-Ray & Human Review**: Point out the non-color-only `[EML]`, `[PHN]`, `[IP4]`, `[PAN]`, `[ADH]`, `[CRD]` badges and toggle **Reject** / **Accept** on a match.
4. **Redaction Modes**: Switch between **Full Mask**, **Partial Mask**, and **Consistent Pseudonymization** (`EMAIL_01`) and show synchronized scrolling.
5. **CSV & Export**: Click **Copy** or **Download TXT** (or upload a `.csv` file to show delimiter/quote preservation).
6. **Privacy Command Center & Audit Passport**: Switch to **Command Center** in the navbar, review the exposure assessment, and download the metadata-only **Audit JSON** / **Privacy Report**.
7. **15-Minute Privacy Lock**: Click **Clear All** and confirm to immediately wipe all temporary in-memory data.
