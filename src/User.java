/**
 * This User class only has the username field in this example.
 * You can add more attributes such as the user's shopping cart items.
 */
public class User {
    private final String email;
    private final int id;
    private final String name;
    public User(String email, int id, String name) {
        this.email = email;
        this.id = id;
        this.name = name;
    }
    public int GetId() {
        return this.id;
    }
    public String GetEmail() {
        return this.email;
    }
    public String GetName() {
        return this.name;
    }
}