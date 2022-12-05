//Find all stack overflow tabs
const tabs = await chrome.tabs.query({
  url: [
      "https://stackoverflow.com/questions/*",
  ],
});

//Button logic to group tabs and populate list (Sorted)
const button = document.getElementById("group_btn");
button.addEventListener("click", async () => {
  //Search page for all Stack Overflow Tabs and group them
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: "STACK", color: "orange" });
});

//Sort tabs for list
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

//Populate the list
const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split("-")[1].trim();

  //Make list items responsive
  element.querySelector(".title").textContent = title;
  element.querySelector("a").addEventListener("click", async () => {
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}
document.querySelector("ul").append(...elements); 

//Search function implementation
const search = document.getElementById("search_btn");
search.addEventListener("click", async () => {
  const input = document.getElementById("input");
  for(const el of elements) {
    const text = el.querySelector(".title").textContent
    if(text.toLowerCase().includes(input.value.toLowerCase())) {
      el.style.display = 'list-item';
    } else {
      el.style.display = 'none';
    }
  }
});