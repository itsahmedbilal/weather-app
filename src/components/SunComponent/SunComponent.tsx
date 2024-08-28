import React from "react";
import styles from "./SunComponent.module.css";

const SunComponent: React.FC = () => {
  return (
    <div className={styles.sun}>
      {[...Array(10)].map((_, i: number) => (
        <div
          key={i}
          className={styles.ray}
          style={
            {
              "--i": i,
            } as React.CSSProperties
          }
        ></div>
      ))}
    </div>
  );
};

export default SunComponent;
