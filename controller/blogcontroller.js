var blog = require('../data/blog.json');
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');


exports.getblogentrys = function (req, res) {

    if (res.locals.authenticated)
    {
        res.json(blog);
    } else
    {
        res.json(blog.filter((element) => {
            return !element.hidden;
        }));
    }
};

exports.postentry = function (req, res) {


    if (!res.locals.authenticated) {
        res.status(401).send();
        return;
    }

    if (!req.body.title || !req.body.picture || !req.body.author || !req.body.about || !req.body.released || !req.body.hidden || !req.body.tags) {
        res.status(400).send();
        return;
    }

    // n�chsten freien Index suchen
    var index = blog.length;
    while (blog.filter((element) => { return element.index == index }).length > 0) {
        index += 1;
    }

    var blogpost = {
        _id: new ObjectID(),
        index: index,
        title: req.body.title,
        picture: req.body.picture,
        author: req.body.author,
        about: req.body.about,
        released: req.body.released,
        hidden: req.body.hidden,
        tags: req.body.tags
    };

    blog.push(blogpost);

    fs.writeFile('./data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
        if (err) {
            res.status(400).json({ error: err });
        } else {
            res.status(201).json({ index: index, id: blogpost._id });
        }
    });



};

exports.getblogentrybyid = function (req, res) {


    if (!blog[req.params.id]) {
        res.status(403).json
         (
            {
                message: 'ID not found!'
            }
         );
        return;
    }

        if (!res.locals.authenticated && blog[req.params.id].hidden) {
        res.status(401).json
        ({message: 'Blog Entry is hidden'});
        
        return;
    }
    res.json(blog[req.params.id]);


};

exports.deleteblogentrybyid = function (req, res) {

     if (!res.locals.authenticated && blog[req.params.id].hidden) {
        res.status(401).send();
        return;
     }

     if (!blog[req.params.id]) {
         res.status(403).json
           (
              {
                  message: 'ID not found!'
              }
           );
         return;
    }

     blog.splice(req.params.id, 1);

     fs.writeFile('./data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
         if (err) {
             res.status(500).json({ error: err });
         } else {
             res.status(200).send();
         }
     });

};

exports.updateblogentrybyid = function (req, res) {

    if (!res.locals.authenticated && blog[req.params.id].hidden) {
        res.status(401).send();
        return;
    }
    if (!blog[req.params.id]) {
        res.status(403).json
         (
            {
                message: 'ID not found!'
            }
         );
        return;
    }


    blog[req.params.id].title = req.body.title || blog[req.params.id].title;
    blog[req.params.id].picture = req.body.picture || blog[req.params.id].picture;
    blog[req.params.id].author = req.body.author || blog[req.params.id].author;
    blog[req.params.id].about = req.body.about || blog[req.params.id].about;
    blog[req.params.id].released = req.body.released || blog[req.params.id].released;
    blog[req.params.id].hidden = req.body.hidden || blog[req.params.id].hidden;
    blog[req.params.id].tags = req.body.tags || blog[req.params.id].tags;
  
    fs.writeFile('./data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(blog[req.params.id]);
        }
    });
};