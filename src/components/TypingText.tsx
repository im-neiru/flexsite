import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import "../scss/typing-text.scss";

interface TypingTextProps {
  texts: string[];
}

export function TypingText({ texts }: TypingTextProps) {
  const [textIndex, setTextIndex] = createSignal(0);
  const [charIndex, setCharIndex] = createSignal(0);
  const [indexDirection, setIndexDirection] = createSignal(1);
  const [idleCounter, setIdleCounter] = createSignal(0);
  const currentText = createMemo(() => texts[textIndex()]);

  let timerId: number | undefined;

  onMount(() => {
    timerId = setInterval(() => {
      if (indexDirection() == 1 && charIndex() < currentText().length) {
        setCharIndex((prev) => prev + indexDirection());
        return;
      }

      if (indexDirection() == -1 && charIndex() > 0) {
        setCharIndex((prev) => prev + indexDirection());
        return;
      }

      if (indexDirection() == 1 && idleCounter() < 10) {
        setIdleCounter((prev) => prev + 1);
        return;
      }

      if (indexDirection() == -1) {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIdleCounter(0);
      }
      setIndexDirection((prev) => prev * -1);
    }, 100);

    onCleanup(() => {
      if (timerId !== undefined) clearInterval(timerId);
    });
  });

  return (
    <div class="typingtext">
      <h2>{currentText().substring(0, charIndex())}</h2>
      <h2 class="carret">_</h2>
    </div>
  );
}
