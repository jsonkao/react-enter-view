import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  FlexContainer: {
    display: 'flex',
    border: '1px dashed #ddd',
    padding: '20px',
  },
};

const Container = ({ classes, children, split = 0 }) => (
  <div className={split && classes.FlexContainer}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { split }),
    )}
  </div>
);

export default injectSheet(styles)(Container);
