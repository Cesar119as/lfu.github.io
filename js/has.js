(function () {
  const currentFile = location.pathname.split("/").pop();
  if (currentFile !== "index.html" && !location.hash) {
    location.href = "index.html#" + currentFile;
  }
})();
