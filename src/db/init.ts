import { drizzle } from 'drizzle-orm/neon-http';
import { counterTable } from './schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function addCount(id: string) {
    const existingCounter = await db.select().from(counterTable).where(eq(counterTable.id, id));

    let newCount = 1; // Default to 1 if no existing record
    if (existingCounter.length > 0 && existingCounter[0]?.count !== undefined) {
        newCount = existingCounter[0]!.count! + 1;
    }

    await db
        .insert(counterTable)
        .values({ id, count: newCount })
        .onConflictDoUpdate({ target: [counterTable.id], set: { count: newCount } });

    console.log('Counter incremented!');

    return newCount; // Return the updated count
}

async function removeCount(id: string) {
    const existingCounter = await db.select().from(counterTable).where(eq(counterTable.id, id));

    if (existingCounter.length === 0 || existingCounter[0]?.count === undefined || existingCounter[0]!.count! <= 0) {
        console.log('Counter already at zero or does not exist.');
        return 0;
    }

    const newCount = existingCounter[0]!.count! - 1;

    await db
        .update(counterTable)
        .set({ count: newCount })
        .where(eq(counterTable.id, id));

    console.log('Counter decremented!');

    return newCount; // Return the updated count
}

async function getCount(id: string) {
    const existingCounter = await db.select().from(counterTable).where(eq(counterTable.id, id));

    if (existingCounter.length === 0 || existingCounter[0]?.count === undefined) {
        return 0; // Return 0 if no record exists
    }

    return existingCounter[0].count; // Return the current count
}

export { addCount, removeCount, getCount }