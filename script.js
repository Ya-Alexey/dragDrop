const draggableList = document.querySelector('#draggable-list');
const checkBtn = document.querySelector('#check');

const richestPeople = [
    'aaa 11111',
    'bbb 22222',
    'ccc 33333',
    'ddd 44444',
    'eee 55555',
    'fff 66666',
    'ggg 77777',
    'hhh 88888',
    'xxx 99999',
    'yyy 00000',
];

//store list
const listItems = [];

let dragStartIndex;

createList();


function createList() {
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, idx) => {
        console.log(person);

        const listItem = document.createElement('li');
        

        listItem.setAttribute('data-index', idx);

        listItem.innerHTML = `
            <span class="number">${idx + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);

        draggableList.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    // console.log('dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragOver(e) {
    // console.log('dragOver');
    e.preventDefault();
}
function dragDrop() {
    // console.log('dragDrop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}
function dragEnter() {
    // console.log('dragEnter');
    this.classList.add('over');
}
function dragLeave() {
    // console.log('dragLeave');
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

    console.log(itemOne, itemTwo);
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}