import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "GetUser", urlPatterns = "/logout")
public class Logout extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        request.getSession().setAttribute("user",null);
        out.write("<html><head><meta http-equiv=\"refresh\" content=\"0; url='./'\" /></head></html>");
        response.setStatus(200);
        out.close();
        }
    }