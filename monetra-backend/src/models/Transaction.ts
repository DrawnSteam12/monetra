import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;

  title: string;

  amount: number;

  category:
    | "Salary"
    | "Freelance"
    | "Food"
    | "Bills"
    | "Transport"
    | "Shopping"
    | "Savings"
    | "Others";

  type: "income" | "expense";

  date: Date;

  note?: string;

  createdAt: Date;

  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Salary",
        "Freelance",
        "Food",
        "Bills",
        "Transport",
        "Shopping",
        "Savings",
        "Others",
      ],
    },

    type: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: ["income", "expense"],
    },

    date: {
      type: Date,
      required: [true, "Transaction date is required"],
    },

    note: {
      type: String,
      trim: true,
      maxlength: [500, "Note cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

transactionSchema.index({
  userId: 1,
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema,
);

export default Transaction;
