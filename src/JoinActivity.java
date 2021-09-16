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


@WebServlet(name = "JoinActivity", urlPatterns = "/api/join")
public class JoinActivity extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // Create a dataSource which registered in web.
    private DataSource dataSource;

    public void init(ServletConfig config) {
        try {
            dataSource = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/ez-cross");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        int id = Integer.parseInt(request.getParameter("id"));
        System.out.println(id);
        User user = (User) request.getSession().getAttribute("user");
        try (Connection conn = dataSource.getConnection()) {
            String query = "INSERT INTO event_user(event_id,user_id) VALUES(?,?);";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setInt(1, id);
            statement.setInt(2, user.GetId());
            statement.executeUpdate();
            statement.close();

            PrintWriter out = response.getWriter();
            out.write("<html><head><meta http-equiv=\"refresh\" content=\"0; url='../activity.html?id="+id+"'\" /></head></html>");
            response.setStatus(200);
            out.close();

        } catch (Exception e) {
            response.getWriter().write(e.getMessage());
            response.setStatus(500);
        }
    }
}