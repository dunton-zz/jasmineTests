/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        
        // test to see if allFeeds is populated and defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // test to see if url is defined and not empty
        it("URLs are defined", function() {
            allFeeds.forEach(function(rssFeed) {
                expect(rssFeed.url).toBeDefined();
                expect(rssFeed.url.length).not.toBe(0);
            });
        });


        // test to see if name is defined and not empty
        it("name not empty", function() {
            allFeeds.forEach(function(rssFeed) {
                expect(rssFeed.name).toBeDefined();
                expect(rssFeed.name.length).not.toBe(0);
            });
        }); 
        
    });


    describe("The menu", function() {

         var body = document.body;
         
         // test to see if body is initially hidden
        it("body is hidden initially", function () {
            expect(body.className).toContain("menu-hidden");
        });

        // make sure menu changes when it is clicked
        it("menu changes when clicked", function() {
            var menu = document.querySelector(".menu-icon-link");
            menu.click();
            expect(body.className).not.toContain("menu-hidden");

            menu.click();
            expect(body.className).toContain("menu-hidden");
          });
    });


    describe("Initial Entries", function() {



         // set beforeEach to fire after async function is done
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });

        // test to see if .entry is within .feed container
        it("has .entry element within .feed container", function() {
            var entries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(entries).toBeGreaterThan(0);
         });


    });

    
    describe("New Feed Selector", function() {

        

         // set beforeEach to fire after async function is done
         beforeEach(function() {
            loadFeed(0, function() {
                var firstFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
         });
        

         // test to see if firstFeed equals newFeed
         it("changes content", function(done) {
            var newFeed = document.querySelector(".feed").innerHTML;
            expect(firstFeed).not.toBe(newFeed);
         });
    });
}());
