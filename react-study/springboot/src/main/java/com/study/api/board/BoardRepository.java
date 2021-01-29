package com.study.api.board;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface BoardRepository {
    List<BoardVO> getBoards(@Param("_startNum") int startNum, @Param("_listNum") int listNum);
    BoardVO getOneBoard(int num);
    Integer insertBoard(String subject, String content);
    Integer updateBoard(int num, String subject, String content);
    Integer deleteBoard(int num);
}
