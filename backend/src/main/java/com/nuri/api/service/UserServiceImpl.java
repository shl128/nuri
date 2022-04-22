package com.nuri.api.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nuri.api.request.UserUpdatePostReq;
import com.nuri.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nuri.api.request.UserRegisterPostReq;
import com.nuri.db.entity.User;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("UserService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserRepositorySupport userRepositorySupport;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserEmail(userRegisterInfo.getUserEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
		user.setUserNickname(userRegisterInfo.getUserNickname());
		user.setIsAdmin(userRegisterInfo.getIsAdmin());

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userEmail) {
		// 디비에 유저 정보 조회
		User user = userRepositorySupport.findUserByUserId(userEmail).get();
		return user;
	}

	@Override
	public boolean checkUser(String userEmail) {
		try{
			User user = userRepositorySupport.findUserByUserId(userEmail).get();
		}catch (Exception e){
			return false;
		}
		return true;
	}

	@Override
	public boolean checkUsername(String userNickname) {
		try{
			User user = userRepositorySupport.findUserByUserNickname(userNickname).get();
		}catch (Exception e){
			return false;
		}
		return true;
	}

	@Override
	public void updateUser(User user, UserUpdatePostReq userUpdatePostReq) {
		// 수정할 회원 정보 현재 회원 정보에 setting
		user.setIsAdmin(userUpdatePostReq.getIsAdmin());
		user.setUserNickname(userUpdatePostReq.getUserNickname());
		// db에 update
		userRepository.save(user);
	}

	@Override
	public void updateUserPhoto(User user, String userPhoto) {
		user.setUserPhoto(userPhoto);
		// db에 update
		userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	@Override
	public void updateUserActive(Long userId) {
		userRepository.updateUserActive(userId);
	}

	@Override
	public String kakaoToken(String code) {
		String accessToken = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=81167858a8e7e297800ffaee4b944bcc");
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}

			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			accessToken = element.getAsJsonObject().get("access_token").getAsString();

			br.close();
			bw.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return accessToken;
	}

	@Override
	public HashMap<String, Object> kakaoUserInfo(String accessToken) {
		HashMap<String, Object> userInfo = new HashMap<>();
		String reqURL = "https://kapi.kakao.com/v2/user/me";

		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");

			//    요청에 필요한 Header에 포함될 내용
			conn.setRequestProperty("Authorization", "Bearer " + accessToken);

			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}

			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
			JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

			String nickname = properties.getAsJsonObject().get("nickname").getAsString();
			String email = kakao_account.getAsJsonObject().get("email").getAsString();

			userInfo.put("nickname", nickname);
			userInfo.put("email", email);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return userInfo;
	}

	@Override
	public boolean checkUserNickname(String userNickname) {
		try{
			User user = userRepositorySupport.findUserByUserNickname(userNickname).get();
		}catch (Exception e){
			return false;
		}
		return true;
	}

	@Override
	public User getUserByUserNickname(String userNickname) {
		return userRepositorySupport.findUserByUserNickname(userNickname).get();
	}


}