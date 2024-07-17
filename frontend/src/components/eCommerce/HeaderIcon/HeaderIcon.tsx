import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";
const { container, totalNum, iconWrapper } = styles;

type HeaderIconProps = {
  totalQuantity: number;
  to: string;
  icon: ReactNode;
  title: string;
};

const HeaderIcon = ({ totalQuantity, to, icon, title }: HeaderIconProps) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const cartBastketStyles = `${totalNum} ${isAnimate ? "pumpAnimate" : ""}`;

  useEffect(() => {
    if (!totalQuantity) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <NavLink to={to}>
      <div className={container}>
        <div className={iconWrapper}>
          {icon}

          {totalQuantity > 0 && <div className={cartBastketStyles}>{totalQuantity}</div>}
        </div>

        <h3>{title}</h3>
      </div>
    </NavLink>
  );
};

export default HeaderIcon;
