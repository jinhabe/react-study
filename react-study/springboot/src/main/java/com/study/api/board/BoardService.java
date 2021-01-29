package com.study.api.board;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;

    public List<BoardVO> getBoards(int startNum, int listNum) {
        return boardRepository.getBoards(startNum, listNum);
    }

    public BoardVO getOneBoard(int num) {
        return boardRepository.getOneBoard(num);
    }

    public Integer insertBoard(String subject, String content) {
        return boardRepository.insertBoard(subject, content);
    }

    public Integer deleteBoard(int num) {
        return boardRepository.deleteBoard(num);
    }

    public Integer updateBoard(int num, String subject, String content) {
        return boardRepository.updateBoard(num, subject, content);
    }
}
