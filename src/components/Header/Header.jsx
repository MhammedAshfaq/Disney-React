import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../../features/user/userSlice'

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                navigate('/home') 
            }
        })
    }, [userName])


    //google Authentification
    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider)
                .then((responce) => {
                    console.log(responce);
                    setUser(responce.user);
                    // navigate('/home')
                }).catch((error) => {
                    alert(error.message)
                })
        } else if (userName) {
            auth.signOut().then((responce) => {
                dispatch(setSignOutState())
                navigate('/')
            }).catch((error) => {
                alert(error);
            })
        }
    }
    //inserting data in the redux
    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }))
    }

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="" />
            </Logo>
            {!userName ? (
                <Login onClick={handleAuth}>
                    Login
                </Login>
            ) : <>

                <NavMenu>
                    <a href="/">
                        <img src="/images/home-icon.svg" alt="" />
                        <span>HOME</span>
                    </a>
                    <a href="">
                        <img src="/images/search-icon.svg" alt="" />
                        <span>SEARCH</span>
                    </a>
                    <a href="">
                        <img src="/images/watchlist-icon.svg" alt="" />
                        <span>WATCHLIST</span>
                    </a>
                    <a href="">
                        <img src="/images/original-icon.svg" alt="" />
                        <span>ORIGINALS</span>
                    </a>
                    <a href="">
                        <img src="/images/movie-icon.svg" alt="" />
                        <span>MOVIES</span>
                    </a>
                    <a href="">
                        <img src="/images/series-icon.svg" alt="" />
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                <SignOut>
                    <UserImage src={userPhoto} alt="userProfile" />
                    <DropDown>
                        <span onClick={handleAuth}>Sign out</span>
                    </DropDown>
                </SignOut>

            </>}

        </Nav>
    )
}

const Nav = styled.nav`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height:70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 10px 36px;
    z-index:3;
`;
const Logo = styled.a`
    width:80px;
    padding:0;
    margin-top: 4px;
    cursor: pointer;
`;
const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    position: relative;
    margin-right: auto;
    margin-left: 40px;
    margin-top: 4px;

a{
    display: flex;
    align-items: center;
    padding: 0 5px;
    margin-right: 10px;

img{
    height: 20px; 
    cursor: pointer;
    min-width:20px;
    width:20px;
    z-index:auto;
}
span{
    color: rgb(249, 249, 249);
    font-size:13px;
    letter-spacing: 1.42px;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;

    &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
}
&:hover {
    span:before {
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
    }
  }
}

@media (max-width:768px) {
    display: none;
    
}
`;
const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;
const UserImage = styled.img`
    height:80%;
    border-radius: 50%;
    object-fit: contain;
    margin: 0 0 0 30px;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: -20px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0, 0, 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity:0;
`;
const SignOut = styled.div`
    position:relative;
    display:flex;
    height:48px;
    width:48px;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover{
        ${DropDown}{
            opacity:1;
            transition-duration: 1s;
        }
    }
`;

export default Header