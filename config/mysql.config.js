// bin 2020/01/06
module.exports = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "bin",
    connectTimeout: 5000, //链接超时
    multipleStatements: false, //是否允许一个query中包含多条sql语句
    waitForConnectinos: true, //当无连接池可用时，等待(true)还是抛错(false)
    connectionLimit: 100, //连接数限制
    queueLimit: 0, //最大连接等待数(0不限制)
    timezone: "08:00"
};
