package com.study.api.user;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class UserInterceptor extends HandlerInterceptorAdapter {
    private static final String ALGOLISM = "HmacSHA256";
    private static final String key = "test";

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

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Cookie[] cookies = request.getCookies();
        String userinfo = "";
        String TK = "";
        for ( int i = 0; i < cookies.length; i++) {
            if ( cookies[i].getName().equals("TK") ) {
                TK = cookies[i].getValue();
            }
            if ( cookies[i].getName().equals("userinfo") ) {
                userinfo = cookies[i].getValue();
            }
        }
        if ( TK.equals(hget(userinfo)) ) {
            return true;
        }

        return false;
    }
}
