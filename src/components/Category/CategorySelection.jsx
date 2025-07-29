import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CategorySelection";

const categories = [
  { id: 1, name: "Science" },
  { id: 2, name: "History" },
  { id: 3, name: "Math" },
  { id: 4, name: "Geography" },
];

export default function CategorySelection() {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    const categoryName = categories.find(cat => cat.id === categoryId)?.name.toLowerCase();
    navigate(`/category/${categoryName}/question/1`);
  };

  return (
    <div className={styles.categorySelection}>
      <h1>Select Category</h1>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={styles.categoryButton}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
