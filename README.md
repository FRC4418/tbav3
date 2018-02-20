# tbav3
Node.js wrapper for The Blue Alliance api.

---
## Another one?!
This API was inspired by [frc7308's bluealliance bindings](https://github.com/nitroxplunge/bluealliance/blob/master/src/bluealliance.js), and uses many of their concepts and naming conventions, but as I looked through their code, I decided that I needed a rewrite based more on node.js, using built-in libraries (namely https rather than 3rd-party XMLHttpRequest), removing class-like function calls (ex:)
```javascript
var team;
tba.getTeam(4418).then((team) => {
	tba.getEventsForTeam(team).then((events) => {
		doSomething(events);
	});
});
```
(translates to java as:)
```java
new EventsForTeam(new Team(4418));
```
which makes it much simpler for someone with background in java to pick it up. You should definitely check theirs out though, if you are more java-minded and want things to work like your robot code with less of a learning curve. This api attempts to rewrite the one from frc7308 to conform to Node.js coding practices.

## Documentation
### Declaration
```javascript
var tba = new (require("tbav3"))("api_key");
//or
var BlueAlliance = require("tbav3");
var tba = new BlueAlliance("api_key");
```
### Methods (Better descriptions coming soon)
```javascript
tba.callTBA(request).then((data) => {
	doStuff(data);
});
```

```javascript
tba.getTeam(teamNumber).then((team) => {
	doStuff(team);
});
```

```javascript
tba.getTeamAtEvent(teamNumber,eventCode,/*optional*/ year).then((rankings) => {
	doStuff(rankings);
});
```

```javascript
tba.getMatchesForTeam(teamNumber,eventCode).then((matches) => {
	doStuff(matches); //Pre-sorted in chronological order
});
```

```javascript
tba.getNextMatch(teamNumber,eventCode).then((match) => {
	doStuff(match);
});
```
