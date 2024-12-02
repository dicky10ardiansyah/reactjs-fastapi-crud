import React, { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

interface Transaction {
    id: number;
    amount: number;
    category: string;
    description: string;
    is_income: boolean;
    date: string;
}

const HomePage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    // Fetch transactions from API
    const fetchTransactions = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/transactions/");
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Handle create transaction
    const handleCreateTransaction = async (transaction: Omit<Transaction, "id">) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/transactions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction),
            });
            if (response.ok) {
                const newTransaction = await response.json();
                setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
                setIsFormVisible(false); // Hide form after adding transaction
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    // Handle edit transaction
    const handleEdit = (id: number) => {
        console.log("Edit transaction with id", id);
    };

    // Handle delete transaction
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/transactions/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transaction Management</h1>

            {/* Add Transaction Button */}
            <button
                onClick={() => setIsFormVisible(true)}
                className="btn btn-primary btn-sm fixed top-4 right-4 z-10 text-white"
            >
                Add Transaction
            </button>

            {/* Form for adding transaction */}
            {isFormVisible && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
                    <div className="card p-6 bg-white shadow-lg max-w-3xl w-full">
                        <TransactionForm onSubmit={handleCreateTransaction} />
                        <button
                            onClick={() => setIsFormVisible(false)}
                            className="btn btn-ghost mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Table for displaying transactions */}
            <TransactionTable
                transactions={transactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default HomePage;
