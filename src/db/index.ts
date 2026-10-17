import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// La conexión se crea solo cuando se usa por primera vez (no al compilar),
// así el build no falla si DATABASE_URL todavía no está configurada.
function getPool(): Pool {
  if (globalForDb.__arenaNextJsPostgresqlPool) {
    return globalForDb.__arenaNextJsPostgresqlPool;
  }
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  const pool = new Pool({ connectionString: databaseUrl });
  globalForDb.__arenaNextJsPostgresqlPool = pool;
  return pool;
}

let _db: NodePgDatabase | undefined;

export const pool = new Proxy({} as Pool, {
  get: (_t, prop) => Reflect.get(getPool(), prop),
});

export const db = new Proxy({} as NodePgDatabase, {
  get: (_t, prop) => {
    _db ??= drizzle(getPool());
    return Reflect.get(_db, prop);
  },
});
