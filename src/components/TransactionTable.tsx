import React from "react";

interface Transaction {
    id: number;
    amount: number;
    category: string;
    description: string;
    is_income: boolean;
    date: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto mt-8">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.is_income ? "Income" : "Expense"}</td>
                            <td>{transaction.date}</td>
                            <td>
                                <button onClick={() => onEdit(transaction.id)} className="btn btn-warning btn-sm mr-2">Edit</button>
                                <button onClick={() => onDelete(transaction.id)} className="btn btn-error btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
