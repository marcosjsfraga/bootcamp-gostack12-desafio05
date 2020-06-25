import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, value, type }: RequestDTO): Transaction {
        const { total } = this.transactionsRepository.getBalance();

        if (!['income', 'outcome'].includes(type)) {
            throw Error('Transaction type is not valid!');
        }

        if (type === 'outcome' && total < value) {
            throw Error('your balance is insufficient');
        }

        const transaction = this.transactionsRepository.create({
            title,
            value,
            type,
        });

        return transaction;
    }
}

export default CreateTransactionService;
