import { Request, Response, NextFunction, Router } from "express";
import { default as Block, BlockModel } from "../models/Block";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const block = new Block(req.body);
  block.save((err: Error, block: BlockModel) => {
    if (err) return next(err);
    res.status(201);
    res.json(block);
  });
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Block.find({}).sort({ index: -1 }).exec((err, blocks) => {
    if (err) return next(err);
    res.json(blocks);
  });
});

export = router;