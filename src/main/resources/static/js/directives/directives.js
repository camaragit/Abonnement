/**
 * 
 */
app.directive('loadingPane', function ($timeout, $window) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      var directiveId = 'loadingPane';

      var targetElement;
      var paneElement;
      var throttledPosition;

      function init(element) {
        targetElement = element;

        paneElement = angular.element('<div>');
        paneElement.addClass('loading-pane');

        if (attr['id']) {
          paneElement.attr('data-target-id', attr['id']);
        }

        var spinnerImage = angular.element('<div>');
        spinnerImage.addClass('spinner-image');
        spinnerImage.appendTo(paneElement);

        angular.element('body').append(paneElement);

        setZIndex();

        //reposition window after a while, just in case if:
        // - watched scope property will be set to true from the beginning
        // - and initial position of the target element will be shifted during page rendering
        $timeout(position, 100);
        $timeout(position, 200);
        $timeout(position, 300);

        throttledPosition = _.throttle(position, 50);
        angular.element($window).scroll(throttledPosition);
        angular.element($window).resize(throttledPosition);
      }

      function updateVisibility(isVisible) {
        if (isVisible) {
          show();
        } else {
          hide();
        }
      }

      function setZIndex() {
        var paneZIndex = 500;

        paneElement.css('zIndex', paneZIndex).find('.spinner-image').css('zIndex', paneZIndex + 1);
      }

      function position() {
        paneElement.css({
          'left': targetElement.offset().left,
          'top': targetElement.offset().top - $(window).scrollTop(),
          'width': targetElement.outerWidth(),
          'height': targetElement.outerHeight()
        });
      }

      function show() {
        paneElement.show();
        position();
      }

      function hide() {
        paneElement.hide();
      }

      init(element);

      scope.$watch(attr[directiveId], function (newVal) {
        updateVisibility(newVal);
      });

      scope.$on('$destroy', function cleanup() {
        paneElement.remove();
        $(window).off('scroll', throttledPosition);
        $(window).off('resize', throttledPosition);
      });
    }
  };
});
app.directive('modalduplicates', function() {
    return {
        template: '<div id="modalduplicates" class="modal fade">' +
            '<div class="modal-dialog modal-lg">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            ' <h4 class="modal-title">Confirmation</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
app.directive('connexionmodale', function() {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;


            scope.$watch(attrs.visible, function(value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
