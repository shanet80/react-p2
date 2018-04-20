import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getCats, getPostsByCat } from "../actions/actions";

class Header extends Component {
  render() {
    let categories = this.props.category.categories;
    if (!categories) categories = [];
    return (
      <div className="navbar navbar-dark bg-primary">
        <Link
          className="nav-link"
          to="/"
          onClick={() => this.props.viewCatDispatch("/")}
        >
          <li className="navbar-brand">readable</li>
        </Link>
        <ul className="nav">
          {categories.map((cat, index) => (
            <Link
              className="nav-link btn-primary"
              to={"/" + cat.name}
              onClick={() => this.props.viewCatDispatch(cat.path)}
            >
              <li className="nav-link" key={index}>
                {(cat.name = cat.name)}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    listCategories: () => dispatch(getCats(dispatch)),
    viewCatDispatch: cat => dispatch(getPostsByCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
