import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import axios from "axios"
import { __image, __getimage } from "../../redux/modules/image";

import { logout } from "../../redux/modules/login";

import { __changeMember, __getMember, __removeMember } from "../../redux/modules/member";

//  유저 세부정보를 출력하는 페이지
const Info = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    // 데이터받아오기
    const result= localStorage.getItem("name")
    const user = useSelector((state)=>state.member)
    const img = useSelector((state)=>state.image)
    var fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    const [upload,setUpload] = useState(false)
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        if(localStorage.getItem("token1")===null){
            navigate("/login")
        }
        if(localStorage.getItem("token2")===null){
            navigate("/login")
        }else{
            dispatch(__getMember(result));
            dispatch(__getimage());
        }
    }, [dispatch]);

    const onChange = async(e) => {
        const img = e.target.files[0];
        if(!img.name.match(fileForm)){
            alert("이미지파일(.jpg, .png, .bmp)만 올려주세요.")
            return
        }
        const formData = new FormData();
        formData.append('image',img);
        dispatch(__image(formData));
        setUpload(false);
        // 폼데이터 들어가는 형식을 보기위한 내용
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
    }
    return (

        <div>
        <UserBox>
                <InfoBox>
                <div>
                <Input src={img?.data?.data}/>
                </div>
                {upload?
                <input 
                type='file' 
                accept='image/*' 
                name='profile_img' 
                onChange={onChange}/>
                :null}
                <button onClick={()=>{
                    if(!upload) {setUpload(true);}
                    else {setUpload(false);}
                }}>올려보자</button>
                </InfoBox>  
                <InfoBox>
            <div>
           {/* 옵셔널 체이닝을 통한 없는 데이터 나올 때 페이지 에러가 나지않도록함 */}
                <Label>
                <p>ID : {user?.data?.data?.id}</p>
                </Label>
            </div>
            <div>
            <Label>
             {/* 옵셔널 체이닝을 통한 없는 데이터 나올 때 페이지 에러가 나지않도록함 */}
                <p>닉네임 : {user?.data?.data?.nickName}</p>
            </Label>

            </div>
            <div>
            <Label>
                <p>보유코인 : {user?.data?.data?.point}</p></Label>
            </div>
            <div>
            <Label>
                <p>홀짝 승리 수 : {user?.data?.data?.winCountOfOddEven}</p></Label>
                <Label>
                <p>주사위 승리 수 : {user?.data?.data?.winCountOfDice}</p></Label>
                <Label>
                <p>로또 획득포인트 : {user?.data?.data?.earnPointOfLotto}</p></Label>
                <Label>
                <p>최대 카운트  : {user?.data?.data?.highestCountOfCounter}</p></Label>
            </div>
            </InfoBox>
            </UserBox>  

            <ButtonBox>
                <Button onClick={()=>{let change = prompt('수정할 닉네임을 입력해주세요.');
            dispatch(__changeMember({nickName:change}))}}>회원수정</Button>
            <Button onClick={()=>{if(window.confirm("정말로 삭제하시겠습니까?")===true){
                dispatch(__removeMember());
                dispatch(logout());
                navigate("/login");
            }else{return false;}
            }}>회원삭제</Button>
            </ButtonBox>
      
        </div>
        
    )
}

export default Info;

const UserBox = styled.div `
width:800px;
height:450px;
margin: 0 auto;
margin-top: 2rem;
margin-bottom: 1rem;
border : 4px solid transparent;
padding:12px 12px 12px 12px;
background-size: 240px;
background-color: #eee;
display: flex;
border-radius: 8px;
`;

const ButtonBox = styled.div `
margin: auto;
margin-top: 1rem;
margin-bottom: 2rem;

`

const Input = styled.img`
width: 150px;
margin-top:3rem;
margin-bottom: 1rem;
height: 200px;
border-radius: 50px;
background-color: #eee;
`


const InfoBox = styled.div `
width:300px;
height: 380px;
margin: 0 auto;
margin-top: 1rem;
border : 4px solid #fff;
background-color: #fff;
border-radius: 12px;
padding:12px 12px 12px 12px;
background-size: 240px;

`;
const Label = styled.label `
    overflow: hidden;
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
    border: 1px solid #eee;
    color: #8F8F91;
    text-align: left;
`;

const Button = styled.button `
    border: 1px solid #333;
    background: #333;
    color: #fff;
    border-radius: 20px;
    font-size: 17px;
    padding: 13px 0;
    margin: 15px 0 0 15px;
    width: 100px;
    display: inline-block;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
`;
