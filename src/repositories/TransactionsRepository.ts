import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class TransactionsRepository {
    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        const totalIncome = this.transactions
            .filter(item => item.type === 'income')
            .map(item => item.value)
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );

        const totalOutcome = this.transactions
            .filter(item => item.type === 'outcome')
            .map(item => item.value)
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );

        const total = totalIncome - totalOutcome;

        return { income: totalIncome, outcome: totalOutcome, total };
    }

    public create({ title, value, type }: CreateTransactionDTO): Transaction {
        // TODO
        const transaction = new Transaction({ title, value, type });

        this.transactions.push(transaction);

        return transaction;
    }
}

export default TransactionsRepository;
