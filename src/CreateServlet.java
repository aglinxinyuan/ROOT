import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet(name = "CreateServlet", urlPatterns = "/api/create")
public class CreateServlet extends HttpServlet {
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

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        String title = request.getParameter("evenTitle");
        String location = request.getParameter("evenLocation");
        try (Connection conn = dataSource.getConnection()) {
            String query = "INSERT INTO events(title,location) VALUES(?,?);";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, title);
            statement.setString(2, location);
            statement.executeUpdate();
            statement.close();
            response.setStatus(200);
        } catch (Exception e) {
            response.getWriter().write(e.getMessage());
            response.setStatus(500);
        }
    }
}