/**
 * sets up all structure to get started
 * use EC.setBase to point to the correct version of the API
 */
import configureStore from '../store/configureStore';
import {authInit} from '../actions/index';
import EC from '../containers/effexclientapi';
import ca from '../constants/auth';

const Process = (function(ns) {
    
    // populate store with initial values (there are none)
    ns.init = function () {

      // set the base url for the api- these are defined in the constants file
      EC.setBase(ca.apiBase.prod);
      
      // set up redux store
      ns.store = configureStore({});

      // set up firebase auth      
      authInit();

      // actually syncronosu, but in case it doesn't
      return Promise.resolve ();
    };


    return ns;
})({});

export default Process;
 
