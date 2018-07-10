import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { enter, exit, once } = this.props;
    const targetFromTop = this.getOffsetHeight();

    const rect = element.getBoundingClientRect();
    const top = rect.top;
    const entered = top < targetFromTop;
    if (entered && !element.__enter_view) {
      enter(element);
      if (once) return false;
    } else if (!entered && element.__enter_view && exit) {
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
  enter: () => {},
  exit: () => {},
  offset: 0,
  once: false,
};

export default Step;
