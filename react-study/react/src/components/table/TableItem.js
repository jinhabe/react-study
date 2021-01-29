import React from 'react';
import { withRouter } from 'react-router-dom';

{/* 리스트 1개 컴포넌트 */}
const TableItem = ({ item, num, location, match, history }) => {

  // 리스트 클릭시 해당 상세 정보 창 이동
  const onClick = e => {
    history.push(`/TableModify?num=${e.target.parentElement.getAttribute('data-num')}`);
  };

  return (
    <>
      <tr data-num={item.num} onClick={onClick}>
        <th>{num}</th>
        <td>{item.subject}</td>
        <td>{item.content}</td>
        <td>{item.uploadDate}</td>
        <td>{item.updateDate}</td>
      </tr>
    </>
  );
};

export default withRouter(TableItem);