import { useEffect, useState } from "react";

import {
  incomeCategories,
  expenseCategories,
} from "../config/transaction-categories";

import type {
  Transaction,
  TransactionType,
  TransactionCategory,
} from "../../../types/transaction.types";

import "../../../../assets/css/features/transactions/transaction-form.css";

type TransactionFormProps = {
  onSubmit: (transaction: Transaction) => void;

  onClose: () => void;

  initialData?: Transaction;

  isEdit?: boolean;
};

const TransactionForm = ({
  onSubmit,
  onClose,
  initialData,
  isEdit = false,
}: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>(
    initialData?.type ?? "expense",
  );

  const availableCategories =
    type === "income" ? incomeCategories : expenseCategories;

  const [title, setTitle] = useState(initialData?.title ?? "");

  const [amount, setAmount] = useState(initialData?.amount?.toString() ?? "");

  const [category, setCategory] = useState<TransactionCategory | "">(
    initialData?.category ?? "",
  );
  const titlePlaceholder =
    type === "income" ? "e.g. Monthly Salary" : "e.g. Grocery Shopping";
  const selectedCategory = availableCategories.find(
    (item) => item.value === category,
  );

  const [date, setDate] = useState(initialData?.date ?? "");

  const [note, setNote] = useState(initialData?.note ?? "");

  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      title: "",
      amount: "",
      category: "",
      date: "",
    };

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = "Title is required";
    } else if (trimmedTitle.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);

    if (
      newErrors.title ||
      newErrors.amount ||
      newErrors.category ||
      newErrors.date
    ) {
      return;
    }

    const newTransaction: Transaction = {
      id: initialData?.id ?? crypto.randomUUID(),

      title,

      amount: Number(amount.replace(/,/g, "")),

      category: category as TransactionCategory,

      type,

      date,

      note,
    };

    onSubmit(newTransaction);

    setTitle("");
    setAmount("");
    setCategory("");
    setType("expense");
    setDate("");
    setNote("");

    setErrors({
      title: "",
      amount: "",
      category: "",
      date: "",
    });

    onClose();
  };
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount.toLocaleString());
      setCategory(initialData.category);
      setType(initialData.type);
      setDate(initialData.date.split("T")[0]);
      setNote(initialData.note ?? "");
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");
      setDate("");
      setNote("");
    }
  }, [initialData]);

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-type-toggle">
        <button
          type="button"
          className={
            type === "expense"
              ? "transaction-toggle active-expense"
              : "transaction-toggle"
          }
          onClick={() => {
            setType("expense");
            setCategory("");
          }}
        >
          Expense
        </button>

        <button
          type="button"
          className={
            type === "income"
              ? "transaction-toggle active-income"
              : "transaction-toggle"
          }
          onClick={() => {
            setType("income");
            setCategory("");
          }}
        >
          Income
        </button>
      </div>
      <div className="transaction-form-group">
        <label>Title</label>

        <input
          type="text"
          placeholder={titlePlaceholder}
          value={title}
          className={errors.title ? "error-input" : ""}
          onChange={(event) => {
            const value = event.target.value;

            const cleanedValue = value.replace(/[0-9]/g, "");

            setTitle(cleanedValue);

            setErrors((prev) => ({
              ...prev,
              title: "",
            }));
          }}
        />
        {errors.title && (
          <p className="transaction-field-error">{errors.title}</p>
        )}
      </div>
      <div className="transaction-form-group">
        <label>Amount</label>
        <input
          type="text"
          placeholder="₱0.00"
          value={amount}
          className={errors.amount ? "error-input" : ""}
          onChange={(event) => {
            const rawValue = event.target.value;

            const digitsOnly = rawValue.replace(/\D/g, "");

            const formattedValue = Number(digitsOnly).toLocaleString();

            setAmount(digitsOnly ? formattedValue : "");

            setErrors((prev) => ({
              ...prev,
              amount: "",
            }));
          }}
        />
        {errors.amount && (
          <p className="transaction-field-error">{errors.amount}</p>
        )}
      </div>
      <div className="transaction-form-group">
        <label>Category</label>

        <div
          className={`category-select-wrapper
    ${selectedCategory ? "has-icon" : ""}
    ${errors.category ? "error-input" : ""}
  `}
        >
          <span className="category-selected-icon">
            {selectedCategory?.icon}
          </span>

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value as TransactionCategory);

              setErrors((prev) => ({
                ...prev,
                category: "",
              }));
            }}
          >
            <option value="">Select Category</option>

            {availableCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.value}
              </option>
            ))}
          </select>
        </div>

        {errors.category && (
          <p className="transaction-field-error">{errors.category}</p>
        )}
      </div>
      <div className="transaction-form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          className={errors.date ? "error-input" : ""}
          onChange={(event) => {
            setDate(event.target.value);

            setErrors((prev) => ({
              ...prev,
              date: "",
            }));
          }}
        />
      </div>
      <div className="transaction-form-group">
        <label>Note</label>

        <textarea
          rows={4}
          placeholder="Optional note..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      <button type="submit" className="transaction-submit-button">
        {isEdit ? "Update Transaction" : "Save Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
