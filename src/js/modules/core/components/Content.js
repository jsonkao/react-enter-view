import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  Content: {},
};

const Content = ({ classes, children, split }) => {
  const contentStyles = {};
  if (split) {
    contentStyles.flexBasis = `${split}%`;
  }

  return (
    <div className={classes.Content} style={contentStyles}>
      {children}
    </div>
  );
};

export default injectSheet(styles)(Content);
