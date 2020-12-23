// replaceAll
function replaceAll(string, target, replacement) {
    do {
        if (string.indexOf(target) == -1) return string;
        string = string.replace(target, replacement);
    } while (true);
}

// jsonToArray
function jsonToArray(list) {
    let s = [];
    for (let i in list) {
        s.push(list[i]);
    }
    return s;
}
