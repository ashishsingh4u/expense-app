import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Block, BlockChain } from './block.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'expense-chain';
  index = 0;
  previousHash = '';
  timestamp = '';
  data = '';
  hash = '';
  nonce = 0;
  blocks: Block[] = [];
  blockChain: BlockChain = new BlockChain();

  constructor(private apiService: ApiService) {
    const block: Block = this.blockChain.getLatestBlock();
    this.index = block.index;
    this.previousHash = block.hash;
    this.timestamp = block.timestamp;
    this.data = block.data;
    this.hash = block.hash;
    this.nonce = block.nonce;
  }

  public ngOnInit() {
    this.apiService
      .getBlocks()
      .subscribe(
        (blocks) => {
          this.blocks = blocks;
        }
      );
  }

  mineBlock() {
    const block: Block = new Block(this.index + 1, Date.now().toString(), this.data, this.previousHash);
    this.blockChain.addBlock(block);

    this.apiService.createBlock(block).subscribe((newBlock) => {
      this.blocks.push(newBlock);
      this.initializeViewModel(newBlock);
    });
  }

  getBlocks() {
    console.log(JSON.stringify(this.blocks));
  }

  OnMatCardClickEvent(block: Block) {
    const latestBlock = this.blockChain.getLatestBlock();
    console.log(JSON.stringify(latestBlock));
  }

  private initializeViewModel(block: Block) {
    this.index = block.index;
    this.previousHash = block.hash;
    this.timestamp = block.timestamp;
    this.data = block.data;
    this.hash = block.hash;
    this.nonce = block.nonce;
  }
}
