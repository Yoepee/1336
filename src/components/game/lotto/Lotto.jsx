
import styled from "styled-components";
import { Form } from 'react-bootstrap';

const Lotto = () => {
    // es6문법 숫자배열 만들기
    var range = [...Array(20)].map((v, i) => i);
    // var range2 = [...Array(5).keys()].map(i => i);
    // var range3 = Array.from({length: 5}, (v,i) => i);
    return (
        
        <div>
        <LogoBox>
        <Title_logo src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb8biDm%2FbtrLhuiHAfk%2FMQ9K80EacwCII7bbKkvzuk%2Fimg.jpg"></Title_logo>
        </LogoBox>
        
            <p>로또</p>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        {range.map((num) => {
                            return (
                                <>
                                
                                <StLotto>
                                <Form.Check
                                    inline
                                    label={num+1}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                </StLotto>
                                
                                </>
                            )
                        })
                        }
                    </div>
                ))}
            </Form>
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
`;
const Title_logo = styled.img`
display: inline-block;
max-width: 100%;
box-sizing: border-box;
margin-bottom: 1rem;
`;

const StLotto = styled.div`
    padding: 4px 6px;
    font-size: 15px;
    border-radius: 15px;
    border: 1px solid #c90a0a;
    margin: 15px 8px 15px;
    background: #c90a0a;
    text-align: center;
    color: #fff;
    display: inline-block;
    line-height: normal;
    text-transform: uppercase;
    `;

