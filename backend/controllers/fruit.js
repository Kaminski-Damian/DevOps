const pgClient = require('../databases/postgres');
const redisClinet = require('../databases/redis');

// @desc      Create fruit
// @route     POST /fruit
exports.createFruit = async (req, res, next) => {
  const { name, amount } = req.body;

  const result = await pgClient
    .query('INSERT INTO fruit (name, amount) VALUES ($1, $2)', [name, amount])
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ success: false });
    });

  if (!result.rowCount) {
    return res.status(400).json({ success: false });
  }

  await redisClinet.delAsync('all_fruit');

  res.status(201).json({ success: true });
};

// @desc      Get all fruit
// @route     GET /fruit
exports.getAllFruit = async (req, res, next) => {
  cachedData = await redisClinet.getAsync('all_fruit');
  if (cachedData) {
    const cachedFruit = JSON.parse(cachedData);
    return res.json({ success: true, data: cachedFruit });
  }

  const result = await pgClient.query('SELECT * from fruit').catch((err) => {
    console.error(err);
    return res.status(400).json({ success: false });
  });

  const allFruit = result.rows;

  if (allFruit.length) {
    await redisClinet.setAsync('all_fruit', JSON.stringify(allFruit));
  }

  res.json({ success: true, data: allFruit });
};

// @desc      Get fruit
// @route     GET /fruit/:id
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
      console.error(err);
      return res.status(400).json({ success: false });
    });

  if (!result.rowCount) {
    return res.status(404).json({ success: false, data: [] });
  }

  const [fruit] = result.rows;
  await redisClinet.setAsync(`fruit_${id}`, JSON.stringify(fruit));

  res.json({ success: true, data: fruit });
};

// @desc      Update fruit
// @route     PUT /fruit
exports.updateFruit = async (req, res, next) => {
  const { id, name, amount } = req.body;
  if (!(id && name && amount)) {
    return res.status(400).json({ success: false });
  }

  const result = await pgClient
    .query('UPDATE fruit SET name = $1, amount = $2 WHERE id = $3', [
      name,
      amount,
      id,
    ])
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ success: false });
    });

  if (!result.rowCount) {
    return res.status(400).json({ success: false });
  }

  await redisClinet.delAsync('all_fruit');
  await redisClinet.delAsync(`fruit_${id}`);

  res.json({ success: true });
};

// @desc      Delete fruit
// @route     DELETE /fruit/:id
exports.deleteFruit = async (req, res, next) => {
  const id = req.params.id;

  const result = await pgClient
    .query('DELETE FROM fruit WHERE id = $1', [id])
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ success: false });
    });

  if (!result.rowCount) {
    return res.status(400).json({ success: false });
  }

  await redisClinet.delAsync('all_fruit');

  res.json({ success: true });
};
