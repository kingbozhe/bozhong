package bozhong.com.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;


import bozhong.com.bean.User;
import bozhong.com.dao.LoginDaoManager;

public class LoginDaoManagerImpl implements LoginDaoManager{
	private SqlSessionTemplate sqlSessionTemplate;
	
	
	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}


	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}


	@Override
	public String loginCheck(User user) {
	
		Map map=new HashedMap();
		map.put("id", user.getId());
		map.put("password",user.getPassword());
		List<User> list1=sqlSessionTemplate.selectList("LOGINCHECK.CHECK1", map);
		if(list1.size()>0){
			for(User u : list1){
				System.out.println(u.getId()+"   "+u.getNum()+"   "+u.getPassword());
			}
		}
		System.out.println(list1);
		List list2=sqlSessionTemplate.selectList("LOGINCHECK.CHECK2", map);
		System.out.println(list2);
		return null;
	}
	
}
