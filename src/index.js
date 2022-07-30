const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", async ()=>{
    const inputName = document.querySelector("#userName");
    if(!inputName.value){
        inputName.classList.toggle("input--error", true);
    }else{
        const modal = document.querySelector(".modal__container");
        modal.style.display = "none";
        inputName.classList.toggle("input--error", false);
        sessionStorage.setItem("userName", inputName.value)

    }
});


const reloadCatButton = document.querySelector("#reloadCat");
reloadCatButton.addEventListener("click", async ()=>{
    printCats();
});

const BASEURL = 'https://api.thecatapi.com/v1';
const API_KEY = '39b0444d-a87b-4b8a-bbc6-3ca0425d8ab5';








const getCat = async()=>{
    const response =  await fetch(`${BASEURL}/images/search?limit=2&api_key=${API_KEY}`); //Nótese cómo pasamos la API key 
    const data = await response.json();
    return data;
};

const postFavCat = async(catId)=>{

    const id = catId.toString();
    const sub_id = sessionStorage.getItem("userName");
    const dataToSend = {
        image_id : id,
        sub_id:  sub_id
    }
    const response =  await fetch(`${BASEURL}/favourites`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": API_KEY
        },
        body : JSON.stringify(dataToSend)
    });
    const data = await response.json();
    console.log(data);
    printCats()
};

const deleteFavCat = async(catId)=>{
    const response =  await fetch(`${BASEURL}/favourites/${catId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": API_KEY
        },
    });
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
        like.classList.add("like__button", "button");
        like.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        like.addEventListener("click", (e)=>{
            e.preventDefault();
            const isLiked = like.classList.contains("liked__button");
            like.classList.toggle("liked__button", !isLiked);
            postFavCat(cat.id);
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