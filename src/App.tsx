import type { Component } from "solid-js";
import { Home } from "./pages";
import { HyperBackground } from "./components";

const App: Component = () => {
  return (
    <>
      <HyperBackground />
      <Home />
    </>
  );
};

export default App;
