const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || "expenseTrackerDb";
const containerId = process.env.COSMOS_CONTAINER || "expenses";

let container;

function getContainer() {
  if (!endpoint || !key) {
    throw new Error("Missing Cosmos DB environment variables.");
  }

  if (!container) {
    const client = new CosmosClient({ endpoint, key });
    container = client.database(databaseId).container(containerId);
  }

  return container;
}

// GET all expenses
app.http("getExpenses", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "expenses",
  handler: async (_request, context) => {
    try {
      const c = getContainer();
      const { resources } = await c.items
        .query("SELECT * FROM c ORDER BY c.date DESC")
        .fetchAll();

      return { status: 200, jsonBody: resources };
    } catch (error) {
      context.log(error);
      return { status: 500, jsonBody: { message: "Failed to fetch expenses." } };
    }
  }
});

// POST new expense
app.http("createExpense", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "expenses",
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const item = {
        id: `exp-${Date.now()}`,
        title: (body.title || "").trim(),
        amount: Number(body.amount),
        category: body.category || "Other",
        date: body.date,
        note: (body.note || "").trim(),
        createdAt: new Date().toISOString()
      };

      if (!item.title || !item.amount || item.amount <= 0 || !item.date) {
        return { status: 400, jsonBody: { message: "Invalid expense data." } };
      }

      const c = getContainer();
      const { resource } = await c.items.create(item);

      return { status: 201, jsonBody: resource };
    } catch (error) {
      context.log(error);
      return { status: 500, jsonBody: { message: "Failed to create expense." } };
    }
  }
});

// PUT/Update existing expense
app.http("updateExpense", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "expenses/{id}",
  handler: async (request, context) => {
    try {
      const id = request.params.id;
      const body = await request.json();
      const c = getContainer();

      // Fetch the existing item to get its current category (Partition Key)
      const { resource: existing } = await c.item(id, body.category).read();
      
      if (!existing) {
        return { status: 404, jsonBody: { message: "Expense not found." } };
      }

      const updatedItem = { ...existing, ...body, id };
      const { resource } = await c.item(id, body.category).replace(updatedItem);

      return { status: 200, jsonBody: resource };
    } catch (error) {
      context.log(error);
      return { status: 500, jsonBody: { message: "Failed to update expense." } };
    }
  }
});

// DELETE expense
app.http("deleteExpense", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "expenses/{id}",
  handler: async (request, context) => {
    try {
      const id = request.params.id;
      const category = request.query.get("category"); // Ensure client sends the category
      
      if (!category) {
        return { status: 400, jsonBody: { message: "Category (partition key) required." } };
      }

      const c = getContainer();
      await c.item(id, category).delete();

      return { status: 200, jsonBody: { message: "Expense deleted." } };
    } catch (error) {
      context.log(error);
      return { status: 500, jsonBody: { message: "Failed to delete expense." } };
    }
  }
});