import { Path, GET, PathParam, PreProcessor } from 'typescript-rest';
import ProductService from '../../services/ProductService';
import { validateApiKey } from '../../preprocessors/validateAuth';

@Path("/products")
@PreProcessor(validateApiKey)
export default class ProductController {
  @Path("/")
  @GET
  getProducts(@PathParam('size') size = 10, after: string | null = null) {
    return ProductService.getAll(size, after)
      .catch(function (err) { return err });
  }
}
