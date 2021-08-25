import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import java.util.Iterator;
import java.util.List;


//import org.apache.commons.fileupload.servlet.ServletFileUpload;
//import org.apache.commons.fileupload.disk.DiskFileItemFactory;
//import org.apache.commons.fileupload.*;

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
//        DiskFileItemFactory factory = new DiskFileItemFactory();
//        // maximum size that will be stored in memory
//        factory.setSizeThreshold(4096);
//        // the location for saving data that is larger than getSizeThreshold()
//        factory.setRepository(new File("C:\\temp"));
//
//        ServletFileUpload upload = new ServletFileUpload(factory);
//        // maximum size before a FileUploadException will be thrown
//        upload.setSizeMax(1000000);
//
//        List fileItems = null;
//        try {
//            fileItems = upload.parseRequest(request);
//        } catch (FileUploadException e) {
//            e.printStackTrace();
//        }
//        // assume we know there are two files. The first file is a small
//        // text file, the second is unknown and is written to a file on
//        // the server
//        Iterator i = fileItems.iterator();
//        String comment = ((FileItem)i.next()).getString();
//        FileItem fi = (FileItem)i.next();
//        // filename on the client
//        String fileName = fi.getName();
//        // save comment and filename to database
//
//        // write the file
//        try {
//            fi.write(new File("/", fileName));
//            System.out.print(fileName);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        String title = request.getParameter("evenTitle");
        String location = request.getParameter("evenLocation");
        String description = request.getParameter("eventDescription");
        String date = request.getParameter("evenDate");
        date = date.substring(6)+'-'+date.substring(0,2)+'-'+date.substring(3,5);
        String time = request.getParameter("evenTime");
        String tag = request.getParameter("tag");
        time+=":00";
//        String i = request.getParameter("Intermediate");
//        String a = request.getParameter("Advanced");
        String skill = "Beginner";
//        if (i.equals("on")) skill = "Intermediate";
//        else if(a.equals("on")) skill = "Advanced";
        int cap = Integer.parseInt(request.getParameter("evenCapacity"));

        String age_str = request.getParameter("age");
        String join_str = request.getParameter("join");
        String friend_str = request.getParameter("friend");
        String invite_str = request.getParameter("invite");

        int age = 1;
        int join = 1;
        int friend = 1;
        int invite = 1;
        if (age_str==null) age=0;
        if (join_str==null) join=0;
        if (friend_str==null) friend=0;
        if (invite_str==null) invite=0;

        try (Connection conn = dataSource.getConnection()) {
            User user = (User) request.getSession().getAttribute("user");
            String query = "INSERT INTO event(creator, title, description, location, date,time, tag, photo_url_prefix, skill, capacity, agelimit, autojoin, friendsonly, friendsinvite, pageview) VALUES(?, ?, ?, ?, ?, ?, ?, 'photo_url_prefix', ?, ?, ?, ?, ?, ?, 0);";
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, user.GetName());
            statement.setString(2, title);
            statement.setString(3, description);
            statement.setString(4, location);
            statement.setString(5, date);
            statement.setString(6, time);
            statement.setString(7, tag);
            statement.setString(8, skill);
            statement.setInt(9, cap);
            statement.setInt(10, age);
            statement.setInt(11, join);
            statement.setInt(12, friend);
            statement.setInt(13, invite);
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