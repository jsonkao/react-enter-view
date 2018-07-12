import React from 'react';

const Content = ({ classes, children, split }) => {
  const contentStyles = {};
  if (split) {
    contentStyles.flexBasis = `${split}%`;
  }

  return <div style={contentStyles}>{children}</div>;
};

export default Content;
