// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var request = require('supertest')
var req = require('superagent')
var app = require('../index.js')
var expect = require('chai').expect
var should = require('chai').should()
var i = 0;

var files = [
  {
    name: "/html-exercises/hello-world.html"
  },
  {
    name: "/html-exercises/text-formatting-1.html",
    text: [
      "Level 1 Headline",
      "<h1",
      "<h2",
      "<h3",
      "<h4",
      "<h5"
      ]
  },
  {
    name: "/html-exercises/text-formatting-2.html"
  },
  {
    name: "/html-exercises/list-1.html"
  },
  {
    name: "/html-exercises/list-2.html"
  },
  {
    name: "/html-exercises/anchors.html"
  },
  {
    name: "/html-exercises/links.html"
  },
  {
    name: "/html-exercises/images-1.html"
  },
  {
    name: "/html-exercises/images-2.html"
  },
  {
    name: "/html-exercises/tables-1.html"
  },
  {
    name: "/html-exercises/tables-2.html"
  },
  {
    name: "/html-exercises/forms-1.html"
  },
  {
    name: "/html-exercises/forms-2.html"
  },
  
  {
    name: "/css-exercises/box-model-1.html"
  },
  {
    name: "/css-exercises/box-model-2.html"
  },
  {
    name: "/css-exercises/box-model-3.html"
  },
  {
    name: "/css-exercises/latest-features-1.html"
  },
  {
    name: "/css-exercises/latest-features-2.html"
  },
  {
    name: "/css-exercises/responsive-layout-1.html"
  },
  {
    name: "/css-exercises/responsive-layout-2.html"
  },
  {
    name: "/css-exercises/selectors-1.html"
  },
  {
    name: "/css-exercises/selectors-2.html"
  },
  {
    name: "/css-exercises/values-and-units-1.html"
  },
  {
    name: "/css-exercises/values-and-units-2.html"
  },
  {
    name: "/history-of-the-internet/index.html"
  },
  {
    name: "/history-of-the-internet/early-protocols.html"
  },
  {
    name: "/history-of-the-internet/world-war-2.html"
  },
  {
    name: "/history-of-the-internet/the-first-internet.html"
  },
  {
    name: "/history-of-the-internet/early-world-wide-web.html"
  },
  {
    name: "/javascript-exercises/hello-world.html"
  },
  {
    name: "/modern-internet/index.html",
  },
  {
    name: "/modern-internet/email.html"
  },
  {
    name: "/modern-internet/network-protocols.html"
  },
  {
    name: "/modern-internet/search-engines.html"
  },
  {
    name: "/modern-internet/blogging.html"
  },
  {
    name: "/modern-internet/video-streaming.html"
  },
  {
    name: "/modern-internet/microblog-social-networking.html"
  },
  {
    name: "/third-subproject/"
  }
  
]

describe('DO AUTOCORRECT', function(){
  
  for (var i in files) {
    checker(i)
  }
  
  function checker(x) {
    var text = null
    it("should have "+ files[x].name+" file", function(done){
      request("http://localhost:8080")
        .get(files[x].name)
        .expect(200);
        
      req.get("http://localhost:8080"+files[x].name).end(function(err, res){
        should.not.exist(err)
        text = res.text
        done()
        // done()
      })
    }) 
    
    it("should have the necessary html, body and head tags in " + files[x].name, function(done){
      should.exist(text)
      expect(text).to.contain("<body")
      expect(text).to.contain("</body>")
      expect(text).to.contain("<html")
      expect(text).to.contain("</html>")
      if (files[x].name!=="/javascript-exercises/hello-world.html") {
        expect(text).to.contain("<head")
       expect(text).to.contain("</head>")
      }
      
      done()
    })
    
    it("should have other text or tags in " + files[x].name, function(done){
      should.exist(text)
      for (var j in files[x].text) {
        expect(text).to.contain(files[x].text[j])
      }
      done()
    })
    
    if (files[x].name.indexOf("modern-internet")>-1) {
      it("should have bootstrap, foundation or materialize in " + files[x].name, function(done){
        should.exist(text)
        var err = null
        
        if (text.indexOf("bootstrap")<=-1 && text.indexOf("foundation")<=-1 && text.indexOf("materialize")<=-1) {
          err = 1
        }

        
       should.not.exist(err)
       done();
        
      })  
      
      it("should have a stylesheet in "+files[x].name, function(done){
        should.exist(text)
        if (text.indexOf("stylesheet")>-1) {
          expect(text).to.contain("stylesheet")
          expect(text).to.contain("<link rel=")
        }
        else {
          expect(text).to.contain("<style")
          expect(text).to.contain("</style>")
        }
        
        done()
      })
      
      it("should have a javascript source "+files[x].name, function(done){
        should.exist(text)
        expect(text).to.contain("<script src=")
        // should.not.exist(text)
        done()
      })
    }
    
  }
    
})
