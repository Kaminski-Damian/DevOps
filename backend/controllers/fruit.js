const pgClient = require('../databases/postgres');
const redisClinet = require('../databases/redis');

exports.getFruit = async (req, res, next) => {
    const id = req.params.id;

    cachedData = await redisClinet.getAsync(`fruit_${id}`);
    if (cachedData) {
        const cachedFruit = JSON.parse(cachedData);
        return res.json({ success: true, data: cachedFruit });
    }

    const result = await pgClient
        .query('SELECT * FROM fruit WHERE id = $1', [id])
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false });
        });

    if (!result.rowCount) {
        return res.status(404).json({ success: false, data: [] });
    }

    const [fruit] = result.rows;

    await redisClinet.setAsync(`fruit_${id}`, JSON.stringify(fruit));

    res.json({ success: true, data: fruit });
};

exports.createFruit = async (req, res, next) => {
    const { name, amount } = req.body;

    await pgClient
        .query('INSERT INTO fruit (name, amount) VALUES ($1, $2)', [
            name,
            amount,
        ])
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false });
        });

    res.status(201).json({ success: true });
};
