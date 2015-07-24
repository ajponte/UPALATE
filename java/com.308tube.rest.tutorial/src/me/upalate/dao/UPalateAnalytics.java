package me.upalate.dao;

import javax.naming.*;
import javax.sql.*;
import java.sql.Connection;

/*
 * TODO: implement logging
 */
public class UPalateAnalytics {

	private static DataSource UPalateAnalytics = null;
	private static Context context = null;
	
	// TODO: public for tutorial ... should be public, non-DAO classes should be retrofitted
	/*
	 * Lookup connection in JDBC
	 */
	/* private*/ public static DataSource UPalateAnalyticsConn() throws Exception {
		
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
	
	/*
	 * Create connection
	 */
	protected static Connection mongoUPalateConnection() {
		Connection conn = null;
		
		try {
			conn = UPalateAnalyticsConn().getConnection();
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return conn;
	}
}
