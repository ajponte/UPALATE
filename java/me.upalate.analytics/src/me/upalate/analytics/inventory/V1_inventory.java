package me.upalate.analytics.inventory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray; // use Google GSON?

import me.upalate.dao.UPalateAnalytics;
import me.upalate.util.ToJSON;

/**
 * TODO: rename class (inventory :: foods ?)
 * @author Chris
 *
 */
@Path("/v1/inventory") // "/*" creates bug
public class V1_inventory {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnAllFoods() throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		Response rb = null;
		
		try {
			
			conn = UPalateAnalytics.UPalateAnalyticsConn().getConnection();
			query = conn.prepareStatement("SELECT * FROM foods");
			
			ResultSet rs = query.executeQuery();
			
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
			rb = Response.ok(returnString).build();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
		
		return rb;
	}
}
