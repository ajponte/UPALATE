package me.upalate.dao;

import java.sql.*;
import org.codehaus.jettison.json.JSONArray;
import me.upalate.util.ToJSON;

// TODO: abstract one layer? (to avoid extending all classes?)
public class SchemaUPalate extends UPalateAnalytics {

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
			
			System.out.println("ULOG:"+ querySQL.toString());
			
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
	
}
