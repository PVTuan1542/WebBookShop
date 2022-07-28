module.exports = {
    mutipleSqlToObject: function (sqlArray) {
        return sqlArray.map(sqlArray => sqlArray.toObject());
    },
    sqlToObject: function (sqlArray) {
        //return sqlArray ? sqlArray.toObject() : sqlArray;
        var obj = sqlArray.reduce(function (acc, cur, i) {
            acc[i] = cur;
            return acc;
        }, {});
        
        return obj;
    }
}