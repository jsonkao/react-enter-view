import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import { refreshWindowDimensions } from './../coreActions';
import Step from './Step';
import Sticky from './Sticky';
import Content from './Content';
import Container from './Container';
// import { Step, Sticky, Content, Container } from './';

const styles = {
  step: {
    backgroundColor: 'lightblue',
    padding: '100px',
  },
};

const Hi = ({ data = 300 }) => {
  return (
    <div style={{ border: '1px solid #aaa', width: '100%', height: 50 }}>
      <div
        style={{
          transitionDuration: '0.5s',
          backgroundColor: 'red',
          height: 50,
          width: data || '100%',
        }}
      />
    </div>
  );
};

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
    const { classes, data } = this.props;

    return (
      <Container split={40}>
        <Content>
          <Step datum="40%">
            <div className={classes.step}>40%</div>
          </Step>
          <Step datum="90%">
            <div className={classes.step}>90%</div>
          </Step>
          <Step datum="20%">
            <div className={classes.step}>20%</div>
          </Step>
        </Content>
        <Sticky>
          <Hi />
        </Sticky>
      </Container>
    );
  }
}

const VisibleMainApp = connect(
  (state, ownProps) => ({
    language: state.core.language,
    viewportWidth: state.core.viewportWidth,
    viewportHeight: state.core.viewportHeight,
    data: state.core.data,
  }),
  dispatch => ({
    refreshWindowDimensions: () => {
      dispatch(refreshWindowDimensions());
    },
  }),
)(injectSheet(styles)(MainApp));

export default VisibleMainApp;
