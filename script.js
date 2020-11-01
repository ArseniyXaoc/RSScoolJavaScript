const Keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        keys: [],
        altKeys: [],
        keyboardInput: null,
        changeLang: null,
        position: 0,
    },

    eventHendlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false,
        toAlt: false,
        Lang: true,
    },

    init() {
        // создаем элементы main
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');
        this.elements.changeLang = document.createElement('button');
        this.elements.keyContainer.appendChild(this.elements.changeLang);

        //Добавили Input
        this.elements.keyboardInput = document.querySelector('.use-keyboard-input');


        //добавим свойства
        this.elements.main.classList.add('keyboard--hidden', 'keyboard');
        this.elements.keyContainer.classList.add('keyboard__keys');
        ////////////////////////////////////////////////////////////////////////







        //добавим элементы в DOM 
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);

        //Выводна экран
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                
                
                this.open(element.value, currentValue => {
                   //element.value = currentValue;
                   //console.log(this.elements.position);
                   element.setRangeText(currentValue.slice(-1), element.selectionStart, element.selectionEnd, 'end');
                   element.focus();
                });
            });
        });

        //Смена языка
        this.elements.changeLang.classList.add('keyboard__key--wide', 'keyboard__key');
        this.elements.changeLang.innerHTML = '<div>EN | RU</div>'
        this.elements.changeLang.addEventListener('click', () => {
            this._toggleLang();
            this.elements.changeLang.classList.toggle('keyboard__key--activatable', this.properties.Lang);
        })


        //Добавляем клавиши
        this.elements.keyContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');



    },

    _createKeys() {
        const keyLayoutEn = [
            ["1", "!"],
            ["2", "@"],
            ["3", "#"],
            ["4", "$"],
            ["5", "%"],
            ["6", "^"],
            ["7", "&"],
            ["8", "*"],
            ["9", "("],
            ["0", ")"], "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ["[", "{"],
            ["]", "}"],
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", [";", ":"],
            ["'", '"'], "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m",
            [",", "<"],
            [".", ">"],
            ["/", "?"], "done",
            "space", "left", "right"
        ];
        const keyLayoutRus = [
            ["1", "!"],
            ["2", '"'],
            ["3", "№"],
            ["4", ";"],
            ["5", "%"],
            ["6", ":"],
            ["7", "?"],
            ["8", "*"],
            ["9", "("],
            ["0", ")"], "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", [".", ","], "done",
            "space", "left", "right"
        ];
        // цикл формирования клавиш и эвентов для них 
        if (this.properties.Lang) return this._forEachKelayout(keyLayoutEn);
        else return this._forEachKelayout(keyLayoutRus);
    },



    _forEachKelayout(keyLayout) {
        const fragment = document.createDocumentFragment();
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        }
        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            let insertLineBreak;

            //Настройка переносов
            if (this.properties.Lang) {
                insertLineBreak = ["backspace", "],}", "enter", "/,?"].indexOf(key.toString()) !== -1;
            } else {
                insertLineBreak = ["backspace", "ъ", "enter", ".,,"].indexOf(key.toString()) !== -1;
            }
            //Добавим классы и аттребуты
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');
            switch (key) {

                case 'shift':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('north');
                    keyElement.addEventListener('click', () => {
                        this._toggleShift();
                        keyElement.classList.toggle('keyboard__key--activatable', this.properties.shift);
                    })
                    break;

                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--activatable', this.properties.capsLock)
                    })
                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n";
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += " ";
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');
                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvents('onclose');
                    })
                    break;

                case 'left':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_left');
                    keyElement.addEventListener('click', () => {
                        this.selection('left');
                        this._triggerEvents('left');
                    })
                    break;

                case 'right':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
                    keyElement.addEventListener('click', () => {
                        this.selection('right');
                        this._triggerEvents('right');
                    })
                    break;


                default:
                    keyElement.textContent = key[0].toLowerCase();
                    keyElement.addEventListener('click', () => {


                        //проверка нажатия Cups
                        if (this.properties.toAlt === true && typeof key === 'object') {
                            this.properties.value += key[1];
                        } else if (this.properties.capsLock) {
                            this.properties.value += this.properties.shift ? key[0].toLocaleLowerCase() : key[0].toUpperCase();
                        } else {
                            this.properties.value += this.properties.shift ? key[0].toUpperCase() : key[0].toLocaleLowerCase();
                        }



                        this._triggerEvents('oninput');
                    })
                    break;

            }



            fragment.appendChild(keyElement);

            // Если нужен перенос 

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }
        })
        return fragment;
    },

    selection(change){


    },


    _triggerEvents(henlerName) {
        //console.log(`Event triggered! Event Name ${henlerName}`);
        if (typeof this.eventHendlers[henlerName] == 'function') {
            this.eventHendlers[henlerName](this.properties.value);
            this.elements.keyboardInput.focus();
        }


    },

    _toggleLang() {
        console.log('Lang Toggled');
        this.properties.Lang = !this.properties.Lang;

        //Смена языка

        //  this.elements.changeLang.addEventListener('click', () => {
        //      this._toggleLang();
        //      this.elements.changeLang.classList.toggle('keyboard__key--activatable', this.properties.Lang);
        //  })
        while (this.elements.keyContainer.firstChild) {
            this.elements.keyContainer.removeChild(this.elements.keyContainer.firstChild);
        }
        this.elements.keyContainer.appendChild(this.elements.changeLang);
        this.elements.changeLang.classList.add('keyboard__key--wide', 'keyboard__key');
        this.elements.changeLang.innerHTML = this.properties.Lang ? '<div>ENG</div>' : '<div>RU</div>';
        //Добавляем клавиши
        this.elements.keyContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');
    },

    // Переключение капса
    _toggleCapsLock() {
        console.log('CAPS Toggled');
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleShift() {
        console.log('Shift Toggled');
        this.properties.shift = !this.properties.shift;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (this.properties.capsLock === true) {
                    key.textContent = this.properties.shift ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
                } else {
                    key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                }
            }
        }
        this._changeKeys();

    },

    _changeKeys() {
        const baseKeys = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        const altKeysEng = ["", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
        const altKeysRu = ["", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")"];
        let altKeys = this.properties.Lang ? altKeysEng : altKeysRu;

        if (this.properties.shift) {
            for (let i = 1; i <= 10; i++) {
                this.elements.keys[i].textContent = altKeys[i];
            }
            console.log(this.elements.keys[21]);
            if (this.properties.Lang) {
                this.elements.keys[22].textContent = '{';
                this.elements.keys[23].textContent = '}';
                this.elements.keys[34].textContent = ':';
                this.elements.keys[35].textContent = '"';
                this.elements.keys[45].textContent = '<';
                this.elements.keys[46].textContent = '>';
                this.elements.keys[47].textContent = '?';
            } else this.elements.keys[47].textContent = ',';
            this.properties.toAlt = true;
        } else {
            for (let i = 1; i <= 9; i++) {
                this.elements.keys[i].textContent = baseKeys[i];
            }
            if (this.properties.Lang) {
                this.elements.keys[22].textContent = '[';
                this.elements.keys[23].textContent = ']';
                this.elements.keys[34].textContent = ';';
                this.elements.keys[35].textContent = "'";
                this.elements.keys[45].textContent = ',';
                this.elements.keys[46].textContent = '.';
                this.elements.keys[47].textContent = '/';
            } else this.elements.keys[47].textContent = '.';
            this.properties.toAlt = false;
        }
    },


    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHendlers.oninput = oninput;
        this.eventHendlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() {
        this.properties.value = '';
        this.eventHendlers.oninput = oninput;
        this.eventHendlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');

    },
}




window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
    //Keyboard._createKeys();

    // Keyboard.open('dc ', function (currentValue){
    //     console.log('value change ' + currentValue);
    // }, function(currentValue) {
    //     console.log('keyboard closed finish value ' + currentValue);
    // });



})