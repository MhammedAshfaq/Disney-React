import React, { useEffect } from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import NewDisny from './NewDisny'
import Originals from './Originals'
import Recomments from './Recomments'
import Trending from './Trending'
import Viewers from './Viewers'

import { useDispatch, useSelector } from 'react-redux'
import db from '../../firebase'
import { setMovies } from '../../features/movie/movieSlice'
import { selectUserName } from '../../features/user/userSlice'

const Home = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisney = [];
    let originals = [];
    let trending = [];

    useEffect(() => {
        db.collection('movies').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                // console.log(recommends);
                switch (doc.data().type) {
                    case 'trending':
                        // trending.push({ id: doc.id, ...doc.data() })
                        trending = [...trending, { id: doc.id, ...doc.data() }]

                        break;
                    case 'original':
                        // originals.push({ id: doc.id, ...doc.data() })
                        originals = [...originals, { id: doc.id, ...doc.data() }]
                        break;
                    case 'recommend':
                        // recommends.push({ id: doc.id, ...doc.data() })
                        recommends = [...recommends, { id: doc.id, ...doc.data() }]
                        break;
                    case 'new':
                        // newDisney.push({ id: doc.id, ...doc.data() })
                        newDisney = [...newDisney, { id: doc.id, ...doc.data() }]
                        break;
                    default:
                        doc.data()
                }
            })
            dispatch(setMovies({
                recommend: recommends,
                newDisney: newDisney,
                original: originals,
                trending: trending,

            }))
        })
    }, [userName])

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recomments />
            <NewDisny />
            <Originals />
            <Trending />
        </Container>
    )
}

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 80px;
    padding: 10px 35px 0 35px;
    
    &:after {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
      }
`

export default Home