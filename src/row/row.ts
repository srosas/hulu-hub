import { createTile } from "../tile/tile";
import "./row.css";

let template: HTMLTemplateElement | null = null;

export async function loadRowTemplate(): Promise<void> {
  if (!template) {
    const res = await fetch("./row/row.html");
    const html = await res.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    template = tempDiv.querySelector("template");
    if (!template) throw new Error("row.html template not found.");
  }
}

export function createRow(collection: any, rowIndex: number): HTMLElement {
  if (!template) {
    throw new Error("Row template not loaded. Call loadRowTemplate() first.");
  }

  const row = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  const rowTitle = row.querySelector(".row-title")!;
  const rowCarousel = row.querySelector(".row-carousel") as HTMLElement;

  rowTitle.textContent = collection.name || `Row ${rowIndex + 1}`;
  rowCarousel.dataset.rowIndex = rowIndex.toString();
  rowCarousel.dataset.collectionId = collection.id;

  // Check if the collection has items
  if (collection.items && collection.items.length > 0) {
    collection.items.forEach((item: any, colIndex: number) => {
      const tile = createTile(item, rowIndex, colIndex);
      rowCarousel.appendChild(tile);
    });
    rowCarousel.setAttribute("data-loaded", "true");
  } else {
    rowCarousel.setAttribute("data-loaded", "false");
  }

  return row;
}
