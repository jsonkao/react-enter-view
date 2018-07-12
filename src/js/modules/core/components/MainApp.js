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
    <div
      style={{
        transitionDuration: '0.5s',
        backgroundColor: 'red',
        height: 50,
        width: data,
      }}
    />
  );
};

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
    const { classes, data } = this.props;

    return (
      <Container split={40}>
        <Sticky>
          <div
            style={{
              transitionDuration: '0.5s',
              backgroundColor: 'red',
              height: 50,
              width: data,
            }}
          />
        </Sticky>
        <Content>
          <Step datum={400}>
            <div className={classes.step}>step 1</div>
          </Step>
          <Step datum={100}>
            <div className={classes.step}>step 2</div>
          </Step>
          <Step datum={200}>
            <div className={classes.step}>step 3</div>
          </Step>
        </Content>
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
