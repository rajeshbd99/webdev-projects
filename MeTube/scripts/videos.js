console.log("videos.js loaded");
//1. -> Fetch, Load and Show Categories on html

//create loadCategories function

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//create loadVideos function
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`

  ) 
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadDetails = async(videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);

};

const displayDetails = (video) => {
    const detailsContainer = document.getElementById("modal-content");
    detailsContainer.innerHTML = `
    <div class="flex gap-5">
        <div class="w-full object-cover">
            <img src="${video.thumbnail}" class="w-full h-[300px] object-cover" alt="Shoes"/>
        </div>
        <div class="w-1/2">
            <h2 class="text-2xl font-bold">${video.title}</h2>
            <p class="text-gray-400">${video.authors[0].profile_name}</p>
            <div class="flex items
            -center gap-2">
                <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
                ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
            </div>
            <p>${video.description}</p>
        </div>
    </div>
    `;
    document.getElementById("customModal").showModal();

};
//Day, hour, minute, second format

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;  
    return `${hour}h ${minute}m ${remainingSeconds}s ago`;
}

const loadCategoryVideos = (id) => {  
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        console.log(activeBtn);
        displayVideos(data.category);
    })
    .catch((error) => console.log(error));
   };

   const removeActiveClass = () => {
    const button = document.getElementsByClassName("category-btn");
    for(let btn of button){
        btn.classList.remove("active");
    };
};
//create displayVideos function

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  
  if(videos.length === 0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class= " min-h-[400px] flex flex-col gap-5 justify-center items-center"><img src="assets/Icon.png"/>
    <h2 class="text-2xl font-bold">No Content Here In This Category</h2>
    </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class= "h-[200px] relative">
            <img src=${video.thumbnail} 
            class = " h-full w-full object-cover " alt="Shoes" />
            ${video.others.posted_date?.length ==0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)} </span>`}
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src = ${video.authors[0].profile_picture}/>
            </div>
            <div>
                <h2 class="font-bold">${video.title} </h2>
                <div class="flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name} </p>
                ${video.authors[0].verified ? `<img class="w-5 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
                </div>
                
                <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details </button> </p>
            </div>

        </div>
    `;
    videoContainer.appendChild(card);
  });
};

//create displayCategories function

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);
    //create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML= `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn" >
    ${item.category}
    </button>
    `
    

    //add button to category container
    categoryContainer.appendChild(buttonContainer);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
});

loadCategories();
loadVideos();
