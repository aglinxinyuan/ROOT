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




@WebServlet(name = "SendMessage", urlPatterns = "/api/message")
public class SendMessage extends HttpServlet {
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
        String message = request.getParameter("message");
//        int groupId =1;
        int groupId = Integer.parseInt(request.getParameter("id"));
//        int id = Integer.parseInt(request.getParameter("id"));
//        System.out.println(groupId);
        System.out.println(groupId);
//        int groupId = Integer.parseInt(request.getParameter("id"));
        try (Connection conn = dataSource.getConnection()) {
            User user = (User) request.getSession().getAttribute("user");
            String query = "INSERT INTO message(user_id, message, group_id) VALUES( ?, ?, ?);";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setInt(1, user.GetId());
            statement.setString(2, message);
            statement.setInt(3, groupId);
//            System.out.println(statement);


            statement.executeUpdate();
            statement.close();
            response.setStatus(200);
        } catch (Exception e) {
            response.getWriter().write(e.getMessage());
            response.setStatus(500);
        }
    }
}