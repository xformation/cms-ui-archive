import _ from 'lodash';
export default function sortByKeys(input) {
    if (_.isArray(input)) {
        return input.map(sortByKeys);
    }
    if (_.isPlainObject(input)) {
        var sortedObject = {};
        for (var _i = 0, _a = _.keys(input).sort(); _i < _a.length; _i++) {
            var key = _a[_i];
            sortedObject[key] = sortByKeys(input[key]);
        }
        return sortedObject;
    }
    return input;
}
//# sourceMappingURL=sort_by_keys.js.map