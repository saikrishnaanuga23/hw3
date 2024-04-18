const inputBox = document.getElementById('inputBox');
const nounList = document.getElementById('nounList');

inputBox.addEventListener('input', fetchDefinitions);

function fetchDefinitions() {
    const word = inputBox.value.trim();
    if (word === '') {
        nounList.innerHTML = '';
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderDefinitions(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            nounList.innerHTML = '<li>Error fetching data. Please try again later.</li>';
        });
}

function renderDefinitions(data) {
    nounList.innerHTML = data.map(entry => {
        return entry.meanings.map(meaning => {
            return meaning.definitions.map(def => {
                return `<li><strong>${meaning.partOfSpeech}</strong>: ${def.definition}</li>`;
            }).join('');
        }).join('');
    }).join('');
}