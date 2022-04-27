import React, { useState } from 'react';
import Input from '../../components/user/Input';
import Button from '../../components/user/Button';
import { CheckId, CheckNickName } from '../../components/user/UserAxios';
import './User.css';

function SignUp() {

  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  async function emailValidation() {
    const idCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
    const check = /^([a-zA-Z0-9]){5,20}$/

    if (id === "") {
      setIdMessage("아이디를 입력해 주세요")
      return
    } 

    if (!idCheck.test(id)) {
      setIdMessage("아이디는 5~20자 사이의 영문/숫자를 조합해 주세요")
      return
    }

    if (!check.test(id)) {
      setIdMessage("아이디에는 영문 혹은 숫자만 입력해 주세요")
      return
    }

    await CheckId(id)
    .then((response) => {
      console.log("아이디 중복 여부 확인 성공")

      if (response.data === true) {
        setIdMessage("")
        return true
      }

      setIdMessage("이미 존재하는 아이디 입니다")
    })
    .catch(() => {
      console.log("아이디 중복 여부 확인 실패")
    })
  }
  
  async function nickNameValidation() {
    const nickNameCheck = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,20}$/;
    
    if (nickName === "") {
      setNickNameMessage("닉네임을 입력해 주세요")
      return
    } 

    if (!nickNameCheck.test(nickName)) {
      setNickNameMessage("영문, 숫자, 한글로 이루어진 2~20자 사이로 입력해 주세요")
      return
    } 

    await CheckNickName(nickName)
    .then((response) => {
      console.log("닉네임 중복 여부 확인 성공")

      if (response.data === true) {
        setNickNameMessage("")
        return true
      }

      setNickNameMessage("이미 존재하는 닉네임 입니다")
    })
    .catch(() => {
      console.log("닉네임 중복 여부 확인 실패")
    })
  }
  
  async function passwordValidation() {
    const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/;
    const specialCheck = /^([a-zA-Z0-9!?@]){4,20}$/

    if (password === "") {
      setPasswordMessage("비밀번호를 입력해 주세요")
      return
    } 
    
    if (!passwordCheck.test(password)) {
      setPasswordMessage("비밀번호는 4~20자 사이의 영문/숫자를 조합해 주세요")
      return
    } 

    if (!specialCheck.test(password)) {
      setPasswordMessage("특수문자는 !, ?, @ 중에서 입력해 주세요")
      return
    }

    setPasswordMessage("")
    return true

  }
  
  async function passwordConfrimValidation() {

    if (password !== passwordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다")
      return
    }

    setPasswordConfirmMessage("")
    return true
  }

  function deleteAll(event) {
    event.preventDefault();
    console.log("모두 지우기")
    setId("");
    setNickName("");
    setPassword("");
    setPasswordConfirm("");
    setIdMessage("");
    setNickNameMessage("");
    setPasswordMessage("");
    setPasswordConfirmMessage("");
  }
  
  async function checkAll(event) {
    event.preventDefault();
    const emailCheck = await emailValidation();
    const nickNameCheck = await nickNameValidation();
    const passwordCheck = await passwordValidation();
    const passwordConfirmCheck = await passwordConfrimValidation();
    if (emailCheck && nickNameCheck && passwordCheck && passwordConfirmCheck) {
      console.log("회원가입 완료")
    } else {
      console.log("회원가입 실패")
    }
  }
  
  return (
    <div className="User">
      <div style={{ fontSize: "30px", fontWeight: "500" }}>회원가입</div>
      <form>
        <Input 
          type="text" 
          title="아이디(필수)" 
          setInput={setId} 
          value={id} 
          message={idMessage}
          placeholder="아이디를 입력해 주세요" 
        />
        <Input 
          type="text" 
          title="닉네임(필수)" 
          setInput={setNickName} 
          value={nickName}
          message={nickNameMessage}
          placeholder="2~20자로 입력해 주세요" 
        />
        <Input 
          type="password" 
          title="비밀번호(필수)" 
          setInput={setPassword} 
          value={password}
          message={passwordMessage}
          placeholder="4~20자의 영문/숫자를 조합해 주세요" 
        />
        <Input 
          type="password" 
          title="비밀번호 확인(필수)" 
          setInput={setPasswordConfirm} 
          value={passwordConfirm}
          message={passwordConfirmMessage}
          placeholder="비밀번호를 한 번 더 입력해 주세요"  
        />
        <div className="User-button-group">
          <Button clickFunction={deleteAll} title="모두 지우기" type="cancel" />
          <Button clickFunction={checkAll} title="회원가입 하기" type="success" />
        </div>
      </form>
    </div>
  )
}

export default SignUp