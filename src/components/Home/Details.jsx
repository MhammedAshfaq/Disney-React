import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import db from '../../firebase'

const Details = () => {
    const [movieDetails, setMovieDetails] = useState({})
    const { id } = useParams();  // this is getting params in react aapplication
    useEffect(() => {
        db.collection('movies').doc(id).get()
            .then((movieData) => {
                if (movieData.exists) {
                    setMovieDetails(movieData.data())
                } else {
                    console.log("no such document in firebase 🔥");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
    }, [id])
    console.log(movieDetails);
    return (
        <Container>
            <Background>
                <img src={movieDetails.backgroundImg} alt={movieDetails.title} />
            </Background>

            <ImageTitle>
                <img alt={movieDetails.title} src={movieDetails.titleImg} />
            </ImageTitle>

            <ContentMeta>
                <Controls>
                    <Player>
                        <img src="/images/play-icon-black.png" alt="" />
                        <span>Play</span>
                    </Player>
                    <Trailer>
                        <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
                    </Trailer>
                    <AddList>
                        <span />
                        <span />
                    </AddList>
                    <GroupWatch>
                        <div>
                            <img src="/images/group-icon.png" alt="" />
                        </div>
                    </GroupWatch>
                </Controls>
                <SubTitle>{movieDetails.subTitle}</SubTitle>
                <Description>{movieDetails.description}</Description>
            </ContentMeta>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: block;
    top: 100px;
    padding: 0 calc(3.5vw + 5px);
`;
const Background = styled.div`
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    z-index: -1;
    opacity: 0.8;

    img{
        width:100vw;
        height:100vh;
        object-fit:cover;
    }
`;
const ImageTitle = styled.div`
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    height: 30vw;
    min-height: 170px;
    padding-bottom: 24px;
    width: 100%;

    img {
        max-width: 600px;
        min-width: 200px;
        width: 35vw;
    }
`;
const ContentMeta = styled.div`
    max-width: 874px;
`;
const Controls = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height: 56px;
`;
const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 20px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 40px;
    padding: 0px 12px;
    font-size: 12px;
    font-weight: 500;
    margin: 0px 10px 0px 0px;

    img {
      width: 20px;
    }
  }
`;
const Trailer = styled(Player)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);

    &:hover {
        background: rgb(148, 148, 148);
      }
`;

const AddList = styled.div`
    margin-right: 16px;
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
        span {
            background-color: rgb(249, 249, 249);
            display: inline-block;
                &:first-child {
                    height: 2px;
                    transform: translate(1px, 0px) rotate(0deg);
                    width: 16px;
                }
                &:nth-child(2) {
                    height: 16px;
                    transform: translateX(-8px) rotate(0deg);
                    width: 2px;
                }
        }
`;
const GroupWatch = styled.div`
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
`;
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    padding: 16px 0px;
    color: rgb(249, 249, 249);

        @media (max-width: 768px) {
            font-size: 14px;
        }
`;
export default Details