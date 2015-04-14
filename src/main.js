// With proper loader configuration you can load,
// pre-process and insert css directly with require().
// See webpack.config.js for details.
require('./main.styl')

var Vue = require('vue')
var page = require('page')
var currentView = null

/**
 * Some really crude routing logic here, just for
 * demonstration purposes. The key thing to note here is
 * that Webpack allows us to split our build output into
 * small chunks that are loaded on demand.
 *
 * In this example, only the matched page component is
 * loaded. You can confirm this by inspecting the network
 * activity in devtools.
 */
/*
function route () {
  var view = window.location.hash.slice(1)
  if (view === 'a') {
    // code split point
    require.ensure(['./views/a'], function (require) {
      loadView(require('./views/a'))
    })
  } else if (view === 'b') {
    // code split point
    require.ensure(['./views/b'], function (require) {
      loadView(require('./views/b'))
    })
  }
}
*/

/*
function route () {
  var view = window.location.hash.slice(1)

  try {
    var load = require('bundle!./views/' + view + '/index.js')
  } catch(err) {
    // can't find view, ignored
    return
  }

  load(function(file) {
    loadView(file)
  })
}
*/

/**
 * Instantiate current view as a Vue instance.
 *
 * @param {Object} pageOptions
 */

function loadView (pageOptions) {
  if (currentView) {
    currentView.$destroy(true)
  }
  currentView = new Vue(pageOptions)
    .$mount()
    .$appendTo(document.body)
}

/*window.addEventListener('hashchange', route)
window.addEventListener('load', route)*/

function route(viewname) {
  return function() {
    try {
      var load = require('bundle!./views/' + viewname + '/index.js')
    } catch(err) {
      // can't find view, ignored
      return
    }

    load(function(file) {
      loadView(file)
    })
  }
}

// CHANGE THIS
page.base('/vue-webpack-example')
page('/a', route('a'))
page('/b', route('b'))
page()
