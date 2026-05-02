import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { propertiesTable } from "@workspace/db/schema";
import {
  CreatePropertyBody,
  GetPropertyParams,
  ListPropertiesQueryParams,
  UpdatePropertyBody,
} from "@workspace/api-zod";
import { eq, and, gte, lte, ilike, type SQL } from "drizzle-orm";

const router: IRouter = Router();

router.get("/properties", async (req: Request, res: Response): Promise<void> => {
  const parsed = ListPropertiesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  const { type, location, minBudget, maxBudget, propertyType } = parsed.data;
  const filters: SQL[] = [];

  if (type) filters.push(eq(propertiesTable.type, type));
  if (location) filters.push(ilike(propertiesTable.location, `%${location}%`));
  if (minBudget !== undefined) filters.push(gte(propertiesTable.priceValue, String(minBudget)));
  if (maxBudget !== undefined) filters.push(lte(propertiesTable.priceValue, String(maxBudget)));
  if (propertyType) filters.push(ilike(propertiesTable.propertyType, `%${propertyType}%`));

  const rows = await db
    .select()
    .from(propertiesTable)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(propertiesTable.createdAt);

  const result = rows.map((r) => ({
    ...r,
    priceValue: Number(r.priceValue),
    createdAt: r.createdAt.toISOString(),
  }));

  req.log.info({ count: result.length }, "listed properties");
  res.json(result);
});

router.get("/properties/:id", async (req: Request, res: Response): Promise<void> => {
  const parsed = GetPropertyParams.safeParse({ id: req.params.id });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, parsed.data.id));

  if (!row) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json({
    ...row,
    priceValue: Number(row.priceValue),
    createdAt: row.createdAt.toISOString(),
  });
});

router.post("/properties", async (req: Request, res: Response): Promise<void> => {
  const parsed = CreatePropertyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
    return;
  }

  const { priceValue, ...rest } = parsed.data;

  const [row] = await db
    .insert(propertiesTable)
    .values({ ...rest, priceValue: String(priceValue) })
    .returning();

  req.log.info({ id: row.id }, "created property");
  res.status(201).json({
    ...row,
    priceValue: Number(row.priceValue),
    createdAt: row.createdAt.toISOString(),
  });
});

router.patch("/properties/:id", async (req: Request, res: Response): Promise<void> => {
  const idParsed = GetPropertyParams.safeParse({ id: req.params.id });
  if (!idParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const bodyParsed = UpdatePropertyBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid body", details: bodyParsed.error.flatten() });
    return;
  }

  const { priceValue, ...rest } = bodyParsed.data;
  const updates: Record<string, unknown> = { ...rest };
  if (priceValue !== undefined) updates.priceValue = String(priceValue);

  const [row] = await db
    .update(propertiesTable)
    .set(updates)
    .where(eq(propertiesTable.id, idParsed.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  req.log.info({ id: row.id }, "updated property");
  res.json({
    ...row,
    priceValue: Number(row.priceValue),
    createdAt: row.createdAt.toISOString(),
  });
});

router.delete("/properties/:id", async (req: Request, res: Response): Promise<void> => {
  const parsed = GetPropertyParams.safeParse({ id: req.params.id });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [row] = await db
    .delete(propertiesTable)
    .where(eq(propertiesTable.id, parsed.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  req.log.info({ id: row.id }, "deleted property");
  res.status(204).send();
});

export default router;
