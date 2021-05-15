package app.brandonwagner.mysportshub.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "ID")
    private int userID;

    @Column( name = "AuthID")
    private String authID;

    @Transient
    private List<Team> userTeams;

    public User() {

    }


    public User(String authID){

        this.authID = authID;
    }

    public int getUserID() {

        return userID;
    }

    public void setUserID(int userID) {

        this.userID = userID;
    }

    public String getAuthID() {

        return authID;
    }

    public void setAuthID(String authID) {

        this.authID = authID;

    }


    public List<Team> getUserTeams() {

        return userTeams;
    }

    public void setUserTeams(List<Team> userTeams) {
        this.userTeams = userTeams;
    }



    @Override
    public String toString() {
        return "User{" +
                "userID=" + userID +
                ", authID='" + authID + '\'' +
                ", userTeams=" + userTeams +
                '}';
    }
}
