"use client";

import { ArrowDown } from "lucide-react";

/**
 * Scroll-to-form CTA. Lives in the /quote page header, fills the empty
 * space below the lede, and on click smoothly scrolls to the form and
 * lands focus on the first text input — so the next tap is straight into
 * typing.
 */
export function ScrollToFormButton({
  targetId = "onboarding-form",
  firstFieldName = "name",
  label = "Start now",
}: {
  targetId?: string;
  firstFieldName?: string;
  label?: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // Wait for the smooth scroll to finish, then focus the first text field.
    // 700ms covers the typical scroll duration on most viewports without
    // feeling laggy if the form is already near the top of the screen.
    window.setTimeout(() => {
      const first = target.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        `input[name="${firstFieldName}"], textarea[name="${firstFieldName}"], select[name="${firstFieldName}"]`,
      );
      first?.focus({ preventScroll: true });
    }, 700);
  }

  return (
    <button type="button" onClick={handleClick} className="btn-yellow">
      {label}
      <ArrowDown size={16} />
    </button>
  );
}
