var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('server/services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.get('/current', getCurrentUser);
router.get('/getMenuItems',getMenuItems)
router.get('/roles', getRoles);
router.get('/allUsers', getAllUsers);
router.get('/permission',getPermission)
router.get('/getAllRolePermission',getAllRolePermission);
router.post('/register', registerUser);
router.post('/createRole', createRole);
router.post('/createPermission',createPermission)
router.post('/createRolePermission',createRolePermission)

router.get('/getYearWisePremiumAndClaims',getYearWisePremiumAndClaims)
//router.post('/getMonthWisePremiumAndClaims',getMonthWisePremiumAndClaims)
router.post('/getYearWiseNoOfContractsSplittedPremiumAndClaims',getYearWiseNoOfContractsSplittedPremiumAndClaims)
router.post('/getNoOfPoliciesforEachYear',getNoOfPoliciesforEachYear)
router.post('/getMonthWisePremiumAndClaims',getMonthWisePremiumAndClaims)
router.post('/getDistributionOfPoliciesInYearByNetworkWise',getDistributionOfPoliciesInYearByNetworkWise)
router.post('/getReports',getReports)
module.exports = router;



function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function getAllUsers(req,res){

var query = `SELECT USER_ID, USER_NAME, USER_PWD, USER_FIRST_NAME,USER_FLAG, USER_LAST_NAME, USER_STATUS, u.ROLE_ID,r.ROLE_NAME, u.CREATE_BY, u.MODIFY_BY, u.CREATE_ON, u.MODIFY_ON
FROM adss_dev.dbo.tbl_users u INNER JOIN adss_dev.dbo.tbl_user_roles r ON u.ROLE_ID = r.ROLE_ID ;`;
    userService.executeQuery(query)
        .then(function (user) {
            if (user) {
                res.send(user.recordsets[0]);
            } else {
                res.send([]);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllRolePermission(req,res){
    var query = `SELECT * FROM adss_dev.dbo.tbl_user_role_permission_map`;
    userService.executeQuery(query)
        .then(function (user) {
            if (user) {
                res.send(user.recordsets[0]);
            } else {
                res.send([]);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

}

function getPermission(req, res) {
    var query = `SELECT * from adss_dev.dbo.tbl_user_permissions`;
    userService.executeQuery(query)
        .then(function (user) {
            if (user) {
                res.send(user.recordsets[0]);
            } else {
                res.send([]);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getRoles(req, res) {
    var query = `SELECT * from adss_dev.dbo.tbl_user_roles`;
    userService.executeQuery(query)
        .then(function (user) {
            if (user) {
                res.send(user.recordsets[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function getCurrentUser(req, res) {
res.send(req.session.token.user);
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function (data) {
            res.send({message:data});
        })
        .catch(function (err) {
            
            res.status(400).send(err);
        });
}

function createPermission(req, res) {
    userService.createPermission(req.body)
        .then(function (data) {
            res.send({message:data});
        })
        .catch(function (err) {
            
            res.status(400).send(err);
        });
}

function createRolePermission(req, res){
    userService.createRolePermission(req.body)
        .then(function (data) {
            res.send({message:data});
        })
        .catch(function (err) {
            
            res.status(400).send(err);
        });
}

function createRole(req, res) {
    userService.createRole(req.body)
        .then(function (data) {
            res.send({message:data});
        })
        .catch(function (err) {
            
            res.status(400).send(err);
        });
}



function getYearWisePremiumAndClaims(req, res) {
    var query = `select IIF(prm.policy_year IS NULL, clm.claim_year, prm.policy_year) as member_year,
    IIF(prm.total_gross_premium is null, 0, prm.total_gross_premium) as total_premium_amt, 
    IIF(clm.total_approved_claim is null, 0, clm.total_approved_claim) as total_claim_amt  
    from (select year(member_effective_date) as policy_year, sum(GROSS_PREMIUM) as total_gross_premium from tblpolicy_Data_New where policy_type='G' group by year(member_effective_date)) prm
    full outer join (select year(TREATMENT_TRANSACTION_DATE) as claim_year, sum(TOTAL_APPROVED) as total_approved_claim from tblClaims_Data_New where policy_type='GROUP' group by year(TREATMENT_TRANSACTION_DATE)) clm on prm.policy_year = clm.claim_year
    order by member_year asc`;
    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let result_data=result.recordsets[0];
                res.send(result_data);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getMonthWisePremiumAndClaims(req, res) {
    var query = `select IIF(prm.policy_month IS NULL, clm.claim_month, prm.policy_month) as member_month,
    IIF(prm.total_gross_premium is null, 0, prm.total_gross_premium) as total_premium_amt, 
    IIF(clm.total_approved_claim is null, 0, clm.total_approved_claim) as total_claim_amt  
    from (select month(member_effective_date) as policy_month, sum(GROSS_PREMIUM) as total_gross_premium from tblpolicy_Data_New where policy_type='G' and year(member_effective_date)=2016 group by month(member_effective_date)) prm
    full outer join (select month(TREATMENT_TRANSACTION_DATE) as claim_month, sum(TOTAL_APPROVED) as total_approved_claim from tblClaims_Data_New where policy_type='GROUP' and year(TREATMENT_TRANSACTION_DATE)=2016 group by month(TREATMENT_TRANSACTION_DATE)) clm on prm.policy_month = clm.claim_month
    order by member_month asc`;
    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let result_data=result.recordsets[0];
                res.send(result_data);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// year wise no.of contracts splitted from premium and claims point of view
function getYearWiseNoOfContractsSplittedPremiumAndClaims(req, res) {
    console.log("getYearWiseNoOfContractsSplittedPremiumAndClaims");
    var query = `select IIF(prm.policy_year IS NULL, clm.claim_year, prm.policy_year) as client_year,
    IIF(prm.prm_client_count is NULL, 0, prm.prm_client_count) as prm_clients,
    IIF(clm.clm_client_count is NULL, 0, clm.clm_client_count) as clm_clients
    from (select year(POLICY_EFFECTIVE_DATE) as policy_year, count(distinct(contract_number)) as prm_client_count from tblpolicy_Data_New where policy_type='G' group by year(POLICY_EFFECTIVE_DATE)) prm
    full outer join(select year(TREATMENT_TRANSACTION_DATE) as claim_year, count(distinct(contract_number)) as clm_client_count from tblClaims_Data_New where policy_type='GROUP' group by year(TREATMENT_TRANSACTION_DATE)) clm on prm.policy_year = clm.claim_year
    order by client_year asc`;
    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let result_data=result.recordsets[0];
                let result_dataset={};
                result_dataset.year_clients=[];
                result_dataset.prm_clients=[];
                result_dataset.clm_clients=[];
                result_data.forEach(element => {
                    result_dataset.year_clients.push(element.client_year);
                    result_dataset.prm_clients.push(element.prm_clients);
                    result_dataset.clm_clients.push(element.clm_clients);
                });
                res.send(result_dataset);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
// function getNoOfPoliciesforEachYear(req,res){
//     var query = `select year(policy_effective_date) as policy_year, count(distinct(policy_number)) as policies_count from tblpolicy_Data_New where policy_type='G' group by year(policy_effective_date)`;
//     userService.executeQuery(query)
//         .then(function (result) {
//             if (result) {
//                 let result_data=result.recordsets[0];
//                 let result_dataset={};
//                 result_dataset.policy_year=[];
//                 result_dataset.policies_count=[];
//                 result_data.forEach(element => {
//                     result_dataset.policy_year.push(element.policy_year);
//                     result_dataset.policies_count.push(element.policies_count);
//                 });
//                 res.send(result_dataset);
//             } else {
//                 res.sendStatus(404);
//             }
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }

async function getNoOfPoliciesforEachYear(req,res){
    console.log("getNoOfPoliciesforEachYear 11");
    var query = `select year(policy_effective_date) as policy_year, count(distinct(policy_number)) as policies_count from tblpolicy_Data_New where policy_type='G' group by year(policy_effective_date) ORDER by policy_year`;
    userService.executeQuery(query)
        .then( function (result) {
            if (result) {
                let sub_arr=[];
                let result_data=result.recordsets[0];
                let result_dataset={};
                result_dataset.parent_data=[];
                result_dataset.child_data=[];
                console.log("getNoOfPoliciesforEachYear 22");
                result_data.forEach(async element => {
                    console.log("getNoOfPoliciesforEachYear 33");
                    //result_dataset.policy_year.push(element.policy_year);
                    await getDistributionOfPoliciesInYearByNetworkWise(element.policy_year,(mydata)=>{
                        //console.log("mydata==>",mydata);
                    sub_arr.push(mydata);
                    if(result_data.length==sub_arr.length){
                        let parent_data=result_data.map(function(value) {
                            return {
                                name:value.policy_year,
                                y:value.policies_count,
                                drilldown:value.policy_year
                            } 
                        });
                        result_dataset.parent_data=parent_data;
                        result_dataset.child_data=sub_arr;
                      //console.log("chart_data ddd==>",result_dataset); 
                      res.send(result_dataset);

                        }                                    
                   });
                    //result_dataset.policies_count.push(element.policies_count);
                });
                //res.send(result_dataset);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getDistributionOfPoliciesInYearByNetworkWise(param,cb){
    console.log("getDistributionOfPoliciesInYearByNetworkWise==>",param);
    var query = `select distinct(NETWORKDESC), count(distinct(policy_number)) as policies_count from tblpolicy_Data_New where policy_type='G' and year(policy_effective_date)='${param}' group by NETWORKDESC order by NETWORKDESC`;
    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let data=result.recordsets[0];
                let data_arr=[];
                for(v of data){
                  data_arr.push([v.NETWORKDESC,v.policies_count]); 
                }
              let mydata = {
                      id:param,
                      data: data_arr                     
                };
              cb(mydata);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function getMonthWisePremiumAndClaims(req,res){
    var query = `select year(policy_effective_date) as policy_year, count(distinct(policy_number)) as policies_count from tblpolicy_Data_New where policy_type='G' group by year(policy_effective_date)`;
    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let result_data=result.recordsets[0];
                let result_dataset={};
                result_dataset.policy_year=[];
                result_dataset.policies_count=[];
                result_data.forEach(element => {
                    result_dataset.policy_year.push(element.policy_year);
                    result_dataset.policies_count.push(element.policies_count);
                });
                res.send(result_dataset);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getReports(req, res) {
    //Ageband Utilization Report
    //Network Wise Utilization Report
    //Relation Wise Utilization Report
    //Benefit Wise Utilization
    //Gender Wise Utilization
    //Claims Type Wise Utilization
    //Month Wise Utilization
//     SELECT r.ROLE_ID, r.ROLE_NAME,p.PERMISSION_NAME
// FROM tbl_user_roles as r 
// INNER JOIN tbl_user_role_permission_map as m  ON r.ROLE_ID = m.ROLE_ID
// INNER JOIN tbl_user_permissions as p On p.PERMISSION_ID = m.PERMISSION_ID
    let param=req.body.param;
    var query = ``;
    console.log("getReports",param);

    if(param=='Ageband'){
        query=`select AgeBand, sum(payable_net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by AgeBand ORDER by AgeBand`;
    }else if(param=='Network'){
        query=`select NETWORK_DESCRIPTION, sum(payable_net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by NETWORK_DESCRIPTION`;
    }else if(param=='Relation'){
        query=`select RELATION, sum(payable_net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by RELATION`;
    }else if(param=='Benefit'){
        query=`select TYPE_OF_CLAIM, sum(payable_net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by TYPE_OF_CLAIM`;
    }else if(param=='Gender'){
        query=`select GENDER, sum(payable_Net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by GENDER`;
    }else if(param=='Claims'){
        query=`select TYPE_OF_CLAIM, sum(payable_Net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by TYPE_OF_CLAIM`;     
    }else if(param=='Month'){    
        query=`select DATENAME(MONTH,ADMIT_DATE) as ClaimMonth, sum(payable_Net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by DATENAME(MONTH,ADMIT_DATE)
        `;
    }else if(param=='territory'){    
        query=`select Region, sum(payable_net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by Region order by NetPaidClaimAmt desc`;
    }else if(param=='Nationality'){    
        query=`select Nationality, sum(payable_net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by Nationality order by NetPaidClaimAmt desc`;
    }else if(param=='Service'){    
        query=`select servicedescription, sum(payable_Net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by servicedescription order by NetPaidClaimAmt desc`;
    }else if(param=='Hospital'){    
        query=`select  claimyear, sum(payable_Net) as NetPaidClaimAmt, sum(RejectedAmount) as RejectedClaimAmt from avid_claims_data_17sep2018 group by claimyear order by claimyear
        `;
    }else if(param=='Diagnosis'){    
        query=`select DISEASE_DESCRIPTION, sum(payable_Net) as NetPaidClaimAmt from avid_claims_data_17sep2018 group by DISEASE_DESCRIPTION order by NetPaidClaimAmt desc`;
    }

    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let result_data=result.recordsets[0];
                // let result_dataset={};
                // result_dataset.year_clients=[];
                // result_dataset.prm_clients=[];
                // result_dataset.clm_clients=[];
                // result_data.forEach(element => {
                //     result_dataset.year_clients.push(element.client_year);
                //     result_dataset.prm_clients.push(element.prm_clients);
                //     result_dataset.clm_clients.push(element.clm_clients);
                // });
                res.send(result_data);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getMenuItems(req,res){
    console.log("getMenuItems==>",req.session.token.user);
    let ROLE_ID=req.session.token.user.ROLE_ID;
    let query=`SELECT r.ROLE_ID, r.ROLE_NAME,p.PERMISSION_NAME
    FROM tbl_user_roles as r 
    INNER JOIN tbl_user_role_permission_map as m  ON r.ROLE_ID = m.ROLE_ID
    INNER JOIN tbl_user_permissions as p On p.PERMISSION_ID = m.PERMISSION_ID where r.ROLE_ID=${ROLE_ID}`;
    //console.log();
    userService.executeQuery(query)
        .then(function (result) {
            if (result) {
                let result_data=result.recordsets[0];
               
                res.send(result_data);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}