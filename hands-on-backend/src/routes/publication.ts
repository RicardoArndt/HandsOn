/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Router } from 'express';
import { PublicationRepository } from '@repositories/publication.repository';
import { Connection } from '@infra/database';
import { PublicationModel, TagModel } from '@models/publication';

const publicationRouter = Router();
const repository = new PublicationRepository(new Connection());

publicationRouter.post('/', (req, res) => {
  const publicationModel = new PublicationModel(
    1,
    "Post 1",
    "Description post 1",
    1,
    [
      new TagModel("Backend")
    ]
  );

  repository.insert(publicationModel).then(publicationId => {
    res.send(publicationId);
  });
});

export default publicationRouter;
