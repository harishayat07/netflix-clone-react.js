import React, { useState, useEffect } from 'react'
import './Home.scss'
import axios from 'axios';
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePlus } from "react-icons/ai"

//https://www.themoviedb.org/settings/api
//i am using API from this link 

// const apiKey = "11ee82dc83dcedd4b54b3ffadab948cf";
// const url = "https://api.themoviedb.org/3/movie";
// const imgUrl = "https://image.tmdb.org/t/p/w500";
const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />

        ))}
      </div>
    </div>
  )
};


const Home = () => {
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);


  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/upcoming?api_key=${apiKey}`);
      setUpComingMovies(results);
      //console.log(upComingMovies);
    };
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/now_playing?api_key=${apiKey}`);
      setNowPlaying(results);
    };
    const fetchPoPularMovies = async () => {
      const { data: { results } } = await axios.get(`${url}/popular?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const fetchTopratesMovies = async () => {
      const { data: { results } } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };
    fetchUpcoming();
    fetchNowPlaying();
    fetchPoPularMovies();
    fetchTopratesMovies();
  }, []);
  return (
    <section className='home'>
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "rgb(16,16,16)",
        }} >
        {popularMovies[0] ? <h1>{popularMovies[0].original_title}</h1> : <h1>None</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button><BiPlay /> Play  </button>
          <button>My List <AiOutlinePlus /> </button>
        </div>
      </div>
      <Row title={"Upcoming"} arr={upComingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Popular"} arr={popularMovies} />


    </section>
  )
};

export default Home