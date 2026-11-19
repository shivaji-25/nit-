# Software Requirements Specification (SRS)
## Order-to-Audit System for a Small Food Manufacturer

**Prepared for:** Winter Internship Application 2026, Centre for Digital Infrastructure, NIT Tiruchirappalli  
**Version:** 1.0 (draft)  
**Date:** 19 November 2026  

---

## 1. Introduction

### 1.1 Purpose
This document defines the requirements of a working prototype that takes a small food factory from a salesman's order to the monthly auditor's report. Every transaction is entered once, at its source, and flows automatically into stock, production, costing and accounts. The document is written for the evaluation panel, the developer and any future maintainer.

### 1.2 Scope
The system is for a hypothetical small-scale manufacturer of packaged South Indian snacks (murukku, mixture, chips, sweets) located in Tamil Nadu. It has 5 to 15 field salesmen, one factory with an admin/billing desk, a production floor, and an external accountant and auditor.

The system links two loops that meet at finished-goods stock:
- **Sales loop:** order, verification, GST invoice, dispatch, finished-goods stock goes down, receivables and collections.
- **Production loop:** raw material purchase, issue to production against a recipe (Bill of Materials), finished packets produced, finished-goods stock goes up, variance and cost per packet.

Both loops feed the monthly reports. The production loop carries the most weight in evaluation.

**Out of scope:** payroll, full double-entry accounting, real GST portal filing, and any dependency on Tally or other accounting software. An export to such software is an optional extra.

---

## 1.3 Definitions and Abbreviations

| Term | Meaning |
|---|---|
| **BOM** | Bill of Materials: the standard recipe for one batch of a product, with the expected yield |
| **FG** | Finished goods (packed products ready to sell) |
| **RM** | Raw material (flour, oil, spices) |
| **Production run** | One recorded batch made on the floor |
| **Stock ledger** | Record of every stock movement with its source document |
| **Variance** | Difference between planned and actual consumption or yield, in percent |
| **GSTIN** | GST Identification Number |
| **HSN** | Harmonised System of Nomenclature code for goods |
| **CGST / SGST** | Central and State GST, charged on sales within the same state |
| **IGST** | Integrated GST, charged on sales to another state |
| **GSTR-1 / GSTR-3B** | GST return forms for outward supplies and summary |
| **PWA** | Progressive Web App |
| **FIFO** | First in, first out |

### 1.4 References
- Internship Problem Statement: Order-to-Audit System for a Small Food Manufacturer, Centre for Digital Infrastructure, NIT Tiruchirappalli (Sections 1 to 10).

### 1.5 Document Overview
Section 2 describes the product and its users. Section 3 lists functional requirements with IDs. Sections 4 to 6 cover interfaces, quality attributes and data. Section 7 gives the benchmark acceptance criteria. Section 8 gives scope tiers and Section 9 traces requirements to evaluation.

---

## 2. Overall Description

### 2.1 Product Perspective
The system is a new, standalone web application. It replaces phone and WhatsApp orders, separate invoicing tools, notebook stock records and paper production logs. It has three layers: a role-based frontend, a REST API with business modules, and one database in which stock is derived from a ledger of movements.

### 2.2 Product Functions (Summary)
1. Mobile order entry by salesmen.
2. Order verification, stock check and approval by admin.
3. GST tax invoice generation as PDF, with financial-year numbering.
4. Dispatch, payments and outstanding tracking.
5. Masters for products, customers, raw materials, suppliers and BOMs.
6. Purchase recording and raw-material receipts.
7. Recipe-based production runs with automatic stock updates.
8. Planned vs actual consumption and yield with variance flags.
9. Ledger-based inventory for raw, packaging and finished goods.
10. Costing with overheads and cost per packet.
11. Monthly reports, exportable to Excel/CSV and PDF.
12. Owner dashboard, role-based access and audit trail.

### 2.3 User Classes

| Role | Device | Main Needs |
|---|---|---|
| **Salesman** | Mobile phone, often weak network | Pick customer, add products and quantities, submit order, see own orders, status and customer-wise sales |
| **Factory admin** | Desktop | Receive orders, verify price, quantity and stock, raise GST invoices, record dispatch and payments |
| **Production supervisor** | Desktop or tablet on the floor | Record raw-material receipts and issues, log production runs, enter actual output and wastage |
| **Accountant / auditor** | Desktop, read-only | Pull and export monthly sales, GST, stock, purchase, collection and outstanding reports |
| **Owner** | Any device | See today's orders, stock levels, variance alerts, cost per packet and outstanding dues |

*Each role sees only what it needs. Role-based access is a requirement, not an extra.*

### 2.4 Operating Environment
- **Frontend:** modern mobile and desktop browsers (web app or PWA).
- **Backend:** Node.js server with a REST API (suggested stack: MongoDB, Express, React, Node).
- **Database:** a real database with a documented schema; MongoDB must run as a replica set if transactions are used.
- **Deployment:** a hosted demo link, or a single command to run locally (Docker Compose or similar).

### 2.5 Design and Implementation Constraints
- Money must use integer paise or decimal arithmetic, never floating point.
- Stock balances must be derived from, or reconciled against, a ledger of movements, never a number that someone overwrites.
- Every stock movement must link to its source document.
- Posted invoices must not be deleted; they are cancelled with a credit note.
- Tally or any accounting software must not be required for daily work.
- This is an individual task; the developer must be able to explain and change every part of the code.

### 2.6 Assumptions and Dependencies
- The business is a realistic composite; only dummy data from Section 5 of the problem statement and invented data are used.
- The factory is in Tamil Nadu, so sales to Tamil Nadu customers use CGST + SGST and sales to other states use IGST.
- GST at 5% applies to murukku in the benchmark exercise.
- Government e-Invoice and e-Way Bill APIs are mocked if built at all.
- Where something is unclear, a reasonable assumption is made and written in the README.

---

## 3. Functional Requirements
*Priority: M = must have, S = should have, X = stretch.*

### 3.1 Authentication and Roles
- **FR-1.1 (M):** Login with at least three roles: salesman, admin, production.
- **FR-1.2 (S):** Support accountant/auditor (read-only) and owner roles.
- **FR-1.3 (M):** Restrict each screen and API endpoint to the roles that need it.
- **FR-1.4 (M):** Passwords stored as salted hashes, sessions use expiring tokens.
- **FR-1.5 (M):** Provide a test login for each role for evaluation.

### 3.2 Master Data
- **FR-2.1 (M):** Maintain item masters for raw materials, packaging materials and finished products, each with a base unit.
- **FR-2.2 (M):** Finished products hold HSN code, GST rate, pack size and selling price.
- **FR-2.3 (M):** Maintain customer masters (retailer or distributor) with name, GSTIN, state and address.
- **FR-2.4 (M/X):** Maintain a price list; customer-specific prices or schemes optional.
- **FR-2.5 (S):** Maintain supplier masters.
- **FR-2.6 (M):** Maintain a unit conversion table covering kg, g, litre, millilitre, piece, packet and carton of packets.

### 3.3 Field Order Taking (Mobile)
- **FR-3.1 (M):** Salesman selects a customer and adds products with quantities.
- **FR-3.2 (M):** Unit price comes from price list automatically.
- **FR-3.3 (M):** Order submitted straight to factory, no phone/WhatsApp step.
- **FR-3.4 (M):** Salesman sees only own orders, status (submitted, approved, invoiced, dispatched, rejected) and customer-wise sales.
- **FR-3.5 (X):** Offline order capture with device sync when network returns.
- **FR-3.6 (M):** Order screen lets an experienced salesman place an order in under 1 minute.

### 3.4 Order Verification
- **FR-4.1 (M):** Admin sees incoming orders and can edit quantities or prices.
- **FR-4.2 (M):** Admin approves or rejects each order.
- **FR-4.3 (M):** System shows whether finished-goods stock covers each order line and displays any shortage in packets before approval.
- **FR-4.4 (M):** Approvals, rejections, and edits recorded in audit trail.

### 3.5 GST Invoicing
- **FR-5.1 (M):** Approved order becomes GST tax invoice with supplier and customer GSTIN, HSN, taxable value, tax rate, and tax amounts.
- **FR-5.2 (M):** CGST + SGST applied for Tamil Nadu (intra-state); IGST for other states (inter-state).
- **FR-5.3 (M):** Invoice numbers sequential and unique within financial year (April to March).
- **FR-5.4 (M):** Downloadable as PDF.
- **FR-5.5 (S):** Shareable via WhatsApp link or email.
- **FR-5.6 (M):** Posted invoices cannot be deleted; cancelled with credit note.
- **FR-5.7 (M):** Tax computed with integer paise / decimal arithmetic and rounded by documented rule.

### 3.6 Dispatch and Payments
- **FR-6.1 (M):** Dispatch reduces finished-goods stock through stock ledger entry linked to invoice.
- **FR-6.2 (X):** Partial dispatch and sales returns supported.
- **FR-6.3 (S):** Record payments against invoices (amount, date, mode, reference).
- **FR-6.4 (S):** Customer outstanding balances and ageing buckets (0-30, 31-60, 61-90, >90 days).

### 3.7 Purchases
- **FR-7.1 (S):** Record purchases of raw and packaging materials with supplier, quantity, rate, date.
- **FR-7.2 (M):** Saving purchase increases item's stock through ledger entry linked to purchase.
- **FR-7.3 (S):** Purchase register available as report.

### 3.8 Bill of Materials (BOM) & Production (Highest Weight)
- **FR-8.1 (M):** BOM per finished product: standard quantity and unit of RM/packaging per batch, and expected yield (packets/batch).
- **FR-8.2 (M):** Production run records product, batch size/materials issued, expected output (from BOM), actual good output, and wastage/scrap.
- **FR-8.3 (M):** Saving a run decreases RM/packaging stock and increases FG stock automatically via linked ledger entries.
- **FR-8.4 (M):** Damaged/wasted packaging recorded as consumption in the ledger.
- **FR-8.5 (M):** Compare planned vs actual consumption and yield, show variance %.
- **FR-8.6 (M):** Flag variance beyond configurable tolerance (default 3%).
- **FR-8.7 (M):** Correct unit conversions between kg, g, litre, ml, piece, packet, carton.
- **FR-8.8 (M):** Edits to saved run logged with user/time, correcting stock through adjusting ledger entries.
- **FR-8.9 (X):** Suggest production quantity from pending orders.

### 3.9 Inventory
- **FR-9.1 (M):** Separate balances for raw materials, packaging materials, and finished goods.
- **FR-9.2 (M):** `Opening balance + receipts - issues/sales +/- adjustments = closing balance`.
- **FR-9.3 (M):** Stock ledger shows date, qty in/out, rate, running balance, source document.
- **FR-9.4 (M):** Balances derived/reconciled against ledger, never directly overwritten.
- **FR-9.5 (S):** Stock adjustments with reason for authorized users.
- **FR-9.6 (X):** Batch numbers, expiry dates, FEFO dispatch.
- **FR-9.7 (X):** Reorder levels and low-stock alerts.

### 3.10 Costing
- **FR-10.1 (S):** Compute RM & packaging material cost per run using weighted average valuation.
- **FR-10.2 (S):** Overheads (labour, power, gas) entered per run or per month allocated per good packet.
- **FR-10.3 (S):** Approximate cost per packet and margin against selling price.

### 3.11 Reports
*Filterable by date range, exportable to Excel/CSV and PDF.*
- **FR-11.1 (M):** Sales register, customer-wise and product-wise sales.
- **FR-11.2 (M):** Stock summary and stock ledger for RM, packaging, and FG.
- **FR-11.3 (S):** GST summary (GSTR-1 & GSTR-3B mapping).
- **FR-11.4 (S):** Purchase register.
- **FR-11.5 (M):** Production report (planned vs actual consumption, yield, wastage).
- **FR-11.6 (S):** Payments, collections, outstanding receivables with ageing.
- **FR-11.7 (X):** Tally-compatible XML/Excel export.
- **FR-11.8 (X):** Mock e-Invoice / e-Way Bill API format.

### 3.12 Owner Dashboard
- **FR-12.1 (S):** Today's orders, stock levels, variance alerts, cost per packet, outstanding dues.

### 3.13 Audit Trail
- **FR-13.1 (M):** Edits to orders, invoices, and production runs logged with user, time, before & after values.
- **FR-13.2 (M):** Every stock movement links to source: purchase, production run, invoice, adjustment.
- **FR-13.3 (M):** Audit log entries cannot be edited or deleted.

### 3.14 Stretch Features
- **FR-14.1 (X):** Salesman route/visit log with GPS check-in.
- **FR-14.2 (X):** Tamil language interface for floor staff.

---

## 4. External Interfaces

### 4.1 User Interfaces
- **Salesman:** Mobile-first, large touch targets, fast (< 1 min order placement).
- **Admin & Production:** Desktop/tablet, tables, forms, approval workflows.
- **Auditor & Owner:** Read-only reports and dashboards with date filters and export buttons.
- Role-based menu navigation.

### 4.2 Software Interfaces (REST API Endpoints)
- `POST /auth/login` (All)
- `POST /orders` (Salesman)
- `PATCH /orders/:id/approve` (Admin)
- `POST /invoices/:orderId` (Admin)
- `POST /dispatch/:invoiceId` (Admin)
- `POST /payments` (Admin)
- `POST /purchases` (Production)
- `POST /production-runs` (Production)
- `GET /stock/summary`, `/stock/ledger` (Admin, Production, Auditor)
- `GET /reports/*` (Auditor, Owner, Admin)

---

## 5. Non-Functional Requirements
- **NFR-1 (Correctness):** Integer paise for currency; base units (g, ml, piece) for quantities; no floating point drift.
- **NFR-2 (Data Integrity):** Multi-step operations must be atomic (database transactions).
- **NFR-3 (Traceability):** User, timestamp, source doc for every movement/change.
- **NFR-4 (Security):** RBAC on every route, bcrypt salted passwords, expiring JWTs.
- **NFR-5 (Usability):** Orders placed in < 1 minute; responsive UI.
- **NFR-6 (Performance):** < 2s response time for normal transactions.
- **NFR-8 (Maintainability):** Clean schema, tests for stock & tax maths.
- **NFR-9 (Deployability):** Single command / Docker Compose with seed data script.
- **NFR-10 (Portability):** Modern mobile and desktop browsers.

---

## 6. Data Requirements & Core Data Rules
1. **Stock balance =** $\sum \text{quantity in} - \sum \text{quantity out}$ over ledger rows.
2. Quantities stored in base units (`g`, `ml`, `piece`).
3. Money stored as integer paise (e.g. ₹50.00 = 5000 paise).
4. Stock modified **only** through a centralized stock service writing ledger entries.
5. Invoices are never hard-deleted; cancellation generates credit notes and reversing ledger entries.
6. **Valuation:** Weighted average rate.
7. **Overhead Allocation:** Added to material cost and divided by good packets produced.

---

## 7. Benchmark Acceptance Criteria (Section 5 Problem Statement)

### 7.1 Master Data & Opening Stock
- **Finished Good:** Murukku 200 g (BOM: 1 batch = 200 packets expected)
- **Recipe / BOM:**
  - Flour: 40 kg (Rate: ₹42 opening stock, ₹45 new purchase)
  - Cooking oil: 10 L (Rate: ₹140/L)
  - Salt & spice mix: 1.2 kg (Rate: ₹200/kg)
  - 200 g pouch: 200 pieces (Rate: ₹2.50/piece)
  - Carton (holds 20 packets): 10 pieces (Rate: ₹15/piece)
- **Opening Stock:**
  - Flour: 100 kg
  - Cooking oil: 30 L
  - Spice mix: 5 kg
  - Pouches: 500 pieces
  - Cartons: 30 pieces
  - Finished Murukku 200 g: 50 packets
- **Pricing:** Selling price ₹50/packet before tax, GST 5%.

### 7.2 Benchmark Steps
1. Purchase 60 kg flour at ₹45/kg.
2. Production run: Issue 40 kg flour, 10.5 L oil (+0.5 L over standard), 1.2 kg spice mix.
3. Record output: 188 good packets, 6 damaged pouches, 9 cartons used.
4. Salesman A orders 150 packets for Retailer A (Tamil Nadu).
5. Admin approves, generates invoice (CGST 2.5% + SGST 2.5%), records dispatch.
6. Salesman B orders 120 packets for Distributor B (Karnataka) -> shortage flagged (only 88 available).
7. Record payment of ₹4,000 from Retailer A.
8. Add ₹1,200 labour + ₹600 gas/power to run -> calculate cost per packet.
9. Generate monthly reports.

### 7.3 Expected Target Results
- **Flour closing balance:** 120 kg (100 + 60 - 40)
- **Oil closing balance:** 19.5 L (30 - 10.5)
- **Pouches closing balance:** 306 (500 - 188 - 6)
- **Finished goods after run:** 238 packets (50 + 188)
- **Finished goods after Retailer A dispatch:** 88 packets (238 - 150)
- **Yield variance:** 188 vs 200 (-6%, flagged > 3%)
- **Oil consumption variance:** +5% (flagged > 3%)
- **Retailer A Invoice:** ₹7,500 taxable + ₹187.50 CGST + ₹187.50 SGST = ₹7,875 total
- **Retailer A Outstanding:** ₹3,875 (₹7,875 - ₹4,000)
- **Distributor B Order:** Shortage of 32 packets flagged; IGST 5% if invoiced
- **Run Cost:**
  - Flour: 40 kg @ ₹43.125 (weighted avg) = ₹1,725.00
  - Oil: 10.5 L @ ₹140 = ₹1,470.00
  - Spice mix: 1.2 kg @ ₹200 = ₹240.00
  - Pouches: 194 @ ₹2.50 = ₹485.00
  - Cartons: 9 @ ₹15 = ₹135.00
  - Labour: ₹1,200.00
  - Gas & Power: ₹600.00
  - **Total Cost:** ₹5,855.00
  - **Cost per packet:** ₹5,855 / 188 = ₹31.14
  - **Margin per packet:** ₹50.00 - ₹31.14 = ₹18.86 (37.7%)
