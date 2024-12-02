import React, { useState } from "react";

interface TransactionFormProps {
    onSubmit: (transaction: { amount: number; category: string; description: string; is_income: boolean; date: string }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isIncome, setIsIncome] = useState<boolean>(true);
    const [date, setDate] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ amount, category, description, is_income: isIncome, date });
        // Clear the form after submit
        setAmount(0);
        setCategory("");
        setDescription("");
        setIsIncome(true);
        setDate("");
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block">Type</label>
                    <select
                        value={isIncome ? "Income" : "Expense"}
                        onChange={(e) => setIsIncome(e.target.value === "Income")}
                        className="select select-bordered w-full"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;
