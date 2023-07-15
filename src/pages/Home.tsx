import { TypingText } from "../components";
import "../scss/home.scss";

export function Home() {
  return (
    <div class="home-box">
      <div class="introduction">
        <h2>Hi, I'am</h2>
        <h1>Neil Cantorne</h1>
        <TypingText
          texts={[
            "Web Developer",
            "ReactJS",
            "Svelte",
            "SolidJS",
            "Typescript",
            "Rust",
            "Python"
          ]}
        />
      </div>
    </div>
  );
}
