const BASEURL = 'https://api.thecatapi.com/v1';
const API_KEY = '39b0444d-a87b-4b8a-bbc6-3ca0425d8ab5';
window.addEventListener("load", ()=>{
    printfavCats();
    printCats();
    checkSessionStorage();
})

const checkSessionStorage = ()=>{
    const isLogged = sessionStorage.getItem("userName");
    const modal = document.querySelector(".modal__container");
    if (isLogged){
        modal.style.display = "none";
    }
}
const getCat = async()=>{
    const response =  await fetch(`${BASEURL}/images/search?limit=2`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": API_KEY
        }
    });
    const data = await response.json();
    return data;
};
const getFavCats = async()=>{
    const response =  await fetch(`${BASEURL}/favourites`,{
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": API_KEY
        }
    });
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
    printfavCats();
    printCats();
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
    printfavCats();
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

const printfavCats= async()=>{
    reloadCatButton.setAttribute("disabled", true);
    const container = document.querySelector(".favs__container");
    while (container.children.length) {
        const firstChild = container.firstChild;
        container.removeChild(firstChild);

    }
    const cats = await getFavCats();
    const likedCats = cats.reduce((array, cat)=>{
        const catExists = array.findIndex((item)=> item.url === cat.image.url);
        if(catExists < 0){
            array.push({
                id : cat.id,
                url: cat.image.url,
                likedBy: cat.sub_id,
                likedAt: cat.created_at,
            })
        }
        return array
    }, [])
    likedCats.sort((a, b)=>{
        const parsedDateA = Date.parse(a.likedAt);
        const parsedDateB = Date.parse(b.likedAt);
        return parsedDateB - parsedDateA  
    })
    const catsNodes = likedCats.map(cat => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card--liked-cat");
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image__container");
        const img = document.createElement("img");
        img.setAttribute("src", cat.url);      
        imgContainer.append(img);
        cardContainer.append(imgContainer);
        const imageDescription = document.createElement("div");
        imageDescription.classList.add("image__description");
        const p = document.createElement("p");
        p.classList.add("likedBy");
        p.innerHTML = `<li class="fa-solid fa-heart"></li>   Liked by ${cat.likedBy}`;
        imageDescription.append(p);

        //Optional unlike button.
        const unlike = document.createElement("button");
        unlike.setAttribute("type", "button");
        unlike.classList.add("button", "unlikeButton");
        unlike.innerHTML = `<i class="fa-solid fa-heart-crack"></i> Unlike`;
        unlike.addEventListener("click", ()=>{
            deleteFavCat(cat.id)
        });


        //
        const user = sessionStorage.getItem("userName");
        if(user.toUpperCase() == cat.likedBy.toUpperCase()){
            imageDescription.append(unlike);
        }


        cardContainer.append(imgContainer, imageDescription);
        return cardContainer;
    });
    catsNodes.forEach(node => {
        container.appendChild(node);
    });
    reloadCatButton.removeAttribute("disabled");
}
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
        printfavCats();
    }
    
});

const reloadCatButton = document.querySelector("#reloadCat");
reloadCatButton.addEventListener("click", async ()=>{
    printCats();
});





