const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd57c62578fmshbecf99e67a415e5p11b32bjsn93030510a201',
		'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	}
};

const searchAnimeInfo = () => {
    const itemContainer = document.getElementById("search-results-item-container");
    itemContainer.innerHTML = "";
    const animeName = document.getElementById("anime-name-input").value;
    console.log(`Anime name: ${animeName}`);

    fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${animeName}&sortBy=ranking&sortOrder=asc`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response);
        for (item in response["data"]){
            const data = response["data"][item];

            const hasEpisodes = data.hasEpisode;
            const hasRanking  = data.hasRanking;
            let animeEpisodes = {};

            const animeItemDiv = document.createElement('div');
            animeItemDiv.className = "anime-info-item-div";

            const animeImage = document.createElement('img');
            animeImage.className = "anime-image";
            animeImage.src = data.image;
            animeImage.alt = `"${data.title}" anime image`;

            const animeTitle = document.createElement('div');
            animeTitle.className = "anime-title"
            animeTitle.innerHTML = data.title;

            if (hasRanking)
            {
                animeRanking = document.createElement('div');
                animeRanking.className = "anime-ranking";
                animeRanking.innerHTML = `MAL Ranking: ${data.ranking}`;
            }

            const animeDescription = document.createElement('div');
            animeDescription.className = "anime-description";
            animeDescription.innerHTML = data.synopsis;
            if(animeDescription.innerHTML == "")
            {
                animeDescription.innerHTML = "No description available";
            }

            if (hasEpisodes)
            {
                animeEpisodes = document.createElement('div');
                animeEpisodes.className = "anime-episodes";
                animeEpisodes.innerHTML = `Number of episodes: ${data.episodes}`;
            }

            const animeStatus = document.createElement('div');
            animeStatus.className = "anime-status";
            animeStatus.innerHTML = `Status: ${data.status}`;

            const animeGenres = document.createElement('div');
            animeGenres.className = "anime-genres";
            animeGenres.innerHTML = `Genres: ${data.genres}`;

            const animeType = document.createElement('div');
            animeType.className = "anime-type";
            animeType.innerHTML = `Type: ${data.type}`;


            const itemTopSection = document.createElement('div');
            itemTopSection.className = "item-top-section";


            const itemBottomSection = document.createElement('div');
            itemBottomSection.className = "item-bottom-section";


            itemTopSection.appendChild(animeImage);
            itemTopSection.appendChild(animeTitle);

            animeItemDiv.appendChild(itemTopSection);

            if(hasEpisodes && data.type != "Movie")
            {
                itemBottomSection.appendChild(animeEpisodes);
            }
            itemBottomSection.appendChild(animeGenres);
            itemBottomSection.appendChild(animeType)
            itemBottomSection.appendChild(animeStatus);
            if(hasRanking)
            {
                itemBottomSection.appendChild(animeRanking);
            }

            animeItemDiv.appendChild(itemTopSection);
            animeItemDiv.appendChild(animeDescription);
            animeItemDiv.appendChild(itemBottomSection);
            itemContainer.appendChild(animeItemDiv);
        }
    })
	.catch(err => console.error(err)); 
}