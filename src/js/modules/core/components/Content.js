import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  Content: {},
};

const Content = ({ classes, children, split }) => {
  const contentStyles = {};
  if (split) {
    contentStyles.flexBasis = `${98 - split}%`;
  }

  return (
    <div className={classes.Content} styles={contentStyles}>
      {children}
    </div>
  );
};

export default injectSheet(styles)(Content);
