function uniqBy(key, array) {
    if (!Array.isArray(array)) return [];

    const key2 = typeof key === 'function' ? key : (el) => el[key];

    return [...array
        .reduce((arr, id) => {
            const key_id = (id === null || id === undefined) ? id : key2(id);

            arr.has(key_id) || arr.set(key_id, id);

            return arr;
        }, new Map()).values()
    ];
}

module.exports = uniqBy;