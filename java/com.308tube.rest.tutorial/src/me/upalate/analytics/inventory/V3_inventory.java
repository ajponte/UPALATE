package me.upalate.analytics.inventory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.*;
import org.codehaus.jettison.json.JSONArray; // use Google GSON?
import org.codehaus.jettison.json.JSONObject;

import me.upalate.dao.UPalateAnalytics;
import me.upalate.util.ToJSON;

import me.upalate.dao.SchemaUPalate;

@Path("/v3/inventory")
public class V3_inventory {

	/*
	 * I've always seen JSON objects returned, rarely JSON arrays, as in:
	 * 	{response: [array] or {object}}
	 * but not:
	 * 	[{response}], [{}, {}, {}]
	 * TODO: opinion on this?
	 */
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response addFood(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		SchemaUPalate dao = new SchemaUPalate();
		
		try {
			
			JSONObject foodData = new JSONObject(incomingData);
			System.out.println("ULOG: json: "+ foodData.toString());
			
			int httpCode = dao.insertIntoFoods(foodData.optString("name"));
			
			if (httpCode == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item '"+ foodData.optString("name") +"' entered successfully, Version 3");
				returnString = jsonArray.put(jsonObject).toString();
			} else {
				return Response.status(500).entity("FAIL to enter item").build();
			}
			
			System.out.println("ULOG: returnString: "+ foodData.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Response.ok(returnString).build();
	}
	
	@Path("/{food_name}")
	@PUT
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateItem(@PathParam("food_name") String food_name,
								String incomingData)
								throws Exception {
		
		int httpCode;
		String ingredients; //we're updating ingredients or whatever
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		SchemaUPalate dao = new SchemaUPalate();
		
		try {
			
			JSONObject foodData = new JSONObject(incomingData);
			ingredients = foodData.optString("food_ingredients");
			
			// really we should update by ID but this is all just example...
			httpCode = dao.updateFoodIngredients(food_name, ingredients);
			
			if (httpCode == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item '"+ food_name +"' has been updated");
			} else {
				return Response.status(500).entity("Server was not able to process request").build();
			}
			
			returnString = jsonArray.put(jsonObject).toString();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Response.ok(returnString).build();
	}
	
	@Path("/{food_name}")
	@DELETE
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteItem(@PathParam("food_name") String food_name)
								throws Exception {
		
		int httpCode;
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		SchemaUPalate dao = new SchemaUPalate();
		
		try {
			// really we should update by ID but this is all just example...
			httpCode = dao.deleteFood(food_name);
			
			if (httpCode == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item '"+ food_name +"' has been deleted!");
			} else {
				return Response.status(500).entity("Server was not able to process request").build();
			}
			
			returnString = jsonArray.put(jsonObject).toString();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Response.ok(returnString).build();
	}
}
