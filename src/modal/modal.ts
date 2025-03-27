import fallbackImage from "../img/fallback.png";
import "./modal.css";

let previouslyFocusedTile: HTMLElement | null = null;

export async function setupModal() {
  // Fetch the modal HTML
  const response = await fetch("./modal/modal.html");
  const modalHTML = await response.text();

  // Inject the modal HTML into the DOM
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = modalHTML;
  const modalElement = tempDiv.firstElementChild;

  if (!modalElement) {
    console.error("Failed to load modal HTML.");
    return;
  }

  document.body.appendChild(modalElement);

  // Add event listeners for the modal
  const modal = document.getElementById("modal");
  const watchNowButton = document.getElementById("modal-watch-button");
  const infoButton = document.getElementById("modal-info-button");

  if (!modal || !watchNowButton || !infoButton) {
    console.error("Modal or Watch Now not found in the DOM.");
    return;
  }

  // Close the modal when the "Backspace" key is pressed
  window.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      modal.classList.remove("active");

      if (previouslyFocusedTile) {
        previouslyFocusedTile.focus();
      }
    }
  });

  // Add keyboard navigation between buttons
  watchNowButton.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      infoButton.focus();
    } else if (event.key === "Enter") {
      alert("Unable to watch now! There's no video player :(");
    }
  });

  infoButton.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      watchNowButton.focus();
    } else if (event.key === "Enter") {
      alert("More Info coming soon");
    }
  });
}

export function openModal(tileData: any) {
  // Store the currently focused tile
  previouslyFocusedTile = document.activeElement as HTMLElement;

  const { image, title, rating, genre, year, description } = tileData;
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image") as HTMLImageElement;
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");
  const modalDescription = document.getElementById("modal-description");
  const watchNowButton = document.getElementById("modal-watch-button");

  if (
    !modal ||
    !modalImage ||
    !modalTitle ||
    !modalMeta ||
    !modalDescription ||
    !watchNowButton
  ) {
    console.error("Modal elements not found in the DOM.");
    return;
  }

  // Populate modal with tile data
  modalImage.src = image;
  modalImage.onerror = () => {
    modalImage.src = fallbackImage; // Path to your fallback image
  };
  modalTitle.textContent = title;
  modalMeta.textContent = `${rating} · ${genre} · ${year}`;
  modalDescription.textContent = description || "No description available.";

  // Show the modal
  modal.classList.add("active");

  watchNowButton.focus();
}
