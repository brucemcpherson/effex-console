import React from "react";

import XCard from '../XCard';
import TANotExecuted from './TANotExecuted';


export default class  extends React.Component {
  
  render() {
    const pr = this.props.pageResults;
    const config = pr && pr.ready && pr.things ? pr.things.config : null;
   
    return (

        <XCard
          initiallyExpanded = {false}
          expanded = {pr && pr.ready ? true:false}
          title={"API request"}
          subtitle={"you can copy this url to repeat the operation somewhere else. GET operations can be done directly from the browser"}
          content =
            {pr && pr.ready ?               
              <span>{config ? config.url : "not available"}</span> : 
              <TANotExecuted />
            }
         />
        
    );
  }
}
