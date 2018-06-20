const router = require('express').Router(),
      cheerio = require('cheerio'),
      request = require('request');

router.get('/scrape-rng', function(req, res) {
    request('https://rngeternal.com/', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode', response && response.statusCode);
        const $ = cheerio.load(body);
        const resultsArray = [];
        $('h2.entry-title').each(function(i, element) {
            let result = {};
            result.searchId = i;
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');
            console.log(result);
            resultsArray.push(result);
        });
        res.json(resultsArray);
    })
});

router.get('/scrape-warcry', function(req, res) {
    request('https://eternalwarcry.com/articles/', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode', response && response.statusCode);
        const $ = cheerio.load(body);
        const resultsArray = [];
        $('h3.space').each(function(i, element) {
            let result = {};
            result.searchId = i;
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');
            resultsArray.push(result);
        })
        res.json(resultsArray);
    })
})

module.exports = router;