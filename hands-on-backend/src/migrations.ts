/* eslint-disable @typescript-eslint/no-unsafe-argument */
import dotenv from "dotenv";
import { Client } from "pg";
import { v4 as uuidv4 } from "uuid";
import { CREATE_CHANGE_LOG_TABLE } from "./sql/migrations/changelog";
import {
  ALTER_TABLE_AUTO_INCREMENT_CODE,
  CREATE_PUBLICATION_TABLE,
  CREATE_PUBLICATION_TAG_TABLE,
  CREATE_TAG_TABLE
} from "./sql/migrations/publication"
import { GET_BY_NAME_QUERY, INSERT_QUERY } from "./sql/queries/changelog";

dotenv.config();
const db = new Client({ database: "handson" });

const migrateAll = (funcs: Promise<void>[]): void => {
  db.connect((err) => {
    if (err) throw err;

    Promise.all(funcs)
        .then()
        .catch((err) => {
          console.error("Error:", err.message);
        })
        .finally(() => {
          db.end();
          process.exit();
        });
  });
}

const initial = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.query(CREATE_CHANGE_LOG_TABLE, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

const migratePublication = (): Promise<void> => {
  const migrationName = "migrate_publication_20220626135400";
  return migrateTable(migrationName, CREATE_PUBLICATION_TABLE);
}

const migrateTag = (): Promise<void> => {
  const migrationName = "migrate_tag_20220626135400";
  return migrateTable(migrationName, CREATE_TAG_TABLE);
}

const migratePublicationTag = (): Promise<void> => {
  const migrationName = "migrate_publication_tag_20220626135400";
  return migrateTable(migrationName, CREATE_PUBLICATION_TAG_TABLE);
}

const alterTablePublicationAddAutoIncrement = (): Promise<void> => {
  const migrationName = "alter_table_publication_add_auto_increment_code_20220701154800";
  return migrateTable(migrationName, ALTER_TABLE_AUTO_INCREMENT_CODE);
}

const migrateTable = (migrationName: string, query: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.query(GET_BY_NAME_QUERY, [migrationName], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      if (results.rows.length) {
        console.log("Information:", `migration ${migrationName} already applied`);
        resolve();
        return;
      }

      db.query(query, (err) => {
        if (err) {
          reject(err);
          return;
        }

        console.log('Success:', `migration ${migrationName} applied`);

        db.query(INSERT_QUERY, [uuidv4(), migrationName], (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      });
    });
  });
};

migrateAll([
  initial(),
  migratePublication(),
  migrateTag(),
  migratePublicationTag(),
  alterTablePublicationAddAutoIncrement()
]);
