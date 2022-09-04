import styled from "styled-components";

const Lotto = () => {
    return (
        
        <div>
        <LogoBox>
        <Title_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb8biDm%2FbtrLhuiHAfk%2FMQ9K80EacwCII7bbKkvzuk%2Fimg.jpg"></Title_logo>
        </LogoBox>
        
            <p>로또</p>
        </div>
    )
}

export default Lotto;

const LogoBox = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid transparent;
padding:12px 24px 24px 24px;
background-size: 240px; 


`
const Title_logo = styled.img`
display: inline-block;
max-width: 100%;
box-sizing: border-box;
margin-bottom: 1rem;

`