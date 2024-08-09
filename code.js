const apiKey = localStorage.chatApiKey;
const apiUrl = "https://api.openai.com/v1/chat/completions";

function chatRequest (prompt, callback) {
	const headers = {
		"Authorization": `Bearer ${apiKey}`
		};
	const data = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You are a helpful assistant."
				},
			{
				role: "user",
				content: prompt
				}
			],
		max_tokens: 1000
		};
	
	console.log ("chatRequest: headers == " + jsonStringify (headers));
	console.log ("chatRequest: data == " + jsonStringify (data));
	
	$.ajax ({
		url: apiUrl,
		type: "POST",
		contentType: "application/json",
		headers,
		data: JSON.stringify (data),
		success: function (response) {
			callback (undefined, response.choices [0].message.content);
			},
		error: function (xhr, status, error) {
			const theResponse = JSON.parse (xhr.responseText);
			callback (theResponse.error);
			}
		});
	}
function startup () {
	console.log ("startup");
	console.log ("startup: apiKey == " + apiKey);
	console.log ("startup: apiUrl == " + apiUrl);
	
	var defaultPerson = "Bull Mancuso";
	askDialog ("Who should we ask about:", defaultPerson, "", function (thePerson, flcancel) {
		if (!flcancel) {
			chatRequest ("Who is " + thePerson + "?", function (err, theResponse) {
				if (err) {
					alertDialog (err.message);
					}
				else {
					alertDialog (theResponse);
					}
				});
			}
		});
	
	
	}
