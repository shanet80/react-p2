import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/css/bootstrap.min.css";
import "../assets/css/fontawesome-all.min.css";
import "./App.css";
import {
  getCats,
  changePostListOrder,
  getPostsByCat,
  postModal,
  savePost,
  getPostDispatch
} from "../actions/actions";
import PostList from "./postList";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";
import ChangeOrder from "./ChangeOrder";
import EditPost from "./EditPost";

class App extends Component {
  componentDidMount() {
    this.props.listCategories();
  }

  render() {
    let posts = this.props.post.posts;
    let categories = this.props.category.categories;
    if (!posts) posts = [];
    if (!categories) categories = [];
    return (
      <div>
        <Router>
          <div className="container">
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
              <ChangeOrder props={this.props} />
              <button
                className="btn btn-secondary pull-right"
                onClick={() => this.props.handleModal(true)}
              >
                {" "}
                CreatePost{" "}
              </button>
            </div>
            <CreatePost
              interfaceCon={this.props.interfaceCon}
              categories={this.props.category.categories}
              handleModal={this.props.handleModal}
              handlePost={this.props.handlePost}
            />
            <div>
              <Switch>
                <Route exact path="/:cat/:postid/edit" component={EditPost} />
                <Route path="/:cat/:postid" component={PostDetail} />
                <Route exact path="/:cat" component={PostList} />
                <Route exact path="/" component={PostList} />
              </Switch>
            </div>
          </div>
        </Router>
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
    changeOrder: order => dispatch(changePostListOrder(order)),
    viewCatDispatch: cat => dispatch(getPostsByCat(cat)),
    handleModal: isOpen => dispatch(postModal(isOpen)),
    handlePost: postData => dispatch(savePost(postData)),
    getPost: id => dispatch(getPostDispatch(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
