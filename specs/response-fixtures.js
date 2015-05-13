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
		};
	}
},
{
	pattern: '/code-challenges/(\\w+)$',
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
	fixtures: function (match) {		
		if (match[1] !== 'javascript') {
			throw new Error('Hey, JavaScript should have been request as the language!');
		}
		return 'success!';
	},
	callback: function (match, data) {
		return {
			body: {
			    "success": true,
			    "name": "Can you get the loop ?",
			    "slug": "can-you-get-the-loop",
			    "href": "/kata/can-you-get-the-loop",
			    "description": "You are given a node that is the beginning of a linked list. This list always contains a tail and a loop.\n\nYour objective is to determine the length of the loop.  \n\nFor example in the following picture the tail's size is 3 and the loop size is 11.\n\n<div style=\"overflow-y:hidden;height:450px;margin-bottom:20px\"><img style='position: relative;top: -160px' src=\"http://i42.tinypic.com/27wrmed.png\" border=\"0\" alt=\"Image and video hosting by TinyPic\"></div>\n\n```ruby\n# Use the `next' method to get the following node.\n\nnode.next\n```\n```javascript\n// Use the `getNext' method or 'next' property to get the following node.\n\nnode.getNext()\nnode.next\n```\n```python\n# Use the `next' attribute to get the following node\n\nnode.next\n```\n```java\n// Use the `getNext()` method to get the following node.\n\nnode.getNext()\n```\n```haskell\n-- use the `next :: Node a -> Node a` function to get the following node\n```\n\n\n> Thanks to shadchnev, I broke all of the methods from the Hash class.\n\n> Don't miss dmitry's article in the discussion after you pass the Kata !! ",
			    "author": "Julio Henriquez",
			    "rank": -3,
			    "averageCompletion": 24888.733864000016,
			    "tags": [
			        "Algorithms",
			        "Hacking Holidays",
			        "Logic"
			    ]
			}
		};
	}
}
];