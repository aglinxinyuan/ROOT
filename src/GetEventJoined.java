import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(name = "GetEventJoined", urlPatterns = "/api/eventjoined")
public class GetEventJoined extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/ez-cross");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        response.setStatus(200);
        User user = (User) request.getSession().getAttribute("user");
        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM ezcross.event INNER JOIN ezcross.event_user on ezcross.event.id = ezcross.event_user.event_id WHERE ezcross.event_user.user_id="+user.GetId()+" ORDER BY ezcross.event.date ASC;");
//            ResultSet rs = statement.executeQuery("SELECT * FROM ezcross.event;");
            JsonArray jsonArray = new JsonArray();

            // Iterate through each row of rs
            while (rs.next()) {
                // Create a JsonObject based on the data we retrieve from rs
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("id", rs.getString("id"));
                jsonObject.addProperty("title", rs.getString("title"));
                jsonObject.addProperty("location", rs.getString("location"));
                String data = rs.getString("date");
                jsonObject.addProperty("date", data.substring(0,4)+data.substring(5,7)+data.substring(8,10));
                String timedata = rs.getString("time");
                jsonObject.addProperty("time", timedata.substring(0,5));
                boolean isCreator = false;
                if (rs.getString("name").equals(user.GetName())) {
                    jsonObject.addProperty("isCreator", true);
                }

                jsonArray.add(jsonObject);




            }

            rs.close();
            statement.close();

            // write JSON string to output
            out.write(jsonArray.toString());
            // set response status to 200 (OK)
            response.setStatus(200);

        } catch (Exception e) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());
            response.setStatus(500);
        } finally {
            out.close();
        }
    }
}