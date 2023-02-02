import AppError from '@shared/errors/AppError';
import { IProductRequest } from '@shared/utils/generalDTOs';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

export default class ShowProductService {
  public async execute({ id }: IProductRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
