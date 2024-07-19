"use client";
import { useState } from "react";
import Topbar from "./Topbar";
import Drawer from "./Drawer";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Topbar isOpen={isOpen} toggle={toggle} />
      {isOpen && <div className={styles.backdrop} onClick={toggle} />}
      {<Drawer toggle={toggle} isOpen={isOpen} />}
    </div>
  );
}
