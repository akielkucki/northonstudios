import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

// Partials
import Footer from './components/partials/Footer'

// Pages
import Landing from './pages/Landing'

const App = () => {

  const theme = {
    colors: {
        heading: "rgb(24 24 29)",
        text: "rgba(29 ,29, 29, .8)",
        white: "#fff",
        black: " #212529",
        helper: "#8490ff",

        bg: "#F6F8FA",
        footer_bg: "#0a1435",
        btn: "rgb(98 84 243)",
        border: "rgba(98, 84, 243, 0.5)",
        hr: "#ffffff",
        gradient:
            "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
        shadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
        shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
        mobile: "768px",
        tab: "1300px",
    },
};

useEffect(() => {
  function scrollToelem(id_,index_,offset_) {
  document.getElementById(id_).addEventListener("click", () => {
    var offsetPosition = document.getElementsByTagName('section')[index_].getBoundingClientRect().top - document.body.getBoundingClientRect().top -offset_ ;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });});};

  scrollToelem("nav_1",1,0);
  scrollToelem("nav_2",2,0);
  scrollToelem("nav_3",3,0);
  scrollToelem("nav_4",5,0);
  scrollToelem("nav_5",6,0);
  scrollToelem("nav_6",7,0);
  });

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </Router>
    </ThemeProvider>
  )
}

export default App
