package com.study.api.user;

import com.google.gson.JsonObject;
import com.study.api.common.ResVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
public class UserController {
    private static final String ALGOLISM = "HmacSHA256";
    private static final String key = "test";

    // HMAC 함수
    public static String hget(String message) {
        try {
            Mac hasher = Mac.getInstance(ALGOLISM);
            hasher.init(new SecretKeySpec(key.getBytes(), ALGOLISM));

            byte[] hash = hasher.doFinal(message.getBytes());
            return byteToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        }
        return "";
    }

    // 바이트 -> 문자열 변환 함수
    private static String byteToString(byte[] hash) {
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < hash.length; i++) {
            int d = hash[i];
            d += (d < 0) ? 256 : 0;
            if (d < 16) {
                buffer.append("0");
            }
            buffer.append(Integer.toString(d, 16));
        }
        return buffer.toString();
    }

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResVO Login(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginInfo loginInfo) {
        List<UserVO> userVO;
        ResVO resVO = new ResVO();
        JsonObject result = new JsonObject();

        // 입력값 Check
        if ( (null == loginInfo.getId() || loginInfo.getId().equals("")) || (null == loginInfo.getPwd() || loginInfo.getPwd().equals("")) ) {
            resVO.setMessage("사용자 정보를 입력하지 않았습니다");
        }

        // ID 존재 Check
        try {
            userVO = userService.getUser(loginInfo.getId(), loginInfo.getPwd());
            if ( userVO.size() > 0 ) {
                resVO.setCode(1);
                Cookie setCookie = new Cookie("TK", hget(loginInfo.getId())); // 쿠키 이름을 name으로 생성
                response.addCookie(setCookie);
            } else {
                resVO.setMessage("사용자 정보가 존재하지 않습니다");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resVO.setMessage("ERROR");
        }

        return resVO;
    }
}
