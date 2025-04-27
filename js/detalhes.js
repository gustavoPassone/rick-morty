function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function carregarDetalhes() {
    const id = getIdFromUrl();
    const url = `https://rickandmortyapi.com/api/character/${id}`;

    try {
        const res = await fetch(url);
        const personagem = await res.json();
        
        document.getElementById('personagem-image').src = personagem.image;
        document.getElementById('personagem-name').textContent = personagem.name;
        document.getElementById('personagem-status').textContent = personagem.status;
        document.getElementById('personagem-species').textContent = personagem.species;
        document.getElementById('personagem-origin').textContent = personagem.origin.name;
        document.getElementById('personagem-gender').textContent = personagem.gender;
        document.getElementById('personagem-location').textContent = personagem.location.name;

         
        const listaEpisodios = document.getElementById('lista-episodios');
        listaEpisodios.innerHTML = '';
        
        const listaTitle = document.getElementById("lista-title")
        
        if (personagem.gender === 'Male') {
            listaTitle.innerHTML = `Episodios que o ${personagem.name} apareceu`
        } else if (personagem.gender === 'Female') {
            listaTitle.innerHTML = `Episodios que a ${personagem.name} apareceu`
        } else {
            listaTitle.innerHTML = `Episodios que ${personagem.name} apareceu`
        }
        
        //todos os episodios
        for (let episodioUrl of personagem.episode) {
            const resEpisodio = await fetch(episodioUrl);
            const episodio = await resEpisodio.json();
        
            // Pega temporada e episódio
            const match = episodio.episode.match(/S(\d+)E(\d+)/);
            const temporada = parseInt(match[1]);
            const numeroEpisodio = parseInt(match[2]);
        
            const li = document.createElement('li');
            li.textContent = `Temp. ${temporada} Ep. ${numeroEpisodio} - ${episodio.name}`;
            listaEpisodios.appendChild(li);
        }
        

         
    } catch (error) {
        console.error('Erro ao carregar os detalhes do personagem:', error);
    }
}


window.onload = carregarDetalhes;