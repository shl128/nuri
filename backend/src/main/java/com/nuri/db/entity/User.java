package com.nuri.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name="user")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @JsonManagedReference
    @OneToMany(mappedBy="user")
    List<Code> codes = new ArrayList<>();

    String userNickname;

    String userId;
    String userPhoto;
    Integer isAdmin;
    Date createdAt;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String userPassword;

    @Override
    public String toString() {
        return "User{" +
                ", userNickname='" + userNickname + '\'' +
                ", userId='" + userId + '\'' +
                ", userPhoto='" + userPhoto + '\'' +
                ", isAdmin='" + isAdmin + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }

}
