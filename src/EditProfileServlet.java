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

@WebServlet(name = "EditProfileServlet", urlPatterns = "/api/editProfile")
public class EditProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
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
        User user = (User) request.getSession().getAttribute("user");
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        String school = request.getParameter("school");
        String major = request.getParameter("major");
        String birth = request.getParameter("birth");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String aboutme = request.getParameter("aboutme");
        try (Connection conn = dataSource.getConnection()) {
            String query = "UPDATE user SET name=?, gender=?, school=?,major=?,birth=?,email=?,phone=?,`about me`=? where id='"+ user.GetId()+"';";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, name);
            statement.setString(2, gender);
            statement.setString(3, school);
            statement.setString(4, major);
            statement.setString(5, birth);
            statement.setString(6, email);
            statement.setString(7, phone);
            statement.setString(8, aboutme);
            System.out.println(statement);
            statement.executeUpdate();
            statement.close();
            response.setStatus(200);
        } catch (Exception e) {
            response.getWriter().write(e.getMessage());
            response.setStatus(500);
        }
    }
}