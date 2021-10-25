let output = document.getElementById("out-bottom");
let memory = document.getElementById("out-top");
let history = document.getElementById("history_content");
let d = document.getElementById('_dot');
let res = document.getElementById('_result');
let outputSymbol = document.querySelector('.output_symbol');
let dataMemory;

function removeSymbolOutput() {
    if (output.innerHTML === 'ERROR') {
        output.innerHTML = '';
        outputSymbol.innerHTML = '';
    } else {
        outputSymbol.innerHTML = '';
    }
}

function addSymbolOutput(flag) {
    if (flag) {
        outputSymbol.innerHTML = '&asymp;';
    } else {
        outputSymbol.innerHTML = '&#9940;';
    }
}

function removeErrorClass() {
    let errorItem = document.querySelector('.btn_error');
    let errorData = document.querySelector('.error_data');
    if (errorItem) {
        errorItem.classList.remove('btn_error');
    }
    if (errorData) {
        errorData.classList.remove('error_data');
    }

}

function insertErrorClass(id) {
    let item = document.getElementById(`${id}`);
    if (id !== '_output_field') {
        item.classList.add('btn_error');
        setTimeout(removeErrorClass, 2000);
    } else {
        item.classList.add('error_data');
        setTimeout(removeErrorClass, 2000);
    }
}

function insertSymbol(num) {
    removeSymbolOutput();
    output.innerHTML += num;
}

function checkSymbol(num) {
    if (memory.innerHTML[memory.innerHTML.length - 1] === '=') {
        memory.innerHTML = '';
        output.innerHTML = '';
    }
    if (output.innerHTML.length >= 10) {
        insertErrorClass('_output_field');
        switch (+num) {
            case 1:
                insertErrorClass('_oneNum');
                return;
                break;
            case 2:
                insertErrorClass('_twoNum');
                return;
                break;
            case 3:
                insertErrorClass('_threeNum');
                return;
                break;
            case 4:
                insertErrorClass('_fourNum');
                return;
                break;
            case 5:
                insertErrorClass('_fiveNum');
                return;
                break;
            case 6:
                insertErrorClass('_sixNum');
                return;
                break;
            case 7:
                insertErrorClass('_sevenNum');
                return;
                break;
            case 8:
                insertErrorClass('_eightNum');
                return;
                break;
            case 9:
                insertErrorClass('_nineNum');
                return;
                break;
        }
        return;
    }
    // Проверяет на наличие двух точек (допустима только одна)
    if (num === '.') {
        if (output.innerHTML === 'ERROR') {
            output.innerHTML = '0';
            removeSymbolOutput();
        }
        if (output.innerHTML[output.innerHTML.length - 1] === '/' ||
            output.innerHTML[output.innerHTML.length - 1] === '*' ||
            output.innerHTML[output.innerHTML.length - 1] === '-' ||
            output.innerHTML[output.innerHTML.length - 1] === '+' ||
            output.innerHTML[output.innerHTML.length - 1] === '(' ||
            output.innerHTML[output.innerHTML.length - 1] === ')'
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
        if (output.innerHTML.length === 0) {
            output.innerHTML = '0';
        }
    }


    // Проверяет на наличие открывающей скобки (нельзя ввести закрывающую, если нет открывающей)
    if (num === ')') {
        let lastSymbol = output.innerHTML[output.innerHTML.length - 1];
        if (lastSymbol === '/' || lastSymbol === '*' || lastSymbol === '-' || lastSymbol === '+') {
            insertErrorClass('_close_bracket');
            return;
        }
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
        if (open === 0 || close > 0 || lastSymbol === '(') {
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
    if (output.innerHTML[output.innerHTML.length - 1] === ')') {
        switch (+num) {
            case 1:
                insertErrorClass('_oneNum');
                return;
                break;
            case 2:
                insertErrorClass('_twoNum');
                return;
                break;
            case 3:
                insertErrorClass('_threeNum');
                return;
                break;
            case 4:
                insertErrorClass('_fourNum');
                return;
                break;
            case 5:
                insertErrorClass('_fiveNum');
                return;
                break;
            case 6:
                insertErrorClass('_sixNum');
                return;
                break;
            case 7:
                insertErrorClass('_sevenNum');
                return;
                break;
            case 8:
                insertErrorClass('_eightNum');
                return;
                break;
            case 9:
                insertErrorClass('_nineNum');
                return;
                break;
        }
    }
    insertSymbol(num);
}

function backspace() {
    let presentValueOutput = output.innerHTML;
    if (presentValueOutput === 'ERROR' || presentValueOutput === 'Infinity' || outputSymbol) {
        removeSymbolOutput();
        output.innerHTML = '0';
        memory.innerHTML = '';
        return;
    }
    if (presentValueOutput.length === 1) {
        output.innerHTML = '0';
    } else {
        output.innerHTML = presentValueOutput.substring(0, presentValueOutput.length - 1);
    }
}

function clean() {
    output.innerHTML = '0';
    memory.innerHTML = '';
    removeSymbolOutput();
}

function cleanCE() {
    let flag;
    for (let i = 0; i < memory.innerHTML.length; i++) {
        if (memory.innerHTML[i] === '=') {
            flag = true;
        }
    }
    if (flag) {
        memory.innerHTML = '';
    }
    output.innerHTML = '0';
    removeSymbolOutput();
}

function actionMath(symbol) {
    for (let i = 0; i < memory.innerHTML.length; i++) {
        if (memory.innerHTML[i] === '=') {
            memory.innerHTML = '';
            break;
        }
    }
    if (symbol === '*' || symbol === '/' || symbol === '-' || symbol === '+') {
        if (output.innerHTML === '') {
            let tempString = String(memory.innerHTML);
            if (tempString[tempString.length - 1] === '/' ||
                tempString[tempString.length - 1] === '*' ||
                tempString[tempString.length - 1] === '-' ||
                tempString[tempString.length - 1] === '+'
            ) {
                memory.innerHTML = tempString.substring(0, tempString.length - 1) + symbol;
                return;
            }
        }
    }
    if (output.innerHTML[output.innerHTML.length - 1] === '(' || output.innerHTML === 'Infinity' || output.innerHTML === 'ERROR') {
        insertErrorClass('_multi');
        insertErrorClass('_split');
        insertErrorClass('_minus');
        insertErrorClass('_plus');
        return;
    }
    if (memory.innerHTML[memory.innerHTML.length - 1] === '=') {
        memory.innerHTML = '';
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
    removeSymbolOutput();
}

function getResult(symbol) {
    if (output.innerHTML === '' ||
        output.innerHTML[output.innerHTML.length - 1] === '(' ||
        output.innerHTML[output.innerHTML.length - 1] === '*' ||
        output.innerHTML[output.innerHTML.length - 1] === '/' ||
        output.innerHTML[output.innerHTML.length - 1] === '+' ||
        output.innerHTML[output.innerHTML.length - 1] === '-'
    ) {
        insertErrorClass('_result');

    } else {
        let result = eval(memory.innerHTML + output.innerHTML);
        console.log(result);
        if (String(result).length > 11) {
            let flag = false;
            for (let i = 0; i < String(result).length; i++) {
                if (String(result)[i] === '.') {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                memory.innerHTML += output.innerHTML + symbol;
                output.innerHTML = String(result).substring(0, 11);
                addSymbolOutput(flag);
            } else {
                output.innerHTML = 'ERROR';
                memory.innerHTML = '';
                insertErrorClass('_output_field');
                addSymbolOutput(flag);
                history.innerHTML += '<li>' + 'ERROR' + '</li>';
                return;
            }
        } else {
            memory.innerHTML += output.innerHTML + symbol;
            output.innerHTML = result;
        }
        let historyString = memory.innerHTML + result;
        let newHistoryString = '';
        for (let i = 0; i < historyString.length; i++) {
            if (historyString[i] === '/' || historyString[i] === '*' || historyString[i] === '-' || historyString[i] === '+' || historyString[i] === '=') {
                console.log(historyString[i]);
                newHistoryString += ' ' + historyString[i] + ' ';
            } else {
                newHistoryString += historyString[i];
            }
        }
        history.innerHTML += '<li>' + newHistoryString + '</li>';
    }

}

function memoryWrite() {
    dataMemory = output.innerHTML;
}

function memoryRemove() {
    dataMemory = null;
}

function memoryRead() {
    if (dataMemory) {
        let x = memory.innerText;
        if (x.length >= 2) {
            output.innerHTML = dataMemory;
        } else {
            output.innerHTML = dataMemory;
        }
    } else {
        insertErrorClass('_mr');
    }
}

function changeValue() {
    if (output.innerHTML && output.innerHTML !== '0') {
        if (output.innerHTML[0] === '(' && output.innerHTML[1] === '-' && output.innerHTML[output.innerHTML.length - 1] === ')') {
            output.innerHTML = output.innerHTML.split('(').join('');
            output.innerHTML = output.innerHTML.split('-').join('');
            output.innerHTML = output.innerHTML.split(')').join('');
            return;
        }
        let flag = false;
        for (let i = 0; i < memory.innerHTML.length; i++) {
            if (memory.innerHTML[i] === '=') {
                flag = true;
                break;
            }
        }
        if (output.innerHTML[0] === '(' || output.innerHTML.length >= 10 || flag === true || output.innerHTML === 'ERROR' || output.innerHTML === 'Infinity') {
            insertErrorClass('_change_value');
            return;
        }
        output.innerHTML = '(-' + output.innerHTML + ')';
    }
}

function calcSqrt() {
    let valueOutput = eval(output.innerHTML);
    if (valueOutput < 0 || output.innerHTML === 'ERROR' || output.innerHTML === 'Infinity' || output.innerHTML === '') {
        insertErrorClass('_sqrt');
    } else {
        let resultSqrt = String(Math.sqrt(valueOutput));
        if (resultSqrt.length > 11) {
            history.innerHTML += '<li>' + String(eval(output.innerHTML)) + ' ^ ' + '2' + ' = ' + resultSqrt.substring(0, 11) + '</li>';
            memory.innerHTML = String(eval(output.innerHTML)) + ' ^ ' + '2' + ' =';
            output.innerHTML = resultSqrt.substring(0, 11);

        } else {
            history.innerHTML += '<li>' + String(eval(output.innerHTML)) + ' ^ ' + '2' + ' = ' + resultSqrt + '</li>';
            memory.innerHTML = String(eval(output.innerHTML)) + ' ^ ' + '2' + ' =';
            output.innerHTML = resultSqrt;
        }
    }
}

function calcPow() {
    if (output.innerHTML === 'ERROR' || output.innerHTML === 'Infinity' || output.innerHTML === '') {
        insertErrorClass('_pow');
    } else {
        let valueOutput = eval(output.innerHTML);
        let resultSqrt = String(valueOutput ** 2);
        if (resultSqrt.length > 11) {
            history.innerHTML += '<li>' + String(eval(output.innerHTML)) + '<span><sup>2</sup></span>' + ' = ' + resultSqrt.substring(0, 11) + '</li>';
            memory.innerHTML = String(eval(output.innerHTML)) + '<span><sup>2</sup></span>' + ' =';
            output.innerHTML = resultSqrt.substring(0, 11);
        } else {
            history.innerHTML += '<li>' + String(eval(output.innerHTML)) + '<span><sup>2</sup></span>' + ' = ' + resultSqrt + '</li>';
            memory.innerHTML = String(eval(output.innerHTML)) + '<span><sup>2</sup></span>' + ' =';
            output.innerHTML = resultSqrt;
        }
    }
}