import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/css/bootstrap.min.css";
import "../assets/css/fontawesome-all.min.css";
import "./App.css";
import {
  getCats,
  changePostListOrder,
  postModal,
  savePost
} from "../actions/actions";
import Header from "./Header";
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
    if (!posts) posts = [];
    return (
      <div>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div className="row">
                    <ChangeOrder props={this.props} />
                    <div className="offset-sm-6 col-sm-2">
                      <button
                        className="btn btn-secondary pull-right"
                        onClick={() => this.props.handleModal(true)}
                      >
                        Create Post
                      </button>
                    </div>
                  </div>
                )}
              />
              <Route
                exact
                path="/:cat"
                render={() => (
                  <div className="row">
                    <ChangeOrder props={this.props} />
                    <div className="offset-sm-6 col-sm-2">
                      <button
                        className="btn btn-secondary pull-right"
                        onClick={() => this.props.handleModal(true)}
                      >
                        Create Post
                      </button>
                    </div>
                  </div>
                )}
              />
            </Switch>
            <CreatePost
              interfaceConst={this.props.interfaceConst}
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
    handleModal: isOpen => dispatch(postModal(isOpen)),
    handlePost: postData => dispatch(savePost(postData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
