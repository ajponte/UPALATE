package me.upalate.dao;

import javax.naming.*;
//import javax.sql.*;
import java.sql.Connection;

/*
 * TODO: implement logging
 */
public class UPalateAnalytics {

	private static DataSource UPalateAnalytics = null;
	private static Context context = null;
	
	public static DataSource UPalateAnalyticsConn() throws Exception {
		
		if (UPalateAnalytics != null) {
			return UPalateAnalytics;
		}
		
		try {
			if (context == null) {
				context = new InitialContext();
			}
			
			UPalateAnalytics = (DataSource) context.lookup("jdbc/MongoDB2");
			
		} catch (Exception e) {
			e.printStackTrace(); // todo: error catching
		}
		
		return UPalateAnalytics;
	}
}
