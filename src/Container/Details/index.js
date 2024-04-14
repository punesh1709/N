import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './details.css';
import axios from 'axios';
import DarkVariantExample from '../../Components/Carousel';
import {img_300, img_not_available} from '../../Config';

const DetailsContainer = () => {
    const params = useParams();
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const [credits, setCredits] = useState();
    const titleName = content && content.name && content.name !== '' ? content.name : content && content.title && content.title !== '' ? content.title : '';


    // console.log('params', params);
    const id = params.movieid || '';
    const _media_type = params && params.mediatype && params.mediatype !== '' ? params.mediatype.toLowerCase() : '';
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    const fetchData = async () => {
        try {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
            setContent(data);
            //console.log('fetchData details',  data);
        } catch (error) {
            console.error(error)
        }
    }
    const fetchVideo = async () => {
        try {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
            setVideo(data.results[0]?.key);
            //console.log('fetchVideo',  data);
        } catch (error) {
            console.error(error)
        }
    }

    const creditsFetch = async () => {
        try {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
            setCredits(data.cast);
            // console.log('sdata', data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        creditsFetch();
        //eslint-disable-next-line
    }, [])


// backdrop_path


    const renderDataHtml = () => {
        const ImageURL = content.poster_path ? img_300 + content.poster_path : img_not_available;
        
        const tagline = content.tagline || '';
        const vote_average = content.vote_average || "";
        const overview = content.overview;
        const first_air_date = content.first_air_date || content.release_date;
        const runtime = content.runtime || '';
        const genres = content.genres && content.genres.length > 0 ? content.genres.map((item) => <span
            key={item.id}>{item.name}</span>) : '';


        // console.log(content.runtime)
        return (
            <Row>
                <Col className='col-12'>
                    <h1 className="text-center">
                        {titleName}
                        {
                            tagline && tagline !== '' ? <small> {tagline}</small> : ''
                        }
                    </h1>
                </Col>
                <Col className='col-12 col-xl-6'>
                    <div className='card card--details'>
                        <div className='card__cover'>
                            <img src={ImageURL} alt="myimage"/>
                        </div>
                        <div className='card__content'>
                            <div className="card__wrap">
                                <span className="card__rate"> {vote_average} </span>
                            </div>
                            <ul className="card__meta">
                                <li>
                                    <span>Run time:</span>
                                    <span className='linkTag'>{runtime} min</span>
                                </li>
                                 <li>
                                    <span>Genre:</span>
                                    <span className='linkTag'>{genres}</span>
                                </li>
                                <li><span>Release Date:</span> <span className='linkTag'>{first_air_date}</span></li>

                            </ul>
                            <h2 className="text-center pt-5"> Overview</h2>
                                <div className="description_readmore_wrapper ">
                                    {overview}
                                </div>
                        </div>
                    </div>
                </Col>
                {/* <Col className='col-12 col-xl-6'>
                    <div className='frameSec'>

                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </div>
                </Col> */}
               
            </Row>
        )
    }
    return (
        <>
            <main className='detailsPage'>
                <Container>
                    {
                        titleName && titleName !== '' ? renderDataHtml() : 'Loading...'
                    }

                </Container>
                <section className='section'>
                    <div className='contentHead'>
                        <Container>
                            <Row>
                                <Col className='col-12'>
                                    {
                                        credits && credits.length > 0 ?
                                            <DarkVariantExample data={credits}/> : 'Lading data...'
                                    }

                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
            </main>
        </>
    )
}

export default DetailsContainer;