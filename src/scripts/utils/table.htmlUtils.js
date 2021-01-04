const querySelector = (selector) => document.querySelector(selector);
const createElement = (element) => document.createElement(element);
const classListContains = (item, text) => item.parentElement.classList.contains(text);
const setLastChildTextValue = (item, text) => {
    item.lastElementChild.append(document.createTextNode(text));
};

function toggleCheckedState(changed) {
    const toggleColortotal = querySelector('.total');
    const toggleColorlastDay = querySelector('.last-day');
    const toggleColorglobal = querySelector('.global');
    const toggleColorperOneHundred = querySelector('.per-one-hundred');
    if (changed.closest('.amount-checkbox')) {
        toggleColortotal.classList.toggle('selected');
        toggleColorlastDay.classList.toggle('selected');
    } else {
        toggleColorglobal.classList.toggle('selected');
        toggleColorperOneHundred.classList.toggle('selected');
    }
}

function createTableColumn() {
    const confirmedElement = createElement('div');
    const deathsElement = createElement('div');
    const recoveredElement = createElement('div');
    const DivElementArr = { confirmedElement, deathsElement, recoveredElement };
    return DivElementArr;
}

function addFieldToDivElement(arr) {
    Object.keys(arr).forEach((key) => {
        arr[key].classList.add('table__element');
        arr[key].appendChild(createElement('div')).classList.add('Table__List-data-text');
    });
}

function clearData(arr) {
    Object.keys(arr).forEach((key) => arr[key].lastElementChild.removeChild(arr[key].lastElementChild.firstChild));
    // arr.forEach((item) => {
    //     item.lastElementChild.removeChild(item.lastElementChild.firstChild);
    // });
}

export {
    querySelector,
    createElement,
    classListContains,
    setLastChildTextValue,
    toggleCheckedState,
    createTableColumn,
    addFieldToDivElement,
    clearData,
};
