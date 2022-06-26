import dotenv from "dotenv";
import { Client, QueryResult } from "pg";

export class Connection {
  private _db;

  public constructor() {
    dotenv.config();
    this._db = new Client({ database: "handson" });
  }

  public open(): void {
    this._db.connect();
  }

  public close(): void {
    this._db.end();
  }

  public get<TResult>(
    query: string
  ): Promise<QueryResult<TResult>> {
    return new Promise((resolve, reject) => {
      this._db.query(query, (err, result) => {
        if (err) {
          reject(err);
          throw err;
        }

        resolve(result);
      });
    });
  }

  public execute(
    query: string,
    params: any[]
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      return this._db.query(query, params, (err) => {
        if (err) {
          reject(err);
          throw err;
        }

        resolve();
      });
    });
  }
}
