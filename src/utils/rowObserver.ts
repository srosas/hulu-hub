import { fetchCollectionData } from "../api";
import { createTile } from "../tile/tile";

export function setupRowObserver() {
  const rows = document.querySelectorAll(".row-carousel");

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const row = entry.target as HTMLElement;
          const isLoaded = row.getAttribute("data-loaded") === "true";

          if (!isLoaded) {
            const rowId = row.getAttribute("data-collection-id");

            if (rowId) {
              try {
                // Fetch collection data for the row
                const data = await fetchCollectionData(rowId);

                // Populate the row with the fetched data
                populateRow(row, data);

                // Mark the row as loaded
                row.setAttribute("data-loaded", "true");
              } catch (error) {
                console.error(`Failed to fetch data for row ${rowId}:`, error);
              }
            }
          }
        }
      }
    },
    {
      root: null,
      rootMargin: "300px", // Trigger 300px before the row enters the viewport
      threshold: 0.1,
    },
  );

  rows.forEach((row) => observer.observe(row));
}

function populateRow(row: HTMLElement, data: any) {
  const rowIndex = row.getAttribute("data-row-index");
  const tiles = data.items.map((item: any, colIndex: number) => {
    const tile = createTile(
      item,
      rowIndex ? parseInt(rowIndex, 10) : 0,
      colIndex,
    );
    return tile;
  });

  tiles.forEach((tile: any) => row.appendChild(tile));
}
