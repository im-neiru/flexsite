import { NavLink } from "@solidjs/router";
import "../scss/navigation-bar.scss";
import { For, Show } from "solid-js";

interface NavigationBarProps {
  routes: {
    path: string;
    name: string;
    icon?: string;
  }[];
}

export function NavigationBar({ routes }: NavigationBarProps) {
  return (
    <div class="navigation-bar">
      <ul>
        <For each={routes}>
          {({ name, path, icon }) => (
            <li>
              <NavLink
                href={path}
                activeClass="nav-active"
                inactiveClass="nav-inactive"
              >
                <Show when={icon !== undefined}>
                  <img class="icon" src={icon} />
                </Show>
                <span>{name}</span>
              </NavLink>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
