import React , { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios/index";
import { withRouter } from 'react-router-dom';

// 쿼리 스트링 파싱 함수
function parseQuery(search) {
  var args = search.substring(1).split('&');
  var argsParsed = {};
  var i, arg, kvp, key, value;
  for (i=0; i < args.length; i++) {
    arg = args[i];
    if (-1 === arg.indexOf('=')) {
      argsParsed[decodeURIComponent(arg).trim()] = true;
    }
    else {
      kvp = arg.split('=');
      key = decodeURIComponent(kvp[0]).trim();
      value = decodeURIComponent(kvp[1]).trim();
      argsParsed[key] = value;
    }
  }
  return argsParsed;
}

const WriteAreaBlock = styled.div`
  width: 1140px; padding: 0 30px; margin: 0 auto;
  
  h1 { font-size: 34px; padding: 30px 0 0 30px; margin: 0 0 30px 0; }
  
  .input-area { float: left; width: 100%; }
  .input-area + .input-area { margin: 30px 0 0; }
  .input-area label { float: left; width: 130px; font-size: 20px; line-height: 40px; color: #525252; text-align: center; }
  .input-area textarea,
  .input-area input { width: calc(100% - 130px); height: 40px; border: none; border-bottom: 2px solid #000; outline: none; font-size: 18px; color: #000; box-sizing: border-box; }
  .input-area textarea { height: 300px; padding: 15px; resize: none; }
  .input-area input:focus,
  .input-area textarea:focus { border-bottom: 2px solid #8cc1e68f; }
   
   .button-area { float: right; }
   button { margin: 25px 0 0 0; padding: 0 15px; box-sizing: border-box; height: 40px; font-size: 20px; text-align: center; line-height: 40px; border-radius: 4px; background: #8cc1e68f; color: #fff; transition: .5s background; }
  button:hover { background: #319de88f; }
   button+button { margin-left: 10px; }
`;

{/* 리스트 수정/작성 화면 */}
const TableWrite = ({type, location, match, history }) => {
  const [form, setForm] = useState({
    num: null,
    subject: '',
    content: '',
  });
  const [redirect, setRedirect] = useState(false);

  // 수정 화면일 경우 쿼리 파싱 데이터 가져옴
  useEffect(() => {
    if (type === 'modify' && !redirect) {
      const query = parseQuery(location.search);
      getOneBoard(query.num);
    } else {
      return undefined;
    }
  }, [type, redirect]);

  // 수정 화면일 경우 데이터 가져오는 함수
  const getOneBoard = async (num) => {
    try {
      const response = await axios.get(`/board/target/${num}`);
      if ( response.status === 200 && response.data.code === 1 ) {
        setForm({
          ...response.data
        });
      } else {
        alert(response.data.message);
        // history.push('/table');
        setRedirect(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // 내용 변경 이벤트
  const onChange = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    });
  };

  const handleBoardChange = async (e) => {
    const type = e.target.getAttribute('data-type');
    if (type !== 'insert' && type === 'delete' && type === 'update') {
      alert("요청이 올바르지 않습니다");
      return;
    }
    try {
      const response = await axios.post(`/board/${type}`, form);
      if ( response.status === 200 && response.data.code === 1 ) {
        alert(response.data.message);
        //history.push('/table');
        setRedirect(true);
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const onCancel = () => {
    //history.push('/table');
    setRedirect(true);
  };

  if (redirect) { return (<Redirect to="/table"/>)}

  return (
    <>
      <WriteAreaBlock>
        <h1>글쓰기~</h1>
        <form>
          <div className="input-area">
            <label>제목</label>
            <input type="text" name="subject" value={form.subject} onChange={onChange}/>
          </div>
          <div className="input-area">
            <label>내용</label>
            <textarea name="content" value={form.content} onChange={onChange}></textarea>
          </div>
        </form>
        <div className="button-area">
          {type === 'write' ? (<button data-type="insert" onClick={handleBoardChange}>완료</button>) : (<><button data-type="update" onClick={handleBoardChange}>수정</button> <button data-type="delete" onClick={handleBoardChange}>삭제</button> <button onClick={onCancel}>취소</button></>)}
        </div>
      </WriteAreaBlock>
    </>
  );
};

export default withRouter(TableWrite);