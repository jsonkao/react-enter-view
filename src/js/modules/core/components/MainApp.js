import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import { refreshWindowDimensions } from './../coreActions';
import Step from './Step';
import Sticky from './Sticky';
import Content from './Content';
import Container from './Container';
import Graphic from './Graphic';

const styles = {
  main: {
    margin: '80vh 0',
  },
  step: {
    border: '1px solid #ddd',
    padding: '100px',
    margin: '200px 0',
  },
};

const generateData = () =>
  [...new Array(10)].map(row => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
  }));

class MainApp extends PureComponent {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow = () => {
    this.props.refreshWindowDimensions();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Container split={40}>
          <Content>
            <Step datum={generateData()}>
              <div className={classes.step}>red</div>
            </Step>
            <Step datum={generateData()}>
              <div className={classes.step}>green</div>
            </Step>
            <Step datum={generateData()}>
              <div className={classes.step}>blue</div>
            </Step>
          </Content>

          <Sticky>
            <Graphic />
          </Sticky>
        </Container>
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
