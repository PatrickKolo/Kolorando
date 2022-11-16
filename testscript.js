
let sum = 0
for (let i = 0; i < basketPrice.length; i++) {

sum += basketPrice[i] * basketAmount[i];

}



const totalSum = basketPrice.reduce((accumulator, value) => {   // soll die gesamte Summe des Arrays ausgeben
    return accumulator + value;
  }, 0);

let sum = 0;
sum = totalSum * amountInBasket;