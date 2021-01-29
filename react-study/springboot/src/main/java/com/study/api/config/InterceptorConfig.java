package com.study.api.config;

import com.study.api.user.UserInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 로그인을 제외한 요청 intetceptor 설정
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Autowired
    UserInterceptor userInterceptor;

    @Override
    public void addInterceptors (InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor).excludePathPatterns("/login");
    }
}
