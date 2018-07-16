import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { enterStep } from '../coreActions';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raf: null,
      ticking: false,
      element: null,
      height: 0,
      value: '',
    };
    this.refElement = React.createRef();
  }

  async componentDidMount() {
    await this.setupRaf();
    await this.setupElement();
    await this.setupEvents();
    this.updateScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, true);
    window.removeEventListener('scroll', this.onScroll, true);
  }

  getOffsetHeight = () => {
    const { height } = this.state;
    const { offset } = this.props;
    if (offset && typeof offset === 'number') {
      const fraction = Math.min(Math.max(0, offset), 1);
      return height - fraction * height;
    }
    return height;
  };

  setupRaf = () => {
    this.setState({
      raf:
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          setTimeout(callback, 1000 / 60);
        },
    });
  };

  setupElement = () => {
    this.setState({ element: this.refElement.current });
  };

  setupEvents = () => {
    window.addEventListener('resize', this.onResize, true);
    window.addEventListener('scroll', this.onScroll, true);
    this.onResize();
  };

  updateScroll = () => {
    this.setState({ ticking: false });
    let { element } = this.state;
    const { enter, exit, once, enterStep, datum } = this.props;
    const targetFromTop = this.getOffsetHeight();

    const { top, bottom } = element.getBoundingClientRect();
    const entered = top < targetFromTop && bottom > targetFromTop;

    if (entered && !element.__enter_view) {
      enter(element);
      enterStep(datum);
      if (once) return false;
    } else if (!entered && element.__enter_view) {
      exit(element);
    }

    element.__enter_view = entered;

    if (!element) {
      window.removeEventListener('scroll', this.onScroll, true);
    }
  };

  onScroll = () => {
    let { ticking, raf } = this.state;
    if (!ticking) {
      this.setState({ ticking: true });
      raf(this.updateScroll);
    }
  };

  updateHeight = () => {
    const cH = document.documentElement.clientHeight;
    const wH = window.innerHeight || 0;
    this.setState({ height: Math.max(cH, wH) });
  };

  onResize = () => {
    this.updateHeight();
    this.updateScroll();
  };

  render() {
    return React.cloneElement(this.props.children, { ref: this.refElement });
  }
}

Step.propTypes = {
  enter: PropTypes.func,
  exit: PropTypes.func,
  offset: PropTypes.number,
  once: PropTypes.bool,
};

Step.defaultProps = {
  enter: el => {
    el.style.fontWeight = 'bold';
  },
  exit: el => {
    console.log(el);
    el.style.fontWeight = 'normal';
  },
  offset: 0.5,
  once: false,
  datum: null,
};

export default connect(null, dispatch => ({
  enterStep: datum => dispatch(enterStep(datum)),
}))(Step);
