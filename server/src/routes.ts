import express from 'express';

/**
 * Celebrate
 */
import { celebrate, Joi } from 'celebrate';

/**
 * Multer
 */
import multer from 'multer';
import multerConfig from './config/multer';

/**
 * Controllers
 */
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

/**
 * Instancias dos controllers e rotas
 */
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();
const upload = multer(multerConfig);

/**
 * Rotas Items
 */
routes.get('/items', itemsController.index);

/**
 * Rotas Points
 */
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }),
    }, {
        abortEarly: false
    }),
    pointsController.create
);

export default routes;