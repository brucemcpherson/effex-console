import React from "react";

import {
  acRangeFinish,
  acRangeStart,
  acRangePeriod,
  acAccountsSelectedRows,
  acFetchBosses,
  dispatchStats 
}
from '../../actions/index';

import moment from 'moment';
import XSelect from '../XSelect';
import DatePicker from 'material-ui/DatePicker';

export default class extends React.Component {


  /**
   * called to handle account change
   * This value tracks on the console page too
   * so this is a dispatch process that's shared
   */
  handleAccountChange = (value) => {
    
    // the new account
    const ad = acAccountsSelectedRows  ( {
      selectedItems:[value], 
      pageResults:"accounts"
    });
    
    if (ad) {
      this.props.dispatch(ad);
    }
    
    // and its boss keys
    const ab = acFetchBosses({
      pageResults:"bosses",
      accountId:value
    });
    
    if (ab) {
      this.props.dispatch(ab);
    }
    // need a fetch stats here...
    dispatchStats (value, this.props.stats.ranges.start, this.props.stats.ranges.finish);
    
  }

  
  
  render() {
    
    const props = this.props;

    // we'll use the selected account later
    const place = props.accounts.pageResults.accounts;
    const selectedAccount = place.selectedItems ? place.selectedItems[0] : "";

    const itemStyle = {
      display:'inline-block',
      marginRight:8
    };
    const dropperJsx = <XSelect 
      options={Object.keys(place.data || {})}
      value={selectedAccount}
      onChange={this.handleAccountChange}
      label={"API usage for account"}
      style={itemStyle}
    /> ;
    
    const minDate = new Date(new Date(2017,1,1));
    const maxDate = new Date();
    
    const startJsx = <DatePicker
      floatingLabelText="Start date"
        autoOk={true}
        minDate={minDate}
        maxDate={maxDate}
        container="inline"
        style={itemStyle}
        value={this.props.stats.ranges.start}
        onChange={(e,value) => {
        
          this.props.dispatch  (acRangeStart(selectedAccount,moment(value).startOf('day').toDate(),this.props.stats.ranges.finish)); 
          
        }}
        formatDate={(d)=>moment(d).format("ll")}
        mode={"landscape"}
      />;
    
    const finishJsx = <DatePicker
      floatingLabelText="Finish date"
        autoOk={true}
        minDate={this.props.stats.ranges.start}
        maxDate={maxDate}
        container="inline"
        style={itemStyle}
        value={this.props.stats.ranges.finish}
        onChange={(e,value) => {
          this.props.dispatch  (acRangeFinish(selectedAccount,this.props.stats.ranges.start,moment(value).endOf('day').toDate()));
        }}
        formatDate={(d)=>moment(d).format("ll")}
        mode={"landscape"}
      />;
    
      const periodJsx = <XSelect 
        label="Measurement period" 
        style={itemStyle}
        value ={this.props.stats.ranges.period}
        onChange={(value) => {
          this.props.dispatch(acRangePeriod(value));
        }}
        options = {["hour","day","week","month"]}
      />;
      
    // now render  .. this calls a generalized version so there are quite a few props
    return  ( 
      <span>
        {dropperJsx}
        {startJsx}
        {finishJsx}
        {periodJsx}
    </span>);
  }
}