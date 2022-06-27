/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Router } from 'express';
import { PublicationRepository } from '@repositories/publication.repository';
import { Connection } from '@infra/database';
import { IPublicationRequest, PublicationModel } from '@models/publication';

const publicationRouter = Router();
const repository = new PublicationRepository(new Connection());

publicationRouter.post('/', (req, res) => {
  const { body } = req;

  const publicationModel = PublicationModel.fromRequest(body as IPublicationRequest);

  repository.insert(publicationModel).then(publicationId => {
    res.send(publicationId);
  });
});

export default publicationRouter;
