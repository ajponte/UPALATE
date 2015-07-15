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


@Path("/v2/inventory")
public class V2_inventory {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnIngredients(
				@QueryParam("food") String food)
				throws Exception {
		
		JSONArray json = new JSONArray();
		String returnString = null;
		
		PreparedStatement query = null;
		Connection conn = null;
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
			return Response.status(500).entity("Server was not able to process your request").build();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
		
		return rb;
	
}
