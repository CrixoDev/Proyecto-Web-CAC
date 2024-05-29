// Seccion Recomendados
document.addEventListener("DOMContentLoaded", () => {
  const animeListContainer = document.getElementById("anime-list");
  const maxRecommendations = 23;
  let recommendationsCount = 0;
  let currentPage = 1;

  const fetchRecommendations = (page) => {
    fetch(`https://api.jikan.moe/v4/recommendations/anime?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const recommendations = data.data;
        recommendations.forEach((recommendation) => {
          recommendation.entry.forEach((anime) => {
            if (recommendationsCount < maxRecommendations) {
              const animeLink = document.createElement("a");
              animeLink.href = anime.url;
              animeLink.target = "_blank";
              const animeCard = document.createElement("div");
              animeCard.classList.add("card");
              const animeImage = document.createElement("img");
              animeImage.src = anime.images.jpg.large_image_url;
              animeImage.alt = anime.title;
              animeCard.appendChild(animeImage);
              animeLink.appendChild(animeCard);
              animeListContainer.appendChild(animeLink);
              recommendationsCount++;
            }
          });
        });

        if (
          recommendationsCount < maxRecommendations &&
          data.pagination.has_next_page
        ) {
          currentPage++;
          fetchRecommendations(currentPage);
        }
      })
      .catch((error) =>
        console.error(
          "Error al pedir a la api de las recomendaciones de anime:",
          error
        )
      );
  };
  fetchRecommendations(currentPage);
});

// Seccion Carrusel Aleatorios
document.addEventListener("DOMContentLoaded", async function () {
  const cardsContainer = document.getElementById("cards-container");

  for (let i = 0; i < 11; i++) {
    await fetch("https://api.jikan.moe/v4/random/anime")
      .then((response) => response.json())
      .then((data) => {
        const anime = data.data;

        const card = document.createElement("div");
        card.className = "card";

        const imgLink = document.createElement("a");
        imgLink.href = anime.url;
        imgLink.target = "_blank";

        const img = document.createElement("img");
        img.src = anime.images.jpg.image_url;
        img.alt = anime.title;
        imgLink.appendChild(img);

        const title = document.createElement("div");
        title.className = "card-title";

        card.appendChild(imgLink);

        cardsContainer.appendChild(card);
      })
      .catch((error) => console.error("Error fetching the anime:", error));
  }
});
