import { Router } from 'express';
import publicationRouter from "@routes/publication";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/publications', publicationRouter);

// Export default.
export default baseRouter;
