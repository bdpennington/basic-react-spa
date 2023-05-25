import DB from '../fauna';
import { type errors } from 'faunadb';
import { Errors } from 'typescript-rest';

const client = DB.getClient();
const q = DB.q;

export default class CustomerService {
  static async getAll(size: number, after: string | null) {
    return await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('all_customers')),
          {
            size,
            after,
          },
        ),
        q.Lambda((x) => q.Get(x))
      )
    ).catch(function (err: errors.FaunaHTTPError) {
      console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
      );
      throw new Errors.InternalServerError('Internal Server Error');
    });
  }
}
