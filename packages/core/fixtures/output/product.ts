import { ProductInfo } from './order';
import { ErrorCode } from './order';

//Service: AppService
export type GetProduct = (params: GetProductReq) => Promise<GetProductResp>;

export interface GetProductReq {
  product_id?: number;
}

export interface GetProductResp {
  products?: ProductInfo[];
  error?: ErrorCode;
}

