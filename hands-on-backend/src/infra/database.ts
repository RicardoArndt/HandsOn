import dotenv from "dotenv";
import { Pool, QueryResult } from "pg";

export class Connection {
  private _db;

  public constructor() {
    dotenv.config();
    this._db = new Pool({ database: "handson" });
  }

  public get<TResult>(
    query: string,
    params: any[]
  ): Promise<QueryResult<TResult>> {
    return new Promise((resolve, reject) => {
      this._db.connect((err, client, done) => {
        if (err) throw err;

        client.query(query, params, (err, result) => {
          done();

          if (err) {
            reject(err);
            throw err;
          }

          resolve(result);
        });
      });
    });
  }

  public execute(
    query: string,
    params: any[]
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.connect((err, client, done) => {
        if (err) throw err;

        client.query(query, params, (err) => {
          done();

          if (err) {
            reject(err);
            throw err;
          }

          resolve();
        });
      });
    });
  }
}
