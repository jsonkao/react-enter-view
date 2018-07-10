import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import connect from 'react-redux/lib/connect/connect';

import { refreshWindowDimensions } from './../coreActions';
import Step from './Step';
import Sticky from './Sticky';

const styles = {
  scrolly: {
    backgroundColor: '#aaa',
    padding: '10px',
    margin: '90vh 0',
  },
  step: {
    backgroundColor: 'coral',
    padding: '100px',
    margin: '10px',
  },
};

class MainApp extends PureComponent {
  state = {
    data: 0,
  };
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };
  onResizeWindow = () => {
    this.props.refreshWindowDimensions();
  };
  componentDidMount() {
    window.addEventListener('resize', this.onResizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }
  render() {
    const { data } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.scrolly}>
        <Sticky data={data}>
          <p>Welcome to React</p>
        </Sticky>
        <Step datum={1}>
          <div className={classes.step}>step 1</div>
        </Step>
        <Step datum={2}>
          <div className={classes.step}>step 2</div>
        </Step>
        <Step datum={3}>
          <div className={classes.step}>step 3</div>
        </Step>
      </div>
    );
  }
}

const VisibleMainApp = connect(
  (state, ownProps) => ({
    language: state.core.language,
    viewportWidth: state.core.viewportWidth,
    viewportHeight: state.core.viewportHeight,
  }),
  dispatch => ({
    refreshWindowDimensions: () => {
      dispatch(refreshWindowDimensions());
    },
  }),
)(injectSheet(styles)(MainApp));

export default VisibleMainApp;
