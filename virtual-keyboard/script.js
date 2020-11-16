const Keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        keys: [],
        altKeys: [],
        keyboardInput: null,
        changeLang: null,
        position: 0,
        startRange: 0,
        endRange: 0,
        recognition: null,
        endText: '',
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
        sound: false,
        voice: false,
    },

    init() {





        recognition.lang = this.properties.Lang ? 'en-US' : 'ru-RU';
        //----------------------

        this.elements.startRange = 0;
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


        //sound input
        //window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;





        //добавим элементы в DOM 
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);

        //Выводна экран
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                    //this.getposition();

                    //element.setRangeText(currentValue.slice(-1), element.selectionStart, element.selectionEnd, 'end');
                    //element.focus();
                });
            });

            element.addEventListener("click", () => {
                //element.value = currentValue;
                this.getposition();
                //console.log(this.elements.position.endRange);
                //console.log(this.elements.position);
                //element.setRangeText(currentValue.slice(-1), element.selectionStart, element.selectionEnd, 'end');
                //element.focus();                
            });
        });

        //Физическая клавиатура 

        //Смена языка
        this.elements.changeLang.classList.add('keyboard__key--wide', 'keyboard__key');
        this.elements.changeLang.innerHTML = '<div>EN | RU</div>'
        this.elements.changeLang.addEventListener('click', () => {
            this._toggleLang();
            this.elements.changeLang.classList.toggle('keyboard__key--activatable', this.properties.Lang);
            recognition.lang = this.properties.Lang ? 'en-US' : 'ru-RU';
        })


        //Добавляем клавиши
        this.elements.keyContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');

        console.log(this.elements.keyboardInput);

        document.addEventListener('keyup', function (event) {

            Keyboard.properties.value = Keyboard.elements.keyboardInput.value;
            Keyboard.elements.startRange++;
            Keyboard.elements.endRange++;
            //console.log(Keyboard.properties.value);    
        })

        document.addEventListener('keydown', function (event) {
            console.log(event.key);
            let p;
            if (event.key.length <= 1) {
                p = event.key.toLocaleLowerCase();
            } else p = event.key;
            if (document.querySelector(`button[data-name="${p}"]`)) {
                let x = document.querySelector(`button[data-name="${p}"]`);
                x.classList.add('keyboard__key--hilight');
            }
            
            
        })

        document.addEventListener('keyup', function (event) {
            let p;
            if (event.key.length <= 1) {
                p = event.key.toLocaleLowerCase();
            } else p = event.key;
            if(document.querySelector(`button[data-name="${p}"]`)){
            let x = document.querySelector(`button[data-name="${p}"]`);
            x.classList.remove('keyboard__key--hilight');}
        })




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
            "space", "left", "right", "onsound", "voice",
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
            "space", "left", "right", "onsound", "voice",
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
                    keyElement.setAttribute('data-name', 'Shift');
                    keyElement.setAttribute('data-sound', 'kick');
                    keyElement.addEventListener('click', () => {
                        this.playSound('kick')
                    });
                    keyElement.addEventListener('click', () => {
                        this._toggleShift();
                        keyElement.classList.toggle('keyboard__key--activatable', this.properties.shift);
                    })
                    break;

                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.setAttribute('data-name', 'Backspace');
                    keyElement.setAttribute('data-sound', 'boom');
                    keyElement.addEventListener('click', () => {
                        this.playSound('boom')
                    });
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substr(0, this.elements.endRange - 1) + this.properties.value.substr(this.elements.endRange);
                        if (this.elements.endRange !== 0) {
                            this.elements.endRange--;
                            this.elements.startRange--;
                        }
                        console.log(this.elements.endRange);
                        console.log(this.properties.value);

                        //this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');
                    keyElement.setAttribute('data-name', 'CapsLock');
                    keyElement.setAttribute('data-sound', 'tink');
                    keyElement.addEventListener('click', () => {
                        this.playSound('tink')
                    });
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--activatable', this.properties.capsLock)
                    })
                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');
                    keyElement.setAttribute('data-name', 'Enter');
                    keyElement.setAttribute('data-sound', 'hihat');
                    keyElement.addEventListener('click', () => {
                        this.playSound('hihat')
                    });
                    keyElement.addEventListener('click', () => {

                        this.properties.value = this.properties.value.substr(0, this.elements.endRange) + '\n' + this.properties.value.substr(this.elements.endRange);

                        this.elements.endRange++;
                        this.elements.startRange++;
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');
                    if (this.properties.Lang) {
                        keyElement.setAttribute('data-sound', 'punch');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch')
                        });
                    } else {
                        keyElement.setAttribute('data-sound', 'punch2');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch2')
                        });
                    }


                    keyElement.setAttribute('data-name', ' ');
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
                    keyElement.setAttribute('data-name', 'ArrowLeft');
                    if (this.properties.Lang) {
                        keyElement.setAttribute('data-sound', 'punch');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch')
                        });
                    } else {
                        keyElement.setAttribute('data-sound', 'punch2');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch2')
                        });
                    }
                    keyElement.addEventListener('click', () => {
                        this.selection('left');
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'right':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
                    keyElement.setAttribute('data-name', 'ArrowRight');
                    if (this.properties.Lang) {
                        keyElement.setAttribute('data-sound', 'punch');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch')
                        });
                    } else {
                        keyElement.setAttribute('data-sound', 'punch2');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch2')
                        });
                    }
                    keyElement.addEventListener('click', () => {
                        this.selection('right');
                        this._triggerEvents('oninput');
                    })
                    break;

                case 'onsound':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('alarm_off');
                    keyElement.setAttribute('data-name', 'CapsLock');
                    keyElement.setAttribute('data-sound', 'tink');
                    keyElement.addEventListener('click', () => {
                        this.playSound('tink')
                    });
                    keyElement.addEventListener('click', () => {
                        this.properties.sound = !this.properties.sound;
                        keyElement.classList.toggle('keyboard__key--activatable', this.properties.sound)
                    })
                    break;

                case 'voice':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('announcement');
                    keyElement.setAttribute('data-name', 'CapsLock');
                    keyElement.setAttribute('data-sound', 'tink');
                    keyElement.addEventListener('click', () => {
                        this.playSound('tink')
                    });

                    keyElement.addEventListener('click', () => {
                        this.properties.voice = !this.properties.voice;
                        keyElement.classList.toggle('keyboard__key--activatable', this.properties.voice)
                        if (this.properties.voice) recognition.start();
                        if (!this.properties.voice) recognition.abort();
                    })
                    break;








                default:
                    keyElement.setAttribute('data-name', key[0]);
                    if (this.properties.Lang) {
                        keyElement.setAttribute('data-sound', 'punch');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch')
                        });
                    } else {
                        keyElement.setAttribute('data-sound', 'punch2');
                        keyElement.addEventListener('click', () => {
                            this.playSound('punch2')
                        });
                    }
                    keyElement.textContent = key[0].toLowerCase();
                    keyElement.addEventListener('click', () => {

                        this.getposition();
                        //проверка нажатия Cups
                        if (this.properties.toAlt === true && typeof key === 'object') {
                            this.properties.value = this.properties.value.substr(0, this.elements.endRange) + (key[1]) + this.properties.value.substr(this.elements.endRange);
                            //this.properties.value += key[1];
                        } else if (this.properties.capsLock) {
                            this.properties.value = this.properties.value.substr(0, this.elements.endRange) + (this.properties.shift ? key[0].toLocaleLowerCase() : key[0].toUpperCase()) + this.properties.value.substr(this.elements.endRange);
                            //this.properties.value += this.properties.shift ? key[0].toLocaleLowerCase() : key[0].toUpperCase();
                        } else {
                            this.properties.value = this.properties.value.substr(0, this.elements.endRange) + (this.properties.shift ? key[0].toUpperCase() : key[0].toLocaleLowerCase()) + this.properties.value.substr(this.elements.endRange);

                        }
                        //this.setposition();
                        this.elements.endRange++;
                        this.elements.startRange++;
                        this._triggerEvents('oninput');
                        console.log(this.properties.value);
                    })
                    break;

            }


            //sound


            this.elements.keys



            fragment.appendChild(keyElement);

            // Если нужен перенос 

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }
        })
        return fragment;
    },

    selection(change) {

        if (this.elements.startRange === this.elements.endRange) this.elements.position = this.elements.endRange;
        if (this.properties.shift) {
            if (this.elements.endRange) {
                if (change === 'left') {
                    if (this.elements.endRange > this.elements.position) {
                        this.elements.endRange--;
                    } else if (this.elements.startRange) this.elements.startRange--;
                    //this.elements.keyboardInput.selectionStart = this.elements.startRange;
                }
            }
            if (change === 'right') {
                if (this.elements.startRange < this.elements.position) {
                    this.elements.startRange++;
                } else if (this.elements.endRange < this.properties.value.length) this.elements.endRange++;
            }
        } else {
            if (change === 'left' && this.elements.startRange) {
                this.elements.endRange--;
                this.elements.startRange--;
            } else {
                this.elements.endRange++;
                this.elements.startRange++;
            }
        }


        console.log(this.elements.startRange, this.elements.endRange, this.elements.position);

    },

    getposition() {
        this.elements.startRange = this.elements.keyboardInput.selectionStart;
        this.elements.endRange = this.elements.keyboardInput.selectionEnd;

    },


    _triggerEvents(henlerName) {

        if (typeof this.eventHendlers[henlerName] == 'function') {
            this.eventHendlers[henlerName](this.properties.value);
            this.elements.keyboardInput.focus();
            // ++ конечный фокус
            if (this.properties.shift) {
                this.elements.keyboardInput.selectionStart = this.elements.startRange;
                this.elements.keyboardInput.selectionEnd = this.elements.endRange; //Установить фокус  
            } else this.elements.keyboardInput.selectionStart = this.elements.keyboardInput.selectionEnd = this.elements.endRange;
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
                if (this.properties.shift) {
                    key.textContent = this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
                }
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
            for (let i = 1; i <= 10; i++) {
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

    removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    },

    playSound(e) {
        if (!this.properties.sound) {
            const audio = document.querySelector(`audio[data-sound="${e}"]`);
            const key = document.querySelector(`button[data-sound="${e}"]`);
            if (!audio) return;

            key.classList.add('playing');
            audio.currentTime = 0;
            audio.play();
        }
    },



}




window.addEventListener('DOMContentLoaded', function () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", function (e) {
        if (!Keyboard.properties.voice) recognition.abort();
        let text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        Keyboard.elements.endText = text;
    });

    recognition.addEventListener('end', (e) => {
        if (!Keyboard.properties.voice) recognition.abort();
        else {
            if (Keyboard.elements.endText) Keyboard.elements.keyboardInput.value += Keyboard.elements.endText;
            if (Keyboard.properties.voice) recognition.start();
        }



    });

    Keyboard.init();
    //Keyboard._createKeys();

    // Keyboard.open('dc ', function (currentValue){
    //     console.log('value change ' + currentValue);
    // }, function(currentValue) {
    //     console.log('keyboard closed finish value ' + currentValue);
    // });



})