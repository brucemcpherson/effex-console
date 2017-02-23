import cs from '../constants/params';
import ca from '../constants/auth';

import {
  delegateCommentary,
  delegateEveryCommentary
}
from './delegates';

const initialState = {
  
  past: {
    boss:[],
    writer:[],
    updater:[],
    reader:[],
    item:[],
    read:[],
    shared:[],
    sharedUpdate:[]
  },
  
  everything: {
    active:false,
    ready:false,
    error:"",
    commentary:"",
    things: {
      
    }
  },
  
  pageResults: {
    boss:{},
    writer:{},
    updater:{},
    reader:{},
    item:{},
    read:{},
    write:{},
    shared:{},
    sharedUpdate:{},
    tempResults:{},
    sharedRead:{},
    validate:{},
    ping:{},
    remove:{},
    service:{},
    makeEverything:{}, 
    quotas:{}
  },
  
  accountIds: ca.tutorialAccounts,
  planId:'x'
  
};

export default function(state = initialState, action) {

    // things I can delegate 
  const acts = [
    cs.actions.T_READ_ITEM,
    cs.actions.T_UPDATE_ITEM,
    cs.actions.T_RESULT,
    cs.actions.T_WRITE_ITEM,
    cs.actions.T_GENERATE_KEYS,
    cs.actions.T_VALIDATE_KEY,
    cs.actions.T_PING,
    cs.actions.T_REMOVE_ITEM,
    cs.actions.T_FETCH_QUOTAS
  ];
  
  // figure out what status is being reported
  const status = action.type.replace(/(.*)_(.*)$/, "$2");
  const act =  action.type.replace(/(.*)_(.*)$/, "$1");
  
  // common pattern for dealing with result of ecAccess
  const ecResultDelegate =  ()=>  {

    // if i dont know how to deal with it, go away
    if (acts.indexOf(act) === -1) {
      // not one of mine
      return null;
    }
    
    // i know how to dela with these.
    switch (status) {
      
      case "CLEAR": {
        state = {...state};
        state.pageResults[action.payload.pageResults] = {...initialState.everything};
        
        return state;
      }
      
      case "PENDING": {
        state = {...state};
        state.pageResults[action.payload.pageResults] = {...initialState.everything,active:true};
        return state;
      }
      
      case "FULFILLED": {

        const everything = {
          active:false,
          ready:true,
          error:"",
          commentary:delegateCommentary (action, act, status),
          things:action.payload.result
        };
        state  = {...state};
        state.pageResults[action.payload.pageResults] = everything;
        
        // it's possible this has to be added to the past history
        if (action.payload.add) {
          const sp = [...state.past[action.payload.pageResults]];
          sp.push (action.payload.result);
          state.past[action.payload.pageResults] = sp;
        }

        return state;
      }
      
      case "REJECTED": {
        const everything = {
          active:false,
          ready:true,
          error:action.payload,
          commentary:delegateCommentary (action, act, status),
          things:action.payload.result
        };
        state = {...state};
        state.pageResults[action.payload.pageResults] = everything;
        
        return state;
      }
    }
    
  };
  
  const newState = ecResultDelegate();
  if (newState) {
    return newState;
  } 

  
  switch (action.type) {
    
    
    //---generate all the keys we'd need for a tutorial
    case cs.actions.T_MAKE_EVERYTHING + "_PENDING": {

      const everything = {...initialState.everything,active:true};
      const pageResults = {...initialState.pageResults};
      return {...state , everything, pageResults};

    }
    
    case cs.actions.T_MAKE_EVERYTHING + "_FULFILLED":
      {
        
        const everything = {
          active:false,
          ready:true,
          error:"",
          commentary:delegateEveryCommentary (action, act, status),
          things:action.payload.result ? Object.keys(action.payload.result)
          .reduce ( (p,c) => {
             p[c] = action.payload.result[c].result || {};
             return p;
          },{}) : {}
        };
        const past = Object.keys (initialState.past).reduce ((p,c) => {
          if (everything.things[c]) {
            p[c] = [everything.things[c]];
          }
          return p;
        }, {});
        
        state = {...state, everything, past} ;
        state.pageResults[action.payload.pageResults] = everything;
        
        return state;
      }
      
      
    case cs.actions.T_MAKE_EVERYTHING + "_REJECTED":
      {
        const everything = {
          active:false,
          ready:true,
          error:action.payload,
          commentary:delegateCommentary (action, act, status),
          things:action.payload.result
        };
        state = {...state};
        state.pageResults[action.payload.pageResults] = everything;
        return state;
      }

  }

  return state;

  
}

