package me.upalate.dao;

import java.sql.*;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import me.upalate.util.ToJSON;

// TODO: abstract one layer? (to avoid extending all classes?)
public class SchemaUPalate extends UPalateAnalytics {

	public int insertIntoFoods(String food) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		try {
			// validate data here ...
			JSONObject nutritionJSON = new JSONObject(); // empty nutritionContent JSON obj ...
			
			conn = mongoUPalateConnection();
			StringBuilder querySQL = new StringBuilder("INSERT INTO `foods`")
											.append(" (`name`, `nutritianContent`)")
											.append(" VALUES (?, ?) ");
			query = conn.prepareStatement(querySQL.toString());
			
			query.setString(1, food);
			query.setString(2, nutritionJSON.toString());
			
			query.executeUpdate(); // catch rows affected?
			
		} catch (Exception e) { // catch sql exception?
			e.printStackTrace();
			return 500; // ?
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
		
		return 200;
	}
	
	public JSONArray queryReturnFoodNutrition(String food) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try {
			conn = mongoUPalateConnection();
			
			// TODO: make or find an efficient SQL query statement builder to maintain consistency & security
			// table names ... column names ... etc
			// TODO: aliases? or better column names? maintain consistency throughout code
			// TODO: mongoDB users should be restricted to specific tables/documents and specific actions
			// Using StringBuilder to avoid using "+" which creates unnecessary supplementary objects
			StringBuilder querySQL = new StringBuilder("SELECT ")
										.append("`name`,")
										.append("`nutritianContent`")
										.append(" FROM `foods`")
										.append(" WHERE `name` = ? ")
										.append(" LIMIT 1");
				
			query = conn.prepareStatement(querySQL.toString());
//			query.setString(1, food.toUpperCase());
			query.setString(1, food);
			
			System.out.println("ULOG:"+ querySQL.toString()); // make log class ...
			
			ResultSet rs = query.executeQuery();
			
			json = converter.toJSONArray(rs);
			query.close();
			
		} catch (SQLException sqlError) {
			sqlError.printStackTrace();
			return json; //
			
		} catch (Exception e) {
			e.printStackTrace();
			return json;
			
		} finally {
			if (conn != null) conn.close();
		}
		
		return json;
	}
	
	/**
	 * TODO: see todo.txt
	 * @param food_name
	 * @param ingredients
	 * @return
	 * @throws Exception
	 */
	public int updateFoodIngredients(String food_name, String ingredients) throws Exception {
	
		PreparedStatement query = null;
		Connection conn = null;
		
		try {
			// validate ...
			
			conn = mongoUPalateConnection();
			
			StringBuilder querySQL = new StringBuilder("UPDATE `foods`")
													.append(" SET `ingredients` = ?)")
													.append(" WHERE name = ? ");
			query = conn.prepareStatement(querySQL.toString());
			query.setString(1, ingredients);
			query.setString(2, food_name);
			query.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			return 500;
		} finally {
			if (conn != null) conn.close();
		}
		
		return 200;
	}
	
	public int deleteFood(String food_name) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		try {
			// validate ...
			
			conn = mongoUPalateConnection();
			
			StringBuilder querySQL = new StringBuilder("DELETE FROM `foods`")
													.append(" WHERE name = ? ");
			query = conn.prepareStatement(querySQL.toString());
			query.setString(1, food_name);
			query.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			return 500;
		} finally {
			if (conn != null) conn.close();
		}
		
		return 200;
	}
}
