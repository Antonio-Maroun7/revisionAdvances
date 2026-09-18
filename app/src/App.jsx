import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Product from "./components/Product";

import Footer from "./components/Footer";

import Student from "./components/Student";
import User1 from "./components/User1";
import UserTable from "./components/UserTable";

function App() {
  return (
    <>
      <Header />
      <UserTable />

      {/*<Student firstName="Jane" age="22" major="Mathematics" />
      <Student firstName="Alice" age="21" major="Physics" />

      <Student firstName="Jhon" age="24" major="Computer Science" />*/}
    </>
  );
}

export default App;
