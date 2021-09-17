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
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(name = "CreatePersonalChatRoom", urlPatterns = "/api/createChatRoom")
public class CreatePersonalChatRoom extends HttpServlet {
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
        int friend_id = Integer.parseInt(request.getParameter("id"));

        try (Connection conn = dataSource.getConnection()) {
            String friend_name = "SELECT name FROM ezcross.user WHERE id="+ friend_id + ";";

            String query = "INSERT INTO ezcross.group(name) VALUES(?);";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, friend_name+"'s chatroom");
            statement.executeUpdate();
            statement.close();

            query = "INSERT INTO ezcross.group_user(group_id,user_id) VALUES(last_insert_id(),?);";
            statement = conn.prepareStatement(query);
            statement.setInt(1, user.GetId());
            statement.executeUpdate();
            statement.close();

            query = "INSERT INTO ezcross.group_user(group_id,user_id) VALUES(last_insert_id(),?);";
            statement = conn.prepareStatement(query);
            statement.setInt(1, friend_id);
            statement.executeUpdate();
            statement.close();

            System.out.println("Make it here");

            PrintWriter fresh = response.getWriter();
            fresh.write("<html><head><meta http-equiv=\"refresh\" content=\"0; url='../message.html'\" /></head></html>");
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