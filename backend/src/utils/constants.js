const { env } = require("../configs/environment");

// Những domain được phép truy cập tới tài nguyên server
const WHITELIST_DOMAINS = [env.API_LOCAL_URL];

module.exports = WHITELIST_DOMAINS;
