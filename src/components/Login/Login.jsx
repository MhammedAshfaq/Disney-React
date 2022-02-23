import React from 'react'
import styled from 'styled-components'

const Login = () => {
    return (
        <Container>
            <Content>
                <CTA>
                    <CTAlogoOne src="/images/cta-logo-one.svg" alt="" />
                    <SignUp>GET ALL THERE</SignUp>
                    <Description>Get Premier Access to Raya and thr Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/22, the proce of Disney Bundle will increase by $1</Description>
                    <CTAlogoTwo src="/images/cta-logo-two.png"/>
                </CTA>
                <BgImage />
            </Content>
        </Container>
    )
}

const Container = styled.section`
overflow: hidden;
display: flex;
flex-direction: column;
text-align: center;
height: 100vh;
`;
const Content = styled.div`
margin-bottom: 10vh;
width: 100%;
position: relative;
min-height: 100%;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100%;
padding: 80px 40px;
`;
const BgImage = styled.div`
height:100%;
background-image: url("/images/login-background.jpg");
background-position: top;
background-repeat: no-repeat;
background-size: cover;
position: absolute;
top: 0;
right: 0;
left: 0;
z-index:-1;
`;
const CTA = styled.div`
max-width: 650px;
width: 100%;
display: flex;
flex-direction: column;
`;
const CTAlogoOne = styled.img`
width:100%;
margin-bottom: 12px;
max-width: 600px;
display: block;
width: 100%;
`;
const SignUp = styled.button`
width:100%;
box-sizing: border-box;
outline: none;
border: 1px solid transparent;
background-color: #0063e5;
color: #f9f9f9;
font-weight:bold;
font-size:18px;
padding:16.5px 0;
margin-bottom: 20px;
letter-spacing: 1.5px;
border-radius: 4px;
transition: 0.2s ease-in-out;

&:hover{
    background-color:#0483ee;
}
`;
const Description = styled.p`
width:100%;
font-size: 12px;
color: hsla(0, 0%, 95.3%, 1);
line-height: 1.7;
margin: 0 0 24px;
letter-spacing: 1.7px;
margin-bottom: 40px;
`;
const CTAlogoTwo=styled.img`
max-width: 600px;
margin-bottom: 20px;
`;
export default Login