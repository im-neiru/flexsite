import type { Component } from "solid-js";
import { About, Home, Contact } from "./pages";
import { HyperBackground, NavigationBar } from "./components";
import { Route, Router, Routes } from "@solidjs/router";
import iconHome from "./assets/icon-home.svg";
import iconAbout from "./assets/icon-about.svg";
import iconContact from "./assets/icon-contact.svg";

const App: Component = () => {
  return (
    <>
      <HyperBackground />
      <Router>
        <NavigationBar
          routes={[
            {
              name: "Home",
              path: "/",
              icon: iconHome
            },
            {
              name: "About",
              path: "/about",
              icon: iconAbout
            },
            {
              name: "Contact",
              path: "/contact",
              icon: iconContact
            }
          ]}
        />
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
