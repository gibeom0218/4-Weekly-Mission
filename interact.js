
//이메일 input에서 focus out 할 때, 값이 없을 경우 아래에 “이메일을 입력해 주세요.”
//이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 값이 있는 경우 아래에 “올바른 이메일 주소가 아닙니다.”

const inputel=document.querySelector('#emailinput'); //이메일 input 박스
const emailframe=document.querySelector('#emailframe'); //이메일 input 박스 frame
const errmsg=document.createElement('p'); //에러메시지
let emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //이메일 테스팅 코드

function emaininput(e){
  if(e.target.value==''){
    errmsg.textContent='이메일을 입력해 주세요.';
    emailframe.append(errmsg);
    console.log(1);
    console.log(e.target.type);
  }
  else{
    if(!emailtest.test(e.target.value)){ //이메일 확인 테스트
      errmsg.textContent='올바른 이메일 주소가 아닙니다.';
      emailframe.append(errmsg);
    }
    else{
      if(errmsg.textContent){ //만약에 올바른 이메일 주소를 작성하였으면 에러메시지 삭제
        errmsg.remove();
      }
      console.log(2);
    }
    
  }
}

inputel.addEventListener('focusout',emaininput);


//이메일: test@codeit.com, 비밀번호: codeit101 으로 로그인 시도할 경우, “/folder” 페이지로 이동합니다.