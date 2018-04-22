package bozhong.com.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import bozhong.com.bean.User;
import bozhong.com.service.dao.LoginServiceManager;

@Controller
public class LoginController {
	@Autowired
	private LoginServiceManager loginServiceManager;
	@Autowired
	private User user;
	
	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public LoginServiceManager getLoginServiceManager() {
		return loginServiceManager;
	}


	public void setLoginServiceManager(LoginServiceManager loginServiceManager) {
		this.loginServiceManager = loginServiceManager;
	}
	

	@RequestMapping(value="/income")
	public String income(HttpServletRequest request,HttpServletResponse response){
		String id=(String) request.getParameter("id");
		String password=(String) request.getParameter("password");
		user.setId(id);
		user.setPassword(password);
		loginServiceManager.loginCheck(user);
		return "/query/hello";
	}
}
