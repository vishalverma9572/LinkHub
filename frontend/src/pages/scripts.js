var icon = document.getElementById("icon");
var url = document.getElementById("url");

url.addEventListener("input", () => {
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${url.value}`;
    icon.src = favicon;
});
