package app.brandonwagner.mysportshub.service;


import app.brandonwagner.mysportshub.dao.UserRepository;
import app.brandonwagner.mysportshub.model.Team;
import app.brandonwagner.mysportshub.model.User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(@Qualifier("User") UserRepository userRepository){

        this.userRepository = userRepository;
    }


    public User findUserByAuthID(String authID) throws Exception {

        User u = userRepository.findByAuthUserID(authID);

        if(u == null){
            /*new user*/
            u = userRepository.save(new User(authID));

            if(u == null){
                throw new Exception("User not found or inserted.");
            }
        } else {

            List<Team> teams = userRepository.findTeamsByUserID(u.getUserID());

            u.setUserTeams(teams);
        }

        return u;
    }

}
