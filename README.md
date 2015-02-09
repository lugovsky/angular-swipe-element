# angular-swipe-element

Small extension for AngularJS to add wider support of swipes and drags

Live <a href="http://lugovsky.github.io/angular-swipe-element/example.html" target="_blank">Demo</a> here.

Basic usage
----------
Define module as dependency!
```javascript
var app = angular.module('app', ['angular-swipe-element']);
```
Define the directive!
```html
<div swipe-element="onSwipeEnd(dir, deltaX, deltaY)" 
     swipe-element-move="onSwipeMove(dir, deltaX, deltaY)" 
     swipe-element-start="onSwipeStart(dir, deltaX, deltaY)"></div>
```
Define the callbacks in controller!
```javascript
app.controller(function($scope) {
    $scope.onSwipeStart = function(dir, deltaX, deltaY) { console.log('Started, direction: ' + dir + '. DeltaX: ' + deltaX + '; DeltaY: ' + deltaY); };
    $scope.onSwipeMove = function(dir, deltaX, deltaY) { console.log('Moved, direction: ' + dir + '. DeltaX: ' + deltaX + '; DeltaY: ' + deltaY); };
    $scope.onSwipeEnd = function(dir, deltaX, deltaY) { console.log('Released, direction: ' + dir + '. DeltaX: ' + deltaX + '; DeltaY: ' + deltaY); };
});
```
You are ready! Enjoy the plugin.

Directive attributes
----------
Directive can be used to catch swipe(mouse drag) start/move/end events. You can pass callbacks for these events in the following attributes:

| Attribute | Required | Description |
|------------- | ------------- | ------------- |
| swipe-element | Required | Fires when user stops swiping/dragging current element |
| swipe-element-start | _optional_ | Fires when user touches/mousedowns current element |
| swipe-element-move | _optional_ | Fires when user moves finger/mouse while holding current element |

Callback parameter
------------
When some event is fired, directive callback's scopes are provided with <b>$event</b> parameter as well as with the following properties which could be used for your needs:

| Property | Description |
|------------- | ------------- |
| $event | Contains all of the data properties |
| x | Current X coordinate of the pointer in the document |
| y | Current X coordinate of the pointer in the document |
| deltaX | Difference on the X axis, comparing to swipe/drag starting point. (currentPosition - startingPosition) |
| deltaX | Difference on the Y axis, comparing to swipe/drag starting point. (currentPosition - startingPosition) |
| dir | String value representing direction, in which swipe/drag is heading. Can be equal to '', 'u', 'd', 'l', 'r'. If deltaX and deltaY equal to each other and not equal 0 takes horizontal value. |
| hDir | String value representing direction, in which swipe/drag is heading on X axis. Can be equal to '', 'l', 'r'. |
| vDir | String value representing direction, in which swipe/drag is heading on Y axis. Can be equal to '', 'u', 'd'. |
| startX | X coordinate of the pointer in the document, when swipe/drag started |
| startY | Y coordinate of the pointer in the document, when swipe/drag started |
| initialElementBounds | getClientBoundingRect() executed on element when the swipe/drag started. |
| triggerType | Could be used to differ mouse and touch events. String value. Can be 'mouse' or 'touch'. |
| source | Source DOM event. |

License
-------------
<a href="http://opensource.org/licenses/MIT" target="_blank">MIT</a> license.

Contribution
-------------
You are welcome to contribute. Feel free to contact me.
