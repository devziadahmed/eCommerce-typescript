// import styles from "./styles.module.css";

// import { CSSProperties, ReactNode } from "react";

// import { Product } from "@apptypes/product";
// import { Prettify } from "@apptypes/shared";

// import { formatPrice } from "@utils/index";

// type ProductInfoProps = Prettify<Pick<Product, "title" | "img" | "price">> & {
//   children?: ReactNode;
//   direction?: "row" | "column";
//   style?: CSSProperties;
// };

// const ProfileInfo = ({
//   title,
//   img,
//   price,
//   direction = "row",
//   style,
//   children,
// }: ProductInfoProps) => {
//   return (
//     <div className={product}>
//       <div className={productImg}>
//         <img src={img} alt={title} />
//       </div>
//       <div className={productInfo}>
//         <h2>{title}</h2>
//         <h3>{formatPrice(price)}</h3>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;
