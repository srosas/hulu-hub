export function setupKeyboardNavigation() {
  // Map to store the last focused column index for each row
  const lastFocusedCols: Record<number, number> = {};

  document.addEventListener("keydown", (e) => {
    const focused = document.activeElement as HTMLElement;
    if (!focused || !focused.classList.contains("tile")) return;

    const row = parseInt(focused.dataset.row!);
    const col = parseInt(focused.dataset.col!);

    // Save the current column index for the current row
    lastFocusedCols[row] = col;

    let next: HTMLElement | null = null;

    switch (e.key) {
      case "ArrowRight":
        next = document.querySelector(
          `[data-row="${row}"][data-col="${col + 1}"]`,
        );
        break;
      case "ArrowLeft":
        next = document.querySelector(
          `[data-row="${row}"][data-col="${col - 1}"]`,
        );
        break;
      case "ArrowDown":
        // Use the last focused column index for the next row, or default to 0
        const nextRowCol = lastFocusedCols[row + 1] ?? 0;
        next = document.querySelector(
          `[data-row="${row + 1}"][data-col="${nextRowCol}"]`,
        );
        break;
      case "ArrowUp":
        // Use the last focused column index for the previous row, or default to 0
        const prevRowCol = lastFocusedCols[row - 1] ?? 0;
        next = document.querySelector(
          `[data-row="${row - 1}"][data-col="${prevRowCol}"]`,
        );
        break;
    }

    if (next) {
      const container = document.querySelector(
        `.row-carousel[data-row-index="${row}"]`,
      ) as HTMLElement;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();

        // Add padding adjustment to prevent cutting off tiles
        const padding = 10;

        // Calculate the distance to move the container
        const distance =
          nextRect.left - containerRect.left + container.scrollLeft - padding;

        const maxScroll = container.scrollWidth - container.clientWidth;

        // Clamp the scroll position to valid bounds
        const newScrollPosition = Math.max(0, Math.min(distance, maxScroll));

        // Smoothly adjust the container's scroll position
        smoothScroll(container, newScrollPosition);

        // Focus the next tile
        next.focus();
      }
    }
  });
}

export function smoothScroll(
  container: HTMLElement,
  targetScroll: number,
  duration: number = 300,
) {
  const startScroll = container.scrollLeft;
  const distance = targetScroll - startScroll;
  const startTime = performance.now();

  function scrollStep(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // Clamp progress to [0, 1]
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress; // Ease-in-out function

    container.scrollLeft = startScroll + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}
