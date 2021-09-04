import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@WebServlet(name = "UploadServlet", urlPatterns = "/UploadServlet")
public class UploadServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws java.io.IOException {
        response.setContentType("text/html");
        ArrayList<String> filenames = Helper.upload(request);
        java.io.PrintWriter out = response.getWriter( );
        out.write(String.valueOf(filenames));
    }
}