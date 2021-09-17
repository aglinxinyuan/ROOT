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

@WebServlet(name = "DeleteChatRoom", urlPatterns = "/api/deleteChatRoom")
public class DeleteChatRoom extends HttpServlet {
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
        int id = Integer.parseInt(request.getParameter("id"));
        System.out.println(id);
        try (Connection conn = dataSource.getConnection()) {
            String query = "DELETE FROM ezcross.group_user WHERE id ="+id+" AND user_id="+user.GetId()+ ";";
            PreparedStatement statement = conn.prepareStatement(query);
            System.out.println(statement);
            statement.executeUpdate();
            statement.close();
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