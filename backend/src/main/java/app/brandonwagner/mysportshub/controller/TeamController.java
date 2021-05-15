package app.brandonwagner.mysportshub.controller;

import app.brandonwagner.mysportshub.model.Team;
import app.brandonwagner.mysportshub.model.User;
import app.brandonwagner.mysportshub.service.TeamService;
import app.brandonwagner.mysportshub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/teams",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
public class TeamController {


    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService){

        this.teamService = teamService;
    }


    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<Team> findAll() {

        return teamService.findAll();

    }

}
