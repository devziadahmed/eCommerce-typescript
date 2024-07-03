import { Link } from "react-router-dom";

import type { Category } from "@apptypes/category";

import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;

type CategoryProps = Omit<Category, "id">;

const Category = ({ title, img, prefix }: CategoryProps) => {
  return (
    <div className={category}>
      <Link to={`products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>

        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
