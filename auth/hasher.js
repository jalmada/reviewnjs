var crypto = require('crypto');

createSalt = () => {
    var len = 8;
    return crypto.randomBytes(Math.ceil(len/2)).toString('hex').substr(0, len);
}

computeHash = (source, salt) => {
    var hmac = crypto.createHmac("sha1", salt);
    var hash = hmac.update(source);
    return hash.digest("hex");
}

module.exports = {
    createSalt: createSalt,
    computeHash: computeHash
};