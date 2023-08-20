
let leetcodeQues = document.querySelectorAll('.mr-2');

var XHR = XMLHttpRequest.prototype;
var send = XHR.send;
var open = XHR.open;

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.requestBody && details.requestBody.formData) {
      // The request contains form data (e.g., data from a POST request)
      console.log('Request body:', details.requestBody.formData);
    } else if (details.requestBody && details.requestBody.raw) {
      // The request contains raw data (e.g., data from a POST request with JSON payload)
      const rawData = details.requestBody.raw[0].bytes;
      const requestBody = new TextDecoder().decode(rawData);
      console.log('Request body:', requestBody);
    } else {
      console.log('Request body is empty.');
    }
  },
  { urls: ['<all_urls>'] },
  ['requestBody']
);

setTimeout(function() {
  console.log("Delayed code executed after 2 seconds.");
  leetcodeQues = document.querySelectorAll('.mr-2');
  console.log(leetcodeQues);
}, 4000);


/*
This is for adding reading time 
*/

const article = document.querySelector("article");
if (article) {
  const text = article.textContent;
  console.log(text);
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  console.log(readingTime);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}

