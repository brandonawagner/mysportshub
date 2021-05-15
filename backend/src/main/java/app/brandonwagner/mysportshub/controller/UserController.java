package app.brandonwagner.mysportshub.controller;

import app.brandonwagner.mysportshub.model.User;
import app.brandonwagner.mysportshub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){

        this.userService = userService;
    }


    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE,
            value = "/{authID}"
    )
    public User findUserByAuthUserID(@PathVariable("authID") String authID) throws Exception {
        return userService.findUserByAuthID(authID);
    }

}
