import { useState } from 'react';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const jokesList = [
  {
    joke: "Why did the JavaScript developer quit his job? Because he didn't get arrays!",
    likes: 0,
  },
  {
    joke: "Why do JavaScript developers prefer promises over callbacks? Because they don't like to be kept waiting!",
    likes: 0,
  },
  {
    joke: "What's the object-oriented way to become wealthy in JavaScript? Inheritance!",
    likes: 0,
  },
  {
    joke: "Why did the JavaScript function go to therapy? It had too many anonymous functions calling it!",
    likes: 0,
  },
  {
    joke: "What's a programmer's favorite hangout place? Foo Bar!",
    likes: 0,
  },
  {
    joke: "Why did the JavaScript developer go broke? Because he lost his prototypes!",
    likes: 0,
  },
  {
    joke: "Why did the function and the array go to couples therapy? They had trouble understanding each other's scope!",
    likes: 0,
  },
  {
    joke: "Why do JavaScript programmers prefer the dark mode? Because they like to code with reduced light pollution!",
    likes: 0,
  },
  {
    joke: "What's a JavaScript developer's favorite dance move? The Callback!",
    likes: 0,
  },
  {
    joke: "Why did the JavaScript code go to rehab? Because it had too many dependencies!",
    likes: 0,
  },
];

function getRandomJoke(ignore = -1) {
  let index;

  do {
    index = Math.floor(Math.random() * jokesList.length);
  } while (index === ignore);

  return index;
}

function App() {

  const [likes, setLikes] = useState(Array(jokesList.length).fill(0))

  function updateLikes() {
    let likesCopy = [...likes]

    likesCopy[jokeIndex]++;

    setLikes(likesCopy)

    let maxInt = 0

    for (let i = 1; i < jokesList.length; i++) {
      if (likesCopy[i] > likesCopy[maxInt]) {
        maxInt = i
      }
    }

    setMostLikedJoke(maxInt)
  }


  const [jokeIndex, setJokeIndex] = useState(getRandomJoke(-1))
  const [mostLikedJoke, setMostLikedJoke] = useState(null)

  return (
    <div className="joke">
      <div className="info">
        <h1>JavaScript Jokes</h1>
        <h2>{jokesList[jokeIndex].joke}</h2>
        <div className="interactions">
          <h3><FontAwesomeIcon icon={faHeart} onClick={() => {updateLikes()}}/> {likes[jokeIndex]}</h3>
          <button onClick={() => { setJokeIndex(getRandomJoke(jokeIndex)) }}>Next Joke</button>
        </div>

        {(mostLikedJoke != null) && (
          <h4>Most Liked Joke: {jokesList[mostLikedJoke].joke} with <span>{likes[mostLikedJoke]} likes!</span></h4>
        )}

      </div>

    </div>
  )
}

export default App
