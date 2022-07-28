const reloadCatButton = document.querySelector("#reloadCat");
reloadCatButton.addEventListener("click", async ()=>{
    printCats();
});








const getCat = async()=>{
    const response =  await fetch('https://api.thecatapi.com/v1/images/search?limit=2&api_key=39b0444d-a87b-4b8a-bbc6-3ca0425d8ab5'); //Nótese cómo pasamos la API key 
    const data = await response.json();
    return data;
};


const printCats= async()=>{
    reloadCatButton.setAttribute("disabled", true);
    const container = document.querySelector(".images");
    while (container.children.length) {
        const firstChild = container.firstChild;
        container.removeChild(firstChild);

    }
    const cats = await getCat();
    const catsNodes = cats.map(cat => {

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card--cat");
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image__container");

        const img = document.createElement("img");
        img.setAttribute("src", cat.url);      
        const like = document.createElement("a");
        like.setAttribute("href", "#");
        like.classList.add("like__button");
        like.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        like.addEventListener("click", ()=>{
            const isLiked = like.classList.contains("liked__button");
            like.classList.toggle("liked__button", !isLiked);
        })
        imgContainer.append(img);
        cardContainer.append(imgContainer, like);
        return cardContainer;
    });
    catsNodes.forEach(node => {
        container.appendChild(node);
    });
    reloadCatButton.removeAttribute("disabled");
}

printCats();