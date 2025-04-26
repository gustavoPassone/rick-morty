let fetchAPI = fetch("https://rickandmortyapi.com/api/character")

.then((res) => res.json())
.then((data) => {
    displayPersonagens(data)
})

function displayPersonagens(data) {
    let divCards = document.querySelector(".cards")

    
    data.results.map((personagem) => {
        divCards.innerHTML += `
                <div class="card">
                    <div class="image-container">
                        <img src="${personagem.image}" alt="${personagem.name}">
                    </div>
                    <div class="content">
                        <h2>${personagem.name}</h2>
                        <div class="status-specie">
                            <div id="status-color"></div>
                            <p>${personagem.status}</p>
                            <span>-</span>
                            <p>${personagem.species}</p>
                        </div>
                        <div class="origin">
                            <p>Origin</p>
                            <p>${personagem.origin.name}</p>
                        </div>
                        <div class="gender">
                            <p>Gender</p>
                            <p>${personagem.gender}</p>
                        </div>
                    </div>
                </div>
        `
    })
}

