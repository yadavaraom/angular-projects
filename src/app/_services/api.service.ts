import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User,Role,Permission } from '../_models';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }

    getMenuItems() {
        return this.http.get<any[]>(`api/users/getMenuItems`);
    }

    getAllUsers() {
        return this.http.get<User[]>(`api/users/allUsers`);
    }


    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    getCurrent() {
        return this.http.get(`api/users/current/`);
    }

    register(user: User) {
        return this.http.post(`api/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.USER_ID, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }


    getAllRoles() {
        return this.http.get<any[]>(`api/users/roles`);
    }

    createRole(role: Role) {
        return this.http.post(`api/users/createRole`, role);
    }

    getAllPermission() {
        return this.http.get<Permission[]>(`api/users/permission`);
    }

    createPermission(permission: Permission) {
        return this.http.post(`api/users/createPermission`, permission);
    }

    createRolePermission(data) {
        return this.http.post(`api/users/createRolePermission`, data);
    }

    getAllRolePermission() {
        return this.http.get<any[]>(`api/users/getAllRolePermission`);
    }

    getYearWisePremiumAndClaims() {
        return this.http.get<any[]>(`api/users/getYearWisePremiumAndClaims`);
    }

    getMonthWisePremiumAndClaims(data) {
        return this.http.post(`api/users/getMonthWisePremiumAndClaims`,data);
    }



    getYearWiseNoOfContractsSplittedPremiumAndClaims() {
        return this.http.post(`api/users/getYearWiseNoOfContractsSplittedPremiumAndClaims`,{});
    }

    

    getNoOfPoliciesforEachYear() {
        return this.http.post(`api/users/getNoOfPoliciesforEachYear`,{});
    }

    getDistributionOfPoliciesInYearByNetworkWise(data) {
        return this.http.post(`api/users/getDistributionOfPoliciesInYearByNetworkWise`,data);
    }

    getReports(type){
        return this.http.post(`api/users/getReports`,type);
    }

}