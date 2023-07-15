import type { Component } from "solid-js";
import { About, Home, Contact } from "./pages";
import { HyperBackground } from "./components";
import { Route, Router, Routes } from "@solidjs/router";

const App: Component = () => {
  return (
    <>
      <HyperBackground />
      <Router>
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
