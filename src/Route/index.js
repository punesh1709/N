import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HeaderComponent from '../Components/Header';
import HomeContainer from '../Container/Home';
import DetailsContainer from '../Container/Details';
import SearchContainer from '../Container/Search';
import PopularMoviesContainer from "../Container/Popular";
import TopRated from "../Container/TopRated";
import UpcomingContainer from "../Container/Upcoming";

const RouteComponent = () => {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>

                <Routes>
                    <Route path="/" element={<HomeContainer/>}/>
                    <Route path="/popular" element={<PopularMoviesContainer/>}/>
                    <Route path="/top-rated" element={<TopRated/>}/>
                    <Route path="/upcoming" element={<UpcomingContainer/>}/>
                    <Route path="/search" element={<SearchContainer/>}/>
                    <Route path="/details/:movieid/:mediatype" element={<DetailsContainer/>}/>
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default RouteComponent;