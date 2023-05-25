import { Path, GET, PathParam, PreProcessor } from 'typescript-rest';
import CustomerService from '../../services/CustomerService';
import { validateApiKey } from '../../preprocessors/validateAuth';

@Path("/customers")
@PreProcessor(validateApiKey)
export default class CustomerController {
  @Path("/")
  @GET
  getCustomers(@PathParam('size') size = 10, after: string | null = null) {
    return CustomerService.getAll(size, after)
      .catch(function (err) { return err });
  }
}
