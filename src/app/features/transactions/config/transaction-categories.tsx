import {
  FaMoneyBillWave,
  FaLaptopCode,
  FaPiggyBank,
  FaUtensils,
  FaBolt,
  FaCar,
  FaShoppingBag,
  FaBox,
} from "react-icons/fa";


/* =====================================
   CATEGORY CONFIG
===================================== */

export const incomeCategories = [
  {
    value: "Salary",
    icon: <FaMoneyBillWave />,
    color: "salary-bg",
  },

  {
    value: "Freelance",
    icon: <FaLaptopCode />,
    color: "freelance-bg",
  },

  {
    value: "Savings",
    icon: <FaPiggyBank />,
    color: "savings-bg",
  },

  {
    value: "Others",
    icon: <FaBox />,
    color: "others-bg",
  },
];

export const expenseCategories = [
  {
    value: "Food",
    icon: <FaUtensils />,
    color: "food-bg",
  },

  {
    value: "Bills",
    icon: <FaBolt />,
    color: "bills-bg",
  },

  {
    value: "Transport",
    icon: <FaCar />,
    color: "transport-bg",
  },

  {
    value: "Shopping",
    icon: <FaShoppingBag />,
    color: "shopping-bg",
  },

  {
    value: "Others",
    icon: <FaBox />,
    color: "others-bg",
  },
];

export const allCategories = [...incomeCategories, ...expenseCategories];
