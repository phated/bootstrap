define([
  'dojo/query',
  'dojo/dom-construct',
  'dojo/dom-class',
  'dojo/on',
  'dojo/NodeList-traverse',
  'dojo/NodeList-manipulate',
  'bootstrap/bootstrap-dropdown'
], function($, domConstruct, domClass, on){

    module("bootstrap-dropdowns")

      test("should be defined on NodeList object", function () {
        ok($(document.body).dropdown, 'dropdown method is defined')
      })

      test("should return element", function () {
        ok($(document.body).dropdown()[0] == document.body, 'document.body returned')
      })

      test("should add class open to menu if clicked", function () {
        var dropdownHTML = domConstruct.create('ul', { class: 'tabs', innerHTML:
            '<li class="dropdown">'
          + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
          + '<ul class="dropdown-menu">'
          + '<li><a href="#">Secondary link</a></li>'
          + '<li><a href="#">Something else here</a></li>'
          + '<li class="divider"></li>'
          + '<li><a href="#">Another link</a></li>'
          + '</ul>'
          + '</li>'
          })
          , dropdown = $(dropdownHTML).query('[data-toggle="dropdown"]').dropdown()

          on.emit(dropdown[0], 'click', {
            cancelable: true,
            bubbles: true
          })

        ok(domClass.contains(dropdown.parent('.dropdown')[0], 'open'), 'open class added on click')
      })

      test("should remove open class if body clicked", function () {
        var dropdownHTML = domConstruct.create('ul', { class: 'tabs', innerHTML:
            '<li class="dropdown">'
          + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
          + '<ul class="dropdown-menu">'
          + '<li><a href="#">Secondary link</a></li>'
          + '<li><a href="#">Something else here</a></li>'
          + '<li class="divider"></li>'
          + '<li><a href="#">Another link</a></li>'
          + '</ul>'
          + '</li>'
          })
          , dropdown = $(dropdownHTML)
            .appendTo('#qunit-fixture')
            .query('[data-toggle="dropdown"]')
            .dropdown()

          on.emit(dropdown[0], 'click', {
            cancelable: true,
            bubbles: true
          })

        ok(domClass.contains(dropdown.parent('.dropdown')[0], 'open'), 'open class added on click')
        on.emit($('body')[0], 'click', {
          cancelable: true,
          bubbles: true
        })
        ok(!domClass.contains(dropdown.parent('.dropdown')[0], 'open'), 'open class removed')
        dropdown.remove()
      })

})