package com.study.api.board;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class BoardVO {
    private Integer code = -99999999;
    private String message = "";
    private Integer num = null;
    private String subject;
    private String content;
    private String uploadDate;
    private String updateDate;
    private Integer tc;
}
