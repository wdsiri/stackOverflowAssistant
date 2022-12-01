//Query Stack Overflow tabs
const tabs = await chrome.tabs.query({
    url: [
        "https://stackoverflow.com/questions/*",
    ],
});

//Add button listener + update chrome page with tab group
const button = document.getElementById("group_btn");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: "STACK", color: "orange" });
});