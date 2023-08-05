const balance = document.getElementById("balance");
const money_plus = document.getElementById("money_plus")
const money_minus=document.getElementById("money_minus");
const text =document.getElementById("text");
const amnt =document.getElementById("amnt");
const form =document.getElementById("form");
const list =document.getElementById("list");

const dummy_Transaction_Array = [
{id: 1, text: "name", amnt: -20}

];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amnt.value.trim() === ''){
        alert('please add text and amount')
      }else{
        const transaction = {
          id:generateID(),
          text:text.value,
          amount:+amnt.value
        }
        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value='';
        amnt.value='';
    
    }

    
}


//Generate Random ID
function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  
  //Adding Trasactions to DOM list
function addTransactionDOM(transaction) {
    //GET sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }

  

//Update the balance income and expence
function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText=`$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
  }

  

//Remove Transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
  
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  
  
  //Init App
  function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();
  
  form.addEventListener('submit',addTransaction);