package com.study.api.board;

import lombok.Data;

import java.util.List;

@Data
public class BoardLIstVO {
    private Integer code = -99999999;
    private String message = "";
    private Integer pageNum;
    private Integer listNum;
    private Integer startNum;
    private Integer lastNum;
    private Integer totalNum;
    private List<BoardVO> boarListVO;
//
//    public Integer getPageNum() {
//        return pageNum;
//    }
//
//    public void setPageNum(Integer pageNum) {
//        this.pageNum = pageNum;
//    }
//
//    public Integer getListNum() {
//        return listNum;
//    }
//
//    public void setListNum(Integer listNum) {
//        this.listNum = listNum;
//    }
//
//    public Integer getStartNum() {
//        return startNum;
//    }
//
//    public void setStartNum(Integer startNum) {
//        this.startNum = startNum;
//    }
//
//    public Integer getLastNum() {
//        return lastNum;
//    }
//
//    public void setLastNum(Integer lastNum) {
//        this.lastNum = lastNum;
//    }
//
//    public Integer getTotalNum() {
//        return totalNum;
//    }
//
//    public void setTotalNum(Integer totalNum) {
//        this.totalNum = totalNum;
//    }
//
//    public List<BoardVO> getBoarListVO() {
//        return boarListVO;
//    }
//
//    public void setBoarListVO(List<BoardVO> boarListVO) {
//        this.boarListVO = boarListVO;
//    }

}
