import { IProduct } from "./product";

export interface IEntry {
    creator: string;
    date: string;
    products: IProduct[];
    bill: string;
}