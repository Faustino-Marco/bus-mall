# Bus Mall

## A Grounded Version of SkyMall

- BusMall is a disruptive new concept that seeks to offer high-markup products to those who choose to travel by bus to their destinations, near or far. 

## A Researched Concept

- Our site seeks to understand further the preferences and inlinations of BusMall's potential customer base. 
- Not only does our application assess and report the number of times a product has been voted for by users presented with its picture, this app also synthesizes a count of views along with votes.
  - This helps us to understand better the magnitude of the preference users have toward BusMall's products by offering a more in-depth perspective into the bus rider's decision making and thereby informs revenue-generating decisions.

---

## Revamp Log (2026-05-17)

### Quick Wins

- ✅ **Remove dead HTML clutter + add meta tags + defer scripts + aria-label** (`revamp/qw-1-5-6-7-html-cleanup`) — removed empty nav/ul/footer/div ghosts; added viewport & description meta; deferred Chart.js and bus-mall.js; added aria-label to canvas; moved script to end of body.
- ✅ **Remove dead JS variables** (`revamp/qw-2-dead-js-vars`) — removed unused `voteCount`, commented-out `resultButton`, and orphaned `Product.allProductsArr` comment.