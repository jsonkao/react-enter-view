import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

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
    backgroundColor: 'lightblue',
    padding: '100px',
  },
};

const Hi = ({ data }) => <p>data: {data}</p>;

class MainApp extends PureComponent {
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
    const { classes } = this.props;

    return (
      <div className={classes.scrolly}>
        <Sticky>
          <Hi />
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
