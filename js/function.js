function replaceAll(string, target, replacement) {
    var result = "";
    var offset = 0;
    var target_length = target.length;
    if (target_length === 0) {
        for (var i = 0, c = string.length; i < c; i++) {
            result += string[i];
            result += replacement;
        }
        if (result.length)
            return result.substr(0, result.length - replacement.length);
        return result;
    }
    do {
        var i = string.indexOf(target, offset);
        if (i === -1) {
            result += string.substring(offset);
            return result;
        }
        result += string.substring(offset, i);
        result += replacement;
        offset = i + target_length;
    } while (true);
}