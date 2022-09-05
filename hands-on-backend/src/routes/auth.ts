import { Router } from "express";

const authRouter = Router();

authRouter.get("saml", (req, res) => {
  res.send();
});

export default authRouter;
