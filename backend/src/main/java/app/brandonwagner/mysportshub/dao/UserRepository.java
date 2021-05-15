package app.brandonwagner.mysportshub.dao;

import app.brandonwagner.mysportshub.model.Team;
import app.brandonwagner.mysportshub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("User")
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT ID, AuthID FROM User WHERE AuthID = :AuthID",
            nativeQuery = true)
    User findByAuthUserID(@Param("AuthID") String authID);


    @Query(value = "SELECT Location, Mascot \n" +
            "FROM Team t, UserToTeam ut\n" +
            "WHERE t.ID = ut.TeamID \n" +
            "AND ut.UserID = :UserID",
            nativeQuery = true)
    List<Team> findTeamsByUserID(@Param("UserID") int userID);


}

