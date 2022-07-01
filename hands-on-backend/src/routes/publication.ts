/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Router } from 'express';
import { IPublicationCreateRequest } from '@models/publication-create';
import * as injector from "@injector/service-collection";

const publicationRouter = Router();
const service = injector.getPublicationService();

publicationRouter.post('/', (req, res) => {
  const { body } = req;

  service.insert(body as IPublicationCreateRequest).then(publicationId => {
    res.send(publicationId);
  });
});

publicationRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  service.update(id, body as IPublicationCreateRequest).then(() => {
    res.send();
  });
});

publicationRouter.get('/', (req, res) => {
  const { title } = req.query;

  service.getAll(title as string).then(publications => {
    res.send(publications);
  });
});

publicationRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  service.getById(id).then(publication => {
    res.send(publication);
  });
});

export default publicationRouter;
