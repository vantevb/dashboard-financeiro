// --- UTILITÁRIOS ---
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

// --- CLASSE DE ARMAZENAMENTO ---
class Storage {
    static getTransactions() {
        const transactions = localStorage.getItem('transactions');
        return transactions ? JSON.parse(transactions) : [];
    }

    static saveTransactions(transactions) {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
}

// --- CLASSE PRINCIPAL DO APP ---
class FinanceApp {
    constructor() {
        this.transactions = Storage.getTransactions();
        this.chartInstance = null;
        
        // Elementos DOM
        this.balanceEl = document.getElementById('balance');
        this.incomeEl = document.getElementById('money-plus');
        this.expenseEl = document.getElementById('money-minus');
        this.listEl = document.getElementById('list');
        this.formEl = document.getElementById('form');
        this.ctx = document.getElementById('expensesChart').getContext('2d');
        
        this.init();
    }

    init() {
        // Event Listeners
        this.formEl.addEventListener('submit', this.addTransaction.bind(this));
        document.getElementById('export-btn').addEventListener('click', this.exportCSV.bind(this));
        
        // Configuração global do Chart.js
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#6b7280';
        
        this.updateUI();
    }

    addTransaction(e) {
        e.preventDefault();
        
        const text = document.getElementById('text').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;

        if (!text.trim() || !amount.trim()) {
            alert('Por favor, preencha a descrição e o valor.');
            return;
        }

        const transaction = {
            id: crypto.randomUUID(), // Usa a API nativa de UUID do JS moderno
            text,
            amount: parseFloat(amount),
            category
        };

        this.transactions.push(transaction);
        Storage.saveTransactions(this.transactions);
        
        this.formEl.reset();
        document.getElementById('category').value = 'Receita'; // Reset customizado
        
        this.updateUI();
    }

    removeTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        Storage.saveTransactions(this.transactions);
        this.updateUI();
    }

    updateUI() {
        this.renderList();
        this.updateSummary();
        this.renderChart();
    }

    renderList() {
        this.listEl.innerHTML = '';
        
        // Renderiza do mais recente para o mais antigo
        [...this.transactions].reverse().forEach(transaction => {
            const isExpense = transaction.amount < 0;
            const li = document.createElement('li');
            li.className = isExpense ? 'minus' : 'plus';
            
            li.innerHTML = `
                <div class="transaction-info">
                    <span class="transaction-desc">${transaction.text}</span>
                    <span class="transaction-category">${transaction.category || 'Outros'}</span>
                </div>
                <span class="transaction-amount">${formatCurrency(transaction.amount)}</span>
                <button class="delete-btn" onclick="app.removeTransaction('${transaction.id}')">
                    <i class="ph ph-trash"></i>
                </button>
            `;
            this.listEl.appendChild(li);
        });
    }

    updateSummary() {
        const amounts = this.transactions.map(t => t.amount);
        
        const total = amounts.reduce((acc, item) => acc + item, 0);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
        const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0);

        this.balanceEl.innerText = formatCurrency(total);
        this.incomeEl.innerText = formatCurrency(income);
        this.expenseEl.innerText = formatCurrency(Math.abs(expense));
    }

    renderChart() {
        const expenses = this.transactions.filter(t => t.amount < 0);
        
        const expensesByCategory = expenses.reduce((acc, t) => {
            const cat = t.category && t.category !== 'Receita' ? t.category : 'Outros';
            acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
            return acc;
        }, {});

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // Se não houver despesas, não renderiza o gráfico para evitar bugs visuais
        if (Object.keys(expensesByCategory).length === 0) return;

        this.chartInstance = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(expensesByCategory),
                datasets: [{
                    data: Object.values(expensesByCategory),
                    backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }

    exportCSV() {
        if (this.transactions.length === 0) return alert("Nenhum dado para exportar.");

        const headers = ["ID", "Descricao", "Valor", "Categoria"];
        const rows = this.transactions.map(t => [
            t.id, 
            `"${t.text}"`, 
            t.amount, 
            t.category || "Outros"
        ]);

        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "FinDash_Relatorio.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Instancia a aplicação globalmente para que os botões HTML possam acessá-la
const app = new FinanceApp();