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

@WebServlet(name = "GetMessage", urlPatterns = "/api/chatroom")
public class GetMessage extends HttpServlet {
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
        String groupID= request.getParameter("id");
        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            User user = (User) request.getSession().getAttribute("user");
            ResultSet rs = statement.executeQuery("SELECT * FROM ezcross.message WHERE group_id ="+groupID+";");
            JsonArray jsonArray = new JsonArray();

            // Iterate through each row of rs
            while (rs.next()) {
                // Create a JsonObject based on the data we retrieve from rs
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("user_id", rs.getString("user_id"));
                jsonObject.addProperty("message", rs.getString("message"));
                jsonObject.addProperty("time", rs.getString("time"));
                // Categorize whether the message was sent by the user who request
                if (user.GetId() == rs.getInt("user_id")){
                    jsonObject.addProperty("self", 1);
                }
                else{
                    jsonObject.addProperty("self", 0);
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