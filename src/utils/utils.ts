import { Product } from "../features/productSlice";

export const calculateTotalOfProducts = (products: Product[])=> {

    //This tells TS that total is always a number
    //let total: number = 0;

    let total: number = 0;
    products.forEach((product) => {
        total += product.price
    })
    // return total;
    return parseFloat(total.toFixed(2));
}
 export const reverseUpperCaseString = (inputString: string) => {
    return inputString.split('').reverse().join('').toUpperCase();
 }