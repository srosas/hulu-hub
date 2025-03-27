import fallbackImage from "../img/fallback.png"; // Webpack will resolve this
import { openModal } from "../modal/modal";
import { formatImageUrl } from "../utils/helpers";
import "./tile.css";

let template: HTMLTemplateElement | null = null;

export async function loadTileTemplate(): Promise<void> {
  if (!template) {
    const res = await fetch("./tile/tile.html");
    const html = await res.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    template = tempDiv.querySelector("template");
  }
}

export function createTile(
  item: any,
  rowIndex: number,
  colIndex: number,
): HTMLElement {
  if (!template) {
    throw new Error("Tile template not loaded. Call loadTileTemplate() first.");
  }

  const { rating, genre_names, premiere_date, series_description } =
    item.entity_metadata;

  // Element selectors
  const tile = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  const img = tile.querySelector("#tile-image") as HTMLImageElement;
  const titleEle = tile.querySelector("#tile-title")!;
  const meta = tile.querySelector("#tile-meta")!;

  // Extract necessary data from the item
  const tileImage = formatImageUrl(
    item.visuals.artwork.horizontal_tile.image.path,
  );
  const modalImage = formatImageUrl(
    item.visuals.artwork.vertical_tile.image.path,
    500,
    750,
  );

  const title = item.visuals?.headline || "Untitled";
  const ratingCode = rating.code || "NR";
  const genre = genre_names[0] || "Unknown";
  const year = premiere_date.slice(0, 4) || "N/A";
  const description = series_description || "No description available.";

  tile.dataset.row = rowIndex.toString();
  tile.dataset.col = colIndex.toString();

  img.src = tileImage;
  img.alt = title;
  img.onerror = () => {
    img.src = fallbackImage;
  };

  titleEle.textContent = title;
  meta.textContent = [ratingCode, genre, year].filter(Boolean).join(" · ");

  tile.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      openModal({
        image: modalImage,
        title,
        rating: ratingCode,
        genre,
        year,
        description,
      });
    }
  });

  return tile;
}
