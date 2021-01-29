import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios/index";
import TableItem from "./TableItem";

const Left = styled.div`
  width: 1200px; height: 100%; margin: auto;
  
  h1 { font-size: 34px; padding: 30px 0 0 30px; }
  
  table { float: left; width: 100%; border-collapse: collapse; margin: 15px 0 0; }
  table thead tr th.row1 { width: 5% }
  table thead tr th.row2 { width: 20% }
  table thead tr th.row3 { width: 40% }
  table thead tr th.row4 { width: 17.5% }
  table thead tr th.row5 { width: 17.5% }
  
  table thead tr th { font-size: 20px; line-height: 40px; background: #8cc1e68f; color: #fff; border: 1px solid #e7e7e7; }
  table thead tr th:first-child { border-left: 0; }
  table thead tr th:last-child { border-right: 0; }
  table tbody tr { cursor: pointer }
  table tbody tr:hover { background: #e7e7e7; }
  table tbody tr th { font-size: 18px; line-height: 38px; border: 1px solid #e7e7e7; border-left: 0; text-align: center; }
  table tbody tr td { font-size: 15px; text-align: center; border: 1px solid #e7e7e7; }
  table tbody tr td:last-child { border-right: 0; }
`;

const WriteButtonBlock = styled.div`
  a { float: right; margin: 15px 0; padding: 0 15px; font-size: 15px; line-height: 24px; background: #8cc1e68f; color: #fff; border-radius: 4px; transition: .5s background; }
  a:hover { background: #319de88f; }
`;

const SelectBoxBlock = styled.div`
  select { float: right; font-size: 15px; margin: 15px 0 0 0; padding: 0 0 0 0; text-align: left; width: 60px; outline: none; border-radius: 3px; }
`;

const PagingButtonBlcok = styled.div`
  float: left;
  margin: 15px 0 0 5px;
  
  button { width: 30px; height: 30px; color: #525252; border: 1px solid #e7e7e7; border-radius: 4px; transition: .5s background; }
  button:hover { background: #319de88f; }
  button + button { margin: 0 0 0 10px; }
  .page-num { background: #8cc1e68f; cursor: auto; }
`;

{/* 리스트 컴포넌트 */}
const Table = () => {
  const [loading, setLoading] = useState(false); // 로딩중 상태값
  const [tableData, setTableData] = useState([]); // 리스트 정보
  const [totalNum, setTotalNum] = useState(0); // 총 리스트 갯수
  const [pagingListData, setPagingListData] = useState([]);
  const [pagingData, setPaginData] = useState({
    listNum: 10,
    pageNum: 1
  }); // 페이징 처리 정보

  useEffect(() => {
     getTableData();
  }, [pagingData]);

  // 페이징 정보 변경시 리스트 정보 불러와서 수정
  const getTableData = async () => {
    setLoading(true);
    try {
      const query = (pagingData.pageNum ? `pageNum=${pagingData.pageNum}&` : '') + (pagingData.listNum ? `listNum=${pagingData.listNum}` : '');
      const response = await axios.get(`/board/list?${query}`);
      // console.log(response.data.boarListVO);
      if ( response.status === 200 && response.data.code === 1) {
        setTableData(response.data.boarListVO);
        setTotalNum(response.data.totalNum);
      }
      setPagingListData(getButtonList(response.data.totalNum, pagingData));
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  /*
  * 페이징 목록에 뿌려질 값 계산 함수
  * 현재 페이지 수 포함 3개의 페이징 버튼 출력
  * 1 또는 마지막 페이지로 가는 버튼이 없을 경우 왼쪽/오른쪽 버튼 추가
  */
  const getButtonList = (totalNum, pagingData) => {
    let result = [];
    const crNum = pagingData.pageNum;
    result.push(pagingData.pageNum);
    if (crNum - 1 > 0) {
      result.push(crNum -1);
    }
    if (crNum + 1 <= totalNum) {
      result.push(crNum + 1);
    }

    if (result.length < 3 && result.length < totalNum) {
      if( crNum + 2 <= totalNum ) {
        result.push(crNum + 2);
      } else {
        result.push(crNum - 2);
      }
    }
    if (result.find(t => t === 1) !== 1) {
      result.push(-1);
    }
    if (result.find(t => t === totalNum) !== totalNum) {
      result.push(totalNum);
    }

    return result.sort((a, b) => a - b);
  };

  // 리스트 정보 갯수 변경 이벤트
  const onListChange = e => {
    setPaginData({
      ...pagingData,
      pageNum: 1,
      listNum: e.target.value
    });
  };

  // 페이지 정보 변경 이벤트
  const onPageChange = e => {
    setPaginData({
      ...pagingData,
      pageNum: parseInt(e.target.getAttribute('data-num')),
    });
  };

  if (loading) {
    return (<>로딩중</>);
  }

  return (
    <>
      <Left>
        <div>
          <h1>게시판</h1>
        </div>
        <SelectBoxBlock>
          <select name="listNum" onChange={onListChange} value={pagingData.listNum}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </SelectBoxBlock>
        <table>
          <thead>
            <tr>
              <th className="row1">순번</th>
              <th className="row2">제목</th>
              <th className="row3">내용</th>
              <th className="row4">등록날짜</th>
              <th className="row5">수정날짜</th>
            </tr>
          </thead>
          <tbody>
          {typeof(tableData) !== typeof(undefined) && tableData.map((table, index) => (
            <TableItem key={table.num} num={((pagingData.pageNum - 1)*pagingData.listNum) + index + 1} item={table}/>
          ))}
          {typeof(tableData) !== typeof(undefined) && tableData.length < pagingData.listNum && new Array(pagingData.listNum - tableData.length).fill(0).map((t, index) => (
             <tr key={index}><th>-</th><td></td><td></td><td></td><td></td></tr>
            ))}
          </tbody>
        </table>
        <WriteButtonBlock>
          <Link to="/TableWrite">글쓰기</Link>
        </WriteButtonBlock>
        <PagingButtonBlcok>
          {pagingListData.map(t => {
            console.log(t);
            if (t === -1) {
              return <button key={1} data-num="1" onClick={onPageChange}>왼</button>
            }
            if (t === pagingData.pageNum) {
              return (<button key={t} data-num={t} className="page-num">{t}</button>);
            }
            return <button key={t} data-num={t} onClick={onPageChange}>{t === totalNum ? '오' : t}</button>
          })}
        </PagingButtonBlcok>
      </Left>
    </>
  );
};

export default Table;