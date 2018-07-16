import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

const styles = {
  Sticky: {
    position: 'sticky',
    top: '50%',
    transform: 'translateY(-50%)',
    alignSelf: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
  },
};

const Sticky = ({ classes, children, data, split }) => {
  const stickyStyles = {};
  if (split) {
    stickyStyles.flexBasis = `${100 - split}%`;
  }

  // style is [Object object]

  return (
    <div className={classes.Sticky} style={stickyStyles}>
      {React.cloneElement(React.Children.only(children), { data })}
    </div>
  );
};

export default connect(state => ({ data: state.core.data }))(
  injectSheet(styles)(Sticky),
);
