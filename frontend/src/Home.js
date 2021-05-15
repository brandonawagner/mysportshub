import './App.css';
import { UserContext } from './UserContext';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Row, Col, Container, Tab, Tabs, Nav } from 'react-bootstrap'
import LogoutButton from './components/LogoutButton'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import AuthenticationButton from './components/AuthenticationButton';
import UserAuthProfile from './components/UserAuthProfile';
import Fetch from './components/Fetch'
import { Link } from 'react-router-dom';

/*will need to useEffect to auto-populate the teams and league when component mounts*/

function Home() {

  const { isAuthenticated } = useAuth0();
  const [userContext, setUserContext] = useContext(UserContext);
  const [teamNewsAll, setTeamNewsAll] = useState([]);
  const [currentTeamNews, setCurrentTeamNews] = useState("")
  const [teamTabs, setTeamTabs] = useState([]);
  const [teamFeedTabs, setTeamFeedTabs] = useState([]);

  useEffect(() => {

    async function fetchTeamNews(team, mascot) {

      const apiKey = '81948a14c62a4740a9d1a123afa96c28'

      
      let today = new Date()
      let todayString = today.toISOString().slice(0, 10);

      let dateFrom = new Date();
      dateFrom.setDate(today.getDate() - 7);

      let dateFromString = dateFrom.toISOString().slice(0, 10)

      const newsApi = 'http://newsapi.org/v2/everything?q='
        + team + ' ' + mascot + '&apiKey=' + apiKey + '&from=' + dateFromString + '&to=' + todayString + '&qlnTitle=' + mascot;

      const data = await fetch(newsApi)

      const teamNewsJSON = await data.json()
      setTeamNewsAll( (prev) => {

      for(let i = 0; i < prev.length; i++){

        if(prev[i].fullTeamName === team + ' ' + mascot ){
          return prev
        }
      }
      
      return [...prev,
        {
        fullTeamName: team + ' ' + mascot,
        teamNews: teamNewsJSON }
      ]}
      )

    }

    const teamNavTabs = userContext.userTeams.map(

        (team) => { const fullTeamName = team.team + " " + team.mascot;
                  return <Nav.Item key={"navItem_" + fullTeamName}>
                  <Nav.Link value={fullTeamName} onClick={updateGeneralNews}key={"link_" + fullTeamName} eventKey={fullTeamName}>
                    {fullTeamName}</Nav.Link>
                  </Nav.Item>

        }

      )

      setTeamTabs(teamNavTabs);

      for(let i = 0; i < userContext.userTeams.length; i++){
        fetchTeamNews(userContext.userTeams[i].team,userContext.userTeams[i].mascot);
      }

      function updateGeneralNews(e) {

        console.log(teamNewsAll);
      
          setCurrentTeamNews( () => {
            for(let i = 0; i < teamNewsAll.length; i++){
              if(teamNewsAll[i].fullTeamName === e.target.value){
                console.log(teamNewsAll[i].teamNews.articles[0].description);
                return teamNewsAll[i].teamNews.articles[0].description;
              }
            }
            
      
          }
          )
      
          const teamFeedTabs = userContext.userTeams.map(
      
            (team) => { const fullTeamName = team.team + " " + team.mascot;
            
                      return (<Tab.Pane key={"pane_" + fullTeamName} eventKey={fullTeamName}>
                          <Tabs key={"tabs_" + fullTeamName} id="feed" defaultActiveKey={userContext.userTeams[0].team + " " + userContext.userTeams[0].mascot}>
                            <Tab key={"gn_" + fullTeamName} eventKey={"gn_" + fullTeamName} title="General News">
                              {currentTeamNews}
                            </Tab>
                            <Tab key={"ss_" + fullTeamName} eventKey={"ss_" + fullTeamName} title="Scores/Schedule">
                                Hello scores and schedule
                            </Tab>
                            <Tab key={"sm_" + fullTeamName} eventKey={"sm_" + fullTeamName} title="Social Media">
                                hi social media
                            </Tab>
                          </Tabs>
                      </Tab.Pane>)
            }
      
          )
          setTeamFeedTabs(teamFeedTabs);
        }


  }, [userContext]) 


  let body;
  if(isAuthenticated){

    body = <Container>
              <Row sm={3}>
                <Col sm={3}>
                  Team Info
                  <AuthenticationButton />    
                  <button className="btn btn-dark">
                            <Link to="./AddTeams">Add Teams</Link>
                  </button>           
                </Col>

                <Col sm={9}>Feed</Col>
                {/*<Tab.Container defaultActiveKey={userContext.userTeams[0].team + " " + userContext.userTeams[0].mascot}> */}
                <Tab.Container> {/*remove this line when done*/}
                  <Row>
                    <Col sm={3}>
                      <Nav variant="pills" className="flex-column">
                        {/*teamTabs*/}
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                        {/*teamFeedTabs*/}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Row>
            </Container>
  } else {
       body= <Login />
  }


  return (
    <div>
      <UserAuthProfile />
      {body}

    </div>
    
  );
}

export default Home;