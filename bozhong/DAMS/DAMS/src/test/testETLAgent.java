package com.teradata.portlets.ds.service;

import java.io.IOException;

import org.junit.Test;

import com.teradata.portlets.edwm.util.ETLAgentInterface;

public class testETLAgent {
	
	@Test
	public void test1() {
		ETLAgentInterface agent = new ETLAgentInterface();
        //String scriptFileStr = "";
        
        if (agent.setServerInfo("10.0.2.158",6346)==0) {
        	  if (agent.connectToAgent() != 0) {
                return;
        	  }
            if (agent.readHeaderInfo()!=0) {
               agent.disconnectAgent();
               return;
             }      
            
            int ret = agent.sendCmdGetScr("S01","COST_DROITCLOSEMASTER","cost_droitclosemaster0200.pl");
            if (ret != 0) {
               agent.disconnectAgent();
               return;	
            }else{
					System.out.println("cheng gong fan hui!"+agent.getScriptFileWeb());
				
            }

            agent.disconnectAgent();
        }
        
	}

}
