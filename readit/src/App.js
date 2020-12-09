import React from 'react';
import './components/PostForm'
import './App.css';
import PostForm from './components/PostForm';
import Posts from './components/MainPage'
import Post from './components/Post'
import Header from './components/Header'
import Login from './components/Login'
import SubPage from './components/SubPage'
import SubForm from './components/SubForm'
import { Route } from 'react-router-dom'
import MainPage from './components/MainPage';

function App() {
  return (
    <div>
      <Header />

      {/* allows component to re-render even if already inside component by passing in random key */}
      <Route
        exact path="/"
        render={(props) => <MainPage key={props.location.key} />}
      />

      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/post/:id'>
        <Post />
      </Route>
      <Route exact path='/postform'>
        <PostForm />
      </Route>
      <Route exact path='/r/:id'>
        <SubPage />
      </Route>

      <Route exact path='/subform'>
        <SubForm />
      </Route>
    </div>
  );
}
//

export default App;
