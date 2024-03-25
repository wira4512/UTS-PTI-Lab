document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    const helloText = document.getElementById('helloText');
    const content = document.getElementById('content');
});
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      helloText.textContent = 'Hello, ' + username + '!';
      loginPage.style.display = 'none';
      mainPage.style.display = 'block';
      loadMainPage();
    });

let transactions = [];

function loadMainPage() {
  content.innerHTML = `
    <h2>Halaman Utama</h2>
    <div id="transactions" class="mt-4">
      <h3>Transaksi</h3>
      <ul id="transactionList" class="list-group">
        <!-- Transaction list will be loaded dynamically here -->
      </ul>
    </div>
    <div id="transactionForm" class="mt-4">
      <h3>Tambah Transaksi</h3>
      <form id="addTransactionForm">
        <div class="mb-3">
          <label for="transactionName" class="form-label">Nama Transaksi</label>
          <input type="text" class="form-control" id="transactionName" placeholder="Masukkan Nama Transaksi" required>
        </div>
        <div class="mb-3">
          <label for="transactionAmount" class="form-label">Jumlah Uang</label>
          <input type="number" class="form-control" id="transactionAmount" placeholder="Masukkan Jumlah Transaksi" required>
        </div>
        <div class="mb-3">
          <label for="transactionCategory" class="form-label">Category</label>
          <select class="form-select" id="transactionCategory" required>
            <option value="">Pilih Kategori</option>
            <option value="Income">Penghasilan</option>
            <option value="Outcome">Pengeluaran</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Tambah Transaksi</button>
      </form>
    </div>
  `;

  loadTransactions();

  document.getElementById('addTransactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#transactionName').value;
    const amount = parseInt(form.querySelector('#transactionAmount').value);
    const category = form.querySelector('#transactionCategory').value;
    if (name && amount && category) {
      addTransaction(name, amount, category);
    } else {
      alert('Please fill out all fields!');
    }
  });
}

function loadTransactions() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `${transaction.name}: ${transaction.amount} (${transaction.category})`;
    if (transaction.category === 'Income') {
      listItem.style.color = 'green';
    } else {
      listItem.style.color = 'red';
    }
    transactionList.appendChild(listItem);
  });

  const balance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const balanceElement = document.createElement('div');
  balanceElement.innerHTML = `<h3>Jumlah Uang Tersisa: ${balance}</h3>`;
  content.appendChild(balanceElement);
}

function addTransaction(name, amount, category) {
  const transaction = { name: name, amount: amount, category: category };
  transactions.push(transaction);
  alert('Berhasil Menambahkan Transaksi Baru!');
  loadMainPage();
}



    document.getElementById('mainLink').addEventListener('click', function(event) {
      event.preventDefault();
      loadMainPage();
    });
  
    document.getElementById('incomeLink').addEventListener('click', function(event) {
      event.preventDefault();
      loadIncomePage();
    });
  
    document.getElementById('outcomeLink').addEventListener('click', function(event) {
      event.preventDefault();
      loadOutcomePage();
    });

function loadIncomePage() {
  content.innerHTML = `
    <h2>Halaman Penghasilan</h2>
    <form id="incomeForm">
      <div class="mb-3">
        <label for="incomeName" class="form-label">Nama transaksi</label>
        <input type="text" class="form-control" id="incomeName" placeholder="Nama transaksi">
      </div>
      <div class="mb-3">
        <label for="incomeAmount" class="form-label">Nominal transaksi</label>
        <input type="number" class="form-control" id="incomeAmount" placeholder="Nominal transaksi">
      </div>
      <div class="mb-3">
        <label for="incomeCategory" class="form-label">Kategori transaksi</label>
        <select class="form-select" id="incomeCategory">
          <option value="Makan">Makan</option>
          <option value="Main">Main-Main</option>
          <option value="Edukasi">Edukasi</option>
          <option value="Belanja">Belanja</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `;

  const incomeForm = document.getElementById('incomeForm');
  incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const incomeName = document.getElementById('incomeName').value;
    const incomeAmount = parseInt(document.getElementById('incomeAmount').value);
    const incomeCategory = document.getElementById('incomeCategory').value;
    if (incomeName && incomeAmount && incomeCategory) {
      const transaction = { name: incomeName, amount: incomeAmount, category: 'Income' };
      transactions.push(transaction);
      alert('Transaksi sukses! Berhasil Tambah Transaksi Income Baru!');
      loadMainPage();
    } else {
      alert('Transaksi belum selesai, silakan lengkapi formulir!');
    }
  });
}
function loadOutcomePage() {
    content.innerHTML = `
      <h2>Halaman Pengeluaran</h2>
      <form id="outcomeForm">
        <div class="mb-3">
          <label for="outcomeName" class="form-label">Nama transaksi</label>
          <input type="text" class="form-control" id="outcomeName" placeholder="Nama transaksi">
        </div>
        <div class="mb-3">
          <label for="outcomeAmount" class="form-label">Nominal transaksi</label>
          <input type="number" class="form-control" id="outcomeAmount" placeholder="Nominal transaksi">
        </div>
        <div class="mb-3">
          <label for="outcomeCategory" class="form-label">Kategori transaksi</label>
          <select class="form-select" id="outcomeCategory">
            <option value="Makan">Makan</option>
            <option value="Main-Main">Main-Main</option>
            <option value="Edukasi">Edukasi</option>
            <option value="Belanja">Belanja</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `;
  
    const outcomeForm = document.getElementById('outcomeForm');
    outcomeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const outcomeName = document.getElementById('outcomeName').value;
      const outcomeAmount = parseInt(document.getElementById('outcomeAmount').value);
      const outcomeCategory = document.getElementById('outcomeCategory').value;
      if (outcomeName && outcomeAmount && outcomeCategory) {
        const transaction = { name: outcomeName, amount: -outcomeAmount, category: 'Outcome' };
        transactions.push(transaction);
        alert('Transaksi sukses! Berhasil Tambah Transaksi Outcome Baru');
        loadMainPage();
      } else {
        alert('Transaksi belum selesai, silakan lengkapi formulir!');
      }
    });
  }

  function loadAboutMePage() {
    content.innerHTML = `
      <h2>Pencipta Website</h2>
      <p>Website ini diciptakan oleh Kelompok 10:</p>
      <ul>
        <li>Maria Makarios Wirabekti Damian (00000094079)</li>
        <li>Aryaka Alif Septiano Dery (00000096731)</li>
        <li>Muhammad Naufal Aulia (0000011083)</li>
        <li>Avelino Maschur Bryan Jr Konterius (00000111908)</li>
      </ul>
    `;
  }

  document.getElementById('aboutLink').addEventListener('click', function(event) {
    event.preventDefault();
    loadAboutMePage();
  });
  