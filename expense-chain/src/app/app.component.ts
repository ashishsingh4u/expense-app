import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Block, BlockChain } from './block.helper';
import { Observable } from 'rxjs/Observable';
import { ObservableMedia } from '@angular/flex-layout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

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
  public cols: Observable<number>;

  constructor(private apiService: ApiService, private observableMedia: ObservableMedia) {
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
      const grid = new Map([
        ['xs', 1],
        ['sm', 2],
        ['md', 3],
        ['lg', 4],
        ['xl', 5]
      ]);
      let start: number;
      grid.forEach((cols, mqAlias) => {
        if (this.observableMedia.isActive(mqAlias)) {
          start = cols;
        }
      });
      this.cols = this.observableMedia.asObservable()
        .map(change => {
          return grid.get(change.mqAlias);
        }).startWith(start);
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
