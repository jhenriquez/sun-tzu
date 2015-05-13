module.exports = [
{
	pattern: '/users/(\\w+)$',
	fixtures: function (match) {
		return match[1];
	},
	callback: function (match, data) {
		return {
			body: {
				"username": data,
			    "name": "Some Person",
			    "honor": 544,
			    "clan": "some clan",
			    "leaderboardPosition": 134,
			    "skills": [
			        "ruby",
			        "c#",
			        ".net",
			        "javascript",
			        "coffeescript",
			        "nodejs",
			        "rails"
			    ],
			    "ranks": {
			        "overall": {
			            "rank": -3,
			            "name": "3 kyu",
			            "color": "blue",
			            "score": 2116
			        },
			        "languages": {
			            "javascript": {
			                "rank": -3,
			                "name": "3 kyu",
			                "color": "blue",
			                "score": 1819
			            },
			            "ruby": {
			                "rank": -4,
			                "name": "4 kyu",
			                "color": "blue",
			                "score": 1005
			            },
			            "coffeescript": {
			                "rank": -4,
			                "name": "4 kyu",
			                "color": "blue",
			                "score": 870
			            }
			        }
			    },
			    "codeChallenges": {
			        "totalAuthored": 3,
			        "totalCompleted": 230
			    }
			}
		}
	}
}	
];