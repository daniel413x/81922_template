import { NextFunction, Request, Response } from 'express';
import {
  Model,
  ModelStatic,
  col,
  FindAndCountOptions,
  Attributes,
  FindOptions,
  DestroyOptions,
} from 'sequelize';
import ApiError from '../error/ApiError';
import { assignBodyAndProcessImages } from '../utils/functions';

export default abstract class BaseController<M extends Model> {
  model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  async execGetOne(req: Request, res: Response, options?: FindOptions<Attributes<M>>) {
    const params: { [key: string]: any } = {
      ...options,
    };
    const data = await this.model.findOne(params);
    return res.json(data);
  }

  async execGetOneByParamsId(req: Request, res: Response, next: NextFunction, options?: FindOptions<Attributes<M>>) {
    const params: { [key: string]: any } = {
      ...options,
    };
    const { id } = req.params;
    if (!id) {
      return next(ApiError.internal('Erroneous id'));
    }
    const data = await this.model.findByPk(id, params);
    return res.json(data);
  }

  async execFindOne(req: Request, res: Response, options?: FindOptions<Attributes<M>>) {
    const params: { [key: string]: any } = {
      ...options,
    };
    const data = await this.model.findOne(params);
    return res.json(data);
  }

  async execFindAndCountAll(req: Request, res: Response, options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 22;
    const offset = page * limit - limit;
    const byNewest = req.query.byNewest as string;
    const order: any[] = [];
    const params: { [key: string]: any } = {
      where: {},
      ...options,
      limit,
      offset,
      order,
    };
    if (byNewest) {
      params.order = [[col('createdAt'), 'DESC']];
    }
    const data = await this.model.findAndCountAll(params);
    return res.json(data);
  }

  async execCreate(req: Request, res: Response, options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>) {
    let form = req.body;
    if (req.files) {
      form = assignBodyAndProcessImages(req);
    }
    let data = await this.model.create(form);
    if (options) {
      data = await this.model.findByPk(data.getDataValue('id'), options);
    }
    return res.json(data);
  }

  async execUpdate(req: Request, res: Response) {
    const { id } = req.params;
    let form = req.body;
    if (req.files) {
      form = assignBodyAndProcessImages(req);
    }
    await this.model.update(form, { where: { id } });
    return res.status(204).end();
  }

  async execDestroy(req: Request, res: Response, options?: DestroyOptions<Attributes<M>>) {
    if (options) {
      this.model.destroy({ ...options });
    } else {
      const { id } = req.params;
      this.model.destroy({ where: { id } });
    }
    return res.status(204).end();
  }
}
