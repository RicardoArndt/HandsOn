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

export default publicationRouter;
