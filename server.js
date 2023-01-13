const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

app.get("/api/quotes/random", (req, res, next) => {
    const quoteObj = getRandomElement(quotes);
    res.send(
        {
            quote: quoteObj
        }
    );
});

app.get("/api/quotes", (req, res, next) => {
    let query = req.query.person;
    if (query) {
        const quotesByPerson = quotes.filter(quote => quote.person === query)
        res.send(
            {
                quotes: quotesByPerson
            }
        );
    } else {
        res.send(
            {
                quotes: quotes
            }
        );
    }
})

app.post("/api/quotes", (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if (newQuote && newPerson) {
        quotes.push(
            {
                quote: newQuote,
                person: newPerson
            }
        );
        res.send(
            {
                quote: {
                    quote: newQuote,
                    person: newPerson
                }
            }
        )

    } else {
        res.status(400).send();
    }
})