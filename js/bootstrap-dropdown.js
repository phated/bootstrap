/* ============================================================
 * bootstrap-dropdown.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

define([
  'dojo/_base/window',
  'dojo/_base/lang',
  'dojo/query',
  'dojo/on',
  'dojo/dom-class',
  'dojo/dom-attr',
  'dojo/NodeList-data',
  'dojo/NodeList-traverse'
], function(win, lang, query, on, domClass, domAttr){

  "use strict"

  var NodeList = query.NodeList;

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function ( element ) {
        var $el = query(element)
        $el.on('click', this.toggle)
        query('html').on('click', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function ( e ) {
      var $this = query(this)
        , selector = domAttr.get($this[0], 'data-target')
        , $parent
        , isActive

      if (!selector) {
        selector = domAttr.get($this[0], 'href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if(selector && selector !== '#'){
        $parent = query(selector)
      } else {
        $parent = new query.NodeList
      }

      $parent.length || ($parent = $this.parent())

      isActive = domClass.contains($parent[0], 'open')

      clearMenus()
      !isActive && domClass.toggle($parent[0], 'open')

      e.stopPropagation()
      e.preventDefault()
      return false
    }

  }

  function clearMenus() {
    query(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  lang.extend(NodeList, {
    dropdown: function ( option ) {
      var data = this.data('dropdown')
      if (!data[0]) this.forEach(function(node){
        dojo._nodeData(node, 'dropdown', (data = new Dropdown(node)))
      })
      if (typeof option == 'string') data[option].call(node)
      return this
    }
  })

  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  require([
    'dojo/domReady!'
  ], function(){
    on(document, 'html:click', clearMenus)
    on(win.body(), toggle + ':click', Dropdown.prototype.toggle)
  })

});