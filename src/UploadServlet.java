import java.io.*;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet(name = "UploadServlet", urlPatterns = "/UploadServlet")
public class UploadServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, java.io.IOException {
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        response.setContentType("text/html");
        java.io.PrintWriter out = response.getWriter( );

        if( !isMultipart) {
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet upload</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<p>No file uploaded</p>");
            out.println("</body>");
            out.println("</html>");
            return;
        }
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(500 * 1024);
        ServletFileUpload upload = new ServletFileUpload(factory);

        upload.setSizeMax(500 * 1024);

        try {
            List<FileItem> fileItems = upload.parseRequest(request);
            for (FileItem fi : fileItems) {
                if (!fi.isFormField()) {
                    String fileName = fi.getName();
                    String filePath = ("C:\\Users\\linxi\\OneDrive\\Desktop\\122b\\apache-tomcat-9.0.31\\webapps\\ezcross_war\\upload\\");
                    File file;
                    if (fileName.lastIndexOf("\\") >= 0)
                        file = new File(filePath + fileName.substring(fileName.lastIndexOf("\\")));
                    else file = new File(filePath + fileName.substring(fileName.lastIndexOf("\\") + 1));
                    fi.write(file);
                    out.println("Uploaded Filename: " + fileName + "<br>");
                }
            }
        } catch(Exception ex) {
            System.out.println(ex);
        }
    }
}