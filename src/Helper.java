import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class Helper {
    public static ArrayList<String> upload(HttpServletRequest request) {
        ArrayList<String> filenames = new ArrayList<>();
        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        try {
            List<FileItem> fileItems = upload.parseRequest(request);
            for (FileItem fi : fileItems) {
                if (!fi.isFormField()) {
                    String fileName = new Timestamp(System.currentTimeMillis()).getTime()+"."+ FilenameUtils.getExtension(fi.getName());
                    String filePath = request.getServletContext().getRealPath("/upload/");
                    System.out.print(filePath);
                    File file;
                    file = new File(filePath + fileName);
                    fi.write(file);
                    filenames.add(fileName);
                }
            }
        } catch(Exception ex) {
            System.out.println(ex);
        }
        return filenames;
    }
}
