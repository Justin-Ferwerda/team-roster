# Team Roster
For this project you will be building a team roster for a sports team.  Pick any team sport you want.  Theme your project based on the sport.

## Requirements
Take some time to plan your project and track how the data will flow. **It is expected that you will complete this assignment by the due date, so plan accordingly.**

- Use the react template to start the project

Here is the ERD for this project:

<img width="291" alt="srerd" src="https://user-images.githubusercontent.com/29741570/137314750-ec4b65c5-e139-4b1a-8fa5-6d25aa57afb7.png">

Here are the user stories that need to be completed:
### Authentication
* As a user, who is logged out, I should only be able to see the authentication screen
* As a user who is logged out, I would like to be able to click on an authentication button and login via google.
* As a user who is logged in, I should not be able to see the authentication button.
* As a user who is logged in, I should be able to see the Team view.
* As a user who is logged in, I should be able to see a log out button

### Routing
* As an authenticated user, if I click the TEAM link in the navbar, I should navigate to '/team' and see an h1 tag that says 'Team'.
* As an authenticated user, if I click the NEW link in the navbar, I should navigate to '/new' and see an h1 tag that says 'Add a Player'.

### CREATE Players
* As an authenticated user, when I create a player, the player object should include my uid.
* As an authenticated user, I should be able to click the NEW link in the navbar that displays a form to add a new player.
* As an authenticated user, when I fill out the form and submit a new Player should be created in firebase and should now show in my Team view.

### READ Players
* As an authenticated user, I should be able to see the Team view with all the players I have created.
* As an authenticated user I should not be able to see players that were created by another user.

### UPDATE Players
* As an authenticated user, I should be able to see an edit button on each player card.
* As an authenticated user, when I click the edit button I should see a form with the player information pre-populated in the form.
* As an authenticated user, I should be able to edit the information in the form and hit the submit button.
* As an authenticated user, when I submit the edit form firebase should be updated (PATCH request) and the Team view should update

### DELETE Players
* As an authenticated user, I should see a delete button on each player.
* As an authenticated user, when I click a delete button that player should be removed from firebase and the Team view should update.

---

# :red_circle: STOP :red_circle:
## Create an MVP branch from the main branch after completing all MVP and push it up to Github before starting stretch goals

---

## STRETCH 1
* As an authenticated user, I can search my players

## STRETCH 2
Now that we have an application that can create a single team roster, we want to expand the application to be able to have multiple teams. You will need to update your ERD for this relationship.

Note: 
- A team can be public or private
- A player can only be on one team
- A player should be able to be updated/added to another team

### Routing (you will need to refactor)
* As an authenticated user, if I click the TEAMS link in the navbar, I should navigate to '/teams' and see an h1 tag that says 'Teams'.
* As an authenticated user, if I click the NEW link in the navbar, I should navigate to '/new' and see an h1 tag that says 'Add a Team'.
* As an authenticated user, if I click the PLAYERS link in the navbar, I should navigate to '/players' and see an h1 tag that says 'Players'.
* As an authenticated user, if I click the View link on the Team card, I should navigate to '/team/{{TEAMID}}' and see the players on that team

### UPDATE Players
* As an authenticated user, I should be able to update the team that a player is assigned to

### READ Players
* As an authenticated user, I should be able to see the player's assigned team on the player cards

### CREATE Teams
* As an authenticated user, I should be able to click the NEW link in the navbar that displays a form to add a new team.
* As an authenticated user, when I fill out the form and submit a new Team should be created in firebase and should now show in my Teams view.

### READ Teams
* As an authenticated user, on the home view, instead of players, I should see all my teams with an affordance to view details on each card
* As an authenticated user, I should be able to see the Team view with all the teams I have created.
* As an authenticated user I should not be able to see teams that were created by another user.

### UPDATE Teams
* As an authenticated user, I should be able to see an edit button on each team card.
* As an authenticated user, when I click the edit button I should see a form with the team information pre-populated in the form.
* As an authenticated user, I should be able to edit the information in the form and hit the submit button.
* As an authenticated user, when I submit the edit form firebase should be updated (PATCH request) and the Teams view should update

### DELETE Teams
* As an authenticated user, I should see a delete button on each team.
* As an authenticated user, when I click a delete button that team as well as all players on that team should be removed from firebase and the Team view should update.

## STRETCH 3: Public / Private Teams
* A team can be marked public or private
* If a team is public, any authenticated user can view the team and its players along with creator details

## STRETCH 4: Make Trades
This will require updates to the ERD

* On public teams, users who did not create the team can ask to aquire a team and select one of their own PUBLIC teams to trade
* A new link is added to the navigation named "Trade Requests" and there is a notification indicator that a request is in progress

