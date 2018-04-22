package bozhong.com.service.dao.impl;

import bozhong.com.bean.User;
import bozhong.com.dao.LoginDaoManager;
import bozhong.com.service.dao.LoginServiceManager;

public class LoginServiceManagerImpl implements LoginServiceManager{
	LoginDaoManager loginDaoManager;
	
	public LoginDaoManager getLoginDaoManager() {
		return loginDaoManager;
	}

	public void setLoginDaoManager(LoginDaoManager loginDaoManager) {
		this.loginDaoManager = loginDaoManager;
	}

	@Override
	public String loginCheck(User user) {
		
		return loginDaoManager.loginCheck(user);
	}

}
