import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StarrRating from './StarrRating';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Test(){
  const [movieRating, setMovieRating] = React.useState(3);
  return (
    <>
      <StarrRating maxRating={4} 
        color={"pink"} 
        size='20'
        onSetRating={setMovieRating}
      />
      <div>This movie have gotten {movieRating} stars</div>
    </>
  )

}

root.render(
  <React.StrictMode>
    <App />
    {/* <StarrRating maxRating={10}/>
    <StarrRating maxRating={10} color={"red"} size='20' className=""/>
    <StarrRating maxRating={4} 
    color={"blue"} 
    size='20' 
    message={['bad','ok','good','excellent']}
    defaultRating={3}
    className=""/>
    <Test></Test> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
