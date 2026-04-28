
---

## Tech Stack

* **Backend:** NestJS (TypeScript)
* **Frontend:** React.js (TypeScript)
* **Database:** In-memory (custom singleton-based implementation)


I implemeted in-memory database as it will allow other to gain insight into my raw javascript capabilities, otherwise i could implement the postgresql and pg/sequelize.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Run the Application

#### Start Backend (NestJS)

```bash
cd backend
npm run start:dev
```

#### Start Frontend (React)

```bash
cd frontend
npm run dev
```

---

## Database Design

* Uses an **in-memory database** for simplicity and faster development.
* Implemented using a **singleton pattern** to ensure a single shared instance across the application.
* Seed data is included to initialize default entities.

## Buy Now or Bucket Empty (Future improvements)

In the actual database, there we will have to add the quantity column to the menu items and we will have to manage inventory when the item is added to bucket/cart, and when items is removed from the bucket/cart. and we will assume that as it is in education environment so we will consider that the items quantity changes rapidly and we will implement *Buy Now or Bucket Empty* policy so other students don't be left behind if some student is not processing the payment and also admin can manage inventory easily, also we will add the timer and background job to purge/empty the bucket/cart after some time like 15 minutes to implement "Buy NOw or Bucket Empty" policy

## 🗃️ Database ERD

![Database ERD](./erd.png)

---

## 🧠 Key Design Decisions & Trade-offs

### 1. One Student → One Bucket

* Each student has **exactly one cart (bucket)**.
* Created at user creation time.
* Simplifies:

  * Order management
  * State consistency
* Trade-off:

  * No support for multiple simultaneous carts per student.

---

### 2. Cart (Bucket) Behavior

* **Add Item:**

  * Validates:

    * Allergies
    * Parent wallet balance
  * Updates total amount dynamically

* **Remove Item:**

  * Does **not validate wallet balance again**
  * Assumes previous valid state

* Trade-off:

  * Slight inconsistency risk
  * Handled at final payment stage

---

### 3. Payment Handling

* Payment is **not deducted during item addition**

* User can:

  * Add multiple items
  * Then complete order

* **At checkout:**

  * Wallet is deducted
  * If deduction fails:

    * Order is NOT processed
    * Status is NOT updated

---

### 4. Concurrency Handling (Multiple Children, One Parent)

* Implemented **locking mechanism**:

  * Prevents race conditions when multiple children order simultaneously

```ts
lockParentAccount(id: number)
unLockParentAccount(id: number)
```

* Ensures:

  * Only one transaction per parent at a time

---

### 5. Architecture

* Followed **NestJS best practices**:

  * Dependency Injection
  * OOP principles
  * Controller → Service → Repository pattern

---

### 6. Error Handling

* Centralized error handling implemented
* Custom error codes defined for:

  * Easier debugging
  * Better traceability

---

### 7. Authentication & Authorization (Planned)

* JWT-based authentication
* RBAC (Role-Based Access Control)

---

## Transaction Considerations

### Current Implementation

* Simulated transaction behavior in-memory
* Includes:

  * Locking mechanism
  * Controlled execution flow

---

### In a Real Database (Production Approach)

Would implement:

* **Database transactions**

  * BEGIN / COMMIT / ROLLBACK
* Use:

  * TypeORM / Prisma transactions
* Apply:

  * Unit of Work pattern

Ensures:

* Order creation and wallet deduction remain **atomic and consistent**

---

## API Endpoints

```
POST   /order/add-item
POST   /order/remove-item
GET    /order/list-items
POST   /order/complete-order
```

---


### Problem:

> Some orders were created successfully, but the wallet balance was not deducted.

---

### Possible Causes

* It is because we have not understood **ACID principles**
* No database transaction implemented
* Order creation succeeded
* Payment service failed afterward
* No rollback → inconsistent state
* Possible race condition if locking is not correct

---

### Debugging Approach

* Check backend logs:

  * Order creation flow
  * Payment functionality
* Trace request/data flow
* Use:

  * VS Code debugger
  * `console.log`
* Reproduce the scenario consistently

---

### Prevention Strategy

* Implement proper **database transactions**
* Add **rollback mechanism**
* Improve error handling (no silent failures)
* Use **Unit of Work pattern**
* Treat entire order process as **single transaction**

---

## Future Improvements

* Implement **idempotency** for payment APIs
* Add **integration tests** for payment flows
* Replace in-memory DB with persistent DB
* Improve concurrency handling with DB-level locks

---

## 🤖 AI Tools Used (Optional)

* ChatGPT (documentation)
