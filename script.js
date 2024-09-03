setInterval(() => {
    document.title = new Date();
}, 1000);


const addItems = document.querySelector('.add_items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const clear = document.querySelector('#delete');


function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name="item"]').value;

    const item = {
        text,
        done: false
    };
    items.push(item)
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items))
    this.reset();

}


function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : null}>
            <label for="item${i}">${plate.text}</label>
            </li>
        `
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return  //skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function shesh() {
    localStorage.removeItem('items', JSON.stringify(items));
    const x = confirm('Refresh The Page?');
    if (x) {
        location.reload()
    }
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clear.addEventListener('click', shesh)

populateList(items, itemsList);