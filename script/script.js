let output = document.getElementById("out-bottom");
let memory = document.getElementById("out-top");
let history = document.getElementById("history_content");
let d = document.getElementById('_dot');
let res = document.getElementById('_result');
let dataMemory;


function removeErrorClass() {
    let errorItem = document.querySelector('.btn_error');
    errorItem.classList.remove('btn_error');
}

function insertErrorClass(id) {
    let item = document.getElementById(`${id}`);
    item.classList.add('btn_error');
    setTimeout(removeErrorClass, 2000);
}

function insertSymbol(num) {
    output.innerHTML += num;
}

function checkSymbol(num) {
    // Проверяет на наличие двух точек (допустима только одна)
    if (num === '.') {
        if (output.innerHTML[output.innerHTML.length - 1] === '/' ||
            output.innerHTML[output.innerHTML.length - 1] === '*' ||
            output.innerHTML[output.innerHTML.length - 1] === '-' ||
            output.innerHTML[output.innerHTML.length - 1] === '+'
        ) {
            insertErrorClass('_dot');
            return;
        }
        for (let i = 0; i < output.innerHTML.length; i++) {
            if (output.innerHTML[i] === '.') {
                insertErrorClass('_dot');
                return;
            }
        }
    }

    // Проверяет на наличие открывающей скобки (нельзя ввести закрывающую, если нет открывающей)
    if (num === ')') {
        let open = 0;
        let close = 0;
        for (let i = 0; i < output.innerHTML.length; i++) {
            if (output.innerHTML[i] === '(') {
                ++open;
            }
            if (output.innerHTML[i] === ')') {
                ++close;
            }
        }
        if (open === 0 || close > 0) {
            insertErrorClass('_close_bracket');
            return;
        }
    }

    // Проверяет наличие уже введенной открывающей скобки (две открывающие недопустимо)
    // Открывающую можно поставить только вначале (после цифры нельзя).
    if (num === '(') {
        let open = 0;
        let close = 0;
        for (let i = 0; i < output.innerHTML.length; i++) {
            if (output.innerHTML[i] === '(') {
                ++open;
            }
            if (output.innerHTML[i] === ')') {
                ++close;
            }
        }
        if (open > 0 || close > 0) {
            insertErrorClass('_open_bracket');
            return;
        }
        if (output.innerHTML !== '0' && output.innerHTML.length === 1 || output.innerHTML.length > 1) {
            insertErrorClass('_open_bracket');
            return;
        }
    }

    if (output.innerHTML.length === 1 && output.innerHTML === '0') {
        if (num === '.') {
            output.innerHTML += num;
            return;
        }
        output.innerHTML = num;
        return;
    }
    insertSymbol(num);
}

function backspace() {
    let presentValueOutput = output.innerHTML;
    if (presentValueOutput.length === 1) {
        output.innerHTML = '0';
    } else {
        output.innerHTML = presentValueOutput.substring(0, presentValueOutput.length - 1);
    }
}

function clean() {
    output.innerHTML = '0';
    memory.innerHTML = '';
}

function actionMath(symbol) {
    if (symbol === '*' || symbol === '/' || symbol === '-' || symbol === '+') {
        if (output.innerHTML[output.innerHTML.length - 1] === '(') {
            insertErrorClass('_multi');
            insertErrorClass('_split');
            insertErrorClass('_minus');
            insertErrorClass('_plus');
            return;
        }
        output.innerHTML += symbol;
        let outputValue = output.innerHTML;
        if (outputValue[outputValue.length - 2] === '/' ||
            outputValue[outputValue.length - 2] === '*' ||
            outputValue[outputValue.length - 2] === '-' ||
            outputValue[outputValue.length - 2] === '+'
        ) {
            output.innerHTML = outputValue.substring(0, outputValue.length - 2) + symbol;
        } else {
            let interString = eval(output.innerHTML.substring(0, output.innerHTML.length - 1));
            if (outputValue[outputValue.length - 2] === ')') {
                if (+interString >= 0) {
                    memory.innerHTML += interString + symbol;
                } else {
                    memory.innerHTML += '(' + interString + ')' + symbol;
                }
                output.innerHTML = '';
            } else {
                if (outputValue[0] !== '(') {
                    if (+interString >= 0) {
                        memory.innerHTML += interString + symbol;
                    } else {
                        memory.innerHTML += '(' + interString + ')' + symbol;
                    }
                    output.innerHTML = '';
                }
            }
        }

    }
}


function getResult(symbol) {
    if (output.innerHTML === '' ||
        output.innerHTML[output.innerHTML.length - 1] === ')' ||
        output.innerHTML[output.innerHTML.length - 1] === '(' ||
        output.innerHTML[output.innerHTML.length - 1] === '*' ||
        output.innerHTML[output.innerHTML.length - 1] === '/' ||
        output.innerHTML[output.innerHTML.length - 1] === '+' ||
        output.innerHTML[output.innerHTML.length - 1] === '-'
    ) {
        insertErrorClass('_result');

    } else {
        let result = eval(memory.innerHTML + output.innerHTML);
        memory.innerHTML += output.innerHTML + symbol;
        output.innerHTML = result;
    }
}

function memoryWrite() {
    dataMemory = output.innerHTML;
}

function memoryRead() {
    if (dataMemory) {
        let x = memory.innerText;
        if (x.length >= 2) {
            output.innerHTML = dataMemory;
            memory.innerText = dataMemory;
        } else {
            output.innerHTML = dataMemory;
            memory.innerText = output.innerHTML;
        }
    } else {
        insertErrorClass('_mr');
    }
}