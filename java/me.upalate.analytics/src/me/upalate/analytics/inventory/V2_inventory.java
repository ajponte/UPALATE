package me.upalate.analytics.inventory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.*;
import org.codehaus.jettison.json.JSONArray; // use Google GSON?


import me.upalate.dao.UPalateAnalytics;
import me.upalate.util.ToJSON;

import me.upalate.dao.SchemaUPalate;

@Path("/v2/inventory")
public class V2_inventory {

	/*
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnIngredients(
									@QueryParam("food") String food
									) throws Exception {
		
		JSONArray json = new JSONArray();
		String returnString = null;
		
		try {
			
			if (food == null || food.isEmpty()) {
				return Response.status(400).entity("Error: please specify food for this search").build();
			}
			
			SchemaUPalate dao = new SchemaUPalate();
			
			json = dao.queryReturnFoodNutrition(food);
			returnString = json.toString() + "food: " + food;
			
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		 
		return Response.ok(returnString).build();
	}
	*/
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnErrorOnFood() throws Exception {
		return Response.status(400).entity("Error, please specify food for this search.").build();
	}
	
	/**
	 * Path params make more sense, implement both? (without "duplicating" code too)
	 * 
	 * @param food
	 * @return
	 * @throws Exception
	 */
	@Path("/{food}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnFood(
							@PathParam("food") String food
							) throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		
		try {
			
			SchemaUPalate dao = new SchemaUPalate();
			
			json = dao.queryReturnFoodNutrition(food);
			returnString = json.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
	}
	
	/*
	 * rename method @_@
	 */
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response addFoods(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		SchemaUPalate dao = new SchemaUPalate();
		
		try {
			System.out.println("ULOG: "+ incomingData); // log class!!
			
			ObjectMapper mapper = new ObjectMapper();
			ItemEntry itemEntry = mapper.readValue(incomingData, ItemEntry.class);
			
			int httpCode = dao.insertIntoFoods(itemEntry.name);
			
			if (httpCode == 200) {
				returnString = jsonArray.toString();
				System.out.println("ULOG: JSON: "+ returnString); // log class!!
			} else {
				return Response.status(500).entity("Unable to process item").build();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Unable to process item").build();
		}
		
		return Response.ok(returnString).build();
	}
}

// this domain object should not be here
class ItemEntry {
	public String name;
}