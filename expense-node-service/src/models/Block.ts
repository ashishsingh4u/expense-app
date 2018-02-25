import * as mongoose from "mongoose";

export type BlockModel = mongoose.Document & {
    index: number,
    previousHash: string,
    timestamp: string,
    data: string,
    hash: string,
    nonce: string
};

const blockSchema = new mongoose.Schema({
    index: Number,
    previousHash: String,
    timestamp: String,
    data: String,
    hash: String,
    nonce: String
});

const Block = mongoose.model<BlockModel>("Block", blockSchema);
export default Block;