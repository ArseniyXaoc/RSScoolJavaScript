export default class ElementsCreator {
    static crateElement(elementType, className, parent) {
        const element = document.createElement(elementType);
        element.className = className;
        parent.append(element);
        return element;
    }
}
