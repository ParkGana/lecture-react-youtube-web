// 호스팅 서버
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
}
// 로컬
else {
    module.exports = require('./dev');
}