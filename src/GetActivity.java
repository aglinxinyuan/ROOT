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
@WebServlet(name = "GetActivity", urlPatterns = "/api/activity")
public class GetActivity extends HttpServlet {
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
        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String id = request.getParameter("id");
            User user = (User) request.getSession().getAttribute("user");

            ResultSet rs = statement.executeQuery("SELECT * FROM ezcross.event where id="+id+";");
            rs.next();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("creator", rs.getString("creator"));
            jsonObject.addProperty("title", rs.getString("title"));
            jsonObject.addProperty("description", rs.getString("description"));
            jsonObject.addProperty("location", rs.getString("location"));
            jsonObject.addProperty("date", rs.getString("date")+" "+rs.getString("time"));
            jsonObject.addProperty("time", rs.getString("time"));
            jsonObject.addProperty("skill", rs.getString("skill"));
            jsonObject.addProperty("capacity", rs.getString("capacity"));

            rs = statement.executeQuery("SELECT * FROM ezcross.event_user where event_id="+id+" and user_id="+ user.GetId()+";");
            jsonObject.addProperty("joined", rs.next());
            rs.close();
            statement.close();

            out.write(jsonObject.toString());
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