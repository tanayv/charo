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
          <div onClick={() => this.setNavView(0)} className={ngClassesh("option", "selected", this.props.activeView, 0)}>Playback</div>
          <div onClick={() => this.setNavView(1)} className={ngClassesh("option", "selected", this.props.activeView, 1)}>Lyrics</div>
          <div onClick={() => this.setNavView(2)} className={ngClassesh("option", "selected", this.props.activeView, 2)}>Translation</div>
      </div>
    )
  }

  setNavView = (view) => {
    this.props.setView(view);
  }

}

const ngClassesh = (baseValue, concatValue, targetView, activeView) => {
    if (activeView == targetView)
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