import { type Connection, createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { config } from "dotenv";
import { join, resolve } from 'path';

config();

const files_base_path = "./database/";

const migrationPaths = [
    "create_database",
    "create_items_table",
    "create_combinations_table",
    "create_responses_table"
];

(async () => {
    let connection: Connection;
    try {
        connection = await createConnection(process.env.DATABASE_URL);
        await connection.beginTransaction();

        // Start a loop for running all the migration commands
        for (const filePath of migrationPaths) {
            const sqlFilePath = join(resolve(), files_base_path, filePath + ".sql");
            const sql = readFileSync(sqlFilePath, 'utf8');
            await connection.query(sql); // Waits for each query to complete before proceeding
        }

        connection.commit()
        connection.end();
        console.log("Database migration successful!");
    } catch (error) {
        connection.rollback();
        connection.end();
        console.error(`Failed to migrate the database, message: ${error?.message || "unknown error"}`);
    } finally {
        process.exit(0);
    }
})();