import { NextFunction, Request, Response, Router } from 'express';
import OrderProductModel from '../../models/order-products.model';

const routes = Router();
const orderProductModel = new OrderProductModel();

routes.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...orderProduct },
      message: 'Order Product created successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.get(
  '/:id/products',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderProducts = await orderProductModel.index(
        req.params.id as unknown as number
      );
      res.json({
        status: 'success',
        data: { orderProducts },
        message: 'Order Products retrieved successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.get(
  '/:id/products/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderProduct = await orderProductModel.show(
        req.body.orderId,
        req.body.productId
      );
      res.json({
        status: 'success',
        data: { orderProduct },
        message: 'Product at target Order retrieved successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.patch(
  '/:id/products/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderProduct = await orderProductModel.edit(req.body);
      res.json({
        status: 'success',
        data: { orderProduct },
        message: 'order Product updated successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.delete(
  '/:id/products/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderProduct = await orderProductModel.delete(
        req.body.orderId,
        req.body.productId
      );
      res.json({
        status: 'success',
        data: { orderProduct },
        message: 'Order Product deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default routes;
