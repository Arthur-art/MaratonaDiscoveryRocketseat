/*Adicionar ou remover classe active na classe modal-overlay parar abrir ou fechar o Modal */
const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Transaction = {
  
  all: [
    {
      
      description: "Luz",
      amount: -50000,
      date: "23/01/2021",
    },
    {
      
      description: "Criação website",
      amount: 500000,
      date: "23/01/2021",
    },
    {
      
      description: "Internet",
      amount: -20000,
      date: "23/01/2021",
    },
    {
      
      description: "App",
      amount: 20000,
      date: "23/01/2021",
    },
  ],

  add(transaction){
    Transaction.all.push(transaction);
    App.reload()
  },

  remove(index){
    Transaction.all.splice(index, 1)
    App.reload()
  },

  incomes() {
    let income = 0;
    //Pegar todas as transacoes
    //para cada transacao, se ela for maior que zero
    Transaction.all.forEach(function (transaction) {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    //somar a uma variavel e retornar a variavel
    return income;
  },
  expenses() {
    let expense = 0;
    //Pegar todas as transacoes
    //para cada transacao, se ela for menor que zero
   Transaction.all.forEach(function (transaction) {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

//Classe DOM: Adicionando os elementos na DOM Table
const DOM = {
  //Adicionando o conteudo de innerHTMLTransaction na dom dentro do elemento table
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    //Trocando a classe do element td para mudar a cor dos numero negativos e positivos
    const TransactionAmount = transaction.amount;
    var CSSclass = [];
    if (TransactionAmount > 0) {
      CSSclass = ["income"];
    } else {
      CSSclass = ["expense"];
    }

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `

    
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="./assets/minus.svg" alt="" /></td>
    
      
      `;
    return html;
  },

  //DOM Balance
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
  clearTransactions(){
    DOM.transactionsContainer.innerHTML = "";
  }
};

//Classe com metodos para formatar os valores amount na DOM
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
};

const Form = {
    submit(event){
      //interrompe um compartamento padrão para que eu faça as funcionalidade que eu quiser
     event.preventDefault()

     //verificar se todas as informações foram preenchidas
     //formatar os dados para salvar
     //salvar
     //apagar os dados do formulario
     //fechar o modal
     //Atualizar a aplicacao
    }
}

const App = {
  init(){
    //Para cada objeto dentro do array, utlizar a função DOM.addTransaction(transaction)
Transaction.all.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});

DOM.updateBalance();


  },
  reload(){
    DOM.clearTransactions();
    App.init()
  },
};

App.init()


