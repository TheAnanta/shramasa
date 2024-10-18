import { Request, Response, NextFunction } from "express";

export const checkAuthorizedByAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (authToken !== "Basic YWRtaW46bWFsbGE") {
    return res
      .status(401)
      .json({ error: "You're unauthorized to perform this operation" });
  }
  next();
};
    