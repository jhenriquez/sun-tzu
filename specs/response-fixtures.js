module.exports = [
{
	pattern: '/users/([a-zA-Z\-_]*)$',
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
		};
	}
},
{
	pattern: '/code-challenges/([a-zA-Z\-_]*)$',
	fixtures: function (match) {
		if (match[1] !== 'valid-braces') {
			throw new Error('Failure: valid-braces fixture was expected.');
		}
		return 'Succes!';
	},
	callback: function (match, data) {
		return {
			body: {
			    "id": "5277c8a221e209d3f6000b56",
			    "name": "Valid Braces",
			    "slug": "valid-braces",
			    "category": "algorithms",
			    "publishedAt": "2013-11-05T00:07:31Z",
			    "approvedAt": "2013-12-20T14:53:06Z",
			    "languages": [
			        "javascript",
			        "coffeescript"
			    ],
			    "url": "http://www.codewars.com/kata/valid-braces",
			    "rank": {
			        "id": -4,
			        "name": "4 kyu",
			        "color": "blue"
			    },
			    "createdBy": {
			        "username": "xDranik",
			        "url": "http://www.codewars.com/users/xDranik"
			    },
			    "approvedBy": "xDranik",
			    "description": "Write a function called `validBraces` that takes a string of braces, and determines if the order of the braces is valid. `validBraces` should return true if the string is valid, and false if it's invalid.\n\nThis Kata is similar to the Valid Parentheses Kata, but introduces four new characters. Open and closed brackets, and open and closed curly braces. Thanks to @arnedag for the idea!\n\nAll input strings will be nonempty, and will only consist of open parentheses '(' , closed parentheses ')', open brackets '[', closed brackets ']', open curly braces '{' and closed curly braces '}'. \n\n<b>What is considered Valid?</b>\nA string of braces is considered valid if all braces are matched with the correct brace. <br/>\nFor example:<br/>\n'(){}[]' and '([{}])' would be considered valid, while '(}', '[(])', and '[({})](]' would be considered invalid.\n\n\n<b>Examples:</b> <br/>\n`validBraces( \"(){}[]\" )` => returns true <br/>\n`validBraces( \"(}\" )` => returns false <br/>\n`validBraces( \"[(])\" )` => returns false <br/>\n`validBraces( \"([{}])\" )` => returns true <br/>\n",
			    "totalAttempts": 4911,
			    "totalCompleted": 919,
			    "totalStars": 12,
			    "tags": [
			        "Algorithms",
			        "Validation",
			        "Logic",
			        "Utilities"
			    ]
			}
		}; 
	}
},
{
	pattern: '/code-challenges/(\\w+)/train',
	fixtures: function (match, params) {		
		if (match[1] !== 'javascript') {
			throw new Error('Hey, JavaScript should have been request as the language!');
		}
		
		return params;
	},
	callback: function (match, params) {
		var response = {
			body: {
			    "success":true,
			   "name":"Anything to integer",
			   "slug":"anything-to-integer",
			   "description":"Your task is to program a function which converts any input to an integer.\n\nDo not perform rounding, the fractional part should simply be discarded.\n\nIf converting the input to an integer does not make sense (with an object, for instance), the function should return 0 (zero).\n\nAlso, Math.floor(), parseInt() and parseFloat() are disabled for your unconvenience.\n\nOnegaishimasu!",
			   "author":"Jake Hoffner",
			   "rank":-6,
			   "averageCompletion":125.4,
			   "tags":[
			      "Fundamentals",
			      "Integers",
			      "Data Types",
			      "Numbers"
			   ],
			   "session":{
			       "projectId":"523f66fba0de5d94410001cb",
			       "solutionId":"53bc968d35fd2feefd000013",
			       "setup":"function toInteger(n) {\n  \n}",
			       "exampleFixture":"Test.expect(toInteger(\"4.55\") === 4)",
			       "code":null
			   }
			}
		};
		
		if (params.peek) {
			response.body.session = undefined;
		}
		return response;
	}
},
{
	pattern: '/code-challenges/(.+)/(\\w+)/train$',
	fixtures: function (matches) {
		if (matches[1] !== 'anything-to-integer' || matches[2] !== 'javascript') {
			throw new Error("Wrong! The spec didn't provide the expected language or slug.");
		}
	},
	callback: function (matches, data) {
		return {
			body: {
			   "success":true,
			   "name":"Anything to integer",
			   "slug":"anything-to-integer",
			   "description":"Your task is to program a function which converts any input to an integer.\n\nDo not perform rounding, the fractional part should simply be discarded.\n\nIf converting the input to an integer does not make sense (with an object, for instance), the function should return 0 (zero).\n\nAlso, Math.floor(), parseInt() and parseFloat() are disabled for your unconvenience.\n\nOnegaishimasu!",
			   "author":"Jake Hoffner",
			   "rank":-6,
			   "averageCompletion":125.4,
			   "tags":[
			      "Fundamentals",
			      "Integers",
			      "Data Types",
			      "Numbers"
			   ],
			   "session":{
			       "projectId":"523f66fba0de5d94410001cb",
			       "solutionId":"53bc968d35fd2feefd000013",
			       "setup":"function toInteger(n) {\n  \n}",
			       "exampleFixture":"Test.expect(toInteger(\"4.55\") === 4)",
			       "code":null
			   }
			}
		};
	}
},
{
	pattern: '/code-challenges/projects/(.+)/solutions/(.+)/attempt',
	fixtures: function (match) {
		if (match[1] !== 'projectid') {
			throw new Error('Hey! Should have sent projectid in the url.');
		}
		
		if (match[2] !== 'solutionid') {
			throw new Error('Hey! Should have sent solutionid in the url.');
		}
		
		return "success";
	},
	callback: function (matches, data) {
		return {
			body: {
			   "success":true,
			   "dmid":"4rsdaDf8d"
			}
		};
	}
},
{
	pattern: '/code-challenges/projects/(.+)/solutions/(.+)/finalize',
	fixtures: function (match) {
		if (match[1] !== 'projectid') {
			throw new Error('Hey! Should have sent projectid in the url.');
		}
		
		if (match[2] !== 'solutionid') {
			throw new Error('Hey! Should have sent solutionid in the url.');
		}
		
		return "success";
	},
	callback: function (matches, data) {
		return {
			body: {
			   "success":true
			}
		};
	}
},
{
	pattern: '/deferred/(.+)$',
	fixtures: function (match) {
		return "success";
	},
	callback: function (matches, data) {
		return {
			body: {
			   "success":true,
			   "dmid":":dmid",
			   "valid": false,
			   "reason":"-e: Value is not what was expected (Test::Error)\n",
			   "output":[
			      "<div class='console-failed'>Value is not what was expected</div>"
			   ],
			   "wall_time":45
			}
		};
	}
}
];