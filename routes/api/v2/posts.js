const expres = require('express')

const router = expres.Router();

const postsApi = require('../../../controllers/api/v2/posts_api');

router.use('/',postsApi.index);

module.exports = router;