db.books.find({ genre: "The Hobbit" });

db.books.find({ year: { $gt: 1951 } });

db.books.find({ author: "J.R.R. Tolkien" });

db.books.updateOne(
    { title: "The Great Gatsby" },
    { $set: { price: 19.99 } }
);

db.books.deleteOne({ title: "Brave New World" });

db.books.find(
    { inStock: true, year: { $gt: 1960 } },
    { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: 1 }).skip(0).limit(5);

db.books.find(
    { inStock: true, year: { $gt: 1984 } },
    { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 }).skip(5).limit(5);

db.books.aggregate([
    { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

db.books.aggregate([
    { $group: { _id: "$author", bookCount: { $sum: 1 } } },
    { $sort: { bookCount: -1 } },
    { $limit: 1 }
]);

db.books.aggregate([
    {
        $project: {
            decade: { $concat: [
                { $substr: [ { $subtract: [ "$year", { $mod: [ "$year", 10 ] } ] }, 0, 4 ] },
                "s"
            ]}
        }
    },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
]);

db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: 1 });

db.books.find({ title: "The Great Gatsby" }).explain("executionStats");

db.books.find({ author: "J.R.R. Tolkien", published_year: 1954 }).explain("executionStats");