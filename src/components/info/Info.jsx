import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import axios from "axios"
import { __image, __getimage } from "../../redux/modules/image";

import { logout, __logout } from "../../redux/modules/login";

import { __changeMember, __getMember, __removeMember } from "../../redux/modules/member";

//  유저 세부정보를 출력하는 페이지
const Info = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    // 데이터받아오기
    const result= localStorage.getItem("name")
    const user = useSelector((state)=>state.member)
    const img = useSelector((state)=>state.image)
    // 이미지파일을 검사하는 정규식
    var fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    const [upload,setUpload] = useState(false)
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        // 토큰이 존재하지않으면 로그인창으로 방출
        if(localStorage.getItem("token1")===null){
            navigate("/login")
        }
        if(localStorage.getItem("token2")===null){
            navigate("/login")
        // 토큰 내용을 확인하여 이미지 및 정보를 불러옴
        }else{
            dispatch(__getMember(result));
            dispatch(__getimage());
        }
    }, [dispatch]);

    const onChange = async(e) => {
        // input file에서 선택된 file을 img로 지정
        const img = e.target.files[0];
        // 이미지 파일이 아니면 이후 동작을 생략하고 경고문구 출력
        if(!img.name.match(fileForm)){
            alert("이미지파일(.jpg, .png, .bmp)만 올려주세요.")
            return
        }
        // 폼데이터 형식 선언
        const formData = new FormData();
        // api에서 요구하는 key값과 value값 지정 (key : "image", value: 이미지파일)
        formData.append('image',img);
        // 이미지만 보내면되기때문에 더이상 append하지않고 이미지파일 전송
        dispatch(__image(formData));
        // 사진을 선택하고 사진선택기능 숨기기
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
                < CkButton onClick={()=>{
                    if(!upload) {setUpload(true);}
                    else {setUpload(false);}
                }}>프로필사진업로드</ CkButton>
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
                {/* alert를 통한 수정내용 받아오기 */}
                <Button onClick={()=>{let change = prompt('수정할 닉네임을 입력해주세요.');
            dispatch(__changeMember({nickName:change}))}}>회원수정</Button>
            <Button onClick={()=>{if(window.confirm("정말로 삭제하시겠습니까?")===true){
                dispatch(__logout());
                dispatch(logout());
                dispatch(__removeMember());
                navigate("/login");
                // window.location.replace("/login")
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
height: 150px;
border-radius: 110px;
background-size: 150px;
background-repeat: no-repeat;
background-image:url("https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg");
`

const CkButton = styled.button`
    border: 1px;
    margin: 15px 10px 15px;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    box-sizing: border-box;
    text-transform: uppercase;
`;


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
