import { fetchHubData } from "./api";
import { setupModal } from "./modal/modal";
import { setupKeyboardNavigation } from "./navigation/navigation";
import { loadRowTemplate } from "./row/row";
import { loadTileTemplate } from "./tile/tile";
import { setupRowObserver } from "./utils/rowObserver";
import { renderHub } from "./utils/renderHub";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  await Promise.all([loadTileTemplate(), loadRowTemplate(), setupModal()]);
  const data = await fetchHubData();
  renderHub(data);
  setupKeyboardNavigation();
  setupRowObserver();
}
