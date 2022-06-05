import { NextFunction, Request, Response, Router } from 'express';
import ProductModel from '../../models/product.model';

const routes = Router();
const productModel = new ProductModel();

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...product },
      message: 'Product created successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.index();
    res.json({
      status: 'success',
      data: { products },
      message: 'Products retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.show(req.params.id as unknown as number);
    res.json({
      status: 'success',
      data: { product },
      message: 'Product retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productModel.edit(req.body);
      res.json({
        status: 'success',
        data: { product },
        message: 'Product updated successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productModel.delete(
        req.params.id as unknown as number
      );
      res.json({
        status: 'success',
        data: { product },
        message: 'Product deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default routes;
