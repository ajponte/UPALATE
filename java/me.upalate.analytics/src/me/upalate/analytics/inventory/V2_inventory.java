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

import me.upalate.dao.SchemaUPalate;

@Path("/v2/inventory")
public class V2_inventory {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnIngredients(
									@QueryParam("food") String food
									) throws Exception {
		
		JSONArray json = new JSONArray();
		String returnString = null;
		
		try {
			
			SchemaUPalate dao = new SchemaUPalate();
			
			json = dao.queryReturnFoodNutrition(food);
			returnString = json.toString() + "food: " + food;
			
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		 
		return Response.ok(returnString).build();
	}
}
