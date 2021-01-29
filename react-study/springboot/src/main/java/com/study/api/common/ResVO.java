package com.study.api.common;

import com.google.gson.JsonObject;

public class ResVO {
    private Integer code = -99999999;
    private String message = "";
    private JsonObject data;

    public void ResVO(Integer code, String message, JsonObject data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public JsonObject getData() {
        return data;
    }

    public void setData(JsonObject data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "{" +
                "code:'" + code + '\'' +
                ", message:'" + message + '\'' +
                ", data:'" + data + '\'' +
                '}';
    }
}
