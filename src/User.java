/**
 * This User class only has the username field in this example.
 * You can add more attributes such as the user's shopping cart items.
 */
public class User {
    private final String email;
    private final int id;
    public User(String email, int id) {
        this.email = email;
        this.id = id;
    }
    public int GetId() {
        return this.id;
    }
    public String GetEmail() {
        return this.email;
    }
}