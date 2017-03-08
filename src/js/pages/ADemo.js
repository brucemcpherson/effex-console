import React from "react";
import YouTube from 'react-youtube';
import TAWrap from '../components/layout/TAWrap';
import Article from '../components/Article';

export default class extends React.Component {

  // This will reselect the current item if the brower back is selected

  render() {

    return (
      <TAWrap location={this.props.location}>
          <Article 
            title={"Demos"}
            content={
              <span> 
                <div>
                  This short video uses Ephemeral Exchange to allow Google Sheets, Docs and Microsoft Excel to share the same data with
                  a Google Maps Webapp<br />
                </div>
                <YouTube 
                  videoId="Lxh180oqRNc"
                />
                <div><br />
                For more about implementing Ephemeral Exchange see 
                <a href="http://ramblings.mcpher.com/Home/excelquirks/ephemeralexchange">here</a>
                </div>
              </span>
            } 
            subtitle={`A 5 minute demo video`}
          /> 
      </TAWrap>
    );
  }
}
