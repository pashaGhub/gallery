let imgArray = [];
window.addEventListener("load", () => {
  fetch("https://picsum.photos/v2/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      imgArray = [...data];
      loadSidebar();
    })
    .catch(err => console.log(err));
});

function loadSidebar(activeImg) {
  document.getElementById("sidebar").innerHTML = null;

  imgArray.forEach(imgInfo => {
    let imgBtn = document.createElement("button");
    let image = document.createElement("img");

    image.src = imgInfo.download_url;

    if (activeImg && activeImg.id === imgInfo.id) {
      image.classList = "active";
    }

    imgBtn.appendChild(image);
    document.getElementById("sidebar").appendChild(imgBtn);

    imgBtn.addEventListener("click", () => {
      loadMain(imgInfo);
      loadSidebar(imgInfo);
    });
  });
}

function loadMain(activeImg) {
  document.getElementById("main").innerHTML = null;

  let author = document.createElement("h3");
  let imgWidth = document.createElement("p");
  let imgHeight = document.createElement("p");
  let image = document.createElement("img");

  author.textContent = `Author: ${activeImg.author}`;
  imgWidth.textContent = `Width: ${activeImg.width}`;
  imgHeight.textContent = `Height: ${activeImg.height}`;

  image.src = activeImg.download_url;

  document.getElementById("main").appendChild(author);
  document.getElementById("main").appendChild(imgWidth);
  document.getElementById("main").appendChild(imgHeight);
  document.getElementById("main").appendChild(image);
}
