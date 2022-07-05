/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Router } from 'express';
import { IPublicationCreateRequest } from '@models/publication-create';
import * as injector from "@injector/service-collection";

const publicationRouter = Router();
const service = injector.getPublicationService();

publicationRouter.post('/', (req, res) => {
  const { body } = req;
  try {
    service.insert(body as IPublicationCreateRequest).then(publicationId => {
      res.send(publicationId);
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

publicationRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    service.update(id, body as IPublicationCreateRequest).then(() => {
      res.send();
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

publicationRouter.get('/', (req, res) => {
  const { title } = req.query;

  try {
    service.getAll(title as string).then(publications => {
      res.send(publications);
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

publicationRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    service.getById(id).then(publication => {
      res.send(publication);
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

export default publicationRouter;
