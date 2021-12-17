// Decrypto core login
// Pseudocode

function buy(token:string, amount:number) {
    return buyPrice;
}

function sell(token:string, amount:number) {
    return sellPrice
}

function profit(buyPrice: number, sellPrice: number) {
    let profit = {amount: number, percentage: number};
    profit.amount = buyPrice - sellPrice;
    profit.percentage = 100/profit.amount;
    console.log("profit: ", profit);
    return profit;    
}

profit(10, 15);

// Set some important variables
let tokenSymbol: string = "ETHUSD";
let profitTarget: number = 2; // this is a percentage

// RSI STRATEGY
// Track candlestick data for a token
// Watch for RSI value 
// If overbought (signal value of 30 or less) then trigger a buy order
// if oversold (signal value of 70 or more) then trigger sell order
// if profitTarget is reached then trigger a sell order

