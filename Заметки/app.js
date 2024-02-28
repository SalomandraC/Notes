const inpEl = document.getElementById('title');
const createBTN = document.getElementById('create');
const listEl = document.getElementById('list');
let notes = [];
const key = 'У вас нет заметок!';

function getNote(note, index) {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${note.sost ? 'text-decoration-line-through' : ''}">${note.value}</span>
            <span>
                <span class="btn btn-small btn-${note.sost ? 'warning' : 'success'}" data-index="${index}" data-type="unxest">&check;</span>
                <span class="btn btn-small btn-danger" data-index="${index}" data-type="xest">&times;</span>
            </span>
        </li>
    `;
}

function render() {
    listEl.innerHTML = '';
    if (notes.length === 0){
        listEl.innerHTML = '<p>Нет заметок</p>'
    }
    for (let i = 0; i < notes.length; i++) {
        listEl.insertAdjacentHTML('beforeend', getNote(notes[i], i));
    }
}

listEl.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index);
        const type = event.target.dataset.type;
        if (type === 'unxest') {
            notes[index].sost = !notes[index].sost;
        } else if (type === 'xest') {
            notes.splice(index, 1);
        }
        render();
    }
};

createBTN.onclick = function () {
    if (inpEl.value.length === 0) {
        return;
    }
    const newNote = {
        value: inpEl.value,
        sost: false,
    };
    notes.push(newNote);
    render();
    inpEl.value = '';
};
render();