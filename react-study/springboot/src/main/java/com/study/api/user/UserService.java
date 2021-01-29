package com.study.api.user;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserVO> getUser(String id, String pwd) {
        return userRepository.getUser(id, pwd);
    }
}
