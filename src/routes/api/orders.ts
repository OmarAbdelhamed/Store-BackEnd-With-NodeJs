import { NextFunction, Request, Response, Router } from 'express';
import OrderModel from '../../models/order.model';

const routes = Router();
const orderModel = new OrderModel();

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order created successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.index();
    res.json({
      status: 'success',
      data: { orders },
      message: 'Orders retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.show(req.params.id as unknown as number);
    res.json({
      status: 'success',
      data: { order },
      message: 'Order retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
});

routes.get(
  '/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await orderModel.getOrderByUserId(
        req.params.id as unknown as number
      );
      res.json({
        status: 'success',
        data: { order },
        message: 'Order retrieved successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await orderModel.edit(req.body);
      res.json({
        status: 'success',
        data: { order },
        message: 'Order updated successfully',
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
      const order = await orderModel.delete(req.params.id as unknown as number);
      res.json({
        status: 'success',
        data: { order },
        message: 'Order deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default routes;
