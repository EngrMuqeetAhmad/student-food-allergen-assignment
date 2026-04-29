Here’s your updated README section with your additions **cleanly integrated** (nothing removed, just structured and enhanced):

---

## Tech Stack

* **Backend:** NestJS (TypeScript)
* **Frontend:** React.js (TypeScript)
* **Database:** In-memory (custom singleton-based implementation)

I implemented an in-memory database to allow reviewers to gain insight into my raw JavaScript/TypeScript and architectural capabilities. This also demonstrates how the system can be designed independent of persistence. Otherwise, I could have implemented PostgreSQL using libraries like `pg`, Prisma, or Sequelize.

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

---

## 🏗️ Architecture & Design Approach

The project follows a **Controller → Service → Repository** pattern with clear separation of concerns.

### Key Highlights:

* Implemented **Repository Pattern** with interfaces and concrete implementations.
* Enables easy swapping between:

  * In-memory database
  * Real database (PostgreSQL, Prisma, etc.)
* No changes required in service/business logic when switching persistence layer.

---

### 📂 Module Structure

Each feature/module is structured as:

```text
feature/
  domain/
    model.ts
    interface.ts
  infrastructure/
    in-memory/
      feature.repository.ts
  application/
    feature.service.ts
  presentation/
    feature.controller.ts
```

### Explanation:

* **Domain Layer**

  * Contains core business models and repository interfaces
  * Independent of frameworks and databases

* **Infrastructure Layer**

  * Contains actual implementations (in-memory in this case)
  * Can be replaced with DB implementations easily

* **Application Layer**

  * Contains business logic (services)
  * Orchestrates workflows

* **Presentation Layer**

  * Handles HTTP requests (controllers)

---

### 🔌 Dependency Injection

* Leveraged **NestJS built-in DI container**
* Repository implementations are wired at module level
* Uses tokens/interfaces for abstraction

This ensures:

* Loose coupling
* Easy testing
* Swappable implementations

---

### 🧱 Design Principles

* Followed **Single Responsibility Principle (SRP)**
* Structured **REST APIs**
* Clean separation between layers
* Scalable and maintainable architecture

---

## 🎮 Controllers Implemented

Controllers are implemented for multiple features:

* Ingredient
* Menu Items
* Orders
* Bucket (Cart)
* Parent
* Student

Also includes:

* DTO validation
* Structured API responses

---

### Example Controllers

```ts
@Controller('ingredient')
export class IngredientController {

    constructor(private ingredientService: IngredientService) { }

    @Get('all')
    findAll() {
        return this.ingredientService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.ingredientService.findById(id);
    }
}
```

```ts
@Controller('menu-item')
export class MenuItemController {

    constructor(private menuItemService: MenuItemService) { }

    @Get('all')
    findAll() {
        return this.menuItemService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.menuItemService.findById(id)
    }
}
```

```ts
@Controller('order')
export class OrderController {

    constructor(
        private orderService: OrderService
    ) { }

    @Get('/orders-by-student/:studentId')
    getOrdersByStudent(@Param('studentId') studentId: number) {
        return this.orderService.getAllOrdersByStudent(studentId)
    }

    @Get('/items-by-order/:orderId')
    getItemsByOrderId(@Param('orderId') orderId: number) {
        return this.orderService.getItemsByOrderId(orderId)
    }

    @Get('/:orderId')
    getOrderById(@Param('orderId') orderId: number) {
        return this.orderService.getOrderById(orderId)
    }

    @Post('/')
    createOrder(@Body() body: { studentId: number, bucketId: number }) {
        return this.orderService.createOrder(body.studentId, body.bucketId)
    }

    @Post('/complete')
    completeOrder(@Body() body: { orderId: number, studentId: number }) {
        return this.orderService.completeOrder(body.orderId, body.studentId)
    }
}
```

```ts
@Controller('parent')
export class ParentController {

    constructor(private parentService: ParentService) { }

    @Get(':id')
    findParentById(@Param('id') id: number) {
        return this.parentService.getParentById(id)
    }
}
```

```ts
@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Get('all')
    findAll() {
        return this.studentService.findAllStudents();
    }

    @Get(':id')
    findStudentById(@Param('id') id: number) {
        return this.studentService.findStudentById(id)
    }
}
```

---

## Buy Now or Bucket Empty (Future improvements)

In the actual database, we will introduce a quantity column in menu items and manage inventory dynamically when items are added/removed from the bucket.

To handle high-demand scenarios:

* Implement **"Buy Now or Bucket Empty" policy**
* Prevent resource locking by inactive users
* Introduce:

  * Timer (e.g., 15 minutes)
  * Background job to clear inactive carts

---

## 🗃️ Database ERD

![Database ERD](./erd.png)

---

## 🧠 Key Design Decisions & Trade-offs

### 1. One Student → One Bucket

* Each student has exactly one cart
* Simplifies state management

---

### 2. Cart Behavior

* Add Item:

  * Validates allergies & wallet
* Remove Item:

  * No re-validation

---

### 3. Payment Handling

* Deduction only at checkout
* Prevents partial failures during item addition

---

### 5. Architecture

* Dependency Injection
* Repository pattern
* Clean layering

---

### 6. Error Handling

* Centralized error handling
* Custom error codes

---

### 7. Authentication & Authorization (Planned)

* JWT
* RBAC

---

## Transaction Considerations

### Current Implementation

* Simulated transaction behavior
* Locking + controlled execution

---

### Production Approach

* DB Transactions (BEGIN / COMMIT / ROLLBACK)
* Prisma / TypeORM
* Unit of Work


---

## API Endpoints

### Order

```
POST   /order/                 → create order
POST   /order/complete         → complete order
GET    /order/:orderId         → get order by id
GET    /order/orders-by-student/:studentId → get orders by student
GET    /order/items-by-order/:orderId      → get items by order
```

---

### Ingredient

```
GET    /ingredient/all         → get all ingredients
GET    /ingredient/:id         → get ingredient by id
```

---

### Menu Item

```
GET    /menu-item/all          → get all menu items
GET    /menu-item/:id          → get menu item by id
```

---

### Student

```
GET    /student/all            → get all students
GET    /student/:id            → get student by id
```

---

### Parent

```
GET    /parent/:id             → get parent by id
```

---

### Bucket (Cart)

```
POST   /order/add-item         → add item to bucket
POST   /order/remove-item      → remove item from bucket
GET    /order/list-items       → list bucket items
POST   /order/complete-order   → complete order (checkout)
```

---

## Problem Scenario

> Some orders were created successfully, but wallet was not deducted.

---

### Possible Causes

* No proper transaction handling
* Partial execution
* Race conditions

---

### Debugging

* Logs
* Breakpoints
* Reproduction

---

### Prevention

* DB transactions
* Rollbacks
* Better error handling
* Unit of Work

---

## Future Improvements

* Idempotency
* Integration tests
* Replace in-memory DB
* DB-level locking

---

## 🤖 AI Tools Used

* ChatGPT (documentation)
* I used chat gpt for consulation and refining the design and architecture of code 

---

If you want, I can next:
👉 tighten the language to sound more “senior engineer / production-grade” (this is already good, but we can make it *exceptional for interviews*)
