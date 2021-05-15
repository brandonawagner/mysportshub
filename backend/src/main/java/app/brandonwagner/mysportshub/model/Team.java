package app.brandonwagner.mysportshub.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Team {

    @Id
    @GeneratedValue
    private int ID;

    private int leagueID;
    private String location;
    private String mascot;

    public Team(){

    }

    public Team(String location, String mascot, int leagueID){

    }

    public int getID() {

        return ID;
    }

    public void setID(int ID) {

        this.ID = ID;
    }

    public int getLeagueID() {

        return leagueID;
    }

    public void setLeagueID(int leagueID) {

        this.leagueID = leagueID;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String teamLocation) {
        this.location = teamLocation;
    }

    public String getMascot() {
        return mascot;
    }

    public void setMascot(String teamMascot) {
        this.mascot = teamMascot;
    }
}
