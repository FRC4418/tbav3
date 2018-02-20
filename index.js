var baseUrl = "www.thebluealliance.com/api/v3";

var https = require("https");

class BlueAlliance {
	constructor(key) {
		this.key = key;
	}
	//Misc helper functions
	sortMatches(matches) {
		var compLevels = ["qm","ef","qf","sf","f"];
		return matches.sort(function(a,b) {
			if(a.comp_level!=b.comp_level) {
				return compLevels.indexOf(a.comp_level) - compLevels.indexOf(b.comp_level);
			} else {
				return a.match_number - b.match_number;
			}
		});
	}
	//Query API
	callTBA(request) {
		var key = this.key;
		return new Promise(function(resolve) {
			https.request({
				protocol: "https:",
				host: "www.thebluealliance.com",
				path: `/api/v3${request}`,
				headers: {
					"X-TBA-Auth-Key": key
				}
			},function(res) {
				var data = "";
				res.on("data",function(d) {
					data += String(d);
				});
				res.on("end",function() {
					resolve(JSON.parse(data));
				});
			}).end();
		});
	}

	//Get Team Info
	getTeam(teamNumber) {
		return this.callTBA(`/team/frc${teamNumber}`);
	}
	//Get Event-specific team data
	getTeamAtEvent(teamNumber,eventCode,year) {
		if(!year) var year = new Date().getFullYear();
		return this.callTBA(`/team/frc${teamNumber}/event/${year}${eventCode}/status`);
	}
	//Get Matches for team
	getMatchesForTeam(team,eventKey) {
		var self = this;
		return new Promise(function(resolve) {
			self.callTBA(`/team/frc${team}/event/${eventKey}/matches`).then(function(data) {
				resolve(self.sortMatches(data));
			});
		});
	}
	//Get next match
	getNextMatch(number,eventCode) {
		var self = this;
		return new Promise(function(resolve,reject) {
			self.getMatchesForTeam(number,`${new Date().getFullYear()}${eventCode}`).then(function(matches) {
				for (var i = 0; i < matches.length; i++) {
					if(!matches[i].actual_time) {
						resolve(matches[i]);
						return;
					}
				}
				reject("Matches not available");
				return;
			}).catch(function(err) {
				throw new Error(err);
			});
		});
	}

}

module.exports = BlueAlliance;
