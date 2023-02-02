import AppError from '@shared/errors/AppError';
import { IProductRequest } from '@shared/utils/generalDTOs';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

export default class UpdateProductService {
  public async execute(data: IProductRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(data.id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(data.name);

    if (productExists && product.name !== data.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = data.name;
    product.price = data.price;
    product.quantity = data.quantity;

    await productsRepository.save(product);

    return product;
  }
}
