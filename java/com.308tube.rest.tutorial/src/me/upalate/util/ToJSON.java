package me.upalate.util;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import java.sql.ResultSet;

import org.owasp.esapi.ESAPI;
import org.owasp.esapi.*;

/**
 * Converts DB RS into JSON
 * Could use many improvements 
 * I don't like that a util.ToJSON only converts an RS to JSON ...
 * 		how about RSToJSON or sth like that
 * 
 * @author Chris
 *
 */
public class ToJSON {

	/**
	 * @param rs - database ResultSet
	 * @return - JSON Array
	 * @throws Exception
	 */
	public JSONArray toJSONArray(ResultSet rs) throws Exception {
		
		JSONArray json = new JSONArray();
		String temp = null;
		
		try {
			
			java.sql.ResultSetMetaData rsmd = rs.getMetaData();
			
			while (rs.next()) {
				
				int numColumns = rsmd.getColumnCount(); // get column count each loop??? (apparently can change per row on some DBs)
				JSONObject obj = new JSONObject();
				
				// build row
				for (int i = 1 ; i < numColumns+1 ; i++) {
					
					String column_name = rsmd.getColumnName(i);
					
					if (rsmd.getColumnType(i) == java.sql.Types.ARRAY) {
						obj.put(column_name, rs.getArray(column_name));
						/* debug */ System.out.println("ToJson: ARRAY"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.BIGINT) {
						obj.put(column_name, rs.getInt(column_name));
						/* debug */ System.out.println("ToJson: BIGINT"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.BOOLEAN) {
						obj.put(column_name, rs.getBoolean(column_name));
						/* debug */ System.out.println("ToJson: BOOLEAN"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.BLOB) {
						obj.put(column_name, rs.getBlob(column_name));
						/* debug */ System.out.println("ToJson: BLOB"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.DOUBLE) {
						obj.put(column_name, rs.getDouble(column_name));
						/* debug */ System.out.println("ToJson: DOUBLE"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.FLOAT) {
						obj.put(column_name, rs.getFloat(column_name));
						/* debug */ System.out.println("ToJson: FLOAT"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.INTEGER) {
						obj.put(column_name, rs.getInt(column_name));
						/* debug */ System.out.println("ToJson: INTEGER"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.NVARCHAR) {
						obj.put(column_name, rs.getNString(column_name));
						/* debug */ System.out.println("ToJson: NVARCHAR"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.VARCHAR) {
						
						// TODO: ESAPI fix
//						temp = rs.getString(column_name);
//						temp = ESAPI.encoder().canonicalize(temp);
//						temp = ESAPI.encoder().encodeForHTML(temp);
//						obj.put(column_name, temp);
						
						obj.put(column_name, rs.getString(column_name));
						/* debug */ System.out.println("ToJson: VARCHAR"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.TINYINT) {
						obj.put(column_name, rs.getInt(column_name));
						/* debug */ System.out.println("ToJson: TINYINT"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.SMALLINT) {
						obj.put(column_name, rs.getInt(column_name));
						/* debug */ System.out.println("ToJson: SMALLINT"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.DATE) {
						obj.put(column_name, rs.getDate(column_name));
						/* debug */ System.out.println("ToJson: DATE"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.TIMESTAMP) {
						obj.put(column_name, rs.getTimestamp(column_name));
						/* debug */ System.out.println("ToJson: TIMESTAMP"); // Log ?
					}
					else if (rsmd.getColumnType(i) == java.sql.Types.NUMERIC) {
						obj.put(column_name, rs.getBigDecimal(column_name));
						/* debug */ System.out.println("ToJson: NUMERIC"); // Log ?
					}
					else {
						obj.put(column_name, rs.getObject(column_name));
						/* debug */ System.out.println("ToJson: OBJECT: "+ column_name); // Log ?
					}
				} // end for
				
				// Add row 'obj' to JSONArray 'json'
				json.put(obj);
				
			} // end while
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}
		
		return json;
	}
	
}
