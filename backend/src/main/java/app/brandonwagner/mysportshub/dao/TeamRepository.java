package app.brandonwagner.mysportshub.dao;

import app.brandonwagner.mysportshub.model.Team;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository("Team")
public interface TeamRepository extends JpaRepository<Team, Integer> {

    Team findByID(int ID);
    
    @Override
    List<Team> findAll(Sort sort);
}
