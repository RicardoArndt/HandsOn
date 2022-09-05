import { Router } from 'express';
import publicationRouter from "@routes/publication";
import authRouter from './auth';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/auth', authRouter);
baseRouter.use('/publications', publicationRouter);

// Export default.
export default baseRouter;
