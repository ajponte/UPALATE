package me.upalate.analytics.status;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import java.sql.*;

import me.upalate.dao.*;

@Path("/v1/status")
public class V1_status {

	private static final String api_version = "0.0.1";
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnTitle() {
		return "<p>Java Web Service</p>";
	}
	
	@Path("/version")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnVersion() {
		return "<p>Version</p>"+ api_version;
	}
	
	@Path("/database")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnDatabaseStatus() throws Exception {
		
		PreparedStatement query = null;
		StringBuilder output = (StringBuilder) new StringBuilder("DB TEST: ");
		Connection conn = null;
		
		try {
			
			conn = UPalateAnalytics.UPalateAnalyticsConn().getConnection();
			query = conn.prepareStatement("SELECT * FROM system.indexes");
			ResultSet rs = query.executeQuery();
			
			output.append(rs.getMetaData());
//			
//			
//			while (rs.next()) {
//				for(int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
//					output.append(rs.getMetaData().getColumnName(i) + "=" + rs.getString(i));
//				}
//				
////				myString = rs.getString("name");
//			}
//			
//			output.append("ROWS: ").append(rs.toString());
//			query.close();
//			
////			returnString = "DB first food name: " + myString;
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
		
//		return returnString;
		return output.toString();
	}
}
