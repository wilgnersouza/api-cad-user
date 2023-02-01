import AppError from '@shared/errors/AppError';
import { IProductRequest } from '@shared/utils/generalDTOs';

import { getCustomRepository } from 'typeorm';

import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

export default class CreateProductService {
  public async execute(data: IProductRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(data.name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name: data.name,
      price: data.price,
      quantity: data.price,
    });

    await productsRepository.save(product);

    return product;
  }
}
