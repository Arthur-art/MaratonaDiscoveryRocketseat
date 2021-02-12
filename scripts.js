/*Adicionar ou remover classe active na classe modal-overlay parar abrir ou fechar o Modal */
const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  get(){
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },
  set(transactions){
      localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
  }
}

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
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

  //o index é o numero da posicao do array que o objeto estara guardado
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
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
      <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="" /></td>
    
      
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
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

//Classe com metodos para formatar os valores amount na DOM
const Utils = {
  formatAmount(value) {
    //retirando virgulas e pontos e multiplicando por 100
    value = Number(value.replace(/\,\./g, "")) * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

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
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  formatData() {
    //console.log("formatar os dados")
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    //verificando se o valor é vazio e gerar um erro se estiver vazio
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    //interrompe um compartamento padrão para que eu faça as funcionalidade que eu quiser
    event.preventDefault();
    try {
      //varificar se os campos sao validos
      Form.validateFields();
      const transaction = Form.formatValues();

      //input no array de objetos
      Transaction.add(transaction);

      //apagar os dados do formulario
      Form.clearFields();

      //fechar o modal
      Modal.close();
    } catch (error) {
      alert(error.message);
    }

    //formatar os dados para salvar
    Form.formatData();
  },
};

const App = {
  init() {
    //Para cada objeto dentro do array, utlizar a função DOM.addTransaction(transaction)
    Transaction.all.forEach(function (transaction, index) {
      DOM.addTransaction(transaction, index);
    });

    Storage.set(Transaction.all)

    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
