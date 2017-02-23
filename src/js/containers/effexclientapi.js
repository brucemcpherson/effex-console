import axios from 'axios';

export default  (function (ns) {
    
    // the api base url
    let ax; 
    
    ns.setBase = function (base) {
        ax  = axios.create({
            baseURL:base
        });
    };
    
    /**
     * turns a params object into a url
     * @param {object} params the params
     * @return {string} the uri
     */
    function makeParams (params) {
        params = params || {};
        const pa = Object.keys(params).reduce (function (p,c) {
            p.push (`${c}=${encodeURIComponent(params[c])}`);
            return p;
        },[]);
        
        return pa.length ? `?${pa.join("&")}` : "";
    }
    
    /**
     * @param {string} accountId the account id
     * @param {string} planId the plan type
     * @param {object} params the lifetime of the key in seconds
     * @return {Promise} to the result
     */
    ns.generateBoss = function (accountId, planId, params) {
        return ax.get (`/admin/account/${accountId}/boss/${planId}${makeParams(params)}`);
    };
    
    /**
     * @param {string} boss the boss key
     * @param {string} mode the type like writer/reader/updater
     * @param {object} params the params 
     * @return {Promise} to the result
     */
    ns.generateKey = function (boss, mode,params) {
        return ax.get (`/${boss}/${mode}${makeParams(params)}`);
    };
    
    /**
     * ping the service
     * @return {string} "PONG"
     */
    ns.ping = function () {
        return ax.get ('/ping');
    };
    
    /**
     * get quotas 
     * @return {object} the quotas
     */
    ns.getQuotas = function () {
        return ax.get ('/quotas');
    };
    
    /**
     * update an item
     * @param {string} id the item id
     * @param {string} updater the updater key
     * @param {object} data what to write
     * @param {string} method the to use (post,get)
     * @param {object} params the params 
     * @return {Promise} to the result
     */
    ns.update = function (id, updater, method ,data , params) {
        method = method.toLowerCase();
        params = params || {};
        
        if (method === "get") {
            params = {...params,data:data};
            return ax.get (`/updater/${updater}/${id}${makeParams(params)}`);
        }
        else if (method === "post") {
            return ax.post (`/updater/${updater}/${id}${makeParams(params)}`,{
                data:data
            });
        }
        else {
            return Promise.reject("invalid method:"+method);
        }
       
    };
    
    /**
     * @param {string} writer the writer key
     * @param {object} data what to write
     * @param {string} method the to use (post,get)
     * @param {object} params the params 
     * @return {Promise} to the result
     */
    ns.write = function (writer, method ,data , params) {
        method = method.toLowerCase();
        params = params || {};
        
        if (method === "get") {
            params = {...params,data:data};
            return ax.get (`/writer/${writer}${makeParams(params)}`);
        }
        else if (method === "post") {
            return ax.post (`/writer/${writer}${makeParams(params)}`,{
                data:data
            });
        }
        else {
            return Promise.reject("invalid method:"+method);
        }
       
    };
    
    /**
     * @param {string} id the item id
     * @param {string} writer the writer key
     * @param {object} params the params 
     * @return {Promise} to the result
     */
    ns.remove = function (id, writer  , params) {
        params = params || {};
        return ax.delete (`/writer/${writer}/${id}${makeParams(params)}`);
    };
    
    /**
     * @param {string} id the item id
     * @param {string} reader the reader key
     * @param {object} params the params 
     * @return {Promise} to the result
     */
    ns.read = function (id, reader  , params) {
        params = params || {};
        return ax.get (`/reader/${reader}/${id}${makeParams(params)}`);
    };
    
    /**
     * @param {string} coupon the coupon code
     * @return {Promise} to the result
     */
    ns.validateKey = function (coupon) {
        return ax.get (`/validate/${coupon}`);
    };
    
    /**
     * @param {string} accountId the account id
     * @param {string} authid the authid
     * @param {boolean} active whether active
     * @return {Promise} to the result
     */
    ns.registerAccount = function (accountId, authId, active) {
        return ax.post (`/admin/register/${accountId}`,{
            data:{
                authid:authId,
                active:active
            }
        });
    };
    /**
     * @param {string} accountId the account id
     * @return {Promise} to the result
     */
    ns.removeAccount = function (accountId) {
        return ax.delete (`/admin/remove/${accountId}`);
    };
    
    /**
     * @param {string} accountId the account id
     * @return {Promise} to the result
     */
    ns.pruneBosses = function (accountId) {
        return ax.delete (`/admin/prune/${accountId}`);
    };
    
    /**
     * @param {string} accountId the account id
     * @return {Promise} to the result
     */
    ns.getBosses = function (accountId) {
        return ax.get(`/admin/bosses/${accountId}`);
    };
    
    /**
     * @param {string} accountId the account id
     * @param {object} params any parameters
     * @return {Promise} to the result
     */
    ns.getStats = function (accountId,params) {
        return ax.get(`/admin/stats/${accountId}${makeParams(params)}`);
    };
    
    
    /**
     * @param {string} accountId the account id
     * @return {Promise} to the result
     */
    ns.removeBosses = function (bossKeys) {
        return ax.put(`/admin/bosses/`, {
            data:{
                keys:bossKeys
            }
        });
    };
    
    return ns;
})({});
