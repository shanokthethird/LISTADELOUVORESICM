import { Hono } from "hono";
import { cors } from "hono/cors";
import { CreatePublicHymnSchema, PublicHymn } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

// Get all public hymns (A collection)
app.get('/api/public-hymns', async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare(
      'SELECT id, number, name, submitted_by, created_at FROM public_hymns ORDER BY number ASC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    console.error('Error fetching public hymns:', error);
    return c.json({ error: 'Failed to fetch public hymns' }, 500);
  }
});

// Create a new public hymn
app.post('/api/public-hymns', zValidator('json', CreatePublicHymnSchema), async (c) => {
  try {
    const { name, submitted_by } = c.req.valid('json');
    const db = c.env.DB;
    
    // Get the next A number
    const { results: countResult } = await db.prepare(
      'SELECT COUNT(*) as count FROM public_hymns'
    ).all();
    
    const count = (countResult[0] as any)?.count || 0;
    const nextNumber = `A${count + 1}`;
    
    // Insert the new hymn
    const { success, meta } = await db.prepare(
      'INSERT INTO public_hymns (number, name, submitted_by, created_at, updated_at) VALUES (?, ?, ?, datetime("now"), datetime("now"))'
    ).bind(nextNumber, name.toUpperCase(), submitted_by || null).run();
    
    if (!success) {
      throw new Error('Failed to insert hymn');
    }
    
    // Return the created hymn
    const newHymn: PublicHymn = {
      id: meta.last_row_id as number,
      number: nextNumber,
      name: name.toUpperCase(),
      submitted_by: submitted_by || undefined,
    };
    
    return c.json(newHymn, 201);
  } catch (error) {
    console.error('Error creating public hymn:', error);
    return c.json({ error: 'Failed to create public hymn' }, 500);
  }
});

export default app;
