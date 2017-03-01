import React from "react";
import CopyToClipboard from 'react-copy-to-clipboard'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
export default class  extends React.Component {
  
  render() {
    // what to display
    const content = this.props.content;
    const noContent = content || this.props.noContent || "";
    
    return  content ? 
      <span>
        <span>{content}</span>
        <CopyToClipboard text={content}>
          <IconButton tooltip="copy"><FontIcon className="material-icons">content_copy</FontIcon></IconButton>
        </CopyToClipboard>
      </span> : 
      <span>{noContent}</span>;
    
  }
}
