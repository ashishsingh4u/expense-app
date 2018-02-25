import { SHA256 } from 'crypto-js';

export class Block {
    nonce: number;
    hash: string;
    constructor(public index: number, public timestamp: string, public data: string, public previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    static populateBlock(values: Object = {}): Block {
        const block: Block = new Block(0, '', '', '');
        Object.assign(block, values);
        return block;
    }

    calculateHash(): string {
        const keyData = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
        return SHA256(keyData).toString();
    }

    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

}

export class BlockChain {
    difficulty: number;
    chain: Block[];
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
    }

    createGenesisBlock(): Block {
        return new Block(0, '01/01/2018', 'Genesis block', '0');
    }

    getLatestBlock(): Block {
        return this.chain[0];
    }

    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
