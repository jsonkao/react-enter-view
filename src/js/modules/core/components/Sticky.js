import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';

const styles = {
  Sticky: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

const Sticky = ({ classes, children, data }) => {
  return (
    <div className={classes.Sticky}>
      {React.cloneElement(React.Children.only(children), { data })}
    </div>
  );
};

export default injectSheet(styles)(Sticky);