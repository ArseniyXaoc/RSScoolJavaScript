export default class ElementsCreator {
    static createBlock(className, parent) {
        const block = document.createElement('div');
        block.className = className;
        parent.append(block);
        return block;
    }

    static crateTextElement(elementType, className, innerHTML, parent) {
        const element = document.createElement(elementType);
        element.className = className;
        element.innerHTML = innerHTML;
        parent.append(element);
        return element;
    }

    static crateImg(className, alt, parent) {
        const img = document.createElement('img');
        img.className = className;
        img.alt = alt;
        parent.append(img);
        return img;
    }
}
