import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux/";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import axios from "axios"
//mport { __image } from "../../redux/modules/img";

import { logout } from "../../redux/modules/login";
import { __image } from "../../redux/modules/img";
import { __changeMember, __getMember, __removeMember } from "../../redux/modules/member";

//  유저 세부정보를 출력하는 페이지
const Info = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const imageInput = useRef();
    const [formData] = useState(new FormData());
    const [imageSrc, setImageSrc] = useState("");
    // 데이터받아오기
    const result= localStorage.getItem("name")
    const user = useSelector((state)=>state.member)
    // useEffect를 통한 불필요한 비동기 동작 제어
    useEffect(() => {
        if(localStorage.getItem("token1")===null){
            navigate("/login")
        }
        if(localStorage.getItem("token2")===null){
            navigate("/login")
        }else{
            dispatch(__getMember(result));
        }
    }, [dispatch]);
    const imageUpload = (fileBlob) => {
        // console.log("fileblob is", fileBlob);
        formData.append('image', fileBlob);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            }
        });

    };
    const onClickImageUpload = () => {
        imageInput.current.click();
    };
    const addHandler = async() => {
        console.log(typeof (formData));
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        await axios({
            method: "PATCH",
            url: "http://3.34.5.30:8080/api/user/image",          //백앤드 서버로 변경함
            mode: "cors",
            headers: {
                "Authorization": localStorage.getItem("token1"),
                "RefreshToken": localStorage.getItem("token2"),
                "Content-Type": "multipart/form-data"
            },
            data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })


    };
    
    
    return (

        <div>
        <UserBox>
                <InfoBox>
                <div>
                <div className="preview">
                        {imageSrc && (
                            <img
                                src={imageSrc}
                                alt="preview-img"
                                width="50%"
                                height="60%"
                            />
                        )}
                    </div>
                <Input 
                id="imagefile"
                name="imagefile"
                type="file"
                accept="image/*"
                ref={imageInput}
                style={{ display: "none" }}
                onChange={(e) => {
                    imageUpload(e.target.files[0])
                }}
                />
                </div>
                <button onClick={onClickImageUpload}>올려보자</button>
                <button onClick={()=>{addHandler()}}>올려보자2</button>
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

const Input = styled.input`
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

