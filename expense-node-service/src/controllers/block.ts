import { default as Block, BlockModel } from "../models/Block";
import { Request, Response, NextFunction } from "express";

export let getBlock = (req: Request, res: Response) => {
    res.render("block/index", {
      title: "Expense Block"
    });
  };

export let postBlock = (req: Request, res: Response, next: NextFunction) => {
    req.assert("index", "Index is not valid").isNumeric();
    req.assert("previousHash", "PreviousHash must be present").len({ min: 1 });
    req.assert("timestamp", "timestamp must be present").len({ min: 1 });
    req.assert("data", "data must be present").len({ min: 1 });
    req.assert("hash", "hash must be present").len({ min: 1 });
    req.assert("nonce", "nonce must be present").isNumeric();
    const errors = req.validationErrors();

    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/block");
    }

    const block = new Block({
        index: req.body.index,
        previousHash: req.body.previousHash,
        timestamp: req.body.timestamp,
        data: req.body.data,
        hash: req.body.hash,
        nonce: req.body.nonce
    });

    Block.findOne({ hash: req.body.hash }, (err: Error, existingBlock: BlockModel) => {
        if (err) { return next(err); }
        if (existingBlock) {
            req.flash("errors", { msg: "Block with same hash exists." });
            return res.redirect("/block");
        }
        block.save((err) => {
            if (err) { return next(err); }
            req.logIn(block, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", { msg: "Success! Block has been created." });
                res.redirect("/block");
            });
        });
    });
};