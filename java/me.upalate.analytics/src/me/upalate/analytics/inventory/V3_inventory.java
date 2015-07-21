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

@Path("/v3/inventory")
public class V3_inventory {

	
}
