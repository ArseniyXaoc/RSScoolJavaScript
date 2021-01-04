export default class ElementCreaton {
    static createBlock(blockType, blockClass, appendParrent) {
        const block = document.createElement(blockType);
        block.classList.add(blockClass);
        appendParrent.append(block);
        return block;
    }
}
