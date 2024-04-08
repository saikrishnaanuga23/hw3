const inputBox = document.getElementById('inputBox');
const nounList = document.getElementById('nounList');

inputBox.addEventListener('input', fetchDefinitions);

async function fetchDefinitions() {
    const word = inputBox.value.trim();
    if (word === '') {
        nounList.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        nounList.innerHTML = data.map(entry => {
            return entry.meanings.map(meaning => {
                return meaning.definitions.map(def => {
                    return `<li><strong>${meaning.partOfSpeech}</strong>: ${def.definition}</li>`;
                }).join('');
            }).join('');
        }).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
        nounList.innerHTML = '<li>Error fetching data. Please try again later.</li>';
    }
}