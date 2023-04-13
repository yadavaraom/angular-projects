var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');
var sql = require('mssql');

var service = {};

service.authenticate = authenticate;
service.create = create;
service.createRole=createRole;
service.executeQuery=executeQuery;
service.createPermission=createPermission;
service.createRolePermission=createRolePermission;
module.exports = service;


function authenticate(username, password) {
    var deferred = Q.defer();
    var query = `SELECT * FROM tbl_users where [USER_NAME]='${username}' and [USER_PWD]='${password}'`;
    executeQuery(query)
        .then(function (recordset) {
            //console.log("recordset===>",recordset);
            var user = recordset.recordset[0];
            if (user && user.USER_PWD && user.USER_STATUS ) {
                // authentication successful
                let result={};
                result.token=jwt.sign({ sub: user.USER_ID }, config.secret);
                result.user=user;
                deferred.resolve(result);
            } else {
                // authentication failed
                deferred.resolve();
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    return deferred.promise;
}







function createPermission(userParam) {
    console.log("userParam===>", userParam);
    var deferred = Q.defer();
    console.log("valid_query===>", userParam.PERMISSION_ID);
    if(!userParam.PERMISSION_ID){    
    var valid_query = `SELECT * FROM adss_dev.dbo.tbl_user_permissions where PERMISSION_NAME='${userParam.PERMISSION_NAME}';`;
    executeQuery(valid_query)
        .then(function (recordset) {
            console.log("recordset===>", recordset);
            let valid_user = recordset.recordset[0];
            console.log("valid_user===>", valid_user);
            if (!valid_user) {
              
                let query = `INSERT INTO adss_dev.dbo.tbl_user_permissions (PERMISSION_NAME, PERMISSION_DESC, PERMISSION_STATUS,PERMISSION_FLAG, CREATE_BY, MODIFY_BY, CREATE_ON, MODIFY_ON)
                VALUES('${userParam.PERMISSION_NAME}', '${userParam.PERMISSION_DESC}','${userParam.PERMISSION_STATUS}','Active','admin', 'admin', (getdate()), (getdate()));`;
                console.log("query==>",query);
                
                executeQuery(query)
                    .then(function (recordset) {
                        console.log("recordset query===>", recordset);

                        deferred.resolve('PERMISSION Created Successfully');

                    }).catch(function (err) {
                        deferred.reject(err);
                    });

            } else {
                // authentication failed
                console.log('permission name already exist');
                deferred.reject('permission name already exist');
                //res.status(400).send('user name already exist');
            }
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    }else{
        let PERMISSION_FLAG=userParam.PERMISSION_STATUS==true?'Active':'InActive';
        let query=`UPDATE adss_dev.dbo.tbl_user_permissions
        SET PERMISSION_NAME='${userParam.PERMISSION_NAME}', PERMISSION_FLAG='${PERMISSION_FLAG}', PERMISSION_DESC='${userParam.PERMISSION_DESC}',PERMISSION_STATUS='${userParam.PERMISSION_STATUS}',  MODIFY_BY='admin', MODIFY_ON=(getdate())
        WHERE PERMISSION_ID=${userParam.PERMISSION_ID}`;

        executeQuery(query)
                    .then(function (recordset) {
                        console.log("recordset query===>", recordset);

                        deferred.resolve('PERMISSION Updated Successfully');

                    }).catch(function (err) {
                        deferred.reject(err);
                    });

    }
    return deferred.promise;
}

function createRolePermission(userParam) {
    console.log("userParam===>", userParam);
    var deferred = Q.defer();
    let valid_query="";
    userParam.PERMISSION_arr.forEach(element => {        
        valid_query=valid_query+`INSERT INTO adss_dev.dbo.tbl_user_role_permission_map
                (ROLE_ID, PERMISSION_ID, CREATE_BY, MODIFY_BY, CREATE_ON, MODIFY_ON)
                VALUES(${userParam.ROLE_ID}, ${element}, 'admin', 'admin', (getdate()), (getdate()));`
    });

    var delete_query = `DELETE FROM adss_dev.dbo.tbl_user_role_permission_map WHERE ROLE_ID='${userParam.ROLE_ID}';`;

    executeQuery(delete_query)
        .then(function (recordset) {
            console.log('delete_query success');
        })
        .catch(function (err) {
            console.log('delete_query error');
        });


    executeQuery(valid_query)
        .then(function (recordset) {
            deferred.resolve('Assign PERMISSION to Role ');
        })
        .catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
}

function createRole(userParam) {
    console.log("userParam===>", userParam);
    var deferred = Q.defer();
    console.log("valid_query===>", userParam.ROLE_ID);
    if(!userParam.ROLE_ID){    
    var valid_query = `SELECT * FROM adss_dev.dbo.tbl_user_roles where ROLE_NAME='${userParam.ROLE_NAME}';`;
    executeQuery(valid_query)
        .then(function (recordset) {
            console.log("recordset===>", recordset);
            let valid_user = recordset.recordset[0];
            console.log("valid_user===>", valid_user);
            if (!valid_user) {
              
                let query = `INSERT INTO adss_dev.dbo.tbl_user_roles (ROLE_NAME, ROLE_DESC,ROLE_STATUS,ROLE_FLAG, CREATE_BY, MODIFY_BY, CREATE_ON, MODIFY_ON)
                VALUES('${userParam.ROLE_NAME}', '${userParam.ROLE_DESC}', '${userParam.ROLE_STATUS}','Active','admin', 'admin', (getdate()), (getdate()));`;
                console.log("query==>",query);
                
                executeQuery(query)
                    .then(function (recordset) {
                        console.log("recordset query===>", recordset);

                        deferred.resolve('Role Created Successfully');

                    }).catch(function (err) {
                        deferred.reject(err);
                    });

            } else {
                // authentication failed
                console.log('role name already exist');
                deferred.reject('role name already exist');
                //res.status(400).send('user name already exist');
            }
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    }else{
        let ROLE_FLAG=userParam.ROLE_STATUS==true?'Active':'InActive';

        let query=`UPDATE adss_dev.dbo.tbl_user_roles
        SET ROLE_NAME='${userParam.ROLE_NAME}',ROLE_FLAG='${ROLE_FLAG}', ROLE_DESC='${userParam.ROLE_DESC}',ROLE_STATUS='${userParam.ROLE_STATUS}',  MODIFY_BY='admin', MODIFY_ON=(getdate())
        WHERE ROLE_ID=${userParam.ROLE_ID}`;

        executeQuery(query)
                    .then(function (recordset) {
                        console.log("recordset query===>", recordset);

                        deferred.resolve('Role Updated Successfully');

                    }).catch(function (err) {
                        deferred.reject(err);
                    });

    }
    return deferred.promise;
}

function create(userParam) {
    console.log("userParam===>", userParam);
    var deferred = Q.defer();
    console.log("valid_query===>", userParam.USER_ID);
    if(!userParam.USER_ID){    
    var valid_query = `SELECT * FROM adss_dev.dbo.tbl_users where USER_NAME='${userParam.USER_NAME}';`;
    executeQuery(valid_query)
        .then(function (recordset) {
            console.log("recordset===>", recordset);
            let valid_user = recordset.recordset[0];
            console.log("valid_user===>", valid_user);
            if (!valid_user) {
                let user = _.omit(userParam, 'USER_PWD');

                let hash = bcrypt.hashSync(userParam.USER_PWD, 10);
                
                let query = `INSERT INTO adss_dev.dbo.tbl_users
                (USER_NAME, USER_PWD, USER_FIRST_NAME, USER_LAST_NAME, USER_STATUS,USER_FLAG, ROLE_ID, CREATE_BY, MODIFY_BY, CREATE_ON, MODIFY_ON)
                VALUES('${userParam.USER_NAME}', '${userParam.USER_PWD}', '${userParam.USER_FIRST_NAME}', '${userParam.USER_LAST_NAME}', '${userParam.USER_STATUS}','Active', ${userParam.ROLE_ID}, 'admin', 'admin', (getdate()), (getdate()));`;
                console.log("query==>",query);
                executeQuery(query)
                    .then(function (recordset) {
                        console.log("recordset query===>", recordset);

                        deferred.resolve('User Created Successfully');

                    }).catch(function (err) {
                        deferred.reject(err);
                    });

            } else {
                // authentication failed
                console.log('user name already exist');
                deferred.reject('user name already exist');
                //res.status(400).send('user name already exist');
            }
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    }else{

        let USER_FLAG=userParam.USER_STATUS==true?'Active':'InActive';
        let query=`UPDATE adss_dev.dbo.tbl_users
        SET USER_NAME='${userParam.USER_NAME}',USER_FLAG='${USER_FLAG}', USER_PWD='${userParam.USER_PWD}', USER_FIRST_NAME='${userParam.USER_FIRST_NAME}', USER_LAST_NAME='${userParam.USER_LAST_NAME}', USER_STATUS='${userParam.USER_STATUS}', ROLE_ID=${userParam.ROLE_ID}, MODIFY_BY='admin', MODIFY_ON=(getdate())
        WHERE USER_ID=${userParam.USER_ID}`;

        executeQuery(query)
                    .then(function (recordset) {
                        console.log("recordset query===>", recordset);

                        deferred.resolve('User Updated Successfully');

                    }).catch(function (err) {
                        deferred.reject(err);
                    });

    }
    return deferred.promise;
}






//Function to connect to database and execute query
function executeQuery (query) {
    var deferred = Q.defer();
    new sql.ConnectionPool(config.connectionStringmssql).connect().then(pool => {
        return pool.request().query(query)
        }).then(result => {
            sql.close();
            deferred.resolve(result);
        }).catch(err => {
            sql.close();
            deferred.reject(err);
        });      
    return deferred.promise;
}
