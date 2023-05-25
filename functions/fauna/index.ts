import faunadb from 'faunadb';
import dotenv from 'dotenv';

dotenv.config();

const { FAUNA_PREFIX, FAUNA_API_KEY } = process.env;

export default class DB {
  private static client: faunadb.Client;
  public static q = faunadb.query;

  static getClient() {
    if (this.client) {
      return this.client;
    }
    this.client = new faunadb.Client({
      secret: FAUNA_API_KEY as string,
      endpoint: FAUNA_PREFIX as string,
      keepAlive: false,
      timeout: 7000,
    });
    return this.client;
  }
}
