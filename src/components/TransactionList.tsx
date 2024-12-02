import React from 'react';
import { Transaction } from '../types/Transaction';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
    return (
        <table className="table table-zebra w-full">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Income</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                        <td>{transaction.date}</td>
                        <td>
                            <button onClick={() => onEdit(transaction.id)} className="btn btn-sm btn-warning">
                                Edit
                            </button>
                            <button onClick={() => onDelete(transaction.id)} className="btn btn-sm btn-error">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionList;
