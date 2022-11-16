let foods = ["Cheeseburger", "Pizza", "Sandwich","Döner"];
let foodInfos = ["mit 100g saftigem Rindfleischpatty,Käse Hamburgersauce und Ketchup", "Wahl aus mehreren Größen, mit Tomatensoße und diversen Belägen", "Getoastetes frisches Weißbrot, Schinken, Köse, Tomate, Gurke", "Selbst gemachtes Fladenbrot, frisches Fleisch und Gemüße. Soße nach Wahl"]
let prices = [10.99, 9.99, 5.99, 4.99];
let amounts = [1, 1, 1, 1]

let basketFood = []
let basketPrice = []
let basketAmount = []

// Arrays wurden definiert

let deliveryCost = 0;


function render() {    // render Funktion die bei Aufruf der Seite gestartet wird
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < foods.length; i++) { // geht die Arrays durch
        const food = foods[i];
        const price = prices[i];
        const foodInfo = foodInfos[i];
        const amount = amounts[i];

        content.innerHTML += /*html*/ `

    <div class="card">

        <div class="card-header">

            <h2>${foods[i]}</h2> 

            <img class="plus" onclick="addToBasket('${food}',${price}, ${amount})" src="img/plus-2-48.png" alt="">

        </div>
        <div class="card-body">

                <div class="foodInfo-container">

                 <i>  ${foodInfos[i]} </i>

                </div>

                 <div class="price-container">
                  <b>  ${prices[i]} € </b>
                 </div>

        </div>
    </div>    
    `;
        renderBasket(); // Warenkorb wird noch einmal aufgerufen und aktualisiert
    }
}


function addToBasket(food, price, amount) {    // Warenkorb befüllen

    let index = basketFood.indexOf(food);    // Überprüft den Index des Arrays food also ob schon etwas an der Stelle 0 ist
    if (index == -1) {                     // Falls nichts in dem Array vorhanden ist dann wird Name preis und Menge den Warenkorb Arrays hinzugefügt

        basketFood.push(food);   
        basketPrice.push(price);
        basketAmount.push(amount);
    } else {
        basketAmount[index]++;   // Falls schon etwas in Warenkorb ist soll das jeweilige essen um 1 erhöht werden
    }
    renderBasket();
}


function renderBasket() {   // Warenkorb wird aufgerufen bzw ausgeführt

    let basketContent = document.getElementById('basket');
    let basketContent2 = document.getElementById('basket2');
    basketContent2.innerHTML = '';
    basketContent.innerHTML = '';
    

    if (basketAmount == 0) {   // Falls Warenkorb leer ist soll die Anziege für den leeren Warenkorb angezeigt werden
        basketContent.innerHTML = emptyBasket();
    }
    else {       // Falls schon etwasim Warenkorb ist -> vollen Warenkorb anziegen und Summe berechnen
        for (let i = 0; i < basketFood.length; i++) {

            const foodInBasket = basketFood[i];
            const priceInBasket = basketPrice[i];
            const amountInBasket = basketAmount[i];

            let sum = 0
            for (let i = 0; i < basketPrice.length; i++) {
            
            sum += basketPrice[i] * basketAmount[i];    
            }
    
            basketContent.innerHTML += fullBasket(i);   // Vollen Warenkorb anzeigen

            basketContent2.innerHTML = ShowCalculation(sum, amountInBasket);   // Kalkulation anzeigen

        }
    }
}


function calculateFinalSum(sum) {  // überprüft ob Lieferkosten fällig sind und addiert sie dazu


    if (sum > 20) {
        deliveryCost = 0;
        let finalSum = 0;
        finalSum += sum + deliveryCost;
        return finalSum;

    } else {

        let finalSum = 0;
        deliveryCost = 1;
        finalSum += sum + deliveryCost;
        return finalSum;
    }
}


function ShowCalculation(sum, amountInBasket) {   // Zeigt die Kalkulation an
    finalSum = calculateFinalSum(sum, amountInBasket)

    return /*html*/ `
    <div id="basketSum" class="basketContentBottom">

         <p>Zwischensumme: ${sum} € </p> 
         <p>Lieferkosten: ${deliveryCost} €</p>
         <p>Gesamt: ${finalSum}</p>

      </div>

      <div class="wrapper">
                    <a href="#"><span>Bestellen!</span></a>
                  </div>


    `;
}


function removeFromBasket(foodInBasket) {
    let basketContent = document.getElementById('basket');

    let index = basketFood.indexOf(foodInBasket);
    if (index == -1) {
        basketFood.splice(index, 1);
        basketAmount.splice(index, 1);
        basketPrice.splice(index, 1);
    } else {
        basketAmount[index]--;
    }
    renderBasket();
}


function increaseAmountInBasket(foodInBasket){
    let index = basketFood.indexOf(foodInBasket);
    basketAmount[index]++;
    renderBasket()
}


function emptyBasket() {
    return /*html*/ `
    <div class="emptyBasket"> 

       <img src="img/shopping-basket-48.png" alt="">
       <p> Bitte Füge etwas hinzu!  </p>
       <p> <i>Füge leckere Gerichte aus der der Auswahl auf der linken Seite hinzu und freue dich auf eine schnelle Lieferung  </i> </p>

     </div> 
`;
}


function fullBasket(i) {
    return /*html*/ `
    <div class="basketcontent">

        <div class="basketContentTop">

            <div class="basketAmountContainer"> ${basketAmount[i]} </div>  x  <div class="basketFoodContainer">  ${basketFood[i]}  </div>  :  <div class ="basketPriceContainer"> ${basketPrice[i]} € </div>

        </div>

                <div class="addAndRemove">
                    <img onclick="increaseAmountInBasket('${basketFood[i]}', ${basketPrice[i]}, ${basketAmount[i]})" src="img/plus-5-48.png" alt=""> <img onclick="removeFromBasket('${basketFood}',${basketPrice}, ${basketAmount})" src="img/minus-5-48.png" alt="">
                </div>



`;
}

