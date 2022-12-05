import { FC } from "react";
import styles from "styles/Home.module.css";

export const Footer: FC = () => (
  <footer className={styles.footer}>
    &copy;&nbsp;Copyright&nbsp;{new Date().getFullYear()}
  </footer>
);
