package app.brandonwagner.mysportshub.service;

import app.brandonwagner.mysportshub.dao.TeamRepository;
import app.brandonwagner.mysportshub.dao.UserRepository;
import app.brandonwagner.mysportshub.model.Team;
import app.brandonwagner.mysportshub.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(@Qualifier("Team") TeamRepository teamRepository){

        this.teamRepository = teamRepository;
    }

    public Team findByID(int ID){

        return teamRepository.findByID(ID);

    }

    public List<Team> findAll(){
        return teamRepository.findAll(Sort.by("Location").ascending().and(Sort.by("Mascot").ascending()));

    }

}
