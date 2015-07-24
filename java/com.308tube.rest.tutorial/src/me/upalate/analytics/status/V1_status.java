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
		StringBuilder output = (StringBuilder) new StringBuilder("DB TEST: <br />Result:<br />");
		Connection conn = null;
		
		try {
			
			conn = UPalateAnalytics.UPalateAnalyticsConn().getConnection();
			query = conn.prepareStatement("SELECT * FROM foods");
			ResultSet rs = query.executeQuery();
			
			while (rs.next()) {
				for(int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
					output.append(rs.getMetaData().getColumnName(i) + "=" + rs.getString(i));
					output.append("<br />");
				}
				
			}
			
			query.close();
			
//			returnString = "DB first food name: " + myString;
			
		} catch (Exception e) {
			e.printStackTrace();
			output.append("CATCH:" + e.getMessage());
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
		
//		return returnString;
		return output.toString();
	}
}
