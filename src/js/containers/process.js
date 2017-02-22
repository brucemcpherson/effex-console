import configureStore from '../store/configureStore';
import {authInit} from '../actions/index';

const Process = (function(ns) {

    
    // populate store with initial values (there are none)
    ns.init = function () {

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
 
