/*Adicionar ou remover classe active na classe modal-overlay parar abrir ou fechar o Modal */
const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Criação website",
    amount: 500000,
    date: "23/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
  },
  {
    id: 4,
    description: "App",
    amount: 20000,
    date: "23/01/2021",
  },
];

const Transaction = {
  incomes() {
    //somar as entradas
  },
  expenses() {
    //somar as saidas
  },
  total() {
    //entradas - saidas
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){

    var amount  = Utils.formatCurrency(transaction.amount);
    
    const tr = document.createElement('tr');
    tr.innerHTML =DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {

    //Trocando a classe 
    const TransactionAmount = transaction.amount;
    var CSSclass = [];
    if(TransactionAmount>0){
      CSSclass = ["income"];
    }else{
      CSSclass = ["expense"]
    }

    const html = `

    
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="./assets/minus.svg" alt="" /></td>
    
      
      `
      return html
  }
};

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""
  }
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction);
})

