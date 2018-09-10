import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setView
} from '../actions/index';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.setNavView = this.setNavView.bind(this);
  }

  render() {
    return (
      <div className="nav">
          <div onClick={() => this.setNavView(0)} className={ngClass("option", "selected", this.props.activeView, 0)}>Playback</div>
          <div onClick={() => this.setNavView(1)} className={ngClass("option", "selected", this.props.activeView, 1)}>Lyrics</div>
          <div onClick={() => this.setNavView(2)} className={ngClass("option", "selected", this.props.activeView, 2)}>Translation</div>
      </div>
    )
  }

  setNavView = (view) => {
    this.props.setView(view);
  }

}

/**
 * Adds a class to the element when the element's index matches the active index
 * @param {string} baseValue The class that each element should have
 * @param {string} concatValue The class that only the selected element should have
 * @param {number} targetView The index of the selected value
 * @param {number} activeView The index of the element passed to the function
 */
const ngClass = (baseValue, concatValue, targetView, activeView) => {
    if (activeView === targetView)
      return baseValue + " " + concatValue;
    else 
      return baseValue
}

const mapStateToProps = (state, ownProps) => ({
  activeView: state.activeView,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setView: (index) => {
      dispatch(setView(index));
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)