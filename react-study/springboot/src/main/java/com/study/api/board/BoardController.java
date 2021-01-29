package com.study.api.board;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.study.api.common.ResVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;

    // 테이블 목록 가져오기
    @GetMapping("/board/list")
    public BoardLIstVO GetBoardList(@RequestParam(required = false) Integer pageNum, @RequestParam(required = false) Integer listNum) {
        BoardLIstVO boardListVO = new BoardLIstVO();

        // 목록 값 Check
        if ( listNum == null ) {
            listNum = 10;
        }
        // 목록 최대값 Check
        if ( listNum > 100 ) {
            listNum = 100;
        }
        // 페이지값 Check
        if ( pageNum == null ) {
            pageNum = 1;
        }

        // 목록 시작 값 계산
        Integer startNum = (pageNum - 1 ) * listNum;

        // 목록 DB 가져오기
        List<BoardVO> boardVO = boardService.getBoards(startNum, listNum);
        try {
            boardListVO.setCode(1);
            boardListVO.setMessage("목록 읽기 성공");
            boardListVO.setTotalNum((int) Math.ceil((double) boardVO.get(0).getTc() / (double) listNum));
            boardListVO.setBoarListVO(boardVO);
            boardListVO.setPageNum(pageNum);
            boardListVO.setListNum(listNum);
            boardListVO.setStartNum(startNum);
        } catch (Exception e) {
            e.printStackTrace();
            boardListVO.setMessage("목록 읽기 실패");
        }
        return boardListVO;
    }

    // 테이블 정보 가져오기
    @GetMapping("/board/target/{num}")
    public BoardVO GetBoardOne(@PathVariable int num) {
        BoardVO boardVO;

        try {
            boardVO = boardService.getOneBoard(num);
            if ( null != boardVO ) {
                boardVO.setCode(1);
                boardVO.setMessage("읽기 성공했습니다.");
            } else {
                boardVO = new BoardVO();
                boardVO.setMessage("읽기 실패했습니다.");
            }
        } catch (Exception e) {
            boardVO = new BoardVO();
            boardVO.setMessage("데이터를 가져올 수 없습니다.");
            e.printStackTrace();
        }
        return boardVO;
    }

    // 테이블 정보 저장하기
    @PostMapping("/board/insert")
    public ResVO BoardInsert(HttpServletRequest request, @RequestBody BoardVO boardVO) {
        ResVO resVO = new ResVO();
        Integer result;

        // 입력값 Check
        if ( null == boardVO.getSubject() || "".equals(boardVO.getSubject()) || boardVO.getSubject().length() > 45 ) {
            resVO.setMessage("올바른 제목을 입력하십시오.");
            return resVO;
        }

        if ( null == boardVO.getContent() || "".equals(boardVO.getContent()) || boardVO.getContent().length() > 2000) {
            resVO.setMessage("올바른 내용을 입력하십시오.");
            return resVO;
        }

        try {
            result = boardService.insertBoard(boardVO.getSubject(), boardVO.getContent());
            if (result == 1) {
                resVO.setCode(1);
                resVO.setMessage("글쓰기가 성공했습니다.");
            } else {
                resVO.setMessage("글쓰기가 실패했습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resVO.setMessage("글쓰기가 실패했습니다.");
        }
        return resVO;
    }

    // 테이블 정보 수정하기
    @PostMapping("/board/update")
    public ResVO BoardUpdate(HttpServletRequest request, @RequestBody BoardVO boardVO) {
        ResVO resVO = new ResVO();
        Integer result;

        // 입력값 Check
        if ( null == boardVO.getSubject() || "".equals(boardVO.getSubject()) || boardVO.getSubject().length() > 45 ) {
            resVO.setMessage("올바른 제목을 입력하십시오.");
            return resVO;
        }

        if ( null == boardVO.getContent() || "".equals(boardVO.getContent()) || boardVO.getContent().length() > 2000) {
            resVO.setMessage("올바른 내용을 입력하십시오.");
            return resVO;
        }

        try {
            result = boardService.updateBoard(boardVO.getNum(), boardVO.getSubject(), boardVO.getContent());
            if (result == 1) {
                resVO.setCode(1);
                resVO.setMessage("수정 성공");
            } else {
                resVO.setMessage("수정 실패1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resVO.setMessage("수정 실패2");
        }
        return  resVO;
    }

    // 테이블 정보 삭제하기
    @PostMapping("/board/delete")
    public ResVO BoardDelete(HttpServletRequest request, @RequestBody BoardVO boardVO) {
        ResVO resVO = new ResVO();
        Integer result;

        try {
            result = boardService.deleteBoard(boardVO.getNum());
            if (result == 1) {
                resVO.setCode(1);
                resVO.setMessage("삭제 성공");
            } else {
                resVO.setMessage("삭제 실패1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resVO.setMessage("삭제 실패2");
        }

        return resVO;
    }
}
