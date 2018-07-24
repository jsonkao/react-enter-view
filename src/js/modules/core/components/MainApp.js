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

const MainApp = ({ classes }) => (
  <div className={classes.main}>
    <Container split={40}>
      <Content>
        <Step datum={generateData()}>
          <div className={classes.step}>one</div>
        </Step>
        <Step datum={generateData()}>
          <div className={classes.step}>two</div>
        </Step>
        <Step datum={generateData()}>
          <div className={classes.step}>three</div>
        </Step>
      </Content>

      <Sticky>
        <Graphic />
      </Sticky>
    </Container>
  </div>
);

export default injectSheet(styles)(MainApp);
