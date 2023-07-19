
const model = () => {
    const db = {
        1: { brand: 'Veloretti', color: 'green' },
        2: { brand: 'Batavus', color: 'yellow' }
    }

    const read = (id, cb) => {
        if (!(db.hasOwnProperty(id))) {
            const err = Error('not found')
            setImmediate(() => cb(err))
            return
        }
        setImmediate(() => cb(null, db[id]))
    }

    return {
        read
    }
}

module.exports = model;
