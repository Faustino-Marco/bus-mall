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
- ✅ **CSS fixes: remove invalid `text-justify`, add `cursor: pointer`** (`revamp/qw-3-4-css-fixes`) — dropped the invalid `text-justify: center` declaration; added `cursor: pointer` to image list items so users know they're clickable.

### Moderate

- ✅ **Fix `handleClick` non-image click guard** (`revamp/mod-8-click-guard`) — clicking the orange `<ul>` padding (not an image) previously decremented the vote counter without registering a vote; guard now returns early if `event.target` is not an `<img>`.
- ✅ **Fix localStorage vote persistence** (`revamp/mod-9-localstorage-fix`) — votes were only saved to localStorage at page load; now saved after every click via a `saveProducts()` helper, so vote data survives a refresh.
- ✅ **CSS custom properties for color palette** (`revamp/mod-10-css-custom-props`) — extracted 5 colors into `:root` variables; removed dead commented-out blocks and orphaned nav/footer rules; fixed aggressive global `p { height: 300px }` that conflicted with footer text.