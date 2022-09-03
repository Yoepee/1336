import styled from "styled-components";


const Manage = () => {
    return (
        <div>
            <InfoBox>
            <div>
                <Label>
                <Input placeholder="아이디"></Input>
                </Label>
            </div>
            <div>
            <Label>
                <Input placeholder="지급 포인트"></Input>
                </Label>
            </div>
            <div>
                <Button>지급하기</Button>
            </div>
            </InfoBox>
        </div>
    )
}
export default Manage;

const InfoBox = styled.div `
width:450px;
margin: 0 auto;
margin-top: 4rem;
border : 4px solid #eee;
border-radius: 12px;
padding:12px 24px 24px 24px;
background-size: 240px;

`;

const Input = styled.input`
    width: 95%;
    height: 40px;
    line-height: 28px;
    padding: 2px 2px 2px 7px;
    border: 0 none;
    color: #8F8F91;
    vertical-align: middle;
`
const Label = styled.label `
    overflow: hidden;
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
    color: #8F8F91;
`;

const Button = styled.button `
    border: 1px solid #333;
    background: #333;
    color: #fff;
    font-size: 17px;
    padding: 13px 0;
    margin: 15px 0 0;
    width: 400px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
`;