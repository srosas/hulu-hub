import { createRow } from "../row/row";

export function renderHub(data: any) {
  const app = document.getElementById("app");
  if (!app) return;

  // Clear and render each row
  app.innerHTML = "";
  data.components.forEach((collection: any, rowIndex: number) => {
    const row = createRow(collection, rowIndex);
    app.appendChild(row);
  });

  // Set initial focus
  (document.querySelector(".tile") as HTMLElement)?.focus();
}
