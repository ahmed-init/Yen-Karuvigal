const list = document.querySelector("#tool-list");
const count = document.querySelector("#tool-count");
const feedback = document.querySelector("#feedback");
const dialog = document.querySelector("#tool-dialog");
const form = document.querySelector("#tool-form");
const search = document.querySelector("#search-input");
let tools = [];

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        char
      ],
  );
const showMessage = (message = "", isError = false) => {
  feedback.textContent = message;
  feedback.style.color = isError ? "#a23d35" : "#226846";
};
const openForm = (tool) => {
  form.reset();
  document.querySelector("#tool-id").value = tool?.id || "";
  document.querySelector("#form-eyebrow").textContent = tool
    ? "EDIT TOOL"
    : "NEW TOOL";
  document.querySelector("#dialog-title").textContent = tool
    ? "Update tool"
    : "Add a tool";
  document.querySelector("#save-button").textContent = tool
    ? "Save changes"
    : "Save tool";
  if (tool)
    ["name", "category", "purpose", "status", "difficulty"].forEach(
      (key) => (document.querySelector(`#${key}`).value = tool[key] || ""),
    );
  dialog.showModal();
  document.querySelector("#name").focus();
};
const render = () => {
  const query = search.value.trim().toLowerCase();
  const filtered = tools.filter((tool) =>
    [tool.name, tool.category, tool.purpose, tool.status, tool.difficulty].some(
      (value) =>
        String(value || "")
          .toLowerCase()
          .includes(query),
    ),
  );
  count.textContent = `${tools.length} tool${tools.length === 1 ? "" : "s"} in your registry`;
  list.innerHTML = filtered.length
    ? filtered
        .map(
          (tool) =>
            `<article class="tool-card"><div><h3>${escapeHtml(tool.name)}</h3><div class="tool-meta"><span class="tag">${escapeHtml(tool.category)}</span><span>${escapeHtml(tool.status)}</span><span>• ${escapeHtml(tool.difficulty)}</span></div><p class="tool-purpose">${escapeHtml(tool.purpose)}</p></div><div class="tool-actions"><button class="edit-button" data-edit="${tool.id}" type="button">Edit</button><button class="delete-button" data-delete="${tool.id}" type="button">Delete</button></div></article>`,
        )
        .join("")
    : `<p class="empty">${query ? "No tools match your search." : "No tools yet. Add your first one to get started."}</p>`;
};
async function loadTools() {
  try {
    const response = await fetch("/api/gettools");
    if (!response.ok) throw new Error();
    tools = (await response.json()).tools || [];
    showMessage();
    render();
  } catch {
    count.textContent = "Unable to load tools";
    list.innerHTML =
      '<p class="empty">Check that the API and database are running, then refresh this page.</p>';
    showMessage("Could not connect to the tool registry.", true);
  }
}
document
  .querySelector("#new-tool-button")
  .addEventListener("click", () => openForm());
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => dialog.close());
document
  .querySelector("#cancel-button")
  .addEventListener("click", () => dialog.close());
search.addEventListener("input", render);
list.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.edit || button.dataset.delete);
  const tool = tools.find((item) => item.id === id);
  if (button.dataset.edit && tool) openForm(tool);
  if (button.dataset.delete && tool && confirm(`Delete ${tool.name}?`)) {
    try {
      const response = await fetch(`/api/deletetool/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      showMessage("Tool deleted.");
      await loadTools();
    } catch {
      showMessage("Could not delete this tool.", true);
    }
  }
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.querySelector("#tool-id").value;
  const data = Object.fromEntries(
    ["name", "category", "purpose", "status", "difficulty"].map((key) => [
      key,
      document.querySelector(`#${key}`).value.trim(),
    ]),
  );
  try {
    const response = await fetch(id ? `/api/modifytool/${id}` : "/api/tools", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error();
    dialog.close();
    showMessage(id ? "Tool updated." : "Tool added.");
    await loadTools();
  } catch {
    showMessage("Could not save this tool. Please try again.", true);
  }
});
loadTools();
