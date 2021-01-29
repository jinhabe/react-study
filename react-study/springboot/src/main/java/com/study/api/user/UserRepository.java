package com.study.api.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserRepository {
    List<UserVO> getUser(@Param("_id") String id, @Param("_pwd") String pwd);
}
