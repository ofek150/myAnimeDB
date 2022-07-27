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
            const hasEpisodes = response["data"][item].hasEpisode;
            const hasRanking  = response["data"][item].hasRanking;
            let animeEpisodes = {};

            const animeItemDiv = document.createElement('div');
            animeItemDiv.className = "anime-info-item-div";

            const animeImage = document.createElement('img');
            animeImage.className = "anime-image";
            animeImage.src = response["data"][item].image;
            animeImage.alt = `"${response["data"][item].title}" anime image`;

            const animeTitle = document.createElement('div');
            animeTitle.className = "anime-title"
            animeTitle.innerHTML = response["data"][item].title;

            if (hasRanking)
            {
                animeRanking = document.createElement('div');
                animeRanking.className = "anime-ranking";
                animeRanking.innerHTML = `MAL Ranking: ${response["data"][item].ranking}`;
            }

            const animeDescription = document.createElement('div');
            animeDescription.className = "anime-description";
            animeDescription.innerHTML = response["data"][item].synopsis;
            if(animeDescription.innerHTML == "")
            {
                animeDescription.innerHTML = "No description available";
            }

            if (hasEpisodes)
            {
                animeEpisodes = document.createElement('div');
                animeEpisodes.className = "anime-episodes";
                animeEpisodes.innerHTML = `Number of episodes: ${response["data"][item].episodes}`;
            }



            const itemTopSection = document.createElement('div');
            itemTopSection.className = "item-top-section";


            const itemBottomSection = document.createElement('div');
            itemBottomSection.className = "item-bottom-section";


            itemTopSection.appendChild(animeImage);
            itemTopSection.appendChild(animeTitle);

            animeItemDiv.appendChild(itemTopSection);

            if(hasEpisodes)
            {
                itemBottomSection.appendChild(animeEpisodes);
            }
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