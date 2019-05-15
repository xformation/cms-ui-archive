/**
 * Adapt findMatchesInText for react-highlight-words findChunks handler.
 * See https://github.com/bvaughn/react-highlight-words#props
 */
export function findHighlightChunksInText(_a) {
    var searchWords = _a.searchWords, textToHighlight = _a.textToHighlight;
    return findMatchesInText(textToHighlight, searchWords.join(' '));
}
var cleanNeedle = function (needle) {
    return needle.replace(/[[{(][\w,.-?:*+]+$/, '');
};
/**
 * Returns a list of substring regexp matches.
 */
export function findMatchesInText(haystack, needle) {
    // Empty search can send re.exec() into infinite loop, exit early
    if (!haystack || !needle) {
        return [];
    }
    var matches = [];
    var cleaned = cleanNeedle(needle);
    var regexp;
    try {
        regexp = new RegExp("(?:" + cleaned + ")", 'g');
    }
    catch (error) {
        return matches;
    }
    haystack.replace(regexp, function (substring) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (substring) {
            var offset = rest[rest.length - 2];
            matches.push({
                text: substring,
                start: offset,
                length: substring.length,
                end: offset + substring.length,
            });
        }
        return '';
    });
    return matches;
}
//# sourceMappingURL=text.js.map