document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.getElementById("categories");
  const petsContainer = document.getElementById("pets");
  const sortByPriceButton = document.getElementById("sortByPrice");
 
  const spinnerWrapper = document.createElement("div");
  spinnerWrapper.className =
    "flex justify-center items-center h-full w-full col-span-3";

  const spinner = document.createElement("span");
  spinner.className =
    "loading loading-infinity loading-lg flex justify-center items-center h-20 text-green-700 ";

  // Append the spinner to the wrapper
  spinnerWrapper.appendChild(spinner);

  let petsData = [];


  fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then((response) => response.json())
  .then((data) => {
    data.categories.forEach((category) => {
      const categoryElement = document.createElement("button");
      categoryElement.className =
        "category-card bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-lg flex justify-center gap-4 items-center border rounded-xl";
      categoryElement.innerHTML = `
        <img src="${category.category_icon}" class="w-6 md:w-10 " alt="${category.category}">
        <span class="text-lg md:text-xl">${category.category}</span>
      `;

      categoryElement.addEventListener("click", () => {
        document.querySelectorAll(".category-card").forEach((button) => {
          button.classList.remove("bg-green-700", "text-white");
          button.classList.add("bg-grey-light", "text-grey-darkest");
        });

        categoryElement.classList.remove("bg-grey-light", "text-grey-darkest");
        categoryElement.classList.add("bg-green-700", "text-white");

        petsContainer.innerHTML = '';
        petsContainer.appendChild(spinnerWrapper); 

        setTimeout(() => {
          fetchPetsByCategory(category.category);
        }, 2000);
      });

      categoriesContainer.appendChild(categoryElement);
    });
  });

  // Fetch all pets
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((response) => response.json())
    .then((data) => {
      petsData = data.pets;
      displayPets(petsData);
    });

  // Fetch pets by category
  function fetchPetsByCategory(categoryName) {
    console.log(categoryName.toLowerCase());
    fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName.toLowerCase()}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          petsData = data.data;
          displayPets(petsData);
          console.log(petsData);
        } else {
          petsData = [];
          petsContainer.innerHTML =
            "<p>No pets available in this category.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching pets by category:", error);
        petsData = [];
        displayPets(petsData);
      });
  }

  function displayPets(pets) {
    const petsContainer = document.getElementById("pets");
    petsContainer.innerHTML = "";
    if (Array.isArray(pets) && pets.length > 0) {
      pets.forEach((pet, index) => {
        const petElement = document.createElement("div");
        petElement.className =
          "flex flex-col justify-start items-start gap-3 p-5 border border-gray-200 rounded-lg shadow-md";
        petElement.innerHTML = `
          <img src="${pet.image}" class="w-full rounded-xl mb-2" alt="${
          pet.name
        }">
          <h3 class="text-xl font-bold">${pet.pet_name}</h3>
          <p class="text-gray-500">Breed: ${pet.breed || "N/A"}</p>
          <p class="text-gray-500">Birth Date: ${pet.date_of_birth || "N/A"}</p>
          <p class="text-gray-500">Gender: ${pet.gender || "N/A"}</p>
          <p class="text-gray-500">Price: $${pet.price || "N/A"}</p>
          <div class="flex justify-between w-full mt-4">
            <button class="like-button px-4 py-2 bg-green-700 text-white rounded-lg" data-index="${index}" data-pet-img="${pet.image}">like</button>
            <button class="adopt-button px-4 py-2 text-green-700 border-2 rounded-lg" data-index="${index}">Adopt</button>
            <button class="details-button px-4 py-2 text-green-700 rounded-lg border-2" data-index="${index} ">Details</button>
          </div>
        `;
        petsContainer.appendChild(petElement);
      });
    } else {
      petsContainer.innerHTML = `
        <section class="flex items-center justify-center max-h-screen col-span-3">
        <div class="bg-white p-8 rounded-lg  max-w-5xl text-center">
          <!-- Icon (SVG or Image) -->
          <div class="flex justify-center mb-6">
            <img src="./assets/error.webp" alt="No Information Icon" class="w-full" />
          </div>
          <p>No pets available in this category.</p>
        </div>
      </section>
      `;
    }
  }

  // Sort pets by price
  sortByPriceButton.addEventListener("click", () => {
    petsData.sort((a, b) => b.price - a.price);
    displayPets(petsData);
  });

  // Event delegation for like, adopt, and details buttons
  petsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      console.log("Like button clicked");
      const index = event.target.getAttribute("data-index");
      const petImg = event.target.getAttribute("data-pet-img");
      console.log(petImg, index);
      addImage(petsData[index], petImg);
    } else if (event.target.classList.contains("adopt-button")) {
      const button = event.target;
      button.textContent = "Adopted";
      button.classList.remove("text-green-700");
      button.classList.add("bg-gray-200", "text-gray-400");
      button.disabled = true;
      showCongratsModal();
    } else if (event.target.classList.contains("details-button")||event.target.closest(".details-button")
    ) {
      const button = event.target.closest(".details-button");
      const index = parseInt(button.getAttribute("data-index"));
      console.log("index clicked", index); 
      showDetailsModal(petsData[index]);
    }
  });
});

// Close pet details modal
closeModal.addEventListener("click", () => {
  petModal.classList.add("hidden");
});


function showCongratsModal() {
  const congratsModal = document.getElementById("congratsModal");
  const countdownElement = document.getElementById("countdown");
  congratsModal.classList.remove("hidden");
  let countdown = 3;
  countdownElement.textContent = countdown;
  const interval = setInterval(() => {
    countdown -= 1;
    countdownElement.textContent = countdown;
    if (countdown === 0) {
      clearInterval(interval);
      congratsModal.classList.add("hidden");
    }
  }, 1000);
}

function addImage(pet, petImage) {
  const likedImageContainer = document.getElementById("liked-image");
  const imgElement = `
    <img src="${petImage || "placeholder.jpg"}" alt="${
    pet.pet_name
  }" class="w-full object-cover rounded mb-4">
  `;
  likedImageContainer.insertAdjacentHTML("beforeend", imgElement);
}

function showDetailsModal(pet) {
  console.log("Details", pet);
  const petModal = document.getElementById("petModal");
  document.getElementById("modalPetName").textContent = pet.pet_name;
  document.getElementById("modalPetImage").src = pet.image || "placeholder.jpg";
  document.getElementById("modalPetBreed").textContent = `Breed: ${
    pet.breed || "N/A"
  }`;
  document.getElementById("modalPetBirthDate").textContent = `Birth Date: ${
    pet.date_of_birth || "N/A"
  }`;
  document.getElementById("modalPetGender").textContent = `Gender: ${
    pet.gender || "N/A"
  }`;
  document.getElementById("modalPetPrice").textContent = `Price: $${
    pet.price || "N/A"
  }`;
  document.getElementById("modalPetDescription").textContent = `${
    pet.pet_details || "N/A"
  }`;
  document.getElementById(
    "modalPetVaccination"
  ).textContent = `Vacccinated Staus: ${pet.vaccinated_status || "N/A"}`;

  petModal.classList.remove("hidden");
}
