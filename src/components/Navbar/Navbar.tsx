"use client";
import { useState } from "react";
import Topbar from "./TopBar";
import Drag from "./Drag";

interface NavbarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function ParentComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Topbar isOpen={isOpen} toggle={toggle} />
      {isOpen && <Drag toggle={toggle} />}
    </div>
  );
}