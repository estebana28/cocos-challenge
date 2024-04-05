//import { fetchPortfolio } from '@/lib/hooks/api-hooks/usePortfolio';
import { Asset } from './assetModel';

export class Portfolio {
  assets: Asset[];

  constructor(assets: Asset[]) {
    this.assets = assets
  }  
}
