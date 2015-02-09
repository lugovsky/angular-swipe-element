/**
 * angular-swipe-element.js
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Flatlogic
 * http:/flatlogic.com
 */

 (function(angular) {

    var module = angular.module('angular-swipe-element', []);

    module.directive('swipeElement', SwipeElement);

    SwipeElement.$inject = ['$document'];
    function SwipeElement($document) {
        return {
            restrict: 'EA',
            scope: {
                onMoveStart: '&swipeElementStart',
                onMoveProgress: '&swipeElementMove',
                onMoveEnd: '&swipeElement'
            },
            link: function ($scope, $element, $attrs) {
                $element.bind('touchstart', onTouchStart);
                $element.bind('mousedown', onMouseDown);
                var firstMove = false;
                var startX = null;
                var startY = null;
                var startBounds = null;


                function _createEventObject(x, y, event, triggerType) {
                    var direction = '';
                    var posX = x;
                    var posY = y;
                    var deltaX = posX - startX;
                    var deltaY = posY - startY;
                    var absDeltaX = Math.abs(deltaX);
                    var absDeltaY = Math.abs(deltaY);
                    var verticalDirection = deltaY > 0 ? 'd' : (deltaY < 0 ? 'u' : '');
                    var horizontalDirection = deltaX > 0 ? 'r' : ( deltaX < 0 ? 'l' : '');

                    if (absDeltaY != 0 || absDeltaX != 0) {
                        // Intentionally given more priority to horizonal direction to keep it less complex.
                        direction = absDeltaY > absDeltaX ? verticalDirection : horizontalDirection;
                    }

                    var res = {
                        startX: x,
                        startY: y,
                        initialElementBounds: startBounds,
                        triggerType: triggerType,
                        source: event,
                        
                        x: posX,
                        y: posY,
                        deltaX: deltaX,
                        deltaY: deltaY,
                        dir: direction,
                        vDir: verticalDirection,
                        hDir: horizontalDirection
                    };
                    return angular.extend({ $event: res }, res);
                }

                function _onDown(x, y, event, triggerType) {
                    startX = x;
                    startY = y;
                    startBounds = $element[0].getBoundingClientRect();
                    $scope.$apply(function() {
                        $scope.onMoveStart( _createEventObject(x, y, event, triggerType) );
                    });
                }
                function onTouchStart(event) {
                    _onDown(event.touches[0].pageX, event.touches[0].pageY, event, 'touch');
                    $element.bind('touchmove', onTouchMove);
                    $element.bind('touchend', onTouchEnd);
                    firstMove = true;
                }
                function onMouseDown(event) {
                    var x = event.pageX;
                    var y = event.pageY;
                    _onDown(x, y, event, 'mouse');
                    $document.bind('mousemove', onMouseMove);
                    $document.bind('mouseup', onMouseUp);
                }

                function _onMove(x, y, event, triggerType) {
                    $scope.$apply(function() {
                        $scope.onMoveProgress( _createEventObject(x, y, event, triggerType) );
                    });
                }
                function onTouchMove(event) {
                    if (firstMove) {
                        firstMove = false;
                        event.preventDefault();
                    }
                    _onMove(event.changedTouches[0].pageX, event.changedTouches[0].pageY, event, 'touch');
                }
                function onMouseMove(event) {
                    _onMove(event.pageX, event.pageY, event, 'mouse');
                }

                // Unbinds methods when touch interaction ends
                function _onEnd(x, y, event, triggerType) {
                    $scope.$apply(function() {
                        $scope.onMoveEnd( _createEventObject(x, y, event, triggerType) );
                    });
                }
                function onTouchEnd(event) {
                    firstMove = false;
                    $element.unbind('touchmove', onTouchMove);
                    $element.unbind('touchend', onTouchEnd);
                    _onEnd(event.changedTouches[0].pageX, event.changedTouches[0].pageY, event, 'touch');
                }
                function onMouseUp(event) {
                    $document.unbind('mousemove', onMouseMove);
                    $document.unbind('mouseup', onMouseUp);
                    _onEnd(event.pageX, event.pageY, event, 'mouse');
                }
            }
        };
    };

 })(angular);