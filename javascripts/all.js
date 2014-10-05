/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */


(function( global, factory ) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // For CommonJS and CommonJS-like environments where a proper window is present,
    // execute the factory and get jQuery
    // For environments that do not inherently posses a window with a document
    // (such as Node.js), expose a jQuery-making factory as module.exports
    // This accentuates the need for the creation of a real window
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info
    module.exports = global.document ?
      factory( global, true ) :
      function( w ) {
        if ( !w.document ) {
          throw new Error( "jQuery requires a window with a document" );
        }
        return factory( w );
      };
  } else {
    factory( global );
  }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
  // Use the correct document accordingly with window argument (sandbox)
  document = window.document,

  version = "2.1.1",

  // Define a local copy of jQuery
  jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init( selector, context );
  },

  // Support: Android<4.1
  // Make sure we trim BOM and NBSP
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

  // Matches dashed string for camelizing
  rmsPrefix = /^-ms-/,
  rdashAlpha = /-([\da-z])/gi,

  // Used by jQuery.camelCase as callback to replace()
  fcamelCase = function( all, letter ) {
    return letter.toUpperCase();
  };

jQuery.fn = jQuery.prototype = {
  // The current version of jQuery being used
  jquery: version,

  constructor: jQuery,

  // Start with an empty selector
  selector: "",

  // The default length of a jQuery object is 0
  length: 0,

  toArray: function() {
    return slice.call( this );
  },

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ) {
    return num != null ?

      // Return just the one element from the set
      ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

      // Return all the elements in a clean array
      slice.call( this );
  },

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set)
  pushStack: function( elems ) {

    // Build a new jQuery matched element set
    var ret = jQuery.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;
    ret.context = this.context;

    // Return the newly-formed element set
    return ret;
  },

  // Execute a callback for every element in the matched set.
  // (You can seed the arguments with an array of args, but this is
  // only used internally.)
  each: function( callback, args ) {
    return jQuery.each( this, callback, args );
  },

  map: function( callback ) {
    return this.pushStack( jQuery.map(this, function( elem, i ) {
      return callback.call( elem, i, elem );
    }));
  },

  slice: function() {
    return this.pushStack( slice.apply( this, arguments ) );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  eq: function( i ) {
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
  },

  end: function() {
    return this.prevObject || this.constructor(null);
  },

  // For internal use only.
  // Behaves like an Array's method, not like a jQuery method.
  push: push,
  sort: arr.sort,
  splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

jQuery.extend({
  // Unique for each copy of jQuery on the page
  expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

  // Assume jQuery is ready without the ready module
  isReady: true,

  error: function( msg ) {
    throw new Error( msg );
  },

  noop: function() {},

  // See test/unit/core.js for details concerning isFunction.
  // Since version 1.3, DOM methods and functions like alert
  // aren't supported. They return false on IE (#2968).
  isFunction: function( obj ) {
    return jQuery.type(obj) === "function";
  },

  isArray: Array.isArray,

  isWindow: function( obj ) {
    return obj != null && obj === obj.window;
  },

  isNumeric: function( obj ) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
  },

  isPlainObject: function( obj ) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
      return false;
    }

    if ( obj.constructor &&
        !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  },

  isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
      return false;
    }
    return true;
  },

  type: function( obj ) {
    if ( obj == null ) {
      return obj + "";
    }
    // Support: Android < 4.0, iOS < 6 (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[ toString.call(obj) ] || "object" :
      typeof obj;
  },

  // Evaluates a script in a global context
  globalEval: function( code ) {
    var script,
      indirect = eval;

    code = jQuery.trim( code );

    if ( code ) {
      // If the code includes a valid, prologue position
      // strict mode pragma, execute code by injecting a
      // script tag into the document.
      if ( code.indexOf("use strict") === 1 ) {
        script = document.createElement("script");
        script.text = code;
        document.head.appendChild( script ).parentNode.removeChild( script );
      } else {
      // Otherwise, avoid the DOM node creation, insertion
      // and removal by using an indirect global eval
        indirect( code );
      }
    }
  },

  // Convert dashed to camelCase; used by the css and data modules
  // Microsoft forgot to hump their vendor prefix (#9572)
  camelCase: function( string ) {
    return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
  },

  nodeName: function( elem, name ) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  },

  // args is for internal usage only
  each: function( obj, callback, args ) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike( obj );

    if ( args ) {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      }

    // A special, fast, case for the most common use of each
    } else {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      }
    }

    return obj;
  },

  // Support: Android<4.1
  trim: function( text ) {
    return text == null ?
      "" :
      ( text + "" ).replace( rtrim, "" );
  },

  // results is for internal usage only
  makeArray: function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
      if ( isArraylike( Object(arr) ) ) {
        jQuery.merge( ret,
          typeof arr === "string" ?
          [ arr ] : arr
        );
      } else {
        push.call( ret, arr );
      }
    }

    return ret;
  },

  inArray: function( elem, arr, i ) {
    return arr == null ? -1 : indexOf.call( arr, elem, i );
  },

  merge: function( first, second ) {
    var len = +second.length,
      j = 0,
      i = first.length;

    for ( ; j < len; j++ ) {
      first[ i++ ] = second[ j ];
    }

    first.length = i;

    return first;
  },

  grep: function( elems, callback, invert ) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
      callbackInverse = !callback( elems[ i ], i );
      if ( callbackInverse !== callbackExpect ) {
        matches.push( elems[ i ] );
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function( elems, callback, arg ) {
    var value,
      i = 0,
      length = elems.length,
      isArray = isArraylike( elems ),
      ret = [];

    // Go through the array, translating each of the items to their new values
    if ( isArray ) {
      for ( ; i < length; i++ ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }

    // Go through every key on the object,
    } else {
      for ( i in elems ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }
    }

    // Flatten any nested arrays
    return concat.apply( [], ret );
  },

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function( fn, context ) {
    var tmp, args, proxy;

    if ( typeof context === "string" ) {
      tmp = fn[ context ];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ) ) {
      return undefined;
    }

    // Simulated bind
    args = slice.call( arguments, 2 );
    proxy = function() {
      return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  },

  now: Date.now,

  // jQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
  var length = obj.length,
    type = jQuery.type( obj );

  if ( type === "function" || jQuery.isWindow( obj ) ) {
    return false;
  }

  if ( obj.nodeType === 1 && length ) {
    return true;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
  support,
  Expr,
  getText,
  isXML,
  tokenize,
  compile,
  select,
  outermostContext,
  sortInput,
  hasDuplicate,

  // Local document vars
  setDocument,
  document,
  docElem,
  documentIsHTML,
  rbuggyQSA,
  rbuggyMatches,
  matches,
  contains,

  // Instance-specific data
  expando = "sizzle" + -(new Date()),
  preferredDoc = window.document,
  dirruns = 0,
  done = 0,
  classCache = createCache(),
  tokenCache = createCache(),
  compilerCache = createCache(),
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
    }
    return 0;
  },

  // General-purpose constants
  strundefined = typeof undefined,
  MAX_NEGATIVE = 1 << 31,

  // Instance methods
  hasOwn = ({}).hasOwnProperty,
  arr = [],
  pop = arr.pop,
  push_native = arr.push,
  push = arr.push,
  slice = arr.slice,
  // Use a stripped-down indexOf if we can't use a native one
  indexOf = arr.indexOf || function( elem ) {
    var i = 0,
      len = this.length;
    for ( ; i < len; i++ ) {
      if ( this[i] === elem ) {
        return i;
      }
    }
    return -1;
  },

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

  // Regular expressions

  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
  whitespace = "[\\x20\\t\\r\\n\\f]",
  // http://www.w3.org/TR/css3-syntax/#characters
  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

  // Loosely modeled on CSS identifier characters
  // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = characterEncoding.replace( "w", "w#" ),

  // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
  attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
    // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace +
    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
    "*\\]",

  pseudos = ":(" + characterEncoding + ")(?:\\((" +
    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
    // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
    // 3. anything else (capture 2)
    ".*" +
    ")\\)|)",

  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

  rpseudo = new RegExp( pseudos ),
  ridentifier = new RegExp( "^" + identifier + "$" ),

  matchExpr = {
    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
    "ATTR": new RegExp( "^" + attributes ),
    "PSEUDO": new RegExp( "^" + pseudos ),
    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
      "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
      "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    // For use in libraries implementing .is()
    // We use this for POS matching in `select`
    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
      whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  },

  rinputs = /^(?:input|select|textarea|button)$/i,
  rheader = /^h\d$/i,

  rnative = /^[^{]+\{\s*\[native \w/,

  // Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  rsibling = /[+~]/,
  rescape = /'|\\/g,

  // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
  runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
  funescape = function( _, escaped, escapedWhitespace ) {
    var high = "0x" + escaped - 0x10000;
    // NaN means non-codepoint
    // Support: Firefox<24
    // Workaround erroneous numeric interpretation of +"0x"
    return high !== high || escapedWhitespace ?
      escaped :
      high < 0 ?
        // BMP codepoint
        String.fromCharCode( high + 0x10000 ) :
        // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  };

// Optimize for push.apply( _, NodeList )
try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes )),
    preferredDoc.childNodes
  );
  // Support: Android<4.0
  // Detect silently failing push.apply
  arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
  push = { apply: arr.length ?

    // Leverage slice if possible
    function( target, els ) {
      push_native.apply( target, slice.call(els) );
    } :

    // Support: IE<9
    // Otherwise append directly
    function( target, els ) {
      var j = target.length,
        i = 0;
      // Can't trust NodeList.length
      while ( (target[j++] = els[i++]) ) {}
      target.length = j - 1;
    }
  };
}

function Sizzle( selector, context, results, seed ) {
  var match, elem, m, nodeType,
    // QSA vars
    i, groups, old, nid, newContext, newSelector;

  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
    setDocument( context );
  }

  context = context || document;
  results = results || [];

  if ( !selector || typeof selector !== "string" ) {
    return results;
  }

  if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
    return [];
  }

  if ( documentIsHTML && !seed ) {

    // Shortcuts
    if ( (match = rquickExpr.exec( selector )) ) {
      // Speed-up: Sizzle("#ID")
      if ( (m = match[1]) ) {
        if ( nodeType === 9 ) {
          elem = context.getElementById( m );
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document (jQuery #6963)
          if ( elem && elem.parentNode ) {
            // Handle the case where IE, Opera, and Webkit return items
            // by name instead of ID
            if ( elem.id === m ) {
              results.push( elem );
              return results;
            }
          } else {
            return results;
          }
        } else {
          // Context is not a document
          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
            contains( context, elem ) && elem.id === m ) {
            results.push( elem );
            return results;
          }
        }

      // Speed-up: Sizzle("TAG")
      } else if ( match[2] ) {
        push.apply( results, context.getElementsByTagName( selector ) );
        return results;

      // Speed-up: Sizzle(".CLASS")
      } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
        push.apply( results, context.getElementsByClassName( m ) );
        return results;
      }
    }

    // QSA path
    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
      nid = old = expando;
      newContext = context;
      newSelector = nodeType === 9 && selector;

      // qSA works strangely on Element-rooted queries
      // We can work around this by specifying an extra ID on the root
      // and working up from there (Thanks to Andrew Dupont for the technique)
      // IE 8 doesn't work on object elements
      if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
        groups = tokenize( selector );

        if ( (old = context.getAttribute("id")) ) {
          nid = old.replace( rescape, "\\$&" );
        } else {
          context.setAttribute( "id", nid );
        }
        nid = "[id='" + nid + "'] ";

        i = groups.length;
        while ( i-- ) {
          groups[i] = nid + toSelector( groups[i] );
        }
        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
        newSelector = groups.join(",");
      }

      if ( newSelector ) {
        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector )
          );
          return results;
        } catch(qsaError) {
        } finally {
          if ( !old ) {
            context.removeAttribute("id");
          }
        }
      }
    }
  }

  // All others
  return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
  var keys = [];

  function cache( key, value ) {
    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
    if ( keys.push( key + " " ) > Expr.cacheLength ) {
      // Only keep the most recent entries
      delete cache[ keys.shift() ];
    }
    return (cache[ key + " " ] = value);
  }
  return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
  fn[ expando ] = true;
  return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
  var div = document.createElement("div");

  try {
    return !!fn( div );
  } catch (e) {
    return false;
  } finally {
    // Remove from its parent by default
    if ( div.parentNode ) {
      div.parentNode.removeChild( div );
    }
    // release memory in IE
    div = null;
  }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
  var arr = attrs.split("|"),
    i = attrs.length;

  while ( i-- ) {
    Expr.attrHandle[ arr[i] ] = handler;
  }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
  var cur = b && a,
    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
      ( ~b.sourceIndex || MAX_NEGATIVE ) -
      ( ~a.sourceIndex || MAX_NEGATIVE );

  // Use IE sourceIndex if available on both nodes
  if ( diff ) {
    return diff;
  }

  // Check if b follows a
  if ( cur ) {
    while ( (cur = cur.nextSibling) ) {
      if ( cur === b ) {
        return -1;
      }
    }
  }

  return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return name === "input" && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return (name === "input" || name === "button") && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
  return markFunction(function( argument ) {
    argument = +argument;
    return markFunction(function( seed, matches ) {
      var j,
        matchIndexes = fn( [], seed.length, argument ),
        i = matchIndexes.length;

      // Match elements found at the specified indexes
      while ( i-- ) {
        if ( seed[ (j = matchIndexes[i]) ] ) {
          seed[j] = !(matches[j] = seed[j]);
        }
      }
    });
  });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
  return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
  // documentElement is verified for cases where it doesn't yet exist
  // (such as loading iframes in IE - #4833)
  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
  return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
  var hasCompare,
    doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  // If no document and documentElement is available, return
  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
    return document;
  }

  // Set our document
  document = doc;
  docElem = doc.documentElement;

  // Support tests
  documentIsHTML = !isXML( doc );

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  // IE6-8 do not support the defaultView property so parent will be undefined
  if ( parent && parent !== parent.top ) {
    // IE11 does not have attachEvent, so all must suffer
    if ( parent.addEventListener ) {
      parent.addEventListener( "unload", function() {
        setDocument();
      }, false );
    } else if ( parent.attachEvent ) {
      parent.attachEvent( "onunload", function() {
        setDocument();
      });
    }
  }

  /* Attributes
  ---------------------------------------------------------------------- */

  // Support: IE<8
  // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
  support.attributes = assert(function( div ) {
    div.className = "i";
    return !div.getAttribute("className");
  });

  /* getElement(s)By*
  ---------------------------------------------------------------------- */

  // Check if getElementsByTagName("*") returns only elements
  support.getElementsByTagName = assert(function( div ) {
    div.appendChild( doc.createComment("") );
    return !div.getElementsByTagName("*").length;
  });

  // Check if getElementsByClassName can be trusted
  support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

    // Support: Safari<4
    // Catch class over-caching
    div.firstChild.className = "i";
    // Support: Opera<10
    // Catch gEBCN failure to find non-leading classes
    return div.getElementsByClassName("i").length === 2;
  });

  // Support: IE<10
  // Check if getElementById returns elements by name
  // The broken getElementById methods don't pick up programatically-set names,
  // so use a roundabout getElementsByName test
  support.getById = assert(function( div ) {
    docElem.appendChild( div ).id = expando;
    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
  });

  // ID find and filter
  if ( support.getById ) {
    Expr.find["ID"] = function( id, context ) {
      if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
        var m = context.getElementById( id );
        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        return m && m.parentNode ? [ m ] : [];
      }
    };
    Expr.filter["ID"] = function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        return elem.getAttribute("id") === attrId;
      };
    };
  } else {
    // Support: IE6/7
    // getElementById is not reliable as a find shortcut
    delete Expr.find["ID"];

    Expr.filter["ID"] =  function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
        return node && node.value === attrId;
      };
    };
  }

  // Tag
  Expr.find["TAG"] = support.getElementsByTagName ?
    function( tag, context ) {
      if ( typeof context.getElementsByTagName !== strundefined ) {
        return context.getElementsByTagName( tag );
      }
    } :
    function( tag, context ) {
      var elem,
        tmp = [],
        i = 0,
        results = context.getElementsByTagName( tag );

      // Filter out possible comments
      if ( tag === "*" ) {
        while ( (elem = results[i++]) ) {
          if ( elem.nodeType === 1 ) {
            tmp.push( elem );
          }
        }

        return tmp;
      }
      return results;
    };

  // Class
  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
      return context.getElementsByClassName( className );
    }
  };

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */

  // QSA and matchesSelector support

  // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
  rbuggyMatches = [];

  // qSa(:focus) reports false when true (Chrome 21)
  // We allow this because of a bug in IE8/9 that throws an error
  // whenever `document.activeElement` is accessed on an iframe
  // So, we allow :focus to pass through QSA all the time to avoid the IE error
  // See http://bugs.jquery.com/ticket/13378
  rbuggyQSA = [];

  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
    // Build QSA regex
    // Regex strategy adopted from Diego Perini
    assert(function( div ) {
      // Select is set to empty string on purpose
      // This is to test IE's treatment of not explicitly
      // setting a boolean content attribute,
      // since its presence should be enough
      // http://bugs.jquery.com/ticket/12359
      div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

      // Support: IE8, Opera 11-12.16
      // Nothing should be selected when empty strings follow ^= or $= or *=
      // The test attribute must be unknown in Opera but "safe" for WinRT
      // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
      if ( div.querySelectorAll("[msallowclip^='']").length ) {
        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
      }

      // Support: IE8
      // Boolean attributes and "value" are not treated correctly
      if ( !div.querySelectorAll("[selected]").length ) {
        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
      }

      // Webkit/Opera - :checked should return selected option elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":checked").length ) {
        rbuggyQSA.push(":checked");
      }
    });

    assert(function( div ) {
      // Support: Windows 8 Native Apps
      // The type and name attributes are restricted during .innerHTML assignment
      var input = doc.createElement("input");
      input.setAttribute( "type", "hidden" );
      div.appendChild( input ).setAttribute( "name", "D" );

      // Support: IE8
      // Enforce case-sensitivity of name attribute
      if ( div.querySelectorAll("[name=d]").length ) {
        rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
      }

      // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":enabled").length ) {
        rbuggyQSA.push( ":enabled", ":disabled" );
      }

      // Opera 10-11 does not throw on post-comma invalid pseudos
      div.querySelectorAll("*,:x");
      rbuggyQSA.push(",.*:");
    });
  }

  if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
    docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector) )) ) {

    assert(function( div ) {
      // Check to see if it's possible to do matchesSelector
      // on a disconnected node (IE 9)
      support.disconnectedMatch = matches.call( div, "div" );

      // This should fail with an exception
      // Gecko does not error, returns false instead
      matches.call( div, "[s!='']:x" );
      rbuggyMatches.push( "!=", pseudos );
    });
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

  /* Contains
  ---------------------------------------------------------------------- */
  hasCompare = rnative.test( docElem.compareDocumentPosition );

  // Element contains another
  // Purposefully does not implement inclusive descendent
  // As in, an element does not contain itself
  contains = hasCompare || rnative.test( docElem.contains ) ?
    function( a, b ) {
      var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
      return a === bup || !!( bup && bup.nodeType === 1 && (
        adown.contains ?
          adown.contains( bup ) :
          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
      ));
    } :
    function( a, b ) {
      if ( b ) {
        while ( (b = b.parentNode) ) {
          if ( b === a ) {
            return true;
          }
        }
      }
      return false;
    };

  /* Sorting
  ---------------------------------------------------------------------- */

  // Document order sorting
  sortOrder = hasCompare ?
  function( a, b ) {

    // Flag for duplicate removal
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    // Sort on method existence if only one input has compareDocumentPosition
    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    if ( compare ) {
      return compare;
    }

    // Calculate position if both inputs belong to the same document
    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
      a.compareDocumentPosition( b ) :

      // Otherwise we know they are disconnected
      1;

    // Disconnected nodes
    if ( compare & 1 ||
      (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

      // Choose the first element that is related to our preferred document
      if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
        return -1;
      }
      if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
        return 1;
      }

      // Maintain original order
      return sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;
    }

    return compare & 4 ? -1 : 1;
  } :
  function( a, b ) {
    // Exit early if the nodes are identical
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var cur,
      i = 0,
      aup = a.parentNode,
      bup = b.parentNode,
      ap = [ a ],
      bp = [ b ];

    // Parentless nodes are either documents or disconnected
    if ( !aup || !bup ) {
      return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;

    // If the nodes are siblings, we can do a quick check
    } else if ( aup === bup ) {
      return siblingCheck( a, b );
    }

    // Otherwise we need full lists of their ancestors for comparison
    cur = a;
    while ( (cur = cur.parentNode) ) {
      ap.unshift( cur );
    }
    cur = b;
    while ( (cur = cur.parentNode) ) {
      bp.unshift( cur );
    }

    // Walk down the tree looking for a discrepancy
    while ( ap[i] === bp[i] ) {
      i++;
    }

    return i ?
      // Do a sibling check if the nodes have a common ancestor
      siblingCheck( ap[i], bp[i] ) :

      // Otherwise nodes in our document sort first
      ap[i] === preferredDoc ? -1 :
      bp[i] === preferredDoc ? 1 :
      0;
  };

  return doc;
};

Sizzle.matches = function( expr, elements ) {
  return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  // Make sure that attribute selectors are quoted
  expr = expr.replace( rattributeQuotes, "='$1']" );

  if ( support.matchesSelector && documentIsHTML &&
    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

    try {
      var ret = matches.call( elem, expr );

      // IE 9's matchesSelector returns false on disconnected nodes
      if ( ret || support.disconnectedMatch ||
          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11 ) {
        return ret;
      }
    } catch(e) {}
  }

  return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
  // Set document vars if needed
  if ( ( context.ownerDocument || context ) !== document ) {
    setDocument( context );
  }
  return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  var fn = Expr.attrHandle[ name.toLowerCase() ],
    // Don't get fooled by Object.prototype properties (jQuery #13807)
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
      fn( elem, name, !documentIsHTML ) :
      undefined;

  return val !== undefined ?
    val :
    support.attributes || !documentIsHTML ?
      elem.getAttribute( name ) :
      (val = elem.getAttributeNode(name)) && val.specified ?
        val.value :
        null;
};

Sizzle.error = function( msg ) {
  throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  // Unless we *know* we can detect duplicates, assume their presence
  hasDuplicate = !support.detectDuplicates;
  sortInput = !support.sortStable && results.slice( 0 );
  results.sort( sortOrder );

  if ( hasDuplicate ) {
    while ( (elem = results[i++]) ) {
      if ( elem === results[ i ] ) {
        j = duplicates.push( i );
      }
    }
    while ( j-- ) {
      results.splice( duplicates[ j ], 1 );
    }
  }

  // Clear input after sorting to release objects
  // See https://github.com/jquery/sizzle/pull/225
  sortInput = null;

  return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  if ( !nodeType ) {
    // If no nodeType, this is expected to be an array
    while ( (node = elem[i++]) ) {
      // Do not traverse comment nodes
      ret += getText( node );
    }
  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    // Use textContent for elements
    // innerText usage removed for consistency of new lines (jQuery #11153)
    if ( typeof elem.textContent === "string" ) {
      return elem.textContent;
    } else {
      // Traverse its children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        ret += getText( elem );
      }
    }
  } else if ( nodeType === 3 || nodeType === 4 ) {
    return elem.nodeValue;
  }
  // Do not include comment or processing instruction nodes

  return ret;
};

Expr = Sizzle.selectors = {

  // Can be adjusted by the user
  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {},

  find: {},

  relative: {
    ">": { dir: "parentNode", first: true },
    " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true },
    "~": { dir: "previousSibling" }
  },

  preFilter: {
    "ATTR": function( match ) {
      match[1] = match[1].replace( runescape, funescape );

      // Move the given value to match[3] whether quoted or unquoted
      match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

      if ( match[2] === "~=" ) {
        match[3] = " " + match[3] + " ";
      }

      return match.slice( 0, 4 );
    },

    "CHILD": function( match ) {
      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[1] = match[1].toLowerCase();

      if ( match[1].slice( 0, 3 ) === "nth" ) {
        // nth-* requires argument
        if ( !match[3] ) {
          Sizzle.error( match[0] );
        }

        // numeric x and y parameters for Expr.filter.CHILD
        // remember that false/true cast respectively to 0/1
        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

      // other types prohibit arguments
      } else if ( match[3] ) {
        Sizzle.error( match[0] );
      }

      return match;
    },

    "PSEUDO": function( match ) {
      var excess,
        unquoted = !match[6] && match[2];

      if ( matchExpr["CHILD"].test( match[0] ) ) {
        return null;
      }

      // Accept quoted arguments as-is
      if ( match[3] ) {
        match[2] = match[4] || match[5] || "";

      // Strip excess characters from unquoted arguments
      } else if ( unquoted && rpseudo.test( unquoted ) &&
        // Get excess from tokenize (recursively)
        (excess = tokenize( unquoted, true )) &&
        // advance to the next closing parenthesis
        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

        // excess is a negative index
        match[0] = match[0].slice( 0, excess );
        match[2] = unquoted.slice( 0, excess );
      }

      // Return only captures needed by the pseudo filter method (type and argument)
      return match.slice( 0, 3 );
    }
  },

  filter: {

    "TAG": function( nodeNameSelector ) {
      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
      return nodeNameSelector === "*" ?
        function() { return true; } :
        function( elem ) {
          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
    },

    "CLASS": function( className ) {
      var pattern = classCache[ className + " " ];

      return pattern ||
        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
        classCache( className, function( elem ) {
          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
        });
    },

    "ATTR": function( name, operator, check ) {
      return function( elem ) {
        var result = Sizzle.attr( elem, name );

        if ( result == null ) {
          return operator === "!=";
        }
        if ( !operator ) {
          return true;
        }

        result += "";

        return operator === "=" ? result === check :
          operator === "!=" ? result !== check :
          operator === "^=" ? check && result.indexOf( check ) === 0 :
          operator === "*=" ? check && result.indexOf( check ) > -1 :
          operator === "$=" ? check && result.slice( -check.length ) === check :
          operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
          false;
      };
    },

    "CHILD": function( type, what, argument, first, last ) {
      var simple = type.slice( 0, 3 ) !== "nth",
        forward = type.slice( -4 ) !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        // Shortcut for :nth-*(n)
        function( elem ) {
          return !!elem.parentNode;
        } :

        function( elem, context, xml ) {
          var cache, outerCache, node, diff, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(),
            useCache = !xml && !ofType;

          if ( parent ) {

            // :(first|last|only)-(child|of-type)
            if ( simple ) {
              while ( dir ) {
                node = elem;
                while ( (node = node[ dir ]) ) {
                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                    return false;
                  }
                }
                // Reverse direction for :only-* (if we haven't yet done so)
                start = dir = type === "only" && !start && "nextSibling";
              }
              return true;
            }

            start = [ forward ? parent.firstChild : parent.lastChild ];

            // non-xml :nth-child(...) stores cache data on `parent`
            if ( forward && useCache ) {
              // Seek `elem` from a previously-cached index
              outerCache = parent[ expando ] || (parent[ expando ] = {});
              cache = outerCache[ type ] || [];
              nodeIndex = cache[0] === dirruns && cache[1];
              diff = cache[0] === dirruns && cache[2];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( (node = ++nodeIndex && node && node[ dir ] ||

                // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0) || start.pop()) ) {

                // When found, cache indexes on `parent` and break
                if ( node.nodeType === 1 && ++diff && node === elem ) {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
                }
              }

            // Use previously-cached element index if available
            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
              diff = cache[1];

            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
            } else {
              // Use the same loop as above to seek `elem` from the start
              while ( (node = ++nodeIndex && node && node[ dir ] ||
                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                  // Cache the index of each encountered element
                  if ( useCache ) {
                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                  }

                  if ( node === elem ) {
                    break;
                  }
                }
              }
            }

            // Incorporate the offset, then check against cycle size
            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 );
          }
        };
    },

    "PSEUDO": function( pseudo, argument ) {
      // pseudo-class names are case-insensitive
      // http://www.w3.org/TR/selectors/#pseudo-classes
      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
      // Remember that setFilters inherits from pseudos
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
          Sizzle.error( "unsupported pseudo: " + pseudo );

      // The user may use createPseudo to indicate that
      // arguments are needed to create the filter function
      // just as Sizzle does
      if ( fn[ expando ] ) {
        return fn( argument );
      }

      // But maintain support for old signatures
      if ( fn.length > 1 ) {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
          markFunction(function( seed, matches ) {
            var idx,
              matched = fn( seed, argument ),
              i = matched.length;
            while ( i-- ) {
              idx = indexOf.call( seed, matched[i] );
              seed[ idx ] = !( matches[ idx ] = matched[i] );
            }
          }) :
          function( elem ) {
            return fn( elem, 0, args );
          };
      }

      return fn;
    }
  },

  pseudos: {
    // Potentially complex pseudos
    "not": markFunction(function( selector ) {
      // Trim the selector passed to compile
      // to avoid treating leading and trailing
      // spaces as combinators
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrim, "$1" ) );

      return matcher[ expando ] ?
        markFunction(function( seed, matches, context, xml ) {
          var elem,
            unmatched = matcher( seed, null, xml, [] ),
            i = seed.length;

          // Match elements unmatched by `matcher`
          while ( i-- ) {
            if ( (elem = unmatched[i]) ) {
              seed[i] = !(matches[i] = elem);
            }
          }
        }) :
        function( elem, context, xml ) {
          input[0] = elem;
          matcher( input, null, xml, results );
          return !results.pop();
        };
    }),

    "has": markFunction(function( selector ) {
      return function( elem ) {
        return Sizzle( selector, elem ).length > 0;
      };
    }),

    "contains": markFunction(function( text ) {
      return function( elem ) {
        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
      };
    }),

    // "Whether an element is represented by a :lang() selector
    // is based solely on the element's language value
    // being equal to the identifier C,
    // or beginning with the identifier C immediately followed by "-".
    // The matching of C against the element's language value is performed case-insensitively.
    // The identifier C does not have to be a valid language name."
    // http://www.w3.org/TR/selectors/#lang-pseudo
    "lang": markFunction( function( lang ) {
      // lang value must be a valid identifier
      if ( !ridentifier.test(lang || "") ) {
        Sizzle.error( "unsupported lang: " + lang );
      }
      lang = lang.replace( runescape, funescape ).toLowerCase();
      return function( elem ) {
        var elemLang;
        do {
          if ( (elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

            elemLang = elemLang.toLowerCase();
            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
          }
        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
        return false;
      };
    }),

    // Miscellaneous
    "target": function( elem ) {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ) === elem.id;
    },

    "root": function( elem ) {
      return elem === docElem;
    },

    "focus": function( elem ) {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    },

    // Boolean properties
    "enabled": function( elem ) {
      return elem.disabled === false;
    },

    "disabled": function( elem ) {
      return elem.disabled === true;
    },

    "checked": function( elem ) {
      // In CSS3, :checked should return both checked and selected elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      var nodeName = elem.nodeName.toLowerCase();
      return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
    },

    "selected": function( elem ) {
      // Accessing this property makes selected-by-default
      // options in Safari work properly
      if ( elem.parentNode ) {
        elem.parentNode.selectedIndex;
      }

      return elem.selected === true;
    },

    // Contents
    "empty": function( elem ) {
      // http://www.w3.org/TR/selectors/#empty-pseudo
      // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
      //   but not by others (comment: 8; processing instruction: 7; etc.)
      // nodeType < 6 works because attributes (2) do not appear as children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        if ( elem.nodeType < 6 ) {
          return false;
        }
      }
      return true;
    },

    "parent": function( elem ) {
      return !Expr.pseudos["empty"]( elem );
    },

    // Element/input types
    "header": function( elem ) {
      return rheader.test( elem.nodeName );
    },

    "input": function( elem ) {
      return rinputs.test( elem.nodeName );
    },

    "button": function( elem ) {
      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === "button" || name === "button";
    },

    "text": function( elem ) {
      var attr;
      return elem.nodeName.toLowerCase() === "input" &&
        elem.type === "text" &&

        // Support: IE<8
        // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
    },

    // Position-in-collection
    "first": createPositionalPseudo(function() {
      return [ 0 ];
    }),

    "last": createPositionalPseudo(function( matchIndexes, length ) {
      return [ length - 1 ];
    }),

    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
      return [ argument < 0 ? argument + length : argument ];
    }),

    "even": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 0;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "odd": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 1;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; --i >= 0; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    })
  }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
  Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ) {
    return parseOnly ? 0 : cached.slice( 0 );
  }

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ) {

    // Comma and first run
    if ( !matched || (match = rcomma.exec( soFar )) ) {
      if ( match ) {
        // Don't consume trailing commas as valid
        soFar = soFar.slice( match[0].length ) || soFar;
      }
      groups.push( (tokens = []) );
    }

    matched = false;

    // Combinators
    if ( (match = rcombinators.exec( soFar )) ) {
      matched = match.shift();
      tokens.push({
        value: matched,
        // Cast descendant combinators to space
        type: match[0].replace( rtrim, " " )
      });
      soFar = soFar.slice( matched.length );
    }

    // Filters
    for ( type in Expr.filter ) {
      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
        (match = preFilters[ type ]( match ))) ) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: type,
          matches: match
        });
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
      break;
    }
  }

  // Return the length of the invalid excess
  // if we're just parsing
  // Otherwise, throw an error or return tokens
  return parseOnly ?
    soFar.length :
    soFar ?
      Sizzle.error( selector ) :
      // Cache the tokens
      tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ) {
    selector += tokens[i].value;
  }
  return selector;
}

function addCombinator( matcher, combinator, base ) {
  var dir = combinator.dir,
    checkNonElements = base && dir === "parentNode",
    doneName = done++;

  return combinator.first ?
    // Check against closest ancestor/preceding element
    function( elem, context, xml ) {
      while ( (elem = elem[ dir ]) ) {
        if ( elem.nodeType === 1 || checkNonElements ) {
          return matcher( elem, context, xml );
        }
      }
    } :

    // Check against all ancestor/preceding elements
    function( elem, context, xml ) {
      var oldCache, outerCache,
        newCache = [ dirruns, doneName ];

      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
      if ( xml ) {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            if ( matcher( elem, context, xml ) ) {
              return true;
            }
          }
        }
      } else {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            outerCache = elem[ expando ] || (elem[ expando ] = {});
            if ( (oldCache = outerCache[ dir ]) &&
              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

              // Assign to newCache so results back-propagate to previous elements
              return (newCache[ 2 ] = oldCache[ 2 ]);
            } else {
              // Reuse newcache so results back-propagate to previous elements
              outerCache[ dir ] = newCache;

              // A match means we're done; a fail means we have to keep checking
              if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                return true;
              }
            }
          }
        }
      }
    };
}

function elementMatcher( matchers ) {
  return matchers.length > 1 ?
    function( elem, context, xml ) {
      var i = matchers.length;
      while ( i-- ) {
        if ( !matchers[i]( elem, context, xml ) ) {
          return false;
        }
      }
      return true;
    } :
    matchers[0];
}

function multipleContexts( selector, contexts, results ) {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ) {
    Sizzle( selector, contexts[i], results );
  }
  return results;
}

function condense( unmatched, map, filter, context, xml ) {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ) {
    if ( (elem = unmatched[i]) ) {
      if ( !filter || filter( elem, context, xml ) ) {
        newUnmatched.push( elem );
        if ( mapped ) {
          map.push( i );
        }
      }
    }
  }

  return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  if ( postFilter && !postFilter[ expando ] ) {
    postFilter = setMatcher( postFilter );
  }
  if ( postFinder && !postFinder[ expando ] ) {
    postFinder = setMatcher( postFinder, postSelector );
  }
  return markFunction(function( seed, results, context, xml ) {
    var temp, i, elem,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      // Get initial elements from seed or context
      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

      // Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && ( seed || !selector ) ?
        condense( elems, preMap, preFilter, context, xml ) :
        elems,

      matcherOut = matcher ?
        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

          // ...intermediate processing is necessary
          [] :

          // ...otherwise use results directly
          results :
        matcherIn;

    // Find primary matches
    if ( matcher ) {
      matcher( matcherIn, matcherOut, context, xml );
    }

    // Apply postFilter
    if ( postFilter ) {
      temp = condense( matcherOut, postMap );
      postFilter( temp, [], context, xml );

      // Un-match failing elements by moving them back to matcherIn
      i = temp.length;
      while ( i-- ) {
        if ( (elem = temp[i]) ) {
          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
        }
      }
    }

    if ( seed ) {
      if ( postFinder || preFilter ) {
        if ( postFinder ) {
          // Get the final matcherOut by condensing this intermediate into postFinder contexts
          temp = [];
          i = matcherOut.length;
          while ( i-- ) {
            if ( (elem = matcherOut[i]) ) {
              // Restore matcherIn since elem is not yet a final match
              temp.push( (matcherIn[i] = elem) );
            }
          }
          postFinder( null, (matcherOut = []), temp, xml );
        }

        // Move matched elements from seed to results to keep them synchronized
        i = matcherOut.length;
        while ( i-- ) {
          if ( (elem = matcherOut[i]) &&
            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

            seed[temp] = !(results[temp] = elem);
          }
        }
      }

    // Add elements to results, through postFinder if defined
    } else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ) :
          matcherOut
      );
      if ( postFinder ) {
        postFinder( null, results, matcherOut, xml );
      } else {
        push.apply( results, matcherOut );
      }
    }
  });
}

function matcherFromTokens( tokens ) {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[0].type ],
    implicitRelative = leadingRelative || Expr.relative[" "],
    i = leadingRelative ? 1 : 0,

    // The foundational matcher ensures that elements are reachable from top-level context(s)
    matchContext = addCombinator( function( elem ) {
      return elem === checkContext;
    }, implicitRelative, true ),
    matchAnyContext = addCombinator( function( elem ) {
      return indexOf.call( checkContext, elem ) > -1;
    }, implicitRelative, true ),
    matchers = [ function( elem, context, xml ) {
      return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
        (checkContext = context).nodeType ?
          matchContext( elem, context, xml ) :
          matchAnyContext( elem, context, xml ) );
    } ];

  for ( ; i < len; i++ ) {
    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
    } else {
      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

      // Return special upon seeing a positional matcher
      if ( matcher[ expando ] ) {
        // Find the next relative operator (if any) for proper handling
        j = ++i;
        for ( ; j < len; j++ ) {
          if ( Expr.relative[ tokens[j].type ] ) {
            break;
          }
        }
        return setMatcher(
          i > 1 && elementMatcher( matchers ),
          i > 1 && toSelector(
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
          ).replace( rtrim, "$1" ),
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ) ),
          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
          j < len && toSelector( tokens )
        );
      }
      matchers.push( matcher );
    }
  }

  return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  var bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, outermost ) {
      var elem, j, matcher,
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        setMatched = [],
        contextBackup = outermostContext,
        // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
        // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
        len = elems.length;

      if ( outermost ) {
        outermostContext = context !== document && context;
      }

      // Add elements passing elementMatchers directly to results
      // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
      // Support: IE<9, Safari
      // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
      for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
        if ( byElement && elem ) {
          j = 0;
          while ( (matcher = elementMatchers[j++]) ) {
            if ( matcher( elem, context, xml ) ) {
              results.push( elem );
              break;
            }
          }
          if ( outermost ) {
            dirruns = dirrunsUnique;
          }
        }

        // Track unmatched elements for set filters
        if ( bySet ) {
          // They will have gone through all possible matchers
          if ( (elem = !matcher && elem) ) {
            matchedCount--;
          }

          // Lengthen the array for every element, matched or not
          if ( seed ) {
            unmatched.push( elem );
          }
        }
      }

      // Apply set filters to unmatched elements
      matchedCount += i;
      if ( bySet && i !== matchedCount ) {
        j = 0;
        while ( (matcher = setMatchers[j++]) ) {
          matcher( unmatched, setMatched, context, xml );
        }

        if ( seed ) {
          // Reintegrate element matches to eliminate the need for sorting
          if ( matchedCount > 0 ) {
            while ( i-- ) {
              if ( !(unmatched[i] || setMatched[i]) ) {
                setMatched[i] = pop.call( results );
              }
            }
          }

          // Discard index placeholder values to get only actual matches
          setMatched = condense( setMatched );
        }

        // Add matches to results
        push.apply( results, setMatched );

        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ) > 1 ) {

          Sizzle.uniqueSort( results );
        }
      }

      // Override manipulation of globals by nested matchers
      if ( outermost ) {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      }

      return unmatched;
    };

  return bySet ?
    markFunction( superMatcher ) :
    superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ) {
    // Generate a function of recursive functions that can be used to check each element
    if ( !match ) {
      match = tokenize( selector );
    }
    i = match.length;
    while ( i-- ) {
      cached = matcherFromTokens( match[i] );
      if ( cached[ expando ] ) {
        setMatchers.push( cached );
      } else {
        elementMatchers.push( cached );
      }
    }

    // Cache the compiled function
    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

    // Save selector and tokenization
    cached.selector = selector;
  }
  return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
  var i, tokens, token, type, find,
    compiled = typeof selector === "function" && selector,
    match = !seed && tokenize( (selector = compiled.selector || selector) );

  results = results || [];

  // Try to minimize operations if there is no seed and only one group
  if ( match.length === 1 ) {

    // Take a shortcut and set the context if the root selector is an ID
    tokens = match[0] = match[0].slice( 0 );
    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
        support.getById && context.nodeType === 9 && documentIsHTML &&
        Expr.relative[ tokens[1].type ] ) {

      context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
      if ( !context ) {
        return results;

      // Precompiled matchers will still verify ancestry, so step up a level
      } else if ( compiled ) {
        context = context.parentNode;
      }

      selector = selector.slice( tokens.shift().value.length );
    }

    // Fetch a seed set for right-to-left matching
    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
    while ( i-- ) {
      token = tokens[i];

      // Abort if we hit a combinator
      if ( Expr.relative[ (type = token.type) ] ) {
        break;
      }
      if ( (find = Expr.find[ type ]) ) {
        // Search, expanding context for leading sibling combinators
        if ( (seed = find(
          token.matches[0].replace( runescape, funescape ),
          rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
        )) ) {

          // If seed is empty or no tokens remain, we can return early
          tokens.splice( i, 1 );
          selector = seed.length && toSelector( tokens );
          if ( !selector ) {
            push.apply( results, seed );
            return results;
          }

          break;
        }
      }
    }
  }

  // Compile and execute a filtering function if one is not provided
  // Provide `match` to avoid retokenization if we modified the selector above
  ( compiled || compile( selector, match ) )(
    seed,
    context,
    !documentIsHTML,
    results,
    rsibling.test( selector ) && testContext( context.parentNode ) || context
  );
  return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
  // Should return 1, but returns 4 (following)
  return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
  div.innerHTML = "<a href='#'></a>";
  return div.firstChild.getAttribute("href") === "#" ;
}) ) {
  addHandle( "type|href|height|width", function( elem, name, isXML ) {
    if ( !isXML ) {
      return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
    }
  });
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
  div.innerHTML = "<input/>";
  div.firstChild.setAttribute( "value", "" );
  return div.firstChild.getAttribute( "value" ) === "";
}) ) {
  addHandle( "value", function( elem, name, isXML ) {
    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
      return elem.defaultValue;
    }
  });
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
  return div.getAttribute("disabled") == null;
}) ) {
  addHandle( booleans, function( elem, name, isXML ) {
    var val;
    if ( !isXML ) {
      return elem[ name ] === true ? name.toLowerCase() :
          (val = elem.getAttributeNode( name )) && val.specified ?
          val.value :
        null;
    }
  });
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
  if ( jQuery.isFunction( qualifier ) ) {
    return jQuery.grep( elements, function( elem, i ) {
      /* jshint -W018 */
      return !!qualifier.call( elem, i, elem ) !== not;
    });

  }

  if ( qualifier.nodeType ) {
    return jQuery.grep( elements, function( elem ) {
      return ( elem === qualifier ) !== not;
    });

  }

  if ( typeof qualifier === "string" ) {
    if ( risSimple.test( qualifier ) ) {
      return jQuery.filter( qualifier, elements, not );
    }

    qualifier = jQuery.filter( qualifier, elements );
  }

  return jQuery.grep( elements, function( elem ) {
    return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
  });
}

jQuery.filter = function( expr, elems, not ) {
  var elem = elems[ 0 ];

  if ( not ) {
    expr = ":not(" + expr + ")";
  }

  return elems.length === 1 && elem.nodeType === 1 ?
    jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
    jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
      return elem.nodeType === 1;
    }));
};

jQuery.fn.extend({
  find: function( selector ) {
    var i,
      len = this.length,
      ret = [],
      self = this;

    if ( typeof selector !== "string" ) {
      return this.pushStack( jQuery( selector ).filter(function() {
        for ( i = 0; i < len; i++ ) {
          if ( jQuery.contains( self[ i ], this ) ) {
            return true;
          }
        }
      }) );
    }

    for ( i = 0; i < len; i++ ) {
      jQuery.find( selector, self[ i ], ret );
    }

    // Needed because $( selector, context ) becomes $( context ).find( selector )
    ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
  },
  filter: function( selector ) {
    return this.pushStack( winnow(this, selector || [], false) );
  },
  not: function( selector ) {
    return this.pushStack( winnow(this, selector || [], true) );
  },
  is: function( selector ) {
    return !!winnow(
      this,

      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test( selector ) ?
        jQuery( selector ) :
        selector || [],
      false
    ).length;
  }
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

  // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

  init = jQuery.fn.init = function( selector, context ) {
    var match, elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if ( !selector ) {
      return this;
    }

    // Handle HTML strings
    if ( typeof selector === "string" ) {
      if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];

      } else {
        match = rquickExpr.exec( selector );
      }

      // Match html or make sure no context is specified for #id
      if ( match && (match[1] || !context) ) {

        // HANDLE: $(html) -> $(array)
        if ( match[1] ) {
          context = context instanceof jQuery ? context[0] : context;

          // scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present
          jQuery.merge( this, jQuery.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
          ) );

          // HANDLE: $(html, props)
          if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
            for ( match in context ) {
              // Properties of context are called as methods if possible
              if ( jQuery.isFunction( this[ match ] ) ) {
                this[ match ]( context[ match ] );

              // ...and otherwise set as attributes
              } else {
                this.attr( match, context[ match ] );
              }
            }
          }

          return this;

        // HANDLE: $(#id)
        } else {
          elem = document.getElementById( match[2] );

          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          if ( elem && elem.parentNode ) {
            // Inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
          }

          this.context = document;
          this.selector = selector;
          return this;
        }

      // HANDLE: $(expr, $(...))
      } else if ( !context || context.jquery ) {
        return ( context || rootjQuery ).find( selector );

      // HANDLE: $(expr, context)
      // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor( context ).find( selector );
      }

    // HANDLE: $(DOMElement)
    } else if ( selector.nodeType ) {
      this.context = this[0] = selector;
      this.length = 1;
      return this;

    // HANDLE: $(function)
    // Shortcut for document ready
    } else if ( jQuery.isFunction( selector ) ) {
      return typeof rootjQuery.ready !== "undefined" ?
        rootjQuery.ready( selector ) :
        // Execute immediately if ready is not present
        selector( jQuery );
    }

    if ( selector.selector !== undefined ) {
      this.selector = selector.selector;
      this.context = selector.context;
    }

    return jQuery.makeArray( selector, this );
  };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
  // methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };

jQuery.extend({
  dir: function( elem, dir, until ) {
    var matched = [],
      truncate = until !== undefined;

    while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
      if ( elem.nodeType === 1 ) {
        if ( truncate && jQuery( elem ).is( until ) ) {
          break;
        }
        matched.push( elem );
      }
    }
    return matched;
  },

  sibling: function( n, elem ) {
    var matched = [];

    for ( ; n; n = n.nextSibling ) {
      if ( n.nodeType === 1 && n !== elem ) {
        matched.push( n );
      }
    }

    return matched;
  }
});

jQuery.fn.extend({
  has: function( target ) {
    var targets = jQuery( target, this ),
      l = targets.length;

    return this.filter(function() {
      var i = 0;
      for ( ; i < l; i++ ) {
        if ( jQuery.contains( this, targets[i] ) ) {
          return true;
        }
      }
    });
  },

  closest: function( selectors, context ) {
    var cur,
      i = 0,
      l = this.length,
      matched = [],
      pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
        jQuery( selectors, context || this.context ) :
        0;

    for ( ; i < l; i++ ) {
      for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
        // Always skip document fragments
        if ( cur.nodeType < 11 && (pos ?
          pos.index(cur) > -1 :

          // Don't pass non-elements to Sizzle
          cur.nodeType === 1 &&
            jQuery.find.matchesSelector(cur, selectors)) ) {

          matched.push( cur );
          break;
        }
      }
    }

    return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
  },

  // Determine the position of an element within
  // the matched set of elements
  index: function( elem ) {

    // No argument, return index in parent
    if ( !elem ) {
      return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
    }

    // index in selector
    if ( typeof elem === "string" ) {
      return indexOf.call( jQuery( elem ), this[ 0 ] );
    }

    // Locate the position of the desired element
    return indexOf.call( this,

      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[ 0 ] : elem
    );
  },

  add: function( selector, context ) {
    return this.pushStack(
      jQuery.unique(
        jQuery.merge( this.get(), jQuery( selector, context ) )
      )
    );
  },

  addBack: function( selector ) {
    return this.add( selector == null ?
      this.prevObject : this.prevObject.filter(selector)
    );
  }
});

function sibling( cur, dir ) {
  while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
  return cur;
}

jQuery.each({
  parent: function( elem ) {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },
  parents: function( elem ) {
    return jQuery.dir( elem, "parentNode" );
  },
  parentsUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "parentNode", until );
  },
  next: function( elem ) {
    return sibling( elem, "nextSibling" );
  },
  prev: function( elem ) {
    return sibling( elem, "previousSibling" );
  },
  nextAll: function( elem ) {
    return jQuery.dir( elem, "nextSibling" );
  },
  prevAll: function( elem ) {
    return jQuery.dir( elem, "previousSibling" );
  },
  nextUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "nextSibling", until );
  },
  prevUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "previousSibling", until );
  },
  siblings: function( elem ) {
    return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
  },
  children: function( elem ) {
    return jQuery.sibling( elem.firstChild );
  },
  contents: function( elem ) {
    return elem.contentDocument || jQuery.merge( [], elem.childNodes );
  }
}, function( name, fn ) {
  jQuery.fn[ name ] = function( until, selector ) {
    var matched = jQuery.map( this, fn, until );

    if ( name.slice( -5 ) !== "Until" ) {
      selector = until;
    }

    if ( selector && typeof selector === "string" ) {
      matched = jQuery.filter( selector, matched );
    }

    if ( this.length > 1 ) {
      // Remove duplicates
      if ( !guaranteedUnique[ name ] ) {
        jQuery.unique( matched );
      }

      // Reverse order for parents* and prev-derivatives
      if ( rparentsprev.test( name ) ) {
        matched.reverse();
      }
    }

    return this.pushStack( matched );
  };
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
  var object = optionsCache[ options ] = {};
  jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
    object[ flag ] = true;
  });
  return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:     will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:     will keep track of previous values and will call any callback added
 *          after the list has been fired right away with the latest "memorized"
 *          values (like a Deferred)
 *
 *  unique:     will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:  interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

  // Convert options from String-formatted to Object-formatted if needed
  // (we check in cache first)
  options = typeof options === "string" ?
    ( optionsCache[ options ] || createOptions( options ) ) :
    jQuery.extend( {}, options );

  var // Last fire value (for non-forgettable lists)
    memory,
    // Flag to know if list was already fired
    fired,
    // Flag to know if list is currently firing
    firing,
    // First callback to fire (used internally by add and fireWith)
    firingStart,
    // End of the loop when firing
    firingLength,
    // Index of currently firing callback (modified by remove if needed)
    firingIndex,
    // Actual callback list
    list = [],
    // Stack of fire calls for repeatable lists
    stack = !options.once && [],
    // Fire callbacks
    fire = function( data ) {
      memory = options.memory && data;
      fired = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      firing = true;
      for ( ; list && firingIndex < firingLength; firingIndex++ ) {
        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
          memory = false; // To prevent further calls using add
          break;
        }
      }
      firing = false;
      if ( list ) {
        if ( stack ) {
          if ( stack.length ) {
            fire( stack.shift() );
          }
        } else if ( memory ) {
          list = [];
        } else {
          self.disable();
        }
      }
    },
    // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function() {
        if ( list ) {
          // First, we save the current length
          var start = list.length;
          (function add( args ) {
            jQuery.each( args, function( _, arg ) {
              var type = jQuery.type( arg );
              if ( type === "function" ) {
                if ( !options.unique || !self.has( arg ) ) {
                  list.push( arg );
                }
              } else if ( arg && arg.length && type !== "string" ) {
                // Inspect recursively
                add( arg );
              }
            });
          })( arguments );
          // Do we need to add the callbacks to the
          // current firing batch?
          if ( firing ) {
            firingLength = list.length;
          // With memory, if we're not firing then
          // we should call right away
          } else if ( memory ) {
            firingStart = start;
            fire( memory );
          }
        }
        return this;
      },
      // Remove a callback from the list
      remove: function() {
        if ( list ) {
          jQuery.each( arguments, function( _, arg ) {
            var index;
            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
              list.splice( index, 1 );
              // Handle firing indexes
              if ( firing ) {
                if ( index <= firingLength ) {
                  firingLength--;
                }
                if ( index <= firingIndex ) {
                  firingIndex--;
                }
              }
            }
          });
        }
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function( fn ) {
        return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
      },
      // Remove all callbacks from the list
      empty: function() {
        list = [];
        firingLength = 0;
        return this;
      },
      // Have the list do nothing anymore
      disable: function() {
        list = stack = memory = undefined;
        return this;
      },
      // Is it disabled?
      disabled: function() {
        return !list;
      },
      // Lock the list in its current state
      lock: function() {
        stack = undefined;
        if ( !memory ) {
          self.disable();
        }
        return this;
      },
      // Is it locked?
      locked: function() {
        return !stack;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ) {
        if ( list && ( !fired || stack ) ) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          if ( firing ) {
            stack.push( args );
          } else {
            fire( args );
          }
        }
        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }
    };

  return self;
};


jQuery.extend({

  Deferred: function( func ) {
    var tuples = [
        // action, add listener, listener list, final state
        [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
        [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
        [ "notify", "progress", jQuery.Callbacks("memory") ]
      ],
      state = "pending",
      promise = {
        state: function() {
          return state;
        },
        always: function() {
          deferred.done( arguments ).fail( arguments );
          return this;
        },
        then: function( /* fnDone, fnFail, fnProgress */ ) {
          var fns = arguments;
          return jQuery.Deferred(function( newDefer ) {
            jQuery.each( tuples, function( i, tuple ) {
              var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
              // deferred[ done | fail | progress ] for forwarding actions to newDefer
              deferred[ tuple[1] ](function() {
                var returned = fn && fn.apply( this, arguments );
                if ( returned && jQuery.isFunction( returned.promise ) ) {
                  returned.promise()
                    .done( newDefer.resolve )
                    .fail( newDefer.reject )
                    .progress( newDefer.notify );
                } else {
                  newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                }
              });
            });
            fns = null;
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function( obj ) {
          return obj != null ? jQuery.extend( obj, promise ) : promise;
        }
      },
      deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    jQuery.each( tuples, function( i, tuple ) {
      var list = tuple[ 2 ],
        stateString = tuple[ 3 ];

      // promise[ done | fail | progress ] = list.add
      promise[ tuple[1] ] = list.add;

      // Handle state
      if ( stateString ) {
        list.add(function() {
          // state = [ resolved | rejected ]
          state = stateString;

        // [ reject_list | resolve_list ].disable; progress_list.lock
        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
      }

      // deferred[ resolve | reject | notify ]
      deferred[ tuple[0] ] = function() {
        deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
        return this;
      };
      deferred[ tuple[0] + "With" ] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
      func.call( deferred, deferred );
    }

    // All done!
    return deferred;
  },

  // Deferred helper
  when: function( subordinate /* , ..., subordinateN */ ) {
    var i = 0,
      resolveValues = slice.call( arguments ),
      length = resolveValues.length,

      // the count of uncompleted subordinates
      remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
      deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

      // Update function for both resolve and progress values
      updateFunc = function( i, contexts, values ) {
        return function( value ) {
          contexts[ i ] = this;
          values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
          if ( values === progressValues ) {
            deferred.notifyWith( contexts, values );
          } else if ( !( --remaining ) ) {
            deferred.resolveWith( contexts, values );
          }
        };
      },

      progressValues, progressContexts, resolveContexts;

    // add listeners to Deferred subordinates; treat others as resolved
    if ( length > 1 ) {
      progressValues = new Array( length );
      progressContexts = new Array( length );
      resolveContexts = new Array( length );
      for ( ; i < length; i++ ) {
        if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
          resolveValues[ i ].promise()
            .done( updateFunc( i, resolveContexts, resolveValues ) )
            .fail( deferred.reject )
            .progress( updateFunc( i, progressContexts, progressValues ) );
        } else {
          --remaining;
        }
      }
    }

    // if we're not waiting on anything, resolve the master
    if ( !remaining ) {
      deferred.resolveWith( resolveContexts, resolveValues );
    }

    return deferred.promise();
  }
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
  // Add the callback
  jQuery.ready.promise().done( fn );

  return this;
};

jQuery.extend({
  // Is the DOM ready to be used? Set to true once it occurs.
  isReady: false,

  // A counter to track how many items to wait for before
  // the ready event fires. See #6781
  readyWait: 1,

  // Hold (or release) the ready event
  holdReady: function( hold ) {
    if ( hold ) {
      jQuery.readyWait++;
    } else {
      jQuery.ready( true );
    }
  },

  // Handle when the DOM is ready
  ready: function( wait ) {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
      return;
    }

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ) {
      return;
    }

    // If there are functions bound, to execute
    readyList.resolveWith( document, [ jQuery ] );

    // Trigger any bound ready events
    if ( jQuery.fn.triggerHandler ) {
      jQuery( document ).triggerHandler( "ready" );
      jQuery( document ).off( "ready" );
    }
  }
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
  document.removeEventListener( "DOMContentLoaded", completed, false );
  window.removeEventListener( "load", completed, false );
  jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
  if ( !readyList ) {

    readyList = jQuery.Deferred();

    // Catch cases where $(document).ready() is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( document.readyState === "complete" ) {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      setTimeout( jQuery.ready );

    } else {

      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", completed, false );

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", completed, false );
    }
  }
  return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
  var i = 0,
    len = elems.length,
    bulk = key == null;

  // Sets many values
  if ( jQuery.type( key ) === "object" ) {
    chainable = true;
    for ( i in key ) {
      jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
    }

  // Sets one value
  } else if ( value !== undefined ) {
    chainable = true;

    if ( !jQuery.isFunction( value ) ) {
      raw = true;
    }

    if ( bulk ) {
      // Bulk operations run against the entire set
      if ( raw ) {
        fn.call( elems, value );
        fn = null;

      // ...except when executing function values
      } else {
        bulk = fn;
        fn = function( elem, key, value ) {
          return bulk.call( jQuery( elem ), value );
        };
      }
    }

    if ( fn ) {
      for ( ; i < len; i++ ) {
        fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
      }
    }
  }

  return chainable ?
    elems :

    // Gets
    bulk ?
      fn.call( elems ) :
      len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
  // Accepts only:
  //  - Node
  //    - Node.ELEMENT_NODE
  //    - Node.DOCUMENT_NODE
  //  - Object
  //    - Any
  /* jshint -W018 */
  return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
  // Support: Android < 4,
  // Old WebKit does not have Object.preventExtensions/freeze method,
  // return new empty object instead with no [[set]] accessor
  Object.defineProperty( this.cache = {}, 0, {
    get: function() {
      return {};
    }
  });

  this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
  key: function( owner ) {
    // We can accept data for non-element nodes in modern browsers,
    // but we should not, see #8335.
    // Always return the key for a frozen object.
    if ( !Data.accepts( owner ) ) {
      return 0;
    }

    var descriptor = {},
      // Check if the owner object already has a cache key
      unlock = owner[ this.expando ];

    // If not, create one
    if ( !unlock ) {
      unlock = Data.uid++;

      // Secure it in a non-enumerable, non-writable property
      try {
        descriptor[ this.expando ] = { value: unlock };
        Object.defineProperties( owner, descriptor );

      // Support: Android < 4
      // Fallback to a less secure definition
      } catch ( e ) {
        descriptor[ this.expando ] = unlock;
        jQuery.extend( owner, descriptor );
      }
    }

    // Ensure the cache object
    if ( !this.cache[ unlock ] ) {
      this.cache[ unlock ] = {};
    }

    return unlock;
  },
  set: function( owner, data, value ) {
    var prop,
      // There may be an unlock assigned to this node,
      // if there is no entry for this "owner", create one inline
      // and set the unlock as though an owner entry had always existed
      unlock = this.key( owner ),
      cache = this.cache[ unlock ];

    // Handle: [ owner, key, value ] args
    if ( typeof data === "string" ) {
      cache[ data ] = value;

    // Handle: [ owner, { properties } ] args
    } else {
      // Fresh assignments by object are shallow copied
      if ( jQuery.isEmptyObject( cache ) ) {
        jQuery.extend( this.cache[ unlock ], data );
      // Otherwise, copy the properties one-by-one to the cache object
      } else {
        for ( prop in data ) {
          cache[ prop ] = data[ prop ];
        }
      }
    }
    return cache;
  },
  get: function( owner, key ) {
    // Either a valid cache is found, or will be created.
    // New caches will be created and the unlock returned,
    // allowing direct access to the newly created
    // empty data object. A valid owner object must be provided.
    var cache = this.cache[ this.key( owner ) ];

    return key === undefined ?
      cache : cache[ key ];
  },
  access: function( owner, key, value ) {
    var stored;
    // In cases where either:
    //
    //   1. No key was specified
    //   2. A string key was specified, but no value provided
    //
    // Take the "read" path and allow the get method to determine
    // which value to return, respectively either:
    //
    //   1. The entire cache object
    //   2. The data stored at the key
    //
    if ( key === undefined ||
        ((key && typeof key === "string") && value === undefined) ) {

      stored = this.get( owner, key );

      return stored !== undefined ?
        stored : this.get( owner, jQuery.camelCase(key) );
    }

    // [*]When the key is not a string, or both a key and value
    // are specified, set or extend (existing objects) with either:
    //
    //   1. An object of properties
    //   2. A key and value
    //
    this.set( owner, key, value );

    // Since the "set" path can have two possible entry points
    // return the expected data based on which path was taken[*]
    return value !== undefined ? value : key;
  },
  remove: function( owner, key ) {
    var i, name, camel,
      unlock = this.key( owner ),
      cache = this.cache[ unlock ];

    if ( key === undefined ) {
      this.cache[ unlock ] = {};

    } else {
      // Support array or space separated string of keys
      if ( jQuery.isArray( key ) ) {
        // If "name" is an array of keys...
        // When data is initially created, via ("key", "val") signature,
        // keys will be converted to camelCase.
        // Since there is no way to tell _how_ a key was added, remove
        // both plain key and camelCase key. #12786
        // This will only penalize the array argument path.
        name = key.concat( key.map( jQuery.camelCase ) );
      } else {
        camel = jQuery.camelCase( key );
        // Try the string as a key before any manipulation
        if ( key in cache ) {
          name = [ key, camel ];
        } else {
          // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace
          name = camel;
          name = name in cache ?
            [ name ] : ( name.match( rnotwhite ) || [] );
        }
      }

      i = name.length;
      while ( i-- ) {
        delete cache[ name[ i ] ];
      }
    }
  },
  hasData: function( owner ) {
    return !jQuery.isEmptyObject(
      this.cache[ owner[ this.expando ] ] || {}
    );
  },
  discard: function( owner ) {
    if ( owner[ this.expando ] ) {
      delete this.cache[ owner[ this.expando ] ];
    }
  }
};
var data_priv = new Data();

var data_user = new Data();



/*
  Implementation Summary

  1. Enforce API surface and semantic compatibility with 1.9.x branch
  2. Improve the module's maintainability by reducing the storage
    paths to a single mechanism.
  3. Use the same single mechanism to support "private" and "user" data.
  4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  5. Avoid exposing implementation details on user objects (eg. expando properties)
  6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
  rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
  var name;

  // If nothing was found internally, try to fetch any
  // data from the HTML5 data-* attribute
  if ( data === undefined && elem.nodeType === 1 ) {
    name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
    data = elem.getAttribute( name );

    if ( typeof data === "string" ) {
      try {
        data = data === "true" ? true :
          data === "false" ? false :
          data === "null" ? null :
          // Only convert to a number if it doesn't change the string
          +data + "" === data ? +data :
          rbrace.test( data ) ? jQuery.parseJSON( data ) :
          data;
      } catch( e ) {}

      // Make sure we set the data so it isn't changed later
      data_user.set( elem, key, data );
    } else {
      data = undefined;
    }
  }
  return data;
}

jQuery.extend({
  hasData: function( elem ) {
    return data_user.hasData( elem ) || data_priv.hasData( elem );
  },

  data: function( elem, name, data ) {
    return data_user.access( elem, name, data );
  },

  removeData: function( elem, name ) {
    data_user.remove( elem, name );
  },

  // TODO: Now that all calls to _data and _removeData have been replaced
  // with direct calls to data_priv methods, these can be deprecated.
  _data: function( elem, name, data ) {
    return data_priv.access( elem, name, data );
  },

  _removeData: function( elem, name ) {
    data_priv.remove( elem, name );
  }
});

jQuery.fn.extend({
  data: function( key, value ) {
    var i, name, data,
      elem = this[ 0 ],
      attrs = elem && elem.attributes;

    // Gets all values
    if ( key === undefined ) {
      if ( this.length ) {
        data = data_user.get( elem );

        if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
          i = attrs.length;
          while ( i-- ) {

            // Support: IE11+
            // The attrs elements can be null (#14894)
            if ( attrs[ i ] ) {
              name = attrs[ i ].name;
              if ( name.indexOf( "data-" ) === 0 ) {
                name = jQuery.camelCase( name.slice(5) );
                dataAttr( elem, name, data[ name ] );
              }
            }
          }
          data_priv.set( elem, "hasDataAttrs", true );
        }
      }

      return data;
    }

    // Sets multiple values
    if ( typeof key === "object" ) {
      return this.each(function() {
        data_user.set( this, key );
      });
    }

    return access( this, function( value ) {
      var data,
        camelKey = jQuery.camelCase( key );

      // The calling jQuery object (element matches) is not empty
      // (and therefore has an element appears at this[ 0 ]) and the
      // `value` parameter was not undefined. An empty jQuery object
      // will result in `undefined` for elem = this[ 0 ] which will
      // throw an exception if an attempt to read a data cache is made.
      if ( elem && value === undefined ) {
        // Attempt to get data from the cache
        // with the key as-is
        data = data_user.get( elem, key );
        if ( data !== undefined ) {
          return data;
        }

        // Attempt to get data from the cache
        // with the key camelized
        data = data_user.get( elem, camelKey );
        if ( data !== undefined ) {
          return data;
        }

        // Attempt to "discover" the data in
        // HTML5 custom data-* attrs
        data = dataAttr( elem, camelKey, undefined );
        if ( data !== undefined ) {
          return data;
        }

        // We tried really hard, but the data doesn't exist.
        return;
      }

      // Set the data...
      this.each(function() {
        // First, attempt to store a copy or reference of any
        // data that might've been store with a camelCased key.
        var data = data_user.get( this, camelKey );

        // For HTML5 data-* attribute interop, we have to
        // store property names with dashes in a camelCase form.
        // This might not apply to all properties...*
        data_user.set( this, camelKey, value );

        // *... In the case of properties that might _actually_
        // have dashes, we need to also store a copy of that
        // unchanged property.
        if ( key.indexOf("-") !== -1 && data !== undefined ) {
          data_user.set( this, key, value );
        }
      });
    }, null, value, arguments.length > 1, null, true );
  },

  removeData: function( key ) {
    return this.each(function() {
      data_user.remove( this, key );
    });
  }
});


jQuery.extend({
  queue: function( elem, type, data ) {
    var queue;

    if ( elem ) {
      type = ( type || "fx" ) + "queue";
      queue = data_priv.get( elem, type );

      // Speed up dequeue by getting out quickly if this is just a lookup
      if ( data ) {
        if ( !queue || jQuery.isArray( data ) ) {
          queue = data_priv.access( elem, type, jQuery.makeArray(data) );
        } else {
          queue.push( data );
        }
      }
      return queue || [];
    }
  },

  dequeue: function( elem, type ) {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ),
      startLength = queue.length,
      fn = queue.shift(),
      hooks = jQuery._queueHooks( elem, type ),
      next = function() {
        jQuery.dequeue( elem, type );
      };

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ) {
      fn = queue.shift();
      startLength--;
    }

    if ( fn ) {

      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ) {
        queue.unshift( "inprogress" );
      }

      // clear up the last queue stop function
      delete hooks.stop;
      fn.call( elem, next, hooks );
    }

    if ( !startLength && hooks ) {
      hooks.empty.fire();
    }
  },

  // not intended for public consumption - generates a queueHooks object, or returns the current one
  _queueHooks: function( elem, type ) {
    var key = type + "queueHooks";
    return data_priv.get( elem, key ) || data_priv.access( elem, key, {
      empty: jQuery.Callbacks("once memory").add(function() {
        data_priv.remove( elem, [ type + "queue", key ] );
      })
    });
  }
});

jQuery.fn.extend({
  queue: function( type, data ) {
    var setter = 2;

    if ( typeof type !== "string" ) {
      data = type;
      type = "fx";
      setter--;
    }

    if ( arguments.length < setter ) {
      return jQuery.queue( this[0], type );
    }

    return data === undefined ?
      this :
      this.each(function() {
        var queue = jQuery.queue( this, type, data );

        // ensure a hooks for this queue
        jQuery._queueHooks( this, type );

        if ( type === "fx" && queue[0] !== "inprogress" ) {
          jQuery.dequeue( this, type );
        }
      });
  },
  dequeue: function( type ) {
    return this.each(function() {
      jQuery.dequeue( this, type );
    });
  },
  clearQueue: function( type ) {
    return this.queue( type || "fx", [] );
  },
  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default)
  promise: function( type, obj ) {
    var tmp,
      count = 1,
      defer = jQuery.Deferred(),
      elements = this,
      i = this.length,
      resolve = function() {
        if ( !( --count ) ) {
          defer.resolveWith( elements, [ elements ] );
        }
      };

    if ( typeof type !== "string" ) {
      obj = type;
      type = undefined;
    }
    type = type || "fx";

    while ( i-- ) {
      tmp = data_priv.get( elements[ i ], type + "queueHooks" );
      if ( tmp && tmp.empty ) {
        count++;
        tmp.empty.add( resolve );
      }
    }
    resolve();
    return defer.promise( obj );
  }
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
  };

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
  var fragment = document.createDocumentFragment(),
    div = fragment.appendChild( document.createElement( "div" ) ),
    input = document.createElement( "input" );

  // #11217 - WebKit loses check when the name is after the checked attribute
  // Support: Windows Web Apps (WWA)
  // `name` and `type` need .setAttribute for WWA
  input.setAttribute( "type", "radio" );
  input.setAttribute( "checked", "checked" );
  input.setAttribute( "name", "t" );

  div.appendChild( input );

  // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
  // old WebKit doesn't clone checked state correctly in fragments
  support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

  // Make sure textarea (and checkbox) defaultValue is properly cloned
  // Support: IE9-IE11+
  div.innerHTML = "<textarea>x</textarea>";
  support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
  rkeyEvent = /^key/,
  rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
  rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
  rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

function safeActiveElement() {
  try {
    return document.activeElement;
  } catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

  global: {},

  add: function( elem, types, handler, data, selector ) {

    var handleObjIn, eventHandle, tmp,
      events, t, handleObj,
      special, handlers, type, namespaces, origType,
      elemData = data_priv.get( elem );

    // Don't attach events to noData or text/comment nodes (but allow plain objects)
    if ( !elemData ) {
      return;
    }

    // Caller can pass in an object of custom data in lieu of the handler
    if ( handler.handler ) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector;
    }

    // Make sure that the handler has a unique ID, used to find/remove it later
    if ( !handler.guid ) {
      handler.guid = jQuery.guid++;
    }

    // Init the element's event structure and main handler, if this is the first
    if ( !(events = elemData.events) ) {
      events = elemData.events = {};
    }
    if ( !(eventHandle = elemData.handle) ) {
      eventHandle = elemData.handle = function( e ) {
        // Discard the second event of a jQuery.event.trigger() and
        // when an event is called after a page has unloaded
        return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
          jQuery.event.dispatch.apply( elem, arguments ) : undefined;
      };
    }

    // Handle multiple events separated by a space
    types = ( types || "" ).match( rnotwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[t] ) || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ).split( "." ).sort();

      // There *must* be a type, no attaching namespace-only handlers
      if ( !type ) {
        continue;
      }

      // If event changes its type, use the special event handlers for the changed type
      special = jQuery.event.special[ type ] || {};

      // If selector defined, determine special event api type, otherwise given type
      type = ( selector ? special.delegateType : special.bindType ) || type;

      // Update special based on newly reset type
      special = jQuery.event.special[ type ] || {};

      // handleObj is passed to all event handlers
      handleObj = jQuery.extend({
        type: type,
        origType: origType,
        data: data,
        handler: handler,
        guid: handler.guid,
        selector: selector,
        needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
        namespace: namespaces.join(".")
      }, handleObjIn );

      // Init the event handler queue if we're the first
      if ( !(handlers = events[ type ]) ) {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener if the special events handler returns false
        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );
          }
        }
      }

      if ( special.add ) {
        special.add.call( elem, handleObj );

        if ( !handleObj.handler.guid ) {
          handleObj.handler.guid = handler.guid;
        }
      }

      // Add to the element's handler list, delegates in front
      if ( selector ) {
        handlers.splice( handlers.delegateCount++, 0, handleObj );
      } else {
        handlers.push( handleObj );
      }

      // Keep track of which events have ever been used, for event optimization
      jQuery.event.global[ type ] = true;
    }

  },

  // Detach an event or set of events from an element
  remove: function( elem, types, handler, selector, mappedTypes ) {

    var j, origCount, tmp,
      events, t, handleObj,
      special, handlers, type, namespaces, origType,
      elemData = data_priv.hasData( elem ) && data_priv.get( elem );

    if ( !elemData || !(events = elemData.events) ) {
      return;
    }

    // Once for each type.namespace in types; type may be omitted
    types = ( types || "" ).match( rnotwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[t] ) || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ).split( "." ).sort();

      // Unbind all events (on this namespace, if provided) for the element
      if ( !type ) {
        for ( type in events ) {
          jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
        }
        continue;
      }

      special = jQuery.event.special[ type ] || {};
      type = ( selector ? special.delegateType : special.bindType ) || type;
      handlers = events[ type ] || [];
      tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

      // Remove matching events
      origCount = j = handlers.length;
      while ( j-- ) {
        handleObj = handlers[ j ];

        if ( ( mappedTypes || origType === handleObj.origType ) &&
          ( !handler || handler.guid === handleObj.guid ) &&
          ( !tmp || tmp.test( handleObj.namespace ) ) &&
          ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
          handlers.splice( j, 1 );

          if ( handleObj.selector ) {
            handlers.delegateCount--;
          }
          if ( special.remove ) {
            special.remove.call( elem, handleObj );
          }
        }
      }

      // Remove generic event handler if we removed something and no more handlers exist
      // (avoids potential for endless recursion during removal of special event handlers)
      if ( origCount && !handlers.length ) {
        if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
          jQuery.removeEvent( elem, type, elemData.handle );
        }

        delete events[ type ];
      }
    }

    // Remove the expando if it's no longer used
    if ( jQuery.isEmptyObject( events ) ) {
      delete elemData.handle;
      data_priv.remove( elem, "events" );
    }
  },

  trigger: function( event, data, elem, onlyHandlers ) {

    var i, cur, tmp, bubbleType, ontype, handle, special,
      eventPath = [ elem || document ],
      type = hasOwn.call( event, "type" ) ? event.type : event,
      namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

    cur = tmp = elem = elem || document;

    // Don't do events on text and comment nodes
    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
      return;
    }

    // focus/blur morphs to focusin/out; ensure we're not firing them right now
    if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
      return;
    }

    if ( type.indexOf(".") >= 0 ) {
      // Namespaced trigger; create a regexp to match event type in handle()
      namespaces = type.split(".");
      type = namespaces.shift();
      namespaces.sort();
    }
    ontype = type.indexOf(":") < 0 && "on" + type;

    // Caller can pass in a jQuery.Event object, Object, or just an event type string
    event = event[ jQuery.expando ] ?
      event :
      new jQuery.Event( type, typeof event === "object" && event );

    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join(".");
    event.namespace_re = event.namespace ?
      new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
      null;

    // Clean up the event in case it is being reused
    event.result = undefined;
    if ( !event.target ) {
      event.target = elem;
    }

    // Clone any incoming data and prepend the event, creating the handler arg list
    data = data == null ?
      [ event ] :
      jQuery.makeArray( data, [ event ] );

    // Allow special events to draw outside the lines
    special = jQuery.event.special[ type ] || {};
    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
      return;
    }

    // Determine event propagation path in advance, per W3C events spec (#9951)
    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
    if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

      bubbleType = special.delegateType || type;
      if ( !rfocusMorph.test( bubbleType + type ) ) {
        cur = cur.parentNode;
      }
      for ( ; cur; cur = cur.parentNode ) {
        eventPath.push( cur );
        tmp = cur;
      }

      // Only add window if we got to document (e.g., not plain obj or detached DOM)
      if ( tmp === (elem.ownerDocument || document) ) {
        eventPath.push( tmp.defaultView || tmp.parentWindow || window );
      }
    }

    // Fire handlers on the event path
    i = 0;
    while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

      event.type = i > 1 ?
        bubbleType :
        special.bindType || type;

      // jQuery handler
      handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
      if ( handle ) {
        handle.apply( cur, data );
      }

      // Native handler
      handle = ontype && cur[ ontype ];
      if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
        event.result = handle.apply( cur, data );
        if ( event.result === false ) {
          event.preventDefault();
        }
      }
    }
    event.type = type;

    // If nobody prevented the default action, do it now
    if ( !onlyHandlers && !event.isDefaultPrevented() ) {

      if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
        jQuery.acceptData( elem ) ) {

        // Call a native DOM method on the target with the same name name as the event.
        // Don't do default actions on window, that's where global variables be (#6170)
        if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

          // Don't re-trigger an onFOO event when we call its FOO() method
          tmp = elem[ ontype ];

          if ( tmp ) {
            elem[ ontype ] = null;
          }

          // Prevent re-triggering of the same event, since we already bubbled it above
          jQuery.event.triggered = type;
          elem[ type ]();
          jQuery.event.triggered = undefined;

          if ( tmp ) {
            elem[ ontype ] = tmp;
          }
        }
      }
    }

    return event.result;
  },

  dispatch: function( event ) {

    // Make a writable jQuery.Event from the native event object
    event = jQuery.event.fix( event );

    var i, j, ret, matched, handleObj,
      handlerQueue = [],
      args = slice.call( arguments ),
      handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
      special = jQuery.event.special[ event.type ] || {};

    // Use the fix-ed jQuery.Event rather than the (read-only) native event
    args[0] = event;
    event.delegateTarget = this;

    // Call the preDispatch hook for the mapped type, and let it bail if desired
    if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
      return;
    }

    // Determine handlers
    handlerQueue = jQuery.event.handlers.call( this, event, handlers );

    // Run delegates first; they may want to stop propagation beneath us
    i = 0;
    while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
      event.currentTarget = matched.elem;

      j = 0;
      while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

        // Triggered event must either 1) have no namespace, or
        // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
        if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

          event.handleObj = handleObj;
          event.data = handleObj.data;

          ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
              .apply( matched.elem, args );

          if ( ret !== undefined ) {
            if ( (event.result = ret) === false ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }
    }

    // Call the postDispatch hook for the mapped type
    if ( special.postDispatch ) {
      special.postDispatch.call( this, event );
    }

    return event.result;
  },

  handlers: function( event, handlers ) {
    var i, matches, sel, handleObj,
      handlerQueue = [],
      delegateCount = handlers.delegateCount,
      cur = event.target;

    // Find delegate handlers
    // Black-hole SVG <use> instance trees (#13180)
    // Avoid non-left-click bubbling in Firefox (#3861)
    if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

      for ( ; cur !== this; cur = cur.parentNode || this ) {

        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
        if ( cur.disabled !== true || event.type !== "click" ) {
          matches = [];
          for ( i = 0; i < delegateCount; i++ ) {
            handleObj = handlers[ i ];

            // Don't conflict with Object.prototype properties (#13203)
            sel = handleObj.selector + " ";

            if ( matches[ sel ] === undefined ) {
              matches[ sel ] = handleObj.needsContext ?
                jQuery( sel, this ).index( cur ) >= 0 :
                jQuery.find( sel, this, null, [ cur ] ).length;
            }
            if ( matches[ sel ] ) {
              matches.push( handleObj );
            }
          }
          if ( matches.length ) {
            handlerQueue.push({ elem: cur, handlers: matches });
          }
        }
      }
    }

    // Add the remaining (directly-bound) handlers
    if ( delegateCount < handlers.length ) {
      handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
    }

    return handlerQueue;
  },

  // Includes some event props shared by KeyEvent and MouseEvent
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

  fixHooks: {},

  keyHooks: {
    props: "char charCode key keyCode".split(" "),
    filter: function( event, original ) {

      // Add which for key events
      if ( event.which == null ) {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
      }

      return event;
    }
  },

  mouseHooks: {
    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
    filter: function( event, original ) {
      var eventDoc, doc, body,
        button = original.button;

      // Calculate pageX/Y if missing and clientX/Y available
      if ( event.pageX == null && original.clientX != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      if ( !event.which && button !== undefined ) {
        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
      }

      return event;
    }
  },

  fix: function( event ) {
    if ( event[ jQuery.expando ] ) {
      return event;
    }

    // Create a writable copy of the event object and normalize some properties
    var i, prop, copy,
      type = event.type,
      originalEvent = event,
      fixHook = this.fixHooks[ type ];

    if ( !fixHook ) {
      this.fixHooks[ type ] = fixHook =
        rmouseEvent.test( type ) ? this.mouseHooks :
        rkeyEvent.test( type ) ? this.keyHooks :
        {};
    }
    copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

    event = new jQuery.Event( originalEvent );

    i = copy.length;
    while ( i-- ) {
      prop = copy[ i ];
      event[ prop ] = originalEvent[ prop ];
    }

    // Support: Cordova 2.5 (WebKit) (#13255)
    // All events should have a target; Cordova deviceready doesn't
    if ( !event.target ) {
      event.target = document;
    }

    // Support: Safari 6.0+, Chrome < 28
    // Target should not be a text node (#504, #13143)
    if ( event.target.nodeType === 3 ) {
      event.target = event.target.parentNode;
    }

    return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
  },

  special: {
    load: {
      // Prevent triggered image.load events from bubbling to window.load
      noBubble: true
    },
    focus: {
      // Fire native event if possible so blur/focus sequence is correct
      trigger: function() {
        if ( this !== safeActiveElement() && this.focus ) {
          this.focus();
          return false;
        }
      },
      delegateType: "focusin"
    },
    blur: {
      trigger: function() {
        if ( this === safeActiveElement() && this.blur ) {
          this.blur();
          return false;
        }
      },
      delegateType: "focusout"
    },
    click: {
      // For checkbox, fire native event so checked state will be right
      trigger: function() {
        if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
          this.click();
          return false;
        }
      },

      // For cross-browser consistency, don't fire native .click() on links
      _default: function( event ) {
        return jQuery.nodeName( event.target, "a" );
      }
    },

    beforeunload: {
      postDispatch: function( event ) {

        // Support: Firefox 20+
        // Firefox doesn't alert if the returnValue field is not set.
        if ( event.result !== undefined && event.originalEvent ) {
          event.originalEvent.returnValue = event.result;
        }
      }
    }
  },

  simulate: function( type, elem, event, bubble ) {
    // Piggyback on a donor event to simulate a different one.
    // Fake originalEvent to avoid donor's stopPropagation, but if the
    // simulated event prevents default then we do the same on the donor.
    var e = jQuery.extend(
      new jQuery.Event(),
      event,
      {
        type: type,
        isSimulated: true,
        originalEvent: {}
      }
    );
    if ( bubble ) {
      jQuery.event.trigger( e, null, elem );
    } else {
      jQuery.event.dispatch.call( elem, e );
    }
    if ( e.isDefaultPrevented() ) {
      event.preventDefault();
    }
  }
};

jQuery.removeEvent = function( elem, type, handle ) {
  if ( elem.removeEventListener ) {
    elem.removeEventListener( type, handle, false );
  }
};

jQuery.Event = function( src, props ) {
  // Allow instantiation without the 'new' keyword
  if ( !(this instanceof jQuery.Event) ) {
    return new jQuery.Event( src, props );
  }

  // Event object
  if ( src && src.type ) {
    this.originalEvent = src;
    this.type = src.type;

    // Events bubbling up the document may have been marked as prevented
    // by a handler lower down the tree; reflect the correct value.
    this.isDefaultPrevented = src.defaultPrevented ||
        src.defaultPrevented === undefined &&
        // Support: Android < 4.0
        src.returnValue === false ?
      returnTrue :
      returnFalse;

  // Event type
  } else {
    this.type = src;
  }

  // Put explicitly provided properties onto the event object
  if ( props ) {
    jQuery.extend( this, props );
  }

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || jQuery.now();

  // Mark it as fixed
  this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,

  preventDefault: function() {
    var e = this.originalEvent;

    this.isDefaultPrevented = returnTrue;

    if ( e && e.preventDefault ) {
      e.preventDefault();
    }
  },
  stopPropagation: function() {
    var e = this.originalEvent;

    this.isPropagationStopped = returnTrue;

    if ( e && e.stopPropagation ) {
      e.stopPropagation();
    }
  },
  stopImmediatePropagation: function() {
    var e = this.originalEvent;

    this.isImmediatePropagationStopped = returnTrue;

    if ( e && e.stopImmediatePropagation ) {
      e.stopImmediatePropagation();
    }

    this.stopPropagation();
  }
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
}, function( orig, fix ) {
  jQuery.event.special[ orig ] = {
    delegateType: fix,
    bindType: fix,

    handle: function( event ) {
      var ret,
        target = this,
        related = event.relatedTarget,
        handleObj = event.handleObj;

      // For mousenter/leave call the handler if related is outside the target.
      // NB: No relatedTarget if the mouse left/entered the browser window
      if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply( this, arguments );
        event.type = fix;
      }
      return ret;
    }
  };
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
  jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

    // Attach a single capturing handler on the document while someone wants focusin/focusout
    var handler = function( event ) {
        jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
      };

    jQuery.event.special[ fix ] = {
      setup: function() {
        var doc = this.ownerDocument || this,
          attaches = data_priv.access( doc, fix );

        if ( !attaches ) {
          doc.addEventListener( orig, handler, true );
        }
        data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
      },
      teardown: function() {
        var doc = this.ownerDocument || this,
          attaches = data_priv.access( doc, fix ) - 1;

        if ( !attaches ) {
          doc.removeEventListener( orig, handler, true );
          data_priv.remove( doc, fix );

        } else {
          data_priv.access( doc, fix, attaches );
        }
      }
    };
  });
}

jQuery.fn.extend({

  on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
    var origFn, type;

    // Types can be a map of types/handlers
    if ( typeof types === "object" ) {
      // ( types-Object, selector, data )
      if ( typeof selector !== "string" ) {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for ( type in types ) {
        this.on( type, selector, data, types[ type ], one );
      }
      return this;
    }

    if ( data == null && fn == null ) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if ( fn == null ) {
      if ( typeof selector === "string" ) {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if ( fn === false ) {
      fn = returnFalse;
    } else if ( !fn ) {
      return this;
    }

    if ( one === 1 ) {
      origFn = fn;
      fn = function( event ) {
        // Can use an empty set, since event contains the info
        jQuery().off( event );
        return origFn.apply( this, arguments );
      };
      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
    }
    return this.each( function() {
      jQuery.event.add( this, types, fn, data, selector );
    });
  },
  one: function( types, selector, data, fn ) {
    return this.on( types, selector, data, fn, 1 );
  },
  off: function( types, selector, fn ) {
    var handleObj, type;
    if ( types && types.preventDefault && types.handleObj ) {
      // ( event )  dispatched jQuery.Event
      handleObj = types.handleObj;
      jQuery( types.delegateTarget ).off(
        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
        handleObj.selector,
        handleObj.handler
      );
      return this;
    }
    if ( typeof types === "object" ) {
      // ( types-object [, selector] )
      for ( type in types ) {
        this.off( type, selector, types[ type ] );
      }
      return this;
    }
    if ( selector === false || typeof selector === "function" ) {
      // ( types [, fn] )
      fn = selector;
      selector = undefined;
    }
    if ( fn === false ) {
      fn = returnFalse;
    }
    return this.each(function() {
      jQuery.event.remove( this, types, fn, selector );
    });
  },

  trigger: function( type, data ) {
    return this.each(function() {
      jQuery.event.trigger( type, data, this );
    });
  },
  triggerHandler: function( type, data ) {
    var elem = this[0];
    if ( elem ) {
      return jQuery.event.trigger( type, data, elem, true );
    }
  }
});


var
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
  rtagName = /<([\w:]+)/,
  rhtml = /<|&#?\w+;/,
  rnoInnerhtml = /<(?:script|style|link)/i,
  // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
  rscriptType = /^$|\/(?:java|ecma)script/i,
  rscriptTypeMasked = /^true\/(.*)/,
  rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

  // We have to close these tags to support XHTML (#13200)
  wrapMap = {

    // Support: IE 9
    option: [ 1, "<select multiple='multiple'>", "</select>" ],

    thead: [ 1, "<table>", "</table>" ],
    col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

    _default: [ 0, "", "" ]
  };

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
  return jQuery.nodeName( elem, "table" ) &&
    jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

    elem.getElementsByTagName("tbody")[0] ||
      elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
    elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
  elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
  return elem;
}
function restoreScript( elem ) {
  var match = rscriptTypeMasked.exec( elem.type );

  if ( match ) {
    elem.type = match[ 1 ];
  } else {
    elem.removeAttribute("type");
  }

  return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
  var i = 0,
    l = elems.length;

  for ( ; i < l; i++ ) {
    data_priv.set(
      elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
    );
  }
}

function cloneCopyEvent( src, dest ) {
  var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

  if ( dest.nodeType !== 1 ) {
    return;
  }

  // 1. Copy private data: events, handlers, etc.
  if ( data_priv.hasData( src ) ) {
    pdataOld = data_priv.access( src );
    pdataCur = data_priv.set( dest, pdataOld );
    events = pdataOld.events;

    if ( events ) {
      delete pdataCur.handle;
      pdataCur.events = {};

      for ( type in events ) {
        for ( i = 0, l = events[ type ].length; i < l; i++ ) {
          jQuery.event.add( dest, type, events[ type ][ i ] );
        }
      }
    }
  }

  // 2. Copy user data
  if ( data_user.hasData( src ) ) {
    udataOld = data_user.access( src );
    udataCur = jQuery.extend( {}, udataOld );

    data_user.set( dest, udataCur );
  }
}

function getAll( context, tag ) {
  var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
      context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
      [];

  return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
    jQuery.merge( [ context ], ret ) :
    ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
  var nodeName = dest.nodeName.toLowerCase();

  // Fails to persist the checked state of a cloned checkbox or radio button.
  if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
    dest.checked = src.checked;

  // Fails to return the selected option to the default selected state when cloning options
  } else if ( nodeName === "input" || nodeName === "textarea" ) {
    dest.defaultValue = src.defaultValue;
  }
}

jQuery.extend({
  clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    var i, l, srcElements, destElements,
      clone = elem.cloneNode( true ),
      inPage = jQuery.contains( elem.ownerDocument, elem );

    // Support: IE >= 9
    // Fix Cloning issues
    if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
        !jQuery.isXMLDoc( elem ) ) {

      // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
      destElements = getAll( clone );
      srcElements = getAll( elem );

      for ( i = 0, l = srcElements.length; i < l; i++ ) {
        fixInput( srcElements[ i ], destElements[ i ] );
      }
    }

    // Copy the events from the original to the clone
    if ( dataAndEvents ) {
      if ( deepDataAndEvents ) {
        srcElements = srcElements || getAll( elem );
        destElements = destElements || getAll( clone );

        for ( i = 0, l = srcElements.length; i < l; i++ ) {
          cloneCopyEvent( srcElements[ i ], destElements[ i ] );
        }
      } else {
        cloneCopyEvent( elem, clone );
      }
    }

    // Preserve script evaluation history
    destElements = getAll( clone, "script" );
    if ( destElements.length > 0 ) {
      setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
    }

    // Return the cloned set
    return clone;
  },

  buildFragment: function( elems, context, scripts, selection ) {
    var elem, tmp, tag, wrap, contains, j,
      fragment = context.createDocumentFragment(),
      nodes = [],
      i = 0,
      l = elems.length;

    for ( ; i < l; i++ ) {
      elem = elems[ i ];

      if ( elem || elem === 0 ) {

        // Add nodes directly
        if ( jQuery.type( elem ) === "object" ) {
          // Support: QtWebKit
          // jQuery.merge because push.apply(_, arraylike) throws
          jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

        // Convert non-html into a text node
        } else if ( !rhtml.test( elem ) ) {
          nodes.push( context.createTextNode( elem ) );

        // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild( context.createElement("div") );

          // Deserialize a standard representation
          tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
          wrap = wrapMap[ tag ] || wrapMap._default;
          tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

          // Descend through wrappers to the right content
          j = wrap[ 0 ];
          while ( j-- ) {
            tmp = tmp.lastChild;
          }

          // Support: QtWebKit
          // jQuery.merge because push.apply(_, arraylike) throws
          jQuery.merge( nodes, tmp.childNodes );

          // Remember the top-level container
          tmp = fragment.firstChild;

          // Fixes #12346
          // Support: Webkit, IE
          tmp.textContent = "";
        }
      }
    }

    // Remove wrapper from fragment
    fragment.textContent = "";

    i = 0;
    while ( (elem = nodes[ i++ ]) ) {

      // #4087 - If origin and destination elements are the same, and this is
      // that element, do not do anything
      if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
        continue;
      }

      contains = jQuery.contains( elem.ownerDocument, elem );

      // Append to fragment
      tmp = getAll( fragment.appendChild( elem ), "script" );

      // Preserve script evaluation history
      if ( contains ) {
        setGlobalEval( tmp );
      }

      // Capture executables
      if ( scripts ) {
        j = 0;
        while ( (elem = tmp[ j++ ]) ) {
          if ( rscriptType.test( elem.type || "" ) ) {
            scripts.push( elem );
          }
        }
      }
    }

    return fragment;
  },

  cleanData: function( elems ) {
    var data, elem, type, key,
      special = jQuery.event.special,
      i = 0;

    for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
      if ( jQuery.acceptData( elem ) ) {
        key = elem[ data_priv.expando ];

        if ( key && (data = data_priv.cache[ key ]) ) {
          if ( data.events ) {
            for ( type in data.events ) {
              if ( special[ type ] ) {
                jQuery.event.remove( elem, type );

              // This is a shortcut to avoid jQuery.event.remove's overhead
              } else {
                jQuery.removeEvent( elem, type, data.handle );
              }
            }
          }
          if ( data_priv.cache[ key ] ) {
            // Discard any remaining `private` data
            delete data_priv.cache[ key ];
          }
        }
      }
      // Discard any remaining `user` data
      delete data_user.cache[ elem[ data_user.expando ] ];
    }
  }
});

jQuery.fn.extend({
  text: function( value ) {
    return access( this, function( value ) {
      return value === undefined ?
        jQuery.text( this ) :
        this.empty().each(function() {
          if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
            this.textContent = value;
          }
        });
    }, null, value, arguments.length );
  },

  append: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.appendChild( elem );
      }
    });
  },

  prepend: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.insertBefore( elem, target.firstChild );
      }
    });
  },

  before: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this );
      }
    });
  },

  after: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this.nextSibling );
      }
    });
  },

  remove: function( selector, keepData /* Internal Use Only */ ) {
    var elem,
      elems = selector ? jQuery.filter( selector, this ) : this,
      i = 0;

    for ( ; (elem = elems[i]) != null; i++ ) {
      if ( !keepData && elem.nodeType === 1 ) {
        jQuery.cleanData( getAll( elem ) );
      }

      if ( elem.parentNode ) {
        if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
          setGlobalEval( getAll( elem, "script" ) );
        }
        elem.parentNode.removeChild( elem );
      }
    }

    return this;
  },

  empty: function() {
    var elem,
      i = 0;

    for ( ; (elem = this[i]) != null; i++ ) {
      if ( elem.nodeType === 1 ) {

        // Prevent memory leaks
        jQuery.cleanData( getAll( elem, false ) );

        // Remove any remaining nodes
        elem.textContent = "";
      }
    }

    return this;
  },

  clone: function( dataAndEvents, deepDataAndEvents ) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    return this.map(function() {
      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    });
  },

  html: function( value ) {
    return access( this, function( value ) {
      var elem = this[ 0 ] || {},
        i = 0,
        l = this.length;

      if ( value === undefined && elem.nodeType === 1 ) {
        return elem.innerHTML;
      }

      // See if we can take a shortcut and just use innerHTML
      if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
        !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

        value = value.replace( rxhtmlTag, "<$1></$2>" );

        try {
          for ( ; i < l; i++ ) {
            elem = this[ i ] || {};

            // Remove element nodes and prevent memory leaks
            if ( elem.nodeType === 1 ) {
              jQuery.cleanData( getAll( elem, false ) );
              elem.innerHTML = value;
            }
          }

          elem = 0;

        // If using innerHTML throws an exception, use the fallback method
        } catch( e ) {}
      }

      if ( elem ) {
        this.empty().append( value );
      }
    }, null, value, arguments.length );
  },

  replaceWith: function() {
    var arg = arguments[ 0 ];

    // Make the changes, replacing each context element with the new content
    this.domManip( arguments, function( elem ) {
      arg = this.parentNode;

      jQuery.cleanData( getAll( this ) );

      if ( arg ) {
        arg.replaceChild( elem, this );
      }
    });

    // Force removal if there was no new content (e.g., from empty arguments)
    return arg && (arg.length || arg.nodeType) ? this : this.remove();
  },

  detach: function( selector ) {
    return this.remove( selector, true );
  },

  domManip: function( args, callback ) {

    // Flatten any nested arrays
    args = concat.apply( [], args );

    var fragment, first, scripts, hasScripts, node, doc,
      i = 0,
      l = this.length,
      set = this,
      iNoClone = l - 1,
      value = args[ 0 ],
      isFunction = jQuery.isFunction( value );

    // We can't cloneNode fragments that contain checked, in WebKit
    if ( isFunction ||
        ( l > 1 && typeof value === "string" &&
          !support.checkClone && rchecked.test( value ) ) ) {
      return this.each(function( index ) {
        var self = set.eq( index );
        if ( isFunction ) {
          args[ 0 ] = value.call( this, index, self.html() );
        }
        self.domManip( args, callback );
      });
    }

    if ( l ) {
      fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
      first = fragment.firstChild;

      if ( fragment.childNodes.length === 1 ) {
        fragment = first;
      }

      if ( first ) {
        scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
        hasScripts = scripts.length;

        // Use the original fragment for the last item instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).
        for ( ; i < l; i++ ) {
          node = fragment;

          if ( i !== iNoClone ) {
            node = jQuery.clone( node, true, true );

            // Keep references to cloned scripts for later restoration
            if ( hasScripts ) {
              // Support: QtWebKit
              // jQuery.merge because push.apply(_, arraylike) throws
              jQuery.merge( scripts, getAll( node, "script" ) );
            }
          }

          callback.call( this[ i ], node, i );
        }

        if ( hasScripts ) {
          doc = scripts[ scripts.length - 1 ].ownerDocument;

          // Reenable scripts
          jQuery.map( scripts, restoreScript );

          // Evaluate executable scripts on first document insertion
          for ( i = 0; i < hasScripts; i++ ) {
            node = scripts[ i ];
            if ( rscriptType.test( node.type || "" ) &&
              !data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

              if ( node.src ) {
                // Optional AJAX dependency, but won't run scripts if not present
                if ( jQuery._evalUrl ) {
                  jQuery._evalUrl( node.src );
                }
              } else {
                jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
              }
            }
          }
        }
      }
    }

    return this;
  }
});

jQuery.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
}, function( name, original ) {
  jQuery.fn[ name ] = function( selector ) {
    var elems,
      ret = [],
      insert = jQuery( selector ),
      last = insert.length - 1,
      i = 0;

    for ( ; i <= last; i++ ) {
      elems = i === last ? this : this.clone( true );
      jQuery( insert[ i ] )[ original ]( elems );

      // Support: QtWebKit
      // .get() because push.apply(_, arraylike) throws
      push.apply( ret, elems.get() );
    }

    return this.pushStack( ret );
  };
});


var iframe,
  elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
  var style,
    elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

    // getDefaultComputedStyle might be reliably used only on attached element
    display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

      // Use of this method is a temporary fix (more like optmization) until something better comes along,
      // since it was removed from specification and supported only in FF
      style.display : jQuery.css( elem[ 0 ], "display" );

  // We don't have any data stored on the element,
  // so use "detach" method as fast way to get rid of the element
  elem.detach();

  return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
  var doc = document,
    display = elemdisplay[ nodeName ];

  if ( !display ) {
    display = actualDisplay( nodeName, doc );

    // If the simple way fails, read from inside an iframe
    if ( display === "none" || !display ) {

      // Use the already-created iframe if possible
      iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

      // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
      doc = iframe[ 0 ].contentDocument;

      // Support: IE
      doc.write();
      doc.close();

      display = actualDisplay( nodeName, doc );
      iframe.detach();
    }

    // Store the correct default display
    elemdisplay[ nodeName ] = display;
  }

  return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
    return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
  };



function curCSS( elem, name, computed ) {
  var width, minWidth, maxWidth, ret,
    style = elem.style;

  computed = computed || getStyles( elem );

  // Support: IE9
  // getPropertyValue is only needed for .css('filter') in IE9, see #12537
  if ( computed ) {
    ret = computed.getPropertyValue( name ) || computed[ name ];
  }

  if ( computed ) {

    if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
      ret = jQuery.style( elem, name );
    }

    // Support: iOS < 6
    // A tribute to the "awesome hack by Dean Edwards"
    // iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
    // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
    if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

      // Remember the original values
      width = style.width;
      minWidth = style.minWidth;
      maxWidth = style.maxWidth;

      // Put in the new values to get a computed value out
      style.minWidth = style.maxWidth = style.width = ret;
      ret = computed.width;

      // Revert the changed values
      style.width = width;
      style.minWidth = minWidth;
      style.maxWidth = maxWidth;
    }
  }

  return ret !== undefined ?
    // Support: IE
    // IE returns zIndex value as an integer.
    ret + "" :
    ret;
}


function addGetHookIf( conditionFn, hookFn ) {
  // Define the hook, we'll check on the first run if it's really needed.
  return {
    get: function() {
      if ( conditionFn() ) {
        // Hook not needed (or it's not possible to use it due to missing dependency),
        // remove it.
        // Since there are no other hooks for marginRight, remove the whole object.
        delete this.get;
        return;
      }

      // Hook needed; redefine it so that the support test is not executed again.

      return (this.get = hookFn).apply( this, arguments );
    }
  };
}


(function() {
  var pixelPositionVal, boxSizingReliableVal,
    docElem = document.documentElement,
    container = document.createElement( "div" ),
    div = document.createElement( "div" );

  if ( !div.style ) {
    return;
  }

  div.style.backgroundClip = "content-box";
  div.cloneNode( true ).style.backgroundClip = "";
  support.clearCloneStyle = div.style.backgroundClip === "content-box";

  container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
    "position:absolute";
  container.appendChild( div );

  // Executing both pixelPosition & boxSizingReliable tests require only one layout
  // so they're executed at the same time to save the second computation.
  function computePixelPositionAndBoxSizingReliable() {
    div.style.cssText =
      // Support: Firefox<29, Android 2.3
      // Vendor-prefix box-sizing
      "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
      "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
      "border:1px;padding:1px;width:4px;position:absolute";
    div.innerHTML = "";
    docElem.appendChild( container );

    var divStyle = window.getComputedStyle( div, null );
    pixelPositionVal = divStyle.top !== "1%";
    boxSizingReliableVal = divStyle.width === "4px";

    docElem.removeChild( container );
  }

  // Support: node.js jsdom
  // Don't assume that getComputedStyle is a property of the global object
  if ( window.getComputedStyle ) {
    jQuery.extend( support, {
      pixelPosition: function() {
        // This test is executed only once but we still do memoizing
        // since we can use the boxSizingReliable pre-computing.
        // No need to check if the test was already performed, though.
        computePixelPositionAndBoxSizingReliable();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if ( boxSizingReliableVal == null ) {
          computePixelPositionAndBoxSizingReliable();
        }
        return boxSizingReliableVal;
      },
      reliableMarginRight: function() {
        // Support: Android 2.3
        // Check if div with explicit width and no margin-right incorrectly
        // gets computed margin-right based on width of container. (#3333)
        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
        // This support function is only executed once so no memoizing is needed.
        var ret,
          marginDiv = div.appendChild( document.createElement( "div" ) );

        // Reset CSS: box-sizing; display; margin; border; padding
        marginDiv.style.cssText = div.style.cssText =
          // Support: Firefox<29, Android 2.3
          // Vendor-prefix box-sizing
          "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
          "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        docElem.appendChild( container );

        ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

        docElem.removeChild( container );

        return ret;
      }
    });
  }
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
  var ret, name,
    old = {};

  // Remember the old values, and insert the new ones
  for ( name in options ) {
    old[ name ] = elem.style[ name ];
    elem.style[ name ] = options[ name ];
  }

  ret = callback.apply( elem, args || [] );

  // Revert the old values
  for ( name in options ) {
    elem.style[ name ] = old[ name ];
  }

  return ret;
};


var
  // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
  // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
  rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
  rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  },

  cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

  // shortcut for names that are not vendor prefixed
  if ( name in style ) {
    return name;
  }

  // check for vendor prefixed names
  var capName = name[0].toUpperCase() + name.slice(1),
    origName = name,
    i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in style ) {
      return name;
    }
  }

  return origName;
}

function setPositiveNumber( elem, value, subtract ) {
  var matches = rnumsplit.exec( value );
  return matches ?
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
    value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
  var i = extra === ( isBorderBox ? "border" : "content" ) ?
    // If we already have the right measurement, avoid augmentation
    4 :
    // Otherwise initialize for horizontal or vertical properties
    name === "width" ? 1 : 0,

    val = 0;

  for ( ; i < 4; i += 2 ) {
    // both box models exclude margin, so add it if we want it
    if ( extra === "margin" ) {
      val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
    }

    if ( isBorderBox ) {
      // border-box includes padding, so remove it if we want content
      if ( extra === "content" ) {
        val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
      }

      // at this point, extra isn't border nor margin, so remove border
      if ( extra !== "margin" ) {
        val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    } else {
      // at this point, extra isn't content, so add padding
      val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

      // at this point, extra isn't content nor padding, so add border
      if ( extra !== "padding" ) {
        val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    }
  }

  return val;
}

function getWidthOrHeight( elem, name, extra ) {

  // Start with offset property, which is equivalent to the border-box value
  var valueIsBorderBox = true,
    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
    styles = getStyles( elem ),
    isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

  // some non-html elements return undefined for offsetWidth, so check for null/undefined
  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
  if ( val <= 0 || val == null ) {
    // Fall back to computed then uncomputed css if necessary
    val = curCSS( elem, name, styles );
    if ( val < 0 || val == null ) {
      val = elem.style[ name ];
    }

    // Computed unit is not pixels. Stop here and return.
    if ( rnumnonpx.test(val) ) {
      return val;
    }

    // we need the check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style
    valueIsBorderBox = isBorderBox &&
      ( support.boxSizingReliable() || val === elem.style[ name ] );

    // Normalize "", auto, and prepare for extra
    val = parseFloat( val ) || 0;
  }

  // use the active box-sizing model to add/subtract irrelevant styles
  return ( val +
    augmentWidthOrHeight(
      elem,
      name,
      extra || ( isBorderBox ? "border" : "content" ),
      valueIsBorderBox,
      styles
    )
  ) + "px";
}

function showHide( elements, show ) {
  var display, elem, hidden,
    values = [],
    index = 0,
    length = elements.length;

  for ( ; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }

    values[ index ] = data_priv.get( elem, "olddisplay" );
    display = elem.style.display;
    if ( show ) {
      // Reset the inline display of this element to learn if it is
      // being hidden by cascaded rules or not
      if ( !values[ index ] && display === "none" ) {
        elem.style.display = "";
      }

      // Set elements which have been overridden with display: none
      // in a stylesheet to whatever the default browser style is
      // for such an element
      if ( elem.style.display === "" && isHidden( elem ) ) {
        values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
      }
    } else {
      hidden = isHidden( elem );

      if ( display !== "none" || !hidden ) {
        data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
      }
    }
  }

  // Set the display of most of the elements in a second loop
  // to avoid the constant reflow
  for ( index = 0; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }
    if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
      elem.style.display = show ? values[ index ] || "" : "none";
    }
  }

  return elements;
}

jQuery.extend({
  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function( elem, computed ) {
        if ( computed ) {
          // We should always get a number back from opacity
          var ret = curCSS( elem, "opacity" );
          return ret === "" ? "1" : ret;
        }
      }
    }
  },

  // Don't automatically add "px" to these possibly-unitless properties
  cssNumber: {
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
  },

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {
    // normalize float css property
    "float": "cssFloat"
  },

  // Get and set the style property on a DOM Node
  style: function( elem, name, value, extra ) {
    // Don't set styles on text and comment nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
      return;
    }

    // Make sure that we're working with the right name
    var ret, type, hooks,
      origName = jQuery.camelCase( name ),
      style = elem.style;

    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // Check if we're setting a value
    if ( value !== undefined ) {
      type = typeof value;

      // convert relative number strings (+= or -=) to relative numbers. #7345
      if ( type === "string" && (ret = rrelNum.exec( value )) ) {
        value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
        // Fixes bug #9237
        type = "number";
      }

      // Make sure that null and NaN values aren't set. See: #7116
      if ( value == null || value !== value ) {
        return;
      }

      // If a number was passed in, add 'px' to the (except for certain CSS properties)
      if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
        value += "px";
      }

      // Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
      // but it would mean to define eight (for every problematic property) identical functions
      if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
        style[ name ] = "inherit";
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
        style[ name ] = value;
      }

    } else {
      // If a hook was provided get the non-computed value from there
      if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
        return ret;
      }

      // Otherwise just get the value from the style object
      return style[ name ];
    }
  },

  css: function( elem, name, extra, styles ) {
    var val, num, hooks,
      origName = jQuery.camelCase( name );

    // Make sure that we're working with the right name
    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // If a hook was provided get the computed value from there
    if ( hooks && "get" in hooks ) {
      val = hooks.get( elem, true, extra );
    }

    // Otherwise, if a way to get the computed value exists, use that
    if ( val === undefined ) {
      val = curCSS( elem, name, styles );
    }

    //convert "normal" to computed value
    if ( val === "normal" && name in cssNormalTransform ) {
      val = cssNormalTransform[ name ];
    }

    // Return, converting to number if forced or a qualifier was provided and val looks numeric
    if ( extra === "" || extra ) {
      num = parseFloat( val );
      return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
    }
    return val;
  }
});

jQuery.each([ "height", "width" ], function( i, name ) {
  jQuery.cssHooks[ name ] = {
    get: function( elem, computed, extra ) {
      if ( computed ) {
        // certain elements can have dimension info if we invisibly show them
        // however, it must have a current display style that would benefit from this
        return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
          jQuery.swap( elem, cssShow, function() {
            return getWidthOrHeight( elem, name, extra );
          }) :
          getWidthOrHeight( elem, name, extra );
      }
    },

    set: function( elem, value, extra ) {
      var styles = extra && getStyles( elem );
      return setPositiveNumber( elem, value, extra ?
        augmentWidthOrHeight(
          elem,
          name,
          extra,
          jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
          styles
        ) : 0
      );
    }
  };
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
  function( elem, computed ) {
    if ( computed ) {
      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
      // Work around by temporarily setting element display to inline-block
      return jQuery.swap( elem, { "display": "inline-block" },
        curCSS, [ elem, "marginRight" ] );
    }
  }
);

// These hooks are used by animate to expand properties
jQuery.each({
  margin: "",
  padding: "",
  border: "Width"
}, function( prefix, suffix ) {
  jQuery.cssHooks[ prefix + suffix ] = {
    expand: function( value ) {
      var i = 0,
        expanded = {},

        // assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [ value ];

      for ( ; i < 4; i++ ) {
        expanded[ prefix + cssExpand[ i ] + suffix ] =
          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
      }

      return expanded;
    }
  };

  if ( !rmargin.test( prefix ) ) {
    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
  }
});

jQuery.fn.extend({
  css: function( name, value ) {
    return access( this, function( elem, name, value ) {
      var styles, len,
        map = {},
        i = 0;

      if ( jQuery.isArray( name ) ) {
        styles = getStyles( elem );
        len = name.length;

        for ( ; i < len; i++ ) {
          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
        }

        return map;
      }

      return value !== undefined ?
        jQuery.style( elem, name, value ) :
        jQuery.css( elem, name );
    }, name, value, arguments.length > 1 );
  },
  show: function() {
    return showHide( this, true );
  },
  hide: function() {
    return showHide( this );
  },
  toggle: function( state ) {
    if ( typeof state === "boolean" ) {
      return state ? this.show() : this.hide();
    }

    return this.each(function() {
      if ( isHidden( this ) ) {
        jQuery( this ).show();
      } else {
        jQuery( this ).hide();
      }
    });
  }
});


function Tween( elem, options, prop, end, easing ) {
  return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
  constructor: Tween,
  init: function( elem, options, prop, end, easing, unit ) {
    this.elem = elem;
    this.prop = prop;
    this.easing = easing || "swing";
    this.options = options;
    this.start = this.now = this.cur();
    this.end = end;
    this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
  },
  cur: function() {
    var hooks = Tween.propHooks[ this.prop ];

    return hooks && hooks.get ?
      hooks.get( this ) :
      Tween.propHooks._default.get( this );
  },
  run: function( percent ) {
    var eased,
      hooks = Tween.propHooks[ this.prop ];

    if ( this.options.duration ) {
      this.pos = eased = jQuery.easing[ this.easing ](
        percent, this.options.duration * percent, 0, 1, this.options.duration
      );
    } else {
      this.pos = eased = percent;
    }
    this.now = ( this.end - this.start ) * eased + this.start;

    if ( this.options.step ) {
      this.options.step.call( this.elem, this.now, this );
    }

    if ( hooks && hooks.set ) {
      hooks.set( this );
    } else {
      Tween.propHooks._default.set( this );
    }
    return this;
  }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
  _default: {
    get: function( tween ) {
      var result;

      if ( tween.elem[ tween.prop ] != null &&
        (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
        return tween.elem[ tween.prop ];
      }

      // passing an empty string as a 3rd parameter to .css will automatically
      // attempt a parseFloat and fallback to a string if the parse fails
      // so, simple values such as "10px" are parsed to Float.
      // complex values such as "rotate(1rad)" are returned as is.
      result = jQuery.css( tween.elem, tween.prop, "" );
      // Empty strings, null, undefined and "auto" are converted to 0.
      return !result || result === "auto" ? 0 : result;
    },
    set: function( tween ) {
      // use step hook for back compat - use cssHook if its there - use .style if its
      // available and use plain properties where available
      if ( jQuery.fx.step[ tween.prop ] ) {
        jQuery.fx.step[ tween.prop ]( tween );
      } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
      } else {
        tween.elem[ tween.prop ] = tween.now;
      }
    }
  }
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
  set: function( tween ) {
    if ( tween.elem.nodeType && tween.elem.parentNode ) {
      tween.elem[ tween.prop ] = tween.now;
    }
  }
};

jQuery.easing = {
  linear: function( p ) {
    return p;
  },
  swing: function( p ) {
    return 0.5 - Math.cos( p * Math.PI ) / 2;
  }
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
  fxNow, timerId,
  rfxtypes = /^(?:toggle|show|hide)$/,
  rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
  rrun = /queueHooks$/,
  animationPrefilters = [ defaultPrefilter ],
  tweeners = {
    "*": [ function( prop, value ) {
      var tween = this.createTween( prop, value ),
        target = tween.cur(),
        parts = rfxnum.exec( value ),
        unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

        // Starting value computation is required for potential unit mismatches
        start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
          rfxnum.exec( jQuery.css( tween.elem, prop ) ),
        scale = 1,
        maxIterations = 20;

      if ( start && start[ 3 ] !== unit ) {
        // Trust units reported by jQuery.css
        unit = unit || start[ 3 ];

        // Make sure we update the tween properties later on
        parts = parts || [];

        // Iteratively approximate from a nonzero starting point
        start = +target || 1;

        do {
          // If previous iteration zeroed out, double until we get *something*
          // Use a string for doubling factor so we don't accidentally see scale as unchanged below
          scale = scale || ".5";

          // Adjust and apply
          start = start / scale;
          jQuery.style( tween.elem, prop, start + unit );

        // Update scale, tolerating zero or NaN from tween.cur()
        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
      }

      // Update tween properties
      if ( parts ) {
        start = tween.start = +start || +target || 0;
        tween.unit = unit;
        // If a +=/-= token was provided, we're doing a relative animation
        tween.end = parts[ 1 ] ?
          start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
          +parts[ 2 ];
      }

      return tween;
    } ]
  };

// Animations created synchronously will run synchronously
function createFxNow() {
  setTimeout(function() {
    fxNow = undefined;
  });
  return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
  var which,
    i = 0,
    attrs = { height: type };

  // if we include width, step value is 1 to do all cssExpand values,
  // if we don't include width, step value is 2 to skip over Left and Right
  includeWidth = includeWidth ? 1 : 0;
  for ( ; i < 4 ; i += 2 - includeWidth ) {
    which = cssExpand[ i ];
    attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
  }

  if ( includeWidth ) {
    attrs.opacity = attrs.width = type;
  }

  return attrs;
}

function createTween( value, prop, animation ) {
  var tween,
    collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
    index = 0,
    length = collection.length;
  for ( ; index < length; index++ ) {
    if ( (tween = collection[ index ].call( animation, prop, value )) ) {

      // we're done with this property
      return tween;
    }
  }
}

function defaultPrefilter( elem, props, opts ) {
  /* jshint validthis: true */
  var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
    anim = this,
    orig = {},
    style = elem.style,
    hidden = elem.nodeType && isHidden( elem ),
    dataShow = data_priv.get( elem, "fxshow" );

  // handle queue: false promises
  if ( !opts.queue ) {
    hooks = jQuery._queueHooks( elem, "fx" );
    if ( hooks.unqueued == null ) {
      hooks.unqueued = 0;
      oldfire = hooks.empty.fire;
      hooks.empty.fire = function() {
        if ( !hooks.unqueued ) {
          oldfire();
        }
      };
    }
    hooks.unqueued++;

    anim.always(function() {
      // doing this makes sure that the complete handler will be called
      // before this completes
      anim.always(function() {
        hooks.unqueued--;
        if ( !jQuery.queue( elem, "fx" ).length ) {
          hooks.empty.fire();
        }
      });
    });
  }

  // height/width overflow pass
  if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
    // Make sure that nothing sneaks out
    // Record all 3 overflow attributes because IE9-10 do not
    // change the overflow attribute when overflowX and
    // overflowY are set to the same value
    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

    // Set display property to inline-block for height/width
    // animations on inline elements that are having width/height animated
    display = jQuery.css( elem, "display" );

    // Test default display if display is currently "none"
    checkDisplay = display === "none" ?
      data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

    if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
      style.display = "inline-block";
    }
  }

  if ( opts.overflow ) {
    style.overflow = "hidden";
    anim.always(function() {
      style.overflow = opts.overflow[ 0 ];
      style.overflowX = opts.overflow[ 1 ];
      style.overflowY = opts.overflow[ 2 ];
    });
  }

  // show/hide pass
  for ( prop in props ) {
    value = props[ prop ];
    if ( rfxtypes.exec( value ) ) {
      delete props[ prop ];
      toggle = toggle || value === "toggle";
      if ( value === ( hidden ? "hide" : "show" ) ) {

        // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
        if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
          hidden = true;
        } else {
          continue;
        }
      }
      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

    // Any non-fx value stops us from restoring the original display value
    } else {
      display = undefined;
    }
  }

  if ( !jQuery.isEmptyObject( orig ) ) {
    if ( dataShow ) {
      if ( "hidden" in dataShow ) {
        hidden = dataShow.hidden;
      }
    } else {
      dataShow = data_priv.access( elem, "fxshow", {} );
    }

    // store state if its toggle - enables .stop().toggle() to "reverse"
    if ( toggle ) {
      dataShow.hidden = !hidden;
    }
    if ( hidden ) {
      jQuery( elem ).show();
    } else {
      anim.done(function() {
        jQuery( elem ).hide();
      });
    }
    anim.done(function() {
      var prop;

      data_priv.remove( elem, "fxshow" );
      for ( prop in orig ) {
        jQuery.style( elem, prop, orig[ prop ] );
      }
    });
    for ( prop in orig ) {
      tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

      if ( !( prop in dataShow ) ) {
        dataShow[ prop ] = tween.start;
        if ( hidden ) {
          tween.end = tween.start;
          tween.start = prop === "width" || prop === "height" ? 1 : 0;
        }
      }
    }

  // If this is a noop like .hide().hide(), restore an overwritten display value
  } else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
    style.display = display;
  }
}

function propFilter( props, specialEasing ) {
  var index, name, easing, value, hooks;

  // camelCase, specialEasing and expand cssHook pass
  for ( index in props ) {
    name = jQuery.camelCase( index );
    easing = specialEasing[ name ];
    value = props[ index ];
    if ( jQuery.isArray( value ) ) {
      easing = value[ 1 ];
      value = props[ index ] = value[ 0 ];
    }

    if ( index !== name ) {
      props[ name ] = value;
      delete props[ index ];
    }

    hooks = jQuery.cssHooks[ name ];
    if ( hooks && "expand" in hooks ) {
      value = hooks.expand( value );
      delete props[ name ];

      // not quite $.extend, this wont overwrite keys already present.
      // also - reusing 'index' from above because we have the correct "name"
      for ( index in value ) {
        if ( !( index in props ) ) {
          props[ index ] = value[ index ];
          specialEasing[ index ] = easing;
        }
      }
    } else {
      specialEasing[ name ] = easing;
    }
  }
}

function Animation( elem, properties, options ) {
  var result,
    stopped,
    index = 0,
    length = animationPrefilters.length,
    deferred = jQuery.Deferred().always( function() {
      // don't match elem in the :animated selector
      delete tick.elem;
    }),
    tick = function() {
      if ( stopped ) {
        return false;
      }
      var currentTime = fxNow || createFxNow(),
        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
        // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
        temp = remaining / animation.duration || 0,
        percent = 1 - temp,
        index = 0,
        length = animation.tweens.length;

      for ( ; index < length ; index++ ) {
        animation.tweens[ index ].run( percent );
      }

      deferred.notifyWith( elem, [ animation, percent, remaining ]);

      if ( percent < 1 && length ) {
        return remaining;
      } else {
        deferred.resolveWith( elem, [ animation ] );
        return false;
      }
    },
    animation = deferred.promise({
      elem: elem,
      props: jQuery.extend( {}, properties ),
      opts: jQuery.extend( true, { specialEasing: {} }, options ),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function( prop, end ) {
        var tween = jQuery.Tween( elem, animation.opts, prop, end,
            animation.opts.specialEasing[ prop ] || animation.opts.easing );
        animation.tweens.push( tween );
        return tween;
      },
      stop: function( gotoEnd ) {
        var index = 0,
          // if we are going to the end, we want to run all the tweens
          // otherwise we skip this part
          length = gotoEnd ? animation.tweens.length : 0;
        if ( stopped ) {
          return this;
        }
        stopped = true;
        for ( ; index < length ; index++ ) {
          animation.tweens[ index ].run( 1 );
        }

        // resolve when we played the last frame
        // otherwise, reject
        if ( gotoEnd ) {
          deferred.resolveWith( elem, [ animation, gotoEnd ] );
        } else {
          deferred.rejectWith( elem, [ animation, gotoEnd ] );
        }
        return this;
      }
    }),
    props = animation.props;

  propFilter( props, animation.opts.specialEasing );

  for ( ; index < length ; index++ ) {
    result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
    if ( result ) {
      return result;
    }
  }

  jQuery.map( props, createTween, animation );

  if ( jQuery.isFunction( animation.opts.start ) ) {
    animation.opts.start.call( elem, animation );
  }

  jQuery.fx.timer(
    jQuery.extend( tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    })
  );

  // attach callbacks from options
  return animation.progress( animation.opts.progress )
    .done( animation.opts.done, animation.opts.complete )
    .fail( animation.opts.fail )
    .always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

  tweener: function( props, callback ) {
    if ( jQuery.isFunction( props ) ) {
      callback = props;
      props = [ "*" ];
    } else {
      props = props.split(" ");
    }

    var prop,
      index = 0,
      length = props.length;

    for ( ; index < length ; index++ ) {
      prop = props[ index ];
      tweeners[ prop ] = tweeners[ prop ] || [];
      tweeners[ prop ].unshift( callback );
    }
  },

  prefilter: function( callback, prepend ) {
    if ( prepend ) {
      animationPrefilters.unshift( callback );
    } else {
      animationPrefilters.push( callback );
    }
  }
});

jQuery.speed = function( speed, easing, fn ) {
  var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
    complete: fn || !fn && easing ||
      jQuery.isFunction( speed ) && speed,
    duration: speed,
    easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
  };

  opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
    opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

  // normalize opt.queue - true/undefined/null -> "fx"
  if ( opt.queue == null || opt.queue === true ) {
    opt.queue = "fx";
  }

  // Queueing
  opt.old = opt.complete;

  opt.complete = function() {
    if ( jQuery.isFunction( opt.old ) ) {
      opt.old.call( this );
    }

    if ( opt.queue ) {
      jQuery.dequeue( this, opt.queue );
    }
  };

  return opt;
};

jQuery.fn.extend({
  fadeTo: function( speed, to, easing, callback ) {

    // show any hidden elements after setting opacity to 0
    return this.filter( isHidden ).css( "opacity", 0 ).show()

      // animate to the value specified
      .end().animate({ opacity: to }, speed, easing, callback );
  },
  animate: function( prop, speed, easing, callback ) {
    var empty = jQuery.isEmptyObject( prop ),
      optall = jQuery.speed( speed, easing, callback ),
      doAnimation = function() {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation( this, jQuery.extend( {}, prop ), optall );

        // Empty animations, or finishing resolves immediately
        if ( empty || data_priv.get( this, "finish" ) ) {
          anim.stop( true );
        }
      };
      doAnimation.finish = doAnimation;

    return empty || optall.queue === false ?
      this.each( doAnimation ) :
      this.queue( optall.queue, doAnimation );
  },
  stop: function( type, clearQueue, gotoEnd ) {
    var stopQueue = function( hooks ) {
      var stop = hooks.stop;
      delete hooks.stop;
      stop( gotoEnd );
    };

    if ( typeof type !== "string" ) {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined;
    }
    if ( clearQueue && type !== false ) {
      this.queue( type || "fx", [] );
    }

    return this.each(function() {
      var dequeue = true,
        index = type != null && type + "queueHooks",
        timers = jQuery.timers,
        data = data_priv.get( this );

      if ( index ) {
        if ( data[ index ] && data[ index ].stop ) {
          stopQueue( data[ index ] );
        }
      } else {
        for ( index in data ) {
          if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
            stopQueue( data[ index ] );
          }
        }
      }

      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
          timers[ index ].anim.stop( gotoEnd );
          dequeue = false;
          timers.splice( index, 1 );
        }
      }

      // start the next in the queue if the last step wasn't forced
      // timers currently will call their complete callbacks, which will dequeue
      // but only if they were gotoEnd
      if ( dequeue || !gotoEnd ) {
        jQuery.dequeue( this, type );
      }
    });
  },
  finish: function( type ) {
    if ( type !== false ) {
      type = type || "fx";
    }
    return this.each(function() {
      var index,
        data = data_priv.get( this ),
        queue = data[ type + "queue" ],
        hooks = data[ type + "queueHooks" ],
        timers = jQuery.timers,
        length = queue ? queue.length : 0;

      // enable finishing flag on private data
      data.finish = true;

      // empty the queue first
      jQuery.queue( this, type, [] );

      if ( hooks && hooks.stop ) {
        hooks.stop.call( this, true );
      }

      // look for any active animations, and finish them
      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
          timers[ index ].anim.stop( true );
          timers.splice( index, 1 );
        }
      }

      // look for any animations in the old queue and finish them
      for ( index = 0; index < length; index++ ) {
        if ( queue[ index ] && queue[ index ].finish ) {
          queue[ index ].finish.call( this );
        }
      }

      // turn off finishing flag
      delete data.finish;
    });
  }
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
  var cssFn = jQuery.fn[ name ];
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return speed == null || typeof speed === "boolean" ?
      cssFn.apply( this, arguments ) :
      this.animate( genFx( name, true ), speed, easing, callback );
  };
});

// Generate shortcuts for custom animations
jQuery.each({
  slideDown: genFx("show"),
  slideUp: genFx("hide"),
  slideToggle: genFx("toggle"),
  fadeIn: { opacity: "show" },
  fadeOut: { opacity: "hide" },
  fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return this.animate( props, speed, easing, callback );
  };
});

jQuery.timers = [];
jQuery.fx.tick = function() {
  var timer,
    i = 0,
    timers = jQuery.timers;

  fxNow = jQuery.now();

  for ( ; i < timers.length; i++ ) {
    timer = timers[ i ];
    // Checks the timer has not already been removed
    if ( !timer() && timers[ i ] === timer ) {
      timers.splice( i--, 1 );
    }
  }

  if ( !timers.length ) {
    jQuery.fx.stop();
  }
  fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
  jQuery.timers.push( timer );
  if ( timer() ) {
    jQuery.fx.start();
  } else {
    jQuery.timers.pop();
  }
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
  if ( !timerId ) {
    timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
  }
};

jQuery.fx.stop = function() {
  clearInterval( timerId );
  timerId = null;
};

jQuery.fx.speeds = {
  slow: 600,
  fast: 200,
  // Default speed
  _default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
  time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
  type = type || "fx";

  return this.queue( type, function( next, hooks ) {
    var timeout = setTimeout( next, time );
    hooks.stop = function() {
      clearTimeout( timeout );
    };
  });
};


(function() {
  var input = document.createElement( "input" ),
    select = document.createElement( "select" ),
    opt = select.appendChild( document.createElement( "option" ) );

  input.type = "checkbox";

  // Support: iOS 5.1, Android 4.x, Android 2.3
  // Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
  support.checkOn = input.value !== "";

  // Must access the parent to make an option select properly
  // Support: IE9, IE10
  support.optSelected = opt.selected;

  // Make sure that the options inside disabled selects aren't marked as disabled
  // (WebKit marks them as disabled)
  select.disabled = true;
  support.optDisabled = !opt.disabled;

  // Check if an input maintains its value after becoming a radio
  // Support: IE9, IE10
  input = document.createElement( "input" );
  input.value = "t";
  input.type = "radio";
  support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
  attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
  attr: function( name, value ) {
    return access( this, jQuery.attr, name, value, arguments.length > 1 );
  },

  removeAttr: function( name ) {
    return this.each(function() {
      jQuery.removeAttr( this, name );
    });
  }
});

jQuery.extend({
  attr: function( elem, name, value ) {
    var hooks, ret,
      nType = elem.nodeType;

    // don't get/set attributes on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    // Fallback to prop when attributes are not supported
    if ( typeof elem.getAttribute === strundefined ) {
      return jQuery.prop( elem, name, value );
    }

    // All attributes are lowercase
    // Grab necessary hook if one is defined
    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
      name = name.toLowerCase();
      hooks = jQuery.attrHooks[ name ] ||
        ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
    }

    if ( value !== undefined ) {

      if ( value === null ) {
        jQuery.removeAttr( elem, name );

      } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
        return ret;

      } else {
        elem.setAttribute( name, value + "" );
        return value;
      }

    } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
      return ret;

    } else {
      ret = jQuery.find.attr( elem, name );

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ?
        undefined :
        ret;
    }
  },

  removeAttr: function( elem, value ) {
    var name, propName,
      i = 0,
      attrNames = value && value.match( rnotwhite );

    if ( attrNames && elem.nodeType === 1 ) {
      while ( (name = attrNames[i++]) ) {
        propName = jQuery.propFix[ name ] || name;

        // Boolean attributes get special treatment (#10870)
        if ( jQuery.expr.match.bool.test( name ) ) {
          // Set corresponding property to false
          elem[ propName ] = false;
        }

        elem.removeAttribute( name );
      }
    }
  },

  attrHooks: {
    type: {
      set: function( elem, value ) {
        if ( !support.radioValue && value === "radio" &&
          jQuery.nodeName( elem, "input" ) ) {
          // Setting the type on a radio button after the value resets the value in IE6-9
          // Reset value to default in case type is set after value during creation
          var val = elem.value;
          elem.setAttribute( "type", value );
          if ( val ) {
            elem.value = val;
          }
          return value;
        }
      }
    }
  }
});

// Hooks for boolean attributes
boolHook = {
  set: function( elem, value, name ) {
    if ( value === false ) {
      // Remove boolean attributes when set to false
      jQuery.removeAttr( elem, name );
    } else {
      elem.setAttribute( name, name );
    }
    return name;
  }
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
  var getter = attrHandle[ name ] || jQuery.find.attr;

  attrHandle[ name ] = function( elem, name, isXML ) {
    var ret, handle;
    if ( !isXML ) {
      // Avoid an infinite loop by temporarily removing this function from the getter
      handle = attrHandle[ name ];
      attrHandle[ name ] = ret;
      ret = getter( elem, name, isXML ) != null ?
        name.toLowerCase() :
        null;
      attrHandle[ name ] = handle;
    }
    return ret;
  };
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
  prop: function( name, value ) {
    return access( this, jQuery.prop, name, value, arguments.length > 1 );
  },

  removeProp: function( name ) {
    return this.each(function() {
      delete this[ jQuery.propFix[ name ] || name ];
    });
  }
});

jQuery.extend({
  propFix: {
    "for": "htmlFor",
    "class": "className"
  },

  prop: function( elem, name, value ) {
    var ret, hooks, notxml,
      nType = elem.nodeType;

    // don't get/set properties on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

    if ( notxml ) {
      // Fix name and attach hooks
      name = jQuery.propFix[ name ] || name;
      hooks = jQuery.propHooks[ name ];
    }

    if ( value !== undefined ) {
      return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
        ret :
        ( elem[ name ] = value );

    } else {
      return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
        ret :
        elem[ name ];
    }
  },

  propHooks: {
    tabIndex: {
      get: function( elem ) {
        return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
          elem.tabIndex :
          -1;
      }
    }
  }
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
  jQuery.propHooks.selected = {
    get: function( elem ) {
      var parent = elem.parentNode;
      if ( parent && parent.parentNode ) {
        parent.parentNode.selectedIndex;
      }
      return null;
    }
  };
}

jQuery.each([
  "tabIndex",
  "readOnly",
  "maxLength",
  "cellSpacing",
  "cellPadding",
  "rowSpan",
  "colSpan",
  "useMap",
  "frameBorder",
  "contentEditable"
], function() {
  jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
  addClass: function( value ) {
    var classes, elem, cur, clazz, j, finalValue,
      proceed = typeof value === "string" && value,
      i = 0,
      len = this.length;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).addClass( value.call( this, j, this.className ) );
      });
    }

    if ( proceed ) {
      // The disjunction here is for better compressibility (see removeClass)
      classes = ( value || "" ).match( rnotwhite ) || [];

      for ( ; i < len; i++ ) {
        elem = this[ i ];
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ).replace( rclass, " " ) :
          " "
        );

        if ( cur ) {
          j = 0;
          while ( (clazz = classes[j++]) ) {
            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
              cur += clazz + " ";
            }
          }

          // only assign if different to avoid unneeded rendering.
          finalValue = jQuery.trim( cur );
          if ( elem.className !== finalValue ) {
            elem.className = finalValue;
          }
        }
      }
    }

    return this;
  },

  removeClass: function( value ) {
    var classes, elem, cur, clazz, j, finalValue,
      proceed = arguments.length === 0 || typeof value === "string" && value,
      i = 0,
      len = this.length;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).removeClass( value.call( this, j, this.className ) );
      });
    }
    if ( proceed ) {
      classes = ( value || "" ).match( rnotwhite ) || [];

      for ( ; i < len; i++ ) {
        elem = this[ i ];
        // This expression is here for better compressibility (see addClass)
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ).replace( rclass, " " ) :
          ""
        );

        if ( cur ) {
          j = 0;
          while ( (clazz = classes[j++]) ) {
            // Remove *all* instances
            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
              cur = cur.replace( " " + clazz + " ", " " );
            }
          }

          // only assign if different to avoid unneeded rendering.
          finalValue = value ? jQuery.trim( cur ) : "";
          if ( elem.className !== finalValue ) {
            elem.className = finalValue;
          }
        }
      }
    }

    return this;
  },

  toggleClass: function( value, stateVal ) {
    var type = typeof value;

    if ( typeof stateVal === "boolean" && type === "string" ) {
      return stateVal ? this.addClass( value ) : this.removeClass( value );
    }

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( i ) {
        jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
      });
    }

    return this.each(function() {
      if ( type === "string" ) {
        // toggle individual class names
        var className,
          i = 0,
          self = jQuery( this ),
          classNames = value.match( rnotwhite ) || [];

        while ( (className = classNames[ i++ ]) ) {
          // check each className given, space separated list
          if ( self.hasClass( className ) ) {
            self.removeClass( className );
          } else {
            self.addClass( className );
          }
        }

      // Toggle whole class name
      } else if ( type === strundefined || type === "boolean" ) {
        if ( this.className ) {
          // store className if set
          data_priv.set( this, "__className__", this.className );
        }

        // If the element has a class name or if we're passed "false",
        // then remove the whole classname (if there was one, the above saved it).
        // Otherwise bring back whatever was previously saved (if anything),
        // falling back to the empty string if nothing was stored.
        this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
      }
    });
  },

  hasClass: function( selector ) {
    var className = " " + selector + " ",
      i = 0,
      l = this.length;
    for ( ; i < l; i++ ) {
      if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
        return true;
      }
    }

    return false;
  }
});




var rreturn = /\r/g;

jQuery.fn.extend({
  val: function( value ) {
    var hooks, ret, isFunction,
      elem = this[0];

    if ( !arguments.length ) {
      if ( elem ) {
        hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

        if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
          return ret;
        }

        ret = elem.value;

        return typeof ret === "string" ?
          // handle most common string cases
          ret.replace(rreturn, "") :
          // handle cases where value is null/undef or number
          ret == null ? "" : ret;
      }

      return;
    }

    isFunction = jQuery.isFunction( value );

    return this.each(function( i ) {
      var val;

      if ( this.nodeType !== 1 ) {
        return;
      }

      if ( isFunction ) {
        val = value.call( this, i, jQuery( this ).val() );
      } else {
        val = value;
      }

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ) {
        val = "";

      } else if ( typeof val === "number" ) {
        val += "";

      } else if ( jQuery.isArray( val ) ) {
        val = jQuery.map( val, function( value ) {
          return value == null ? "" : value + "";
        });
      }

      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

      // If set returns undefined, fall back to normal setting
      if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
        this.value = val;
      }
    });
  }
});

jQuery.extend({
  valHooks: {
    option: {
      get: function( elem ) {
        var val = jQuery.find.attr( elem, "value" );
        return val != null ?
          val :
          // Support: IE10-11+
          // option.text throws exceptions (#14686, #14858)
          jQuery.trim( jQuery.text( elem ) );
      }
    },
    select: {
      get: function( elem ) {
        var value, option,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === "select-one" || index < 0,
          values = one ? null : [],
          max = one ? index + 1 : options.length,
          i = index < 0 ?
            max :
            one ? index : 0;

        // Loop through all the selected options
        for ( ; i < max; i++ ) {
          option = options[ i ];

          // IE6-9 doesn't update selected after form reset (#2551)
          if ( ( option.selected || i === index ) &&
              // Don't return options that are disabled or in a disabled optgroup
              ( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
              ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

            // Get the specific value for the option
            value = jQuery( option ).val();

            // We don't need an array for one selects
            if ( one ) {
              return value;
            }

            // Multi-Selects return an array
            values.push( value );
          }
        }

        return values;
      },

      set: function( elem, value ) {
        var optionSet, option,
          options = elem.options,
          values = jQuery.makeArray( value ),
          i = options.length;

        while ( i-- ) {
          option = options[ i ];
          if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
            optionSet = true;
          }
        }

        // force browsers to behave consistently when non-matching value is set
        if ( !optionSet ) {
          elem.selectedIndex = -1;
        }
        return values;
      }
    }
  }
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
  jQuery.valHooks[ this ] = {
    set: function( elem, value ) {
      if ( jQuery.isArray( value ) ) {
        return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
      }
    }
  };
  if ( !support.checkOn ) {
    jQuery.valHooks[ this ].get = function( elem ) {
      // Support: Webkit
      // "" is returned instead of "on" if a value isn't specified
      return elem.getAttribute("value") === null ? "on" : elem.value;
    };
  }
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

  // Handle event binding
  jQuery.fn[ name ] = function( data, fn ) {
    return arguments.length > 0 ?
      this.on( name, null, data, fn ) :
      this.trigger( name );
  };
});

jQuery.fn.extend({
  hover: function( fnOver, fnOut ) {
    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
  },

  bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
  },
  unbind: function( types, fn ) {
    return this.off( types, null, fn );
  },

  delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
  },
  undelegate: function( selector, types, fn ) {
    // ( namespace ) or ( selector, types [, fn] )
    return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
  }
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
  return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
  var xml, tmp;
  if ( !data || typeof data !== "string" ) {
    return null;
  }

  // Support: IE9
  try {
    tmp = new DOMParser();
    xml = tmp.parseFromString( data, "text/xml" );
  } catch ( e ) {
    xml = undefined;
  }

  if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
  }
  return xml;
};


var
  // Document location
  ajaxLocParts,
  ajaxLocation,

  rhash = /#.*$/,
  rts = /([?&])_=[^&]*/,
  rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
  // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
  rnoContent = /^(?:GET|HEAD)$/,
  rprotocol = /^\/\//,
  rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},

  // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
  ajaxLocation = location.href;
} catch( e ) {
  // Use the href attribute of an A element
  // since IE will modify it given document.location
  ajaxLocation = document.createElement( "a" );
  ajaxLocation.href = "";
  ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

  // dataTypeExpression is optional and defaults to "*"
  return function( dataTypeExpression, func ) {

    if ( typeof dataTypeExpression !== "string" ) {
      func = dataTypeExpression;
      dataTypeExpression = "*";
    }

    var dataType,
      i = 0,
      dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

    if ( jQuery.isFunction( func ) ) {
      // For each dataType in the dataTypeExpression
      while ( (dataType = dataTypes[i++]) ) {
        // Prepend if requested
        if ( dataType[0] === "+" ) {
          dataType = dataType.slice( 1 ) || "*";
          (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

        // Otherwise append
        } else {
          (structure[ dataType ] = structure[ dataType ] || []).push( func );
        }
      }
    }
  };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

  var inspected = {},
    seekingTransport = ( structure === transports );

  function inspect( dataType ) {
    var selected;
    inspected[ dataType ] = true;
    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
      if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
        options.dataTypes.unshift( dataTypeOrTransport );
        inspect( dataTypeOrTransport );
        return false;
      } else if ( seekingTransport ) {
        return !( selected = dataTypeOrTransport );
      }
    });
    return selected;
  }

  return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
  var key, deep,
    flatOptions = jQuery.ajaxSettings.flatOptions || {};

  for ( key in src ) {
    if ( src[ key ] !== undefined ) {
      ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
    }
  }
  if ( deep ) {
    jQuery.extend( true, target, deep );
  }

  return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

  var ct, type, finalDataType, firstDataType,
    contents = s.contents,
    dataTypes = s.dataTypes;

  // Remove auto dataType and get content-type in the process
  while ( dataTypes[ 0 ] === "*" ) {
    dataTypes.shift();
    if ( ct === undefined ) {
      ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
    }
  }

  // Check if we're dealing with a known content-type
  if ( ct ) {
    for ( type in contents ) {
      if ( contents[ type ] && contents[ type ].test( ct ) ) {
        dataTypes.unshift( type );
        break;
      }
    }
  }

  // Check to see if we have a response for the expected dataType
  if ( dataTypes[ 0 ] in responses ) {
    finalDataType = dataTypes[ 0 ];
  } else {
    // Try convertible dataTypes
    for ( type in responses ) {
      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
        finalDataType = type;
        break;
      }
      if ( !firstDataType ) {
        firstDataType = type;
      }
    }
    // Or just use first one
    finalDataType = finalDataType || firstDataType;
  }

  // If we found a dataType
  // We add the dataType to the list if needed
  // and return the corresponding response
  if ( finalDataType ) {
    if ( finalDataType !== dataTypes[ 0 ] ) {
      dataTypes.unshift( finalDataType );
    }
    return responses[ finalDataType ];
  }
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
  var conv2, current, conv, tmp, prev,
    converters = {},
    // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice();

  // Create converters map with lowercased keys
  if ( dataTypes[ 1 ] ) {
    for ( conv in s.converters ) {
      converters[ conv.toLowerCase() ] = s.converters[ conv ];
    }
  }

  current = dataTypes.shift();

  // Convert to each sequential dataType
  while ( current ) {

    if ( s.responseFields[ current ] ) {
      jqXHR[ s.responseFields[ current ] ] = response;
    }

    // Apply the dataFilter if provided
    if ( !prev && isSuccess && s.dataFilter ) {
      response = s.dataFilter( response, s.dataType );
    }

    prev = current;
    current = dataTypes.shift();

    if ( current ) {

    // There's only work to do if current dataType is non-auto
      if ( current === "*" ) {

        current = prev;

      // Convert response if prev dataType is non-auto and differs from current
      } else if ( prev !== "*" && prev !== current ) {

        // Seek a direct converter
        conv = converters[ prev + " " + current ] || converters[ "* " + current ];

        // If none found, seek a pair
        if ( !conv ) {
          for ( conv2 in converters ) {

            // If conv2 outputs current
            tmp = conv2.split( " " );
            if ( tmp[ 1 ] === current ) {

              // If prev can be converted to accepted input
              conv = converters[ prev + " " + tmp[ 0 ] ] ||
                converters[ "* " + tmp[ 0 ] ];
              if ( conv ) {
                // Condense equivalence converters
                if ( conv === true ) {
                  conv = converters[ conv2 ];

                // Otherwise, insert the intermediate dataType
                } else if ( converters[ conv2 ] !== true ) {
                  current = tmp[ 0 ];
                  dataTypes.unshift( tmp[ 1 ] );
                }
                break;
              }
            }
          }
        }

        // Apply converter (if not an equivalence)
        if ( conv !== true ) {

          // Unless errors are allowed to bubble, catch and return them
          if ( conv && s[ "throws" ] ) {
            response = conv( response );
          } else {
            try {
              response = conv( response );
            } catch ( e ) {
              return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
            }
          }
        }
      }
    }
  }

  return { state: "success", data: response };
}

jQuery.extend({

  // Counter for holding the number of active queries
  active: 0,

  // Last-Modified header cache for next request
  lastModified: {},
  etag: {},

  ajaxSettings: {
    url: ajaxLocation,
    type: "GET",
    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    /*
    timeout: 0,
    data: null,
    dataType: null,
    username: null,
    password: null,
    cache: null,
    throws: false,
    traditional: false,
    headers: {},
    */

    accepts: {
      "*": allTypes,
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript"
    },

    contents: {
      xml: /xml/,
      html: /html/,
      json: /json/
    },

    responseFields: {
      xml: "responseXML",
      text: "responseText",
      json: "responseJSON"
    },

    // Data converters
    // Keys separate source (or catchall "*") and destination types with a single space
    converters: {

      // Convert anything to text
      "* text": String,

      // Text to html (true = no transformation)
      "text html": true,

      // Evaluate text as a json expression
      "text json": jQuery.parseJSON,

      // Parse text as xml
      "text xml": jQuery.parseXML
    },

    // For options that shouldn't be deep extended:
    // you can add your own custom options here if
    // and when you create one that shouldn't be
    // deep extended (see ajaxExtend)
    flatOptions: {
      url: true,
      context: true
    }
  },

  // Creates a full fledged settings object into target
  // with both ajaxSettings and settings fields.
  // If target is omitted, writes into ajaxSettings.
  ajaxSetup: function( target, settings ) {
    return settings ?

      // Building a settings object
      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

      // Extending ajaxSettings
      ajaxExtend( jQuery.ajaxSettings, target );
  },

  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  ajaxTransport: addToPrefiltersOrTransports( transports ),

  // Main method
  ajax: function( url, options ) {

    // If url is an object, simulate pre-1.5 signature
    if ( typeof url === "object" ) {
      options = url;
      url = undefined;
    }

    // Force options to be an object
    options = options || {};

    var transport,
      // URL without anti-cache param
      cacheURL,
      // Response headers
      responseHeadersString,
      responseHeaders,
      // timeout handle
      timeoutTimer,
      // Cross-domain detection vars
      parts,
      // To know if global events are to be dispatched
      fireGlobals,
      // Loop variable
      i,
      // Create the final options object
      s = jQuery.ajaxSetup( {}, options ),
      // Callbacks context
      callbackContext = s.context || s,
      // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
        jQuery( callbackContext ) :
        jQuery.event,
      // Deferreds
      deferred = jQuery.Deferred(),
      completeDeferred = jQuery.Callbacks("once memory"),
      // Status-dependent callbacks
      statusCode = s.statusCode || {},
      // Headers (they are sent all at once)
      requestHeaders = {},
      requestHeadersNames = {},
      // The jqXHR state
      state = 0,
      // Default abort message
      strAbort = "canceled",
      // Fake xhr
      jqXHR = {
        readyState: 0,

        // Builds headers hashtable if needed
        getResponseHeader: function( key ) {
          var match;
          if ( state === 2 ) {
            if ( !responseHeaders ) {
              responseHeaders = {};
              while ( (match = rheaders.exec( responseHeadersString )) ) {
                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
              }
            }
            match = responseHeaders[ key.toLowerCase() ];
          }
          return match == null ? null : match;
        },

        // Raw string
        getAllResponseHeaders: function() {
          return state === 2 ? responseHeadersString : null;
        },

        // Caches the header
        setRequestHeader: function( name, value ) {
          var lname = name.toLowerCase();
          if ( !state ) {
            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
            requestHeaders[ name ] = value;
          }
          return this;
        },

        // Overrides response content-type header
        overrideMimeType: function( type ) {
          if ( !state ) {
            s.mimeType = type;
          }
          return this;
        },

        // Status-dependent callbacks
        statusCode: function( map ) {
          var code;
          if ( map ) {
            if ( state < 2 ) {
              for ( code in map ) {
                // Lazy-add the new callback in a way that preserves old ones
                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
              }
            } else {
              // Execute the appropriate callbacks
              jqXHR.always( map[ jqXHR.status ] );
            }
          }
          return this;
        },

        // Cancel the request
        abort: function( statusText ) {
          var finalText = statusText || strAbort;
          if ( transport ) {
            transport.abort( finalText );
          }
          done( 0, finalText );
          return this;
        }
      };

    // Attach deferreds
    deferred.promise( jqXHR ).complete = completeDeferred.add;
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;

    // Remove hash character (#7531: and string promotion)
    // Add protocol if not provided (prefilters might expect it)
    // Handle falsy url in the settings object (#10093: consistency with old signature)
    // We also use the url parameter if available
    s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
      .replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

    // Alias method option to type as per ticket #12004
    s.type = options.method || options.type || s.method || s.type;

    // Extract dataTypes list
    s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

    // A cross-domain request is in order when we have a protocol:host:port mismatch
    if ( s.crossDomain == null ) {
      parts = rurl.exec( s.url.toLowerCase() );
      s.crossDomain = !!( parts &&
        ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
          ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
      );
    }

    // Convert data if not already a string
    if ( s.data && s.processData && typeof s.data !== "string" ) {
      s.data = jQuery.param( s.data, s.traditional );
    }

    // Apply prefilters
    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

    // If request was aborted inside a prefilter, stop there
    if ( state === 2 ) {
      return jqXHR;
    }

    // We can fire global events as of now if asked to
    fireGlobals = s.global;

    // Watch for a new set of requests
    if ( fireGlobals && jQuery.active++ === 0 ) {
      jQuery.event.trigger("ajaxStart");
    }

    // Uppercase the type
    s.type = s.type.toUpperCase();

    // Determine if request has content
    s.hasContent = !rnoContent.test( s.type );

    // Save the URL in case we're toying with the If-Modified-Since
    // and/or If-None-Match header later on
    cacheURL = s.url;

    // More options handling for requests with no content
    if ( !s.hasContent ) {

      // If data is available, append data to url
      if ( s.data ) {
        cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
        // #9682: remove data so that it's not used in an eventual retry
        delete s.data;
      }

      // Add anti-cache in url if needed
      if ( s.cache === false ) {
        s.url = rts.test( cacheURL ) ?

          // If there is already a '_' parameter, set its value
          cacheURL.replace( rts, "$1_=" + nonce++ ) :

          // Otherwise add one to the end
          cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
      }
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if ( s.ifModified ) {
      if ( jQuery.lastModified[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
      }
      if ( jQuery.etag[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
      }
    }

    // Set the correct header, if data is being sent
    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
      jqXHR.setRequestHeader( "Content-Type", s.contentType );
    }

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
      "Accept",
      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
        s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
        s.accepts[ "*" ]
    );

    // Check for headers option
    for ( i in s.headers ) {
      jqXHR.setRequestHeader( i, s.headers[ i ] );
    }

    // Allow custom headers/mimetypes and early abort
    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
      // Abort if not done already and return
      return jqXHR.abort();
    }

    // aborting is no longer a cancellation
    strAbort = "abort";

    // Install callbacks on deferreds
    for ( i in { success: 1, error: 1, complete: 1 } ) {
      jqXHR[ i ]( s[ i ] );
    }

    // Get transport
    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

    // If no transport, we auto-abort
    if ( !transport ) {
      done( -1, "No Transport" );
    } else {
      jqXHR.readyState = 1;

      // Send global event
      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
      }
      // Timeout
      if ( s.async && s.timeout > 0 ) {
        timeoutTimer = setTimeout(function() {
          jqXHR.abort("timeout");
        }, s.timeout );
      }

      try {
        state = 1;
        transport.send( requestHeaders, done );
      } catch ( e ) {
        // Propagate exception as error if not done
        if ( state < 2 ) {
          done( -1, e );
        // Simply rethrow otherwise
        } else {
          throw e;
        }
      }
    }

    // Callback for when everything is done
    function done( status, nativeStatusText, responses, headers ) {
      var isSuccess, success, error, response, modified,
        statusText = nativeStatusText;

      // Called once
      if ( state === 2 ) {
        return;
      }

      // State is "done" now
      state = 2;

      // Clear timeout if it exists
      if ( timeoutTimer ) {
        clearTimeout( timeoutTimer );
      }

      // Dereference transport for early garbage collection
      // (no matter how long the jqXHR object will be used)
      transport = undefined;

      // Cache response headers
      responseHeadersString = headers || "";

      // Set readyState
      jqXHR.readyState = status > 0 ? 4 : 0;

      // Determine if successful
      isSuccess = status >= 200 && status < 300 || status === 304;

      // Get response data
      if ( responses ) {
        response = ajaxHandleResponses( s, jqXHR, responses );
      }

      // Convert no matter what (that way responseXXX fields are always set)
      response = ajaxConvert( s, response, jqXHR, isSuccess );

      // If successful, handle type chaining
      if ( isSuccess ) {

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {
          modified = jqXHR.getResponseHeader("Last-Modified");
          if ( modified ) {
            jQuery.lastModified[ cacheURL ] = modified;
          }
          modified = jqXHR.getResponseHeader("etag");
          if ( modified ) {
            jQuery.etag[ cacheURL ] = modified;
          }
        }

        // if no content
        if ( status === 204 || s.type === "HEAD" ) {
          statusText = "nocontent";

        // if not modified
        } else if ( status === 304 ) {
          statusText = "notmodified";

        // If we have data, let's convert it
        } else {
          statusText = response.state;
          success = response.data;
          error = response.error;
          isSuccess = !error;
        }
      } else {
        // We extract error from statusText
        // then normalize statusText and status for non-aborts
        error = statusText;
        if ( status || !statusText ) {
          statusText = "error";
          if ( status < 0 ) {
            status = 0;
          }
        }
      }

      // Set data for the fake xhr object
      jqXHR.status = status;
      jqXHR.statusText = ( nativeStatusText || statusText ) + "";

      // Success/Error
      if ( isSuccess ) {
        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
      } else {
        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
      }

      // Status-dependent callbacks
      jqXHR.statusCode( statusCode );
      statusCode = undefined;

      if ( fireGlobals ) {
        globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
          [ jqXHR, s, isSuccess ? success : error ] );
      }

      // Complete
      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
        // Handle the global AJAX counter
        if ( !( --jQuery.active ) ) {
          jQuery.event.trigger("ajaxStop");
        }
      }
    }

    return jqXHR;
  },

  getJSON: function( url, data, callback ) {
    return jQuery.get( url, data, callback, "json" );
  },

  getScript: function( url, callback ) {
    return jQuery.get( url, undefined, callback, "script" );
  }
});

jQuery.each( [ "get", "post" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
  jQuery.fn[ type ] = function( fn ) {
    return this.on( type, fn );
  };
});


jQuery._evalUrl = function( url ) {
  return jQuery.ajax({
    url: url,
    type: "GET",
    dataType: "script",
    async: false,
    global: false,
    "throws": true
  });
};


jQuery.fn.extend({
  wrapAll: function( html ) {
    var wrap;

    if ( jQuery.isFunction( html ) ) {
      return this.each(function( i ) {
        jQuery( this ).wrapAll( html.call(this, i) );
      });
    }

    if ( this[ 0 ] ) {

      // The elements to wrap the target around
      wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

      if ( this[ 0 ].parentNode ) {
        wrap.insertBefore( this[ 0 ] );
      }

      wrap.map(function() {
        var elem = this;

        while ( elem.firstElementChild ) {
          elem = elem.firstElementChild;
        }

        return elem;
      }).append( this );
    }

    return this;
  },

  wrapInner: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function( i ) {
        jQuery( this ).wrapInner( html.call(this, i) );
      });
    }

    return this.each(function() {
      var self = jQuery( this ),
        contents = self.contents();

      if ( contents.length ) {
        contents.wrapAll( html );

      } else {
        self.append( html );
      }
    });
  },

  wrap: function( html ) {
    var isFunction = jQuery.isFunction( html );

    return this.each(function( i ) {
      jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
    });
  },

  unwrap: function() {
    return this.parent().each(function() {
      if ( !jQuery.nodeName( this, "body" ) ) {
        jQuery( this ).replaceWith( this.childNodes );
      }
    }).end();
  }
});


jQuery.expr.filters.hidden = function( elem ) {
  // Support: Opera <= 12.12
  // Opera reports offsetWidths and offsetHeights less than zero on some elements
  return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
  return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
  rbracket = /\[\]$/,
  rCRLF = /\r?\n/g,
  rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
  rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
  var name;

  if ( jQuery.isArray( obj ) ) {
    // Serialize array item.
    jQuery.each( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {
        // Treat each array item as a scalar.
        add( prefix, v );

      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
      }
    });

  } else if ( !traditional && jQuery.type( obj ) === "object" ) {
    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    }

  } else {
    // Serialize scalar item.
    add( prefix, obj );
  }
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
  var prefix,
    s = [],
    add = function( key, value ) {
      // If value is a function, invoke it and return its value
      value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
      s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    };

  // Set traditional to true for jQuery <= 1.3.2 behavior.
  if ( traditional === undefined ) {
    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
  }

  // If an array was passed in, assume that it is an array of form elements.
  if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
    // Serialize the form elements
    jQuery.each( a, function() {
      add( this.name, this.value );
    });

  } else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for ( prefix in a ) {
      buildParams( prefix, a[ prefix ], traditional, add );
    }
  }

  // Return the resulting serialization
  return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
  serialize: function() {
    return jQuery.param( this.serializeArray() );
  },
  serializeArray: function() {
    return this.map(function() {
      // Can add propHook for "elements" to filter or add form elements
      var elements = jQuery.prop( this, "elements" );
      return elements ? jQuery.makeArray( elements ) : this;
    })
    .filter(function() {
      var type = this.type;

      // Use .is( ":disabled" ) so that fieldset[disabled] works
      return this.name && !jQuery( this ).is( ":disabled" ) &&
        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
        ( this.checked || !rcheckableType.test( type ) );
    })
    .map(function( i, elem ) {
      var val = jQuery( this ).val();

      return val == null ?
        null :
        jQuery.isArray( val ) ?
          jQuery.map( val, function( val ) {
            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
          }) :
          { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    }).get();
  }
});


jQuery.ajaxSettings.xhr = function() {
  try {
    return new XMLHttpRequest();
  } catch( e ) {}
};

var xhrId = 0,
  xhrCallbacks = {},
  xhrSuccessStatus = {
    // file protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE9
    // #1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  },
  xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
  jQuery( window ).on( "unload", function() {
    for ( var key in xhrCallbacks ) {
      xhrCallbacks[ key ]();
    }
  });
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
  var callback;

  // Cross domain only allowed if supported through XMLHttpRequest
  if ( support.cors || xhrSupported && !options.crossDomain ) {
    return {
      send: function( headers, complete ) {
        var i,
          xhr = options.xhr(),
          id = ++xhrId;

        xhr.open( options.type, options.url, options.async, options.username, options.password );

        // Apply custom fields if provided
        if ( options.xhrFields ) {
          for ( i in options.xhrFields ) {
            xhr[ i ] = options.xhrFields[ i ];
          }
        }

        // Override mime type if needed
        if ( options.mimeType && xhr.overrideMimeType ) {
          xhr.overrideMimeType( options.mimeType );
        }

        // X-Requested-With header
        // For cross-domain requests, seeing as conditions for a preflight are
        // akin to a jigsaw puzzle, we simply never set it to be sure.
        // (it can always be set on a per-request basis or even using ajaxSetup)
        // For same-domain requests, won't change header if already provided.
        if ( !options.crossDomain && !headers["X-Requested-With"] ) {
          headers["X-Requested-With"] = "XMLHttpRequest";
        }

        // Set headers
        for ( i in headers ) {
          xhr.setRequestHeader( i, headers[ i ] );
        }

        // Callback
        callback = function( type ) {
          return function() {
            if ( callback ) {
              delete xhrCallbacks[ id ];
              callback = xhr.onload = xhr.onerror = null;

              if ( type === "abort" ) {
                xhr.abort();
              } else if ( type === "error" ) {
                complete(
                  // file: protocol always yields status 0; see #8605, #14207
                  xhr.status,
                  xhr.statusText
                );
              } else {
                complete(
                  xhrSuccessStatus[ xhr.status ] || xhr.status,
                  xhr.statusText,
                  // Support: IE9
                  // Accessing binary-data responseText throws an exception
                  // (#11426)
                  typeof xhr.responseText === "string" ? {
                    text: xhr.responseText
                  } : undefined,
                  xhr.getAllResponseHeaders()
                );
              }
            }
          };
        };

        // Listen to events
        xhr.onload = callback();
        xhr.onerror = callback("error");

        // Create the abort callback
        callback = xhrCallbacks[ id ] = callback("abort");

        try {
          // Do send the request (this may raise an exception)
          xhr.send( options.hasContent && options.data || null );
        } catch ( e ) {
          // #14683: Only rethrow if this hasn't been notified as an error yet
          if ( callback ) {
            throw e;
          }
        }
      },

      abort: function() {
        if ( callback ) {
          callback();
        }
      }
    };
  }
});




// Install script dataType
jQuery.ajaxSetup({
  accepts: {
    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  },
  contents: {
    script: /(?:java|ecma)script/
  },
  converters: {
    "text script": function( text ) {
      jQuery.globalEval( text );
      return text;
    }
  }
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
  if ( s.cache === undefined ) {
    s.cache = false;
  }
  if ( s.crossDomain ) {
    s.type = "GET";
  }
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
  // This transport only deals with cross domain requests
  if ( s.crossDomain ) {
    var script, callback;
    return {
      send: function( _, complete ) {
        script = jQuery("<script>").prop({
          async: true,
          charset: s.scriptCharset,
          src: s.url
        }).on(
          "load error",
          callback = function( evt ) {
            script.remove();
            callback = null;
            if ( evt ) {
              complete( evt.type === "error" ? 404 : 200, evt.type );
            }
          }
        );
        document.head.appendChild( script[ 0 ] );
      },
      abort: function() {
        if ( callback ) {
          callback();
        }
      }
    };
  }
});




var oldCallbacks = [],
  rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
    var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
    this[ callback ] = true;
    return callback;
  }
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  var callbackName, overwritten, responseContainer,
    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
      "url" :
      typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
    );

  // Handle iff the expected data type is "jsonp" or we have a parameter to set
  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

    // Get callback name, remembering preexisting value associated with it
    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
      s.jsonpCallback() :
      s.jsonpCallback;

    // Insert callback into url or form data
    if ( jsonProp ) {
      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
    } else if ( s.jsonp !== false ) {
      s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
    }

    // Use data converter to retrieve json after script execution
    s.converters["script json"] = function() {
      if ( !responseContainer ) {
        jQuery.error( callbackName + " was not called" );
      }
      return responseContainer[ 0 ];
    };

    // force json dataType
    s.dataTypes[ 0 ] = "json";

    // Install callback
    overwritten = window[ callbackName ];
    window[ callbackName ] = function() {
      responseContainer = arguments;
    };

    // Clean-up function (fires after converters)
    jqXHR.always(function() {
      // Restore preexisting value
      window[ callbackName ] = overwritten;

      // Save back as free
      if ( s[ callbackName ] ) {
        // make sure that re-using the options doesn't screw things around
        s.jsonpCallback = originalSettings.jsonpCallback;

        // save the callback name for future use
        oldCallbacks.push( callbackName );
      }

      // Call if it was a function and we have a response
      if ( responseContainer && jQuery.isFunction( overwritten ) ) {
        overwritten( responseContainer[ 0 ] );
      }

      responseContainer = overwritten = undefined;
    });

    // Delegate to script
    return "script";
  }
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  if ( typeof context === "boolean" ) {
    keepScripts = context;
    context = false;
  }
  context = context || document;

  var parsed = rsingleTag.exec( data ),
    scripts = !keepScripts && [];

  // Single tag
  if ( parsed ) {
    return [ context.createElement( parsed[1] ) ];
  }

  parsed = jQuery.buildFragment( [ data ], context, scripts );

  if ( scripts && scripts.length ) {
    jQuery( scripts ).remove();
  }

  return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
  if ( typeof url !== "string" && _load ) {
    return _load.apply( this, arguments );
  }

  var selector, type, response,
    self = this,
    off = url.indexOf(" ");

  if ( off >= 0 ) {
    selector = jQuery.trim( url.slice( off ) );
    url = url.slice( 0, off );
  }

  // If it's a function
  if ( jQuery.isFunction( params ) ) {

    // We assume that it's the callback
    callback = params;
    params = undefined;

  // Otherwise, build a param string
  } else if ( params && typeof params === "object" ) {
    type = "POST";
  }

  // If we have elements to modify, make the request
  if ( self.length > 0 ) {
    jQuery.ajax({
      url: url,

      // if "type" variable is undefined, then "GET" method will be used
      type: type,
      dataType: "html",
      data: params
    }).done(function( responseText ) {

      // Save response for use in complete callback
      response = arguments;

      self.html( selector ?

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

        // Otherwise use the full result
        responseText );

    }).complete( callback && function( jqXHR, status ) {
      self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
    });
  }

  return this;
};




jQuery.expr.filters.animated = function( elem ) {
  return jQuery.grep(jQuery.timers, function( fn ) {
    return elem === fn.elem;
  }).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
  return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
  setOffset: function( elem, options, i ) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
      position = jQuery.css( elem, "position" ),
      curElem = jQuery( elem ),
      props = {};

    // Set position first, in-case top/left are set even on static elem
    if ( position === "static" ) {
      elem.style.position = "relative";
    }

    curOffset = curElem.offset();
    curCSSTop = jQuery.css( elem, "top" );
    curCSSLeft = jQuery.css( elem, "left" );
    calculatePosition = ( position === "absolute" || position === "fixed" ) &&
      ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

    // Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
    if ( calculatePosition ) {
      curPosition = curElem.position();
      curTop = curPosition.top;
      curLeft = curPosition.left;

    } else {
      curTop = parseFloat( curCSSTop ) || 0;
      curLeft = parseFloat( curCSSLeft ) || 0;
    }

    if ( jQuery.isFunction( options ) ) {
      options = options.call( elem, i, curOffset );
    }

    if ( options.top != null ) {
      props.top = ( options.top - curOffset.top ) + curTop;
    }
    if ( options.left != null ) {
      props.left = ( options.left - curOffset.left ) + curLeft;
    }

    if ( "using" in options ) {
      options.using.call( elem, props );

    } else {
      curElem.css( props );
    }
  }
};

jQuery.fn.extend({
  offset: function( options ) {
    if ( arguments.length ) {
      return options === undefined ?
        this :
        this.each(function( i ) {
          jQuery.offset.setOffset( this, options, i );
        });
    }

    var docElem, win,
      elem = this[ 0 ],
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

    if ( !doc ) {
      return;
    }

    docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if ( !jQuery.contains( docElem, elem ) ) {
      return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof elem.getBoundingClientRect !== strundefined ) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow( doc );
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  },

  position: function() {
    if ( !this[ 0 ] ) {
      return;
    }

    var offsetParent, offset,
      elem = this[ 0 ],
      parentOffset = { top: 0, left: 0 };

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
    if ( jQuery.css( elem, "position" ) === "fixed" ) {
      // We assume that getBoundingClientRect is available when computed position is fixed
      offset = elem.getBoundingClientRect();

    } else {
      // Get *real* offsetParent
      offsetParent = this.offsetParent();

      // Get correct offsets
      offset = this.offset();
      if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
        parentOffset = offsetParent.offset();
      }

      // Add offsetParent borders
      parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
      parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
    }

    // Subtract parent offsets and element margins
    return {
      top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
      left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
    };
  },

  offsetParent: function() {
    return this.map(function() {
      var offsetParent = this.offsetParent || docElem;

      while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
        offsetParent = offsetParent.offsetParent;
      }

      return offsetParent || docElem;
    });
  }
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
  var top = "pageYOffset" === prop;

  jQuery.fn[ method ] = function( val ) {
    return access( this, function( elem, method, val ) {
      var win = getWindow( elem );

      if ( val === undefined ) {
        return win ? win[ prop ] : elem[ method ];
      }

      if ( win ) {
        win.scrollTo(
          !top ? val : window.pageXOffset,
          top ? val : window.pageYOffset
        );

      } else {
        elem[ method ] = val;
      }
    }, method, val, arguments.length, null );
  };
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
  jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
    function( elem, computed ) {
      if ( computed ) {
        computed = curCSS( elem, prop );
        // if curCSS returns percentage, fallback to offset
        return rnumnonpx.test( computed ) ?
          jQuery( elem ).position()[ prop ] + "px" :
          computed;
      }
    }
  );
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
  jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
    // margin is only for outerHeight, outerWidth
    jQuery.fn[ funcName ] = function( margin, value ) {
      var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

      return access( this, function( elem, type, value ) {
        var doc;

        if ( jQuery.isWindow( elem ) ) {
          // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
          // isn't a whole lot we can do. See pull request at this URL for discussion:
          // https://github.com/jquery/jquery/pull/764
          return elem.document.documentElement[ "client" + name ];
        }

        // Get document width or height
        if ( elem.nodeType === 9 ) {
          doc = elem.documentElement;

          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
          // whichever is greatest
          return Math.max(
            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
            elem.body[ "offset" + name ], doc[ "offset" + name ],
            doc[ "client" + name ]
          );
        }

        return value === undefined ?
          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css( elem, type, extra ) :

          // Set width or height on the element
          jQuery.style( elem, type, value, extra );
      }, type, chainable ? margin : undefined, chainable, null );
    };
  });
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
  return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
  define( "jquery", [], function() {
    return jQuery;
  });
}




var
  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$;

jQuery.noConflict = function( deep ) {
  if ( window.$ === jQuery ) {
    window.$ = _$;
  }

  if ( deep && window.jQuery === jQuery ) {
    window.jQuery = _jQuery;
  }

  return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
  window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
$(function() {

  var url = "http://philpapers.org/philpapers/raw/categories.json?apiId=80061&apiKey=wc7OHCivsDqfLyfP";
  var json = [["Philosophy, Misc","4","1","1"],["Metaphysics and Epistemology","10","1","1"],["Epistemology","11","10","10"],["Metaphilosophy","12","10","10"],["Metaphysics","13","10","10"],["Philosophy of Action","14","10","10"],["Philosophy of Language","15","10","10"],["Philosophy of Mind","16","10","10"],["Metaphysics of Mind","19","5986,16","16"],["Philosophy of Mind, Misc","21","4192","4192"],["Philosophy of Religion","22","10","10"],["M&E, Misc","23","10","10"],["Value Theory","24","1","1"],["Aesthetics","25","24","24"],["Applied Ethics","26","7049,24","24"],["Meta-Ethics","28","7049,24","24"],["Moral Psychology","29","30,6143,329","30"],["Normative Ethics","30","7049,24","24"],["Philosophy of Education","31","50","50"],["Philosophy of Law","32","24,50","24"],["Social and Political Philosophy","34","24","24"],["Value Theory, Misc","35","5198","5198"],["Science, Logic, and Mathematics","36","1","1"],["Logic and Philosophy of Logic","37","36,5642","36"],["Philosophy of Biology","38","36","36"],["Philosophy of Cognitive Science","39","16,36","36"],["Philosophy of Computing and Information","46","36","36"],["Philosophy of Mathematics","47","36","36"],["Philosophy of Social Science","50","36,34","36"],["History of Western Philosophy","51","1","1"],["Ancient Greek and Roman Philosophy","52","51","51"],["Medieval and Renaissance Philosophy","53","51","51"],["19th Century Philosophy","55","51","51"],["20th Century Philosophy","56","51","51"],["History of Western Philosophy, Misc","57","51","51"],["Philosophical Traditions","58","1","1"],["Arabic and Islamic Philosophy","60","6590,6653,6553,6728,6732","6732"],["Asian Philosophy, Misc","61","6653","6653"],["Chinese Philosophy","62","6653","6653"],["Japanese Philosophy","65","6653","6653"],["Jewish Philosophy","66","6728","6728"],["Russian Philosophy","69","6728","6728"],["Other Academic Areas","70","1","1"],["Natural Sciences","71","70","70"],["Biological Sciences","72","71","71"],["Chemistry","73","71","71"],["Earth Sciences","74","71","71"],["Physics","76","71","71"],["Space Sciences","77","71","71"],["Social Sciences","79","70","70"],["Archaeology","80","79","79"],["Anthropology","81","79","79"],["Communication","82","79","79"],["Cultural Studies","83","79","79"],["Economics","84","79","79"],["Gender Studies","85","79","79"],["Geography","86","79","79"],["History","87","79","79"],["Political Science","88","79","79"],["Sociology","89","79","79"],["Social Sciences, Misc","90","79","79"],["Cognitive Sciences","91","70","70"],["Linguistics","92","91","91"],["Neuroscience","93","91","91"],["Psychiatry and Psychotherapy","94","91","91"],["Psychology","95","91","91"],["Cognitive Sciences, Misc","96","91","91"],["Formal Sciences","97","70","70"],["Computer Science","98","97","97"],["Information Science","99","97","97"],["Mathematics","100","97","97"],["Statistics","101","97","97"],["Systems Science","102","97","97"],["Formal Sciences, Misc","103","97","97"],["Arts and Humanities","104","70","70"],["Architecture and Design","105","104","104"],["Classics","106","104","104"],["Film and Television","107","104","104"],["Literature","108","104","104"],["Modern Languages","109","104","104"],["Music","110","104","104"],["Religious Studies","111","104","104"],["Theater","112","104","104"],["Visual Arts","113","104","104"],["Arts and Humanities, Misc","114","104","104"],["Professional Areas","115","70","70"],["Agriculture","116","115","115"],["Business","117","115","115"],["Education","118","115,79","115"],["Engineering","119","115","115"],["Health Sciences","120","115","115"],["Medicine","121","115","115"],["Nursing","122","115","115"],["Journalism and Media","123","115","115"],["Law","124","115","115"],["Marketing","125","115","115"],["Military Studies","126","115","115"],["Transportation","127","115","115"],["Professional Areas, Misc","128","115","115"],["Other Academic Areas, Misc","129","70","70"],["Philosophy of Consciousness","130","39,16","16"],["Philosophy of Consciousness, Miscellaneous","131","130","130"],["Philosophy of Consciousness, General Works","132","131","131"],["The Concept of Consciousness","133","131","131"],["Philosophy of Consciousness, Misc","134","131","131"],["Explaining Consciousness?","135","130","130"],["What is it Like?","136","135","135"],["Subjectivity and Objectivity","137","135","135"],["The Explanatory Gap","138","135","135"],["`Hard' and `Easy' Problems","139","135","135"],["Cognitive Closure","140","135","135"],["Conceptual Analysis and A Priori Entailment","141","135,6778,5793","135"],["Explaining Consciousness, Misc","142","135","135"],["Consciousness and Materialism","143","130,287","130"],["The Knowledge Argument","144","143","143"],["Zombies and the Conceivability Argument","145","143","143"],["Kripke's Modal Argument Against Materialism","146","143","143"],["Arguments from Disembodiment","147","143","143"],["Other Anti-Materialist Arguments","148","143","143"],["Consciousness and Materialism, Misc","149","143","143"],["Dualism about Consciousness","150","293,6740","6740"],["Mind-Body Problem, General","152","143","143"],["Theories of Consciousness","153","130","130"],["Higher-Order Thought Theories of Consciousness","154","12729","12729"],["Self-Representational Theories of Consciousness","155","12729","12729"],["Dennett's Functionalism","156","158","158"],["Searle's Biological Naturalism","157","49082","49082"],["Functionalist Theories of Consciousness","158","6777,153","153"],["Eliminativism about Consciousness","159","6740","6740"],["Panpsychism","160","153,312","153"],["Russellian Monism","161","312,160,6740","6740"],["Neutral Monism","162","312,160,6740","6740"],["Idealism","163","312,5734,6740","5734"],["Consciousness and Content","164","130","130"],["Consciousness and Intentionality","165","164","164"],["Representationalism","166","153,164","164"],["Phenomenal Intentionality","167","164,211","164"],["Conscious Thought","168","164,197","164"],["Internalism and Externalism about Experience","169","164,47110","164"],["Phenomenal Concepts","170","164,230,143","164"],["Consciousness and Content, Misc","171","164","164"],["Aspects of Consciousness","172","130","130"],["Self-Consciousness","173","322,130","130"],["The Unity of Consciousness","174","172","172"],["Homogeneity of Consciousness","175","172","172"],["Knowledge of Consciousness","176","5449,172,338","172"],["The Function of Consciousness","177","172,317","172"],["Temporal Experience","178","172,329,5984","329"],["Consciousness of Action","179","6015,172","172"],["Bodily Experience","180","253,172,329,28093","329"],["Attention and Consciousness","181","172,4148","4148"],["Unconscious States","182","439,172","172"],["Qualia","183","130,272","130"],["Qualia, Misc","184","183","183"],["Qualia and Materialism","185","183,287,143","183"],["Eliminativism about Qualia","186","183","183"],["The Inverted Spectrum","187","183","183"],["Absent Qualia","188","158,183","183"],["Functionalism and Qualia","189","6777,158,183","183"],["Intentionality","190","6194,16","16"],["Propositional Attitudes","191","190","190"],["The Language of Thought","192","191","191"],["The Intentional Stance","193","191","191"],["Eliminativism about Propositional Attitudes","194","381,191","191"],["Belief","195","191,5388,329","329"],["Desire","196","191,329","329"],["Thought and Thinking","197","191,329","329"],["Propositional Attitudes, Misc","198","191","191"],["Content Internalism and Externalism","199","190","190"],["Twin Earth and Externalism","200","47110","47110"],["Social Externalism","201","47110","47110"],["Externalism and Psychological Explanation","202","47108","47108"],["Externalism and Mental Causation","203","210,317","210"],["Externalism and the Theory of Vision","204","47108","47108"],["Externalism and Computation","205","47108","47108"],["Externalism and Self-Knowledge","206","199,338","199"],["Narrow Content","207","210,6745","210"],["Two-Dimensionalism about Content","208","6745,210","6745"],["The Extended Mind","209","47110","47110"],["Content Internalism and Externalism, Misc","210","199","199"],["Naturalizing Mental Content","211","6196,190","190"],["Information-Based Accounts of Mental Content","212","5527,211","211"],["Asymmetric-Dependence Accounts of Mental Content","213","211","211"],["Causal Accounts of Mental Content, Misc","214","211","211"],["Teleological Accounts of Mental Content","215","211,26959","211"],["Inferentialist Accounts of Meaning and Content","216","211,6196","211"],["Interpretivist Accounts of Meaning and Content","217","211,6196,6228","211"],["Naturalizing Mental Content, Misc","218","211","211"],["Aspects of Intentionality","219","190","190"],["Naturalism and Intentionality","220","219,5583","219"],["Kripkenstein on Meaning","221","6211,219","6211"],["Rule-Following","222","219","219"],["Normativity of Meaning and Content","223","6211,5199,219","6211"],["Meaning Holism","224","6211,219","6211"],["Explanatory Role of Content","225","219,317","219"],["Intentional Objects","226","6745","6745"],["Collective Intentionality","227","4193,219","219"],["Intentionality, Misc","228","190","190"],["Representation","229","190","190"],["Concepts","230","190","190"],["Perception","232","16,172","16"],["The Nature of Perceptual Experience","233","232","232"],["Sense-Datum Theories","234","5438,233,268","233"],["Adverbialism and Qualia Theories","235","233","233"],["Intentionalist Theories of Perception","236","233","233"],["Belief Theories of Perception","237","233","233"],["Naive and Direct Realism","238","268,233","233"],["Disjunctivism","239","233","233"],["The Nature of Perceptual Experience, Misc","240","233","233"],["The Perceptual Relation","241","232","232"],["The Causal Theory of Perception","242","241","241"],["Direct and Indirect Perception","243","241","241"],["The Objects of Perception","244","241","241"],["The Perceptual Relation, Misc","245","241","241"],["The Contents of Perception","246","6745,232","232"],["Conceptual and Nonconceptual Content","247","6745,246","246"],["Color Experience","248","246","246"],["Spatial Experience","249","246","246"],["The Experience of Objects","250","246","246"],["The Experience of High-Level Properties","251","246","246"],["The Contents of Perception, Misc","252","246","246"],["Sensory Modalities","253","232","232"],["Distinguishing the Senses","254","253","253"],["Vision","255","253","253"],["Molyneux's Problem","257","253","253"],["Sensory Modalities, Misc","258","253","253"],["Science of Perception","259","232,5390","232"],["Modularity and Cognitive Penetrability","260","259","259"],["Ecological Approaches to Perception","261","259","259"],["Construction and Inference in Perception","262","259","259"],["Perception and Neuroscience","263","396,259","259"],["Psychophysics","264","259","259"],["Gestalt Theory","265","259","259"],["Perception and the Mind","266","232","232"],["Perception and Thought","267","266","266"],["Perceptual Knowledge","268","5364,232,266,6783","232"],["Perception and Action","269","266,6015","266"],["Perception and Reference","270","266","266"],["Perception and Phenomenology","271","266","266"],["Perceptual Qualities","272","232","232"],["Color","273","232,272","232"],["Sound","274","272","272"],["Discriminability","275","268,272","272"],["Primary and Secondary Qualities","276","272","272"],["Perceptual Qualities, Misc","277","272","272"],["Illusion and Hallucination","279","6773","6773"],["Transparency","280","6773","6773"],["The Given","281","268,6773,5438","268"],["Perceptual Reports","282","6464,6773","6773"],["Epistemic and Non-epistemic Perception","283","268","268"],["Sensation and Perception","284","6773","6773"],["Philosophy of Perception, General","285","232","232"],["Physicalism about the Mind","287","19,5745","19"],["Formulating Physicalism","288","5745,287","287"],["Mind-Brain Identity Theory","289","49082,287","287"],["Eliminative Materialism","290","287","287"],["Anomalous Monism","291","287","287"],["Physicalism about the Mind, Misc","292","287","287"],["Dualism","293","19,5734","19"],["Interactionism","294","293","293"],["Epiphenomenalism","295","293,317","293"],["Psychophysical Parallelism","296","293","293"],["Dualism, Misc","297","293","293"],["Logical Behaviorism","299","6775","6775"],["Causal Role Functionalism","300","6777","6777"],["Machine Functionalism","301","6777","6777"],["Functionalism, Misc","302","6777","6777"],["Supervenience","303","5986,5793","5793"],["Psychophysical Supervenience","304","27559,303,6778","6778"],["Supervenience and Physicalism","305","303,5745","303"],["Supervenience, General","306","303","303"],["Psychophysical Reduction","307","19,27559","19"],["Multiple Realizability","308","307,5987","5987"],["Nonreductive Materialism","309","5987,5745,307,287","307"],["Reduction in Cognitive Science","310","5987,27559,396,307,5390","27559"],["Psychophysical Reduction, Misc","311","307","307"],["Other Psychophysical Theories","312","19","19"],["Emergence","313","5986,5793,5681","5793"],["Realization","314","5986,6778,5793","5793"],["Token Identity","315","6778,5793","5793"],["Other Psychophysical Relations, Misc","316","6778","6778"],["Mental Causation","317","19,5652,6010","19"],["Theories of Personal Identity","318","19,321,5759","321"],["Personal Identity, Misc","319","318","318"],["What Matters in Survival","320","30252","30252"],["Persons","321","13,16","13"],["The Self","322","321","321"],["Psychological Theories of Personal Identity","323","318","318"],["Physical and Animalist Theories Of Personal Identity","324","318","318"],["Fission and Split Brains","325","32447","32447"],["Dissociative Identity Disorder","326","32447,44641","44641"],["Metaphysics of Mind, Misc","327","19","19"],["Mental States and Processes","329","16","16"],["Pain","330","180,329","329"],["Pleasure","331","329","329"],["Emotions","332","329,4712,172","329"],["Dreams","333","329","329"],["Memory","334","329,5364","329"],["Mental Imagery","335","329","329"],["Imagination","336","329","329"],["Mental Actions","337","329,6000","329"],["Self-Knowledge","338","322,5364,5449,6783","6783"],["Observation-Based Accounts of Self-Knowledge","339","338","338"],["Expression-Based Accounts of Self-Knowledge","340","338","338"],["Rationality-Based Accounts of Self-Knowledge","341","338","338"],["First-Person Authority and Privileged Access","342","338","338"],["Infallibility and Incorrigibility In Self-Knowledge","343","338","338"],["Self-Deception","344","338,4712","4712"],["Self-Knowledge, Misc","345","338","338"],["The Problem of Other Minds","346","6783,5449","6783"],["Free Will","347","5025,19,14,6036","14"],["Philosophy of Mind, General Works","348","4192","4192"],["Philosophy of Artificial Intelligence","349","39,46","39"],["Can Machines Think?","350","349","349"],["The Turing Test","351","350","350"],["Godelian Arguments Against AI","352","350","350"],["The Chinese Room","353","350","350"],["Machine Consciousness","354","350","350"],["Machine Mentality, Misc","355","350","350"],["Computation and Representation","356","349,229","349"],["Symbols and Symbol Systems","357","356","356"],["Computational Semantics","358","356","356"],["Implicit/Explicit Rules and Representations","359","356","356"],["AI without Representation?","360","356","356"],["Computation and Representation, Misc","361","356","356"],["Philosophy of Connectionism","362","349","349"],["Connectionism and Compositionality","363","362","362"],["Representation in Connectionism","364","356,362","362"],["Connectionism and Eliminativism","365","362","362"],["The Connectionist/Classical Debate","366","362","362"],["Subsymbolic Computation","367","356,362","362"],["Philosophy of Connectionism, Misc","368","362","362"],["Philosophy of Connectionism, Foundational Empirical Issues","369","362","362"],["Special Topics in Artificial Intelligence","370","349","349"],["The Nature of Artificial Intelligence","371","370","370"],["The Frame Problem","372","370","370"],["Artificial Intelligence Methodology","373","370","370"],["Dynamical Systems","374","370","370"],["Robotics","375","370","370"],["Computationalism","376","349","349"],["Computationalism in Cognitive Science","377","376,387","387"],["Computation and Physical Systems","378","46,376","46"],["Philosophy of Artificial Intelligence, Miscellaneous","379","349","349"],["Theory of Mind and Folk Psychology","381","847","847"],["The Nature of Folk Psychology","382","381","381"],["The Theory Theory","383","381","381"],["The Simulation Theory","384","381","381"],["Theory of Mind and Folk Psychology, Misc","385","381","381"],["Folk Concepts and Folk Intuitions","386","381","381"],["Philosophy of Cognitive Science, Miscellaneous","387","39","39"],["Nativism in Cognitive Science","388","5278,387","387"],["Modularity in Cognitive Science","389","387","387"],["Evolution of Cognition","390","5301,387","387"],["Rationality and Cognitive Science","391","5402,387","387"],["Embodiment and Situated Cognition","392","180,28093,387","387"],["Animal Cognition","393","48824,387","387"],["Philosophy of Psychiatry and Psychopathology","394","48822,39","39"],["The Role of Language in Thought","395","6403","6403"],["Philosophy of Neuroscience","396","39","39"],["Brain Imaging and Localization","397","396","396"],["Representation in Neuroscience","398","396,229","396"],["Explanation in Neuroscience","399","396,28949","396"],["Interlevel Relations in Science, Misc","400","5986","5986"],["Neurophilosophy","401","396","396"],["Philosophy of Neuroscience, Misc","402","396","396"],["Psychological Laws","404","5390","5390"],["Psychological Explanation","405","317,6010,5390","5390"],["Explanation in Cognitive Science","406","387,28949","387"],["Levels of Analysis in Cognitive Science","407","387","387"],["Philosophy of Psychology, Misc","408","847","847"],["Philosophy of Cognitive Science, Misc","409","387","387"],["Science of Consciousness","410","130,39","39"],["Consciousness and Neuroscience","411","410,396","410"],["Neurobiological Theories and Models of Consciousness","412","49082,411","411"],["Neural Correlates of Consciousness","413","411","411"],["Cerebral Hemispheres and Consciousness","414","411","411"],["Neural Timing and Consciousness","415","411","411"],["Neural Synchrony and Binding","416","411","411"],["Consciousness and Neuroscience, Foundational Issues","417","411","411"],["Consciousness and Neuroscience, Misc","418","411","411"],["Science of Visual Consciousness","419","259,410","410"],["Neural Correlates of Visual Consciousness","420","419","419"],["Binocular Rivalry","421","259,419","419"],["Visual Pathways","422","259,419","419"],["Change/Inattentional Blindness","423","259,419,4148","419"],["Visual Imagery and Imagination","424","419,336","419"],["Science of Visual Consciousness, Misc","425","419","419"],["Consciousness and Psychology","426","410","410"],["Cognitive Models of Consciousness","427","158,426","426"],["Attention and Consciousness in Psychology","428","426,4148","426"],["Metacognition and Consciousness","429","426","426"],["Control and Consciousness","430","426","426"],["Action and Consciousness in Psychology","431","426","426"],["Emotion and Consciousness in Psychology","432","16238,426","426"],["Time and Consciousness in Psychology","433","426","426"],["Self-Consciousness in Psychology","434","426,173","426"],["Development of Consciousness","435","426","426"],["The Stream of Consciousness","436","426","426"],["Consciousness and Psychology, Foundational Issues","437","426","426"],["Consciousness and Psychology, Misc","438","426","426"],["Unconscious and Conscious Processes","439","410","410"],["Unconscious Perception","440","439","439"],["Conscious and Unconscious Memory","441","334,439","439"],["Conscious and Unconscious Learning","442","439","439"],["Consciousness and Anesthesia","443","439","439"],["Psychoanalysis and Consciousness","444","439,861","439"],["Unconscious Processes, Misc","445","439","439"],["Disorders and Syndromes of Consciousness","446","44641,410","410"],["Blindsight","447","259,446,57442","446"],["Neglect and Extinction","448","446","446"],["Schizophrenia","449","44641,446","446"],["Anosognosia","450","446","446"],["The Minimally Conscious State","451","446","446"],["Vegetative State and Coma","452","446,4437","446"],["Synesthesia","453","446,253,57442","446"],["Other Disorders and Syndromes","454","446","446"],["States of Consciousness","455","410","410"],["Consciousness, Sleep, and Dreaming","456","455,333","455"],["Hypnosis and Consciousness","457","455","455"],["Meditation and Consciousness","458","455","455"],["Drugs and Consciousness","459","4405,455","455"],["Other Altered States of Consciousness","460","455","455"],["States of Consciousness, Misc","461","455","455"],["Consciousness and Physics","462","410","410"],["Consciousness and the Interpretation of Quantum Mechanics","463","462,5777","462"],["Quantum Mechanisms of Consciousness","464","462","462"],["Consciousness and Physics, Misc","465","462","462"],["Consciousness and Biology","466","410,49082","410"],["Evolution of Consciousness","467","5301,466","466"],["Animal Consciousness","468","393,466","466"],["Animal Self-Consciousness","469","466,173,393","466"],["Consciousness and Biology, Misc","470","466","466"],["First-Person Approaches in the Science of Consciousness","471","338,410","410"],["Introspection and Introspectionism","472","338,471,5379","471"],["Verbal Reports and Heterophenomenology","473","471","471"],["Phenomenology and Consciousness","474","471","471"],["Eastern Approaches to Consciousness","475","471","471"],["First-Person Approaches in the Science of Consciousness, Misc","476","471","471"],["Science of Consciousness, Miscellaneous","477","410","410"],["Consciousness and Language","478","477","477"],["Parapsychology and Consciousness","479","477","477"],["Science of Consciousness, Foundations","480","477","477"],["Science of Consciousness, Misc","481","477","477"],["Philosophy of Psychology","847","39","39"],["Delusions","858","44641,5402","44641"],["Other Mental Disorders","859","44641","44641"],["Mental Illness","860","394,44641,44642","394"],["Psychotherapy and Psychoanalysis","861","394","394"],["Philosophy of Psychiatry and Psychopathology, Misc","862","394","394"],["The Status of Linguistic Theories","864","6398","6398"],["Philosophy of Linguistics, Misc","865","6398","6398"],["Philosophy of Linguistics","866","15,39","15"],["Laws of Nature","1357","5932,1359","1359"],["Causation, Laws, etc","1359","13","13"],["Metaontology","1361","5607,1379,13","13"],["Realism and Anti-Realism","1362","13","13"],["Persistence","1365","5892,5984","5892"],["Identity, Misc","1366","5759","5759"],["Essentialism and De Re Modality","1367","1371","1371"],["Modal Epistemology","1369","1371,5449,5572","1371"],["Possible Worlds","1370","1371","1371"],["Modality","1371","13","13"],["Events","1373","1379","1379"],["Material Objects","1374","5892","5892"],["Ontology, Misc","1375","1379","1379"],["Properties","1376","1379,13,5894","13"],["Substance","1377","1379","1379"],["Truthmakers","1378","1379,6674,5793","1379"],["Ontology","1379","13","13"],["Temporal Ontology","1380","1385","1385"],["Philosophy of Time, Misc","1382","1385","1385"],["Time Travel","1384","5984","5984"],["Time","1385","13","13"],["Metaphysics, Miscellaneous","1386","13","13"],["Decision Theory","1399","5856,14,6205,26865","14"],["Philosophy of Action, Misc","1400","14","14"],["Attention","4148","329","329"],["Attention, Misc","4149","4148","4148"],["The Nature of Attention","4150","4148","4148"],["Belief, Misc","4151","195","195"],["Collective Belief","4152","4193,195","195"],["De Re Belief","4153","6464,195","195"],["The Nature of Belief","4154","195","195"],["Tacit and Dispositional Belief","4155","195","195"],["Bodily Awareness","4156","180","180"],["Bodily Experience, Misc","4157","180","180"],["Bodily Sensations","4158","180","180"],["Desire as Belief","4159","196,6083","196"],["Pleasure and Desire","4161","331,196","196"],["Theories of Desire, Misc","4162","196","196"],["Desire, Misc","4163","196","196"],["Dreams, Misc","4164","333","333"],["The Nature of Dreaming","4165","333","333"],["Classifying Emotions","4166","16236","16236"],["Cognitive Theories of Emotions","4167","16235","16235"],["Emotions and Appraisals","4168","16236","16236"],["Emotions and Feelings","4169","16236","16236"],["Emotion and Reason","4170","16237","16237"],["Moods","4171","16236","16236"],["Objects and Contents of Emotions","4172","16237","16237"],["Theories of Emotion, Misc","4173","16235","16235"],["Imaginative Resistance","4174","336","336"],["Imagination and Imagery","4175","336","336"],["Imagination and Pretense","4176","336","336"],["Imagination, Misc","4177","336","336"],["Epistemology of Memory","4178","334","334"],["Memory and Cognitive Science","4179","334","334"],["Memory, Misc","4180","334","334"],["Theories of Memory","4181","334","334"],["The Concept of Pain","4182","330","330"],["Location of Pain","4183","330","330"],["Pain and Pain Experience","4184","330","330"],["Pain and Perception","4185","330","330"],["Pain, Misc","4186","330","330"],["Pain and Mental Objects","4187","330","330"],["Pleasure and Pain","4188","330,331","331"],["Pleasure, Misc","4189","331","331"],["The Value of Pleasure","4190","331,48826","331"],["Mental States, Misc","4191","329","329"],["Philosophy of Mind, Miscellaneous","4192","16","16"],["Collective Mentality","4193","4192,5554","4192"],["Arguments for Theism","4194","22","22"],["Arguments from Miracles","4195","4267,4194","4194"],["Cosmological Arguments for Theism","4196","5741,4194","4194"],["Cosmological Arguments from Contingency","4197","4196","4196"],["Cosmological Arguments from Regress","4198","4196","4196"],["Kalam Cosmological Argument","4199","4196","4196"],["Cosmological Arguments for Theism, Misc","4200","4196","4196"],["Design Arguments for Theism","4201","4194","4194"],["Design Arguments for Theism, Misc","4202","4201","4201"],["Moral Arguments for Theism","4203","4194","4194"],["Arguments from Moral Normativity","4204","4203","4203"],["Arguments from Moral Order","4205","4203","4203"],["The Secular Problem of Evil","4206","4263,4203","4203"],["Moral Arguments for Theism, Misc","4207","4203","4203"],["Ontological Arguments for Theism","4208","4194","4194"],["Anselm's Ontological Argument","4209","4208","4208"],["Descartes' Ontological Argument","4210","4208","4208"],["Ontological Arguments for Theism, Misc","4211","4208","4208"],["Pragmatic Arguments for Theism","4212","4194","4194"],["Pascal's Wager","4213","26866,4212,6056","4212"],["Pragmatic Arguments for Theism, Misc","4214","4212","4212"],["Arguments for Theism, Misc","4215","4194","4194"],["Arguments Against Theism","4216","22","22"],["The Argument from Evil","4217","4216,4263","4216"],["Arguments from Naturalism against Theism","4218","4216,5583","4216"],["Arguments Against Theism, Misc","4219","4216","4216"],["Divine Attributes","4220","4270,22","22"],["Divine Goodness","4221","4220","4220"],["Divine Freedom","4222","4220","4220"],["Divine Foreknowledge","4223","4227","4227"],["Divine Omnipotence","4226","4220","4220"],["Divine Omniscience","4227","4220","4220"],["Divine Omnipresence","4228","4220","4220"],["Divine Providence","4229","4220","4220"],["Divine Simplicity","4230","4220","4220"],["Divine Eternity","4231","4220","4220"],["Divine Attributes, Misc","4232","4220","4220"],["Epistemology of Religion","4233","5449,22","22"],["Epistemology of Religion, Misc","4234","4233","4233"],["Faith","4235","4233","4233"],["Reformed Epistemology","4236","4233","4233"],["Religious Experience","4237","4233","4233"],["Revelation","4238","4233","4233"],["Specific Religions","4239","22","22"],["Buddhism","4240","4239","4239"],["Christianity","4241","4239","4239"],["Atonement","4242","4241","4241"],["Incarnation","4243","4241","4241"],["The Trinity","4244","4241","4241"],["Christianity, Misc","4245","4241","4241"],["Hinduism","4246","4239","4239"],["Islam","4247","4239","4239"],["Judaism","4248","4239","4239"],["Other Religions","4249","4239","4239"],["Specific Religions, Misc","4250","4239","4239"],["Religious Topics","4251","22","22"],["Afterlife","4252","4251","4251"],["Afterlife, Misc","4253","4252","4252"],["Heaven and Hell","4254","4241,4252","4252"],["Reincarnation","4255","4252","4252"],["Resurrection","4256","4252","4252"],["Atheism and Agnosticism","4257","4251","4251"],["Atheism","4258","4257,4270,4216","4257"],["Agnosticism","4259","4257","4257"],["Atheism and Agnosticism, Misc","4260","4257","4257"],["Creation","4261","4251","4251"],["Creation, Misc","4262","4261","4261"],["Evil","4263","4251","4251"],["Moral Evil","4264","4263","4263"],["Natural Evil","4265","4263","4263"],["Evil, Misc","4266","4263","4263"],["Miracles","4267","4251","4251"],["Hume's Argument against Miracles","4268","26866,66148,4267","4267"],["Miracles, Misc","4269","4267","4267"],["The Number of Gods","4270","4251","4251"],["Monotheism","4271","4270","4270"],["Polytheism","4272","4270","4270"],["Pantheism","4273","4270","4270"],["The Number of Gods, Misc","4274","4270","4270"],["Prayer","4275","4251","4251"],["Prophecy","4276","4251","4251"],["Religious Diversity","4277","4251","4251"],["Religious Inclusivism and Exclusivism","4278","4277","4277"],["Religious Pluralism","4279","4277","4277"],["Religious Diversity, Misc","4280","4277","4277"],["Sin","4281","4251","4251"],["Religious Topics, Misc","4282","4251","4251"],["Philosophy of Religion, Miscellaneous","4283","22","22"],["Aesthetic Cognition","4284","25","25"],["Aesthetic Attitudes","4285","4284","4284"],["Aesthetic Concepts","4286","4284","4284"],["Aesthetics and Emotions","4287","16236,4284","4284"],["Aesthetic Experience","4288","4284","4284"],["Aesthetic Judgment","4289","4284","4284"],["Aesthetic Perception","4290","4284","4284"],["Aesthetic Pleasure","4291","4284,331","4284"],["Aesthetic Taste","4292","4284","4284"],["Aesthetic Understanding","4293","4284","4284"],["Aesthetics and Cognitive Science","4294","4284","4284"],["Aesthetic Cognition, Misc","4295","4284","4284"],["Aesthetic Realism and Anti-Realism","4296","1362,25","25"],["Aesthetic Realism and Anti-Realism, Misc","4297","4296","4296"],["Aesthetic Relativism","4298","4296,70758","4296"],["Aesthetic Subjectivism","4299","4296","4296"],["Aesthetic Universality","4300","4296","4296"],["Topics in Aesthetics","4301","25","25"],["Aesthetic Qualities","4302","4301","4301"],["Aesthetic Qualities, Misc","4303","4302","4302"],["Beauty","4304","4302","4302"],["Style","4305","4302","4302"],["Aesthetic Representation and Meaning","4306","4301","4301"],["Aesthetic Symbol Systems","4307","4306","4306"],["Depiction","4308","4362,4306,229","4362"],["Intention and Interpretation","4309","4306","4306"],["Aesthetic Representation and Meaning, Misc","4310","4306","4306"],["Aesthetic Value","4311","4301,5207","4301"],["Aesthetic Criticism","4312","4311","4311"],["Aesthetic Evaluation","4313","4311","4311"],["Aesthetic Normativity","4314","4311,5199","4311"],["Aesthetics and Ethics","4315","4311","4311"],["Aesthetic Value, Misc","4316","4311","4311"],["Aesthetics and Culture","4317","4301","4301"],["Aesthetic Universals","4318","4317","4317"],["Crosscultural Aesthetics","4319","4317","4317"],["Pop Culture","4320","4317","4317"],["Aesthetics and Culture, Misc","4321","4317","4317"],["Aesthetics of Nature","4322","4301","4301"],["Art and Artworks","4323","25","25"],["Artworks","4324","4323","4323"],["The Artworld","4325","4323","4323"],["The Definition of Art","4326","4323","4323"],["The Value of Art","4327","4311,48826,4323","4323"],["Art and Artworks, Misc","4328","4323","4323"],["Philosophy of Film","4329","25","25"],["Cinema","4330","64341","64341"],["Television","4331","64341","64341"],["Digital Video","4332","64341","64341"],["Philosophy of Film, Misc","4333","4329","4329"],["Philosophy of Music","4334","25","25"],["Definition of Music","4335","4334","4334"],["Ontology of Music","4336","5894,4334","4334"],["Musical Ontology, Misc","4337","4336","4336"],["Musical Performance","4338","4336","4336"],["Musical Works","4339","4336","4336"],["Musical Experience","4340","4334","4334"],["Music and Emotion","4341","16238,4340","4340"],["Musical Experience, Misc","4342","4340","4340"],["Musical Expression","4343","4340","4340"],["Musical Understanding","4344","4340","4340"],["Varieties of Music","4345","4334","4334"],["Blues","4346","4345","4345"],["Classical Music","4347","4345","4345"],["Folk Music","4348","4345","4345"],["Jazz","4349","4345","4345"],["Popular Music","4350","4345","4345"],["Varieties of Music, Misc","4351","4345","4345"],["Philosophy of Music, Misc","4352","4334","4334"],["Philosophy of Literature","4353","25","25"],["Fiction","4354","4353","4353"],["Fictional Characters","4355","5894,4354","4354"],["Narrative","4356","4354","4354"],["Truth in Fiction","4357","4354","4354"],["Fiction, Misc","4358","4354","4354"],["Nonfiction","4359","4353","4353"],["Poetry","4360","4353","4353"],["Philosophy of Literature, Misc","4361","4353","4353"],["Philosophy of Visual Art","4362","25","25"],["Painting and Drawing","4363","4362","4362"],["Photography","4364","4362","4362"],["Sculpture","4366","4362","4362"],["Philosophy of Visual Art, Misc","4367","4362","4362"],["Philosophy of Specific Arts","4368","25","25"],["Architecture","4369","4368","4368"],["Comics","4370","4368","4368"],["Dance","4371","4368","4368"],["Design","4372","4368","4368"],["Fashion","4373","4368","4368"],["Food and Drink","4374","4368","4368"],["Humour","4375","4368,4302","4368"],["Opera","4376","4368,4345","4368"],["Theatre","4377","4368","4368"],["Philosophy of Specific Arts, Misc","4378","4368","4368"],["Aesthetics, Miscellaneous","4379","25","25"],["Applied Ethics, Miscellaneous","4380","26","26"],["General Issues in Applied Ethics","4381","4380","4380"],["Autonomy in Applied Ethics","4382","4381,5027","4381"],["Benevolence in Applied Ethics","4383","4381","4381"],["Beneficence in Applied Ethics","4384","4381","4381"],["Harm in Applied Ethics","4385","4381","4381"],["Honesty in Applied Ethics","4386","4381","4381"],["Justice in Applied Ethics","4387","4381","4381"],["Lawfulness in Applied Ethics","4388","4381","4381"],["Paternalism in Applied Ethics","4389","4381","4381"],["Rights in Applied Ethics","4390","5138,4381","4381"],["Applied Ethics and Normative Ethics","4391","4381","4381"],["General Issues in Applied Ethics, Misc","4392","4381","4381"],["Biomedical Ethics","4393","26","26"],["Death and Dying","4394","4416,4393,49062","4393"],["Assisted Suicide","4395","4394","4394"],["Brain Death","4396","4437,4394","4394"],["Cryonics","4397","4394","4394"],["Defining Death","4398","4394","4394"],["Euthanasia","4399","4394","4394"],["Infanticide","4400","4394","4394"],["Life Support","4401","4394","4394"],["Suicide","4402","4394","4394"],["The Badness of Death","4403","4394","4394"],["Death and Dying, Misc","4404","4394","4394"],["Drugs","4405","4393","4393"],["Drug Addiction","4406","4405","4405"],["Pharmaceuticals","4407","4405","4405"],["Recreational Drugs","4408","4405","4405"],["Drugs, Misc","4409","4405","4405"],["Genetic Ethics","4410","4393,5324","4393"],["Eugenics","4411","4410","4410"],["Genetic Engineering","4412","4410","4410"],["Human Genetic Modification","4413","4410","4410"],["Genetic Testing","4414","4410","4410"],["Genetic Ethics, Misc","4415","4410","4410"],["Health Care Ethics","4416","4393,4424","4393"],["Disability","4417","4997,4416,49062,4393,4509,4441","4393"],["Disease","4418","4416,49062","49062"],["Health Care Justice","4419","4416,5100","4416"],["Health Care Rights","4420","5144,4416","4416"],["Illness","4421","49062,4416","49062"],["Nursing Ethics","4422","4416","4416"],["Health Care Ethics, Misc","4423","4416","4416"],["Medical Ethics","4424","48822,4393","4393"],["Advance Directives","4425","4424","4424"],["Beneficence in Medical Ethics","4426","4424","4424"],["Confidentiality in Medicine","4427","4424","4424"],["Informed Consent in Medicine","4428","4416,4424","4424"],["Life Extension","4429","4424","4424"],["Malpractice","4430","4424","4424"],["Medical Research Ethics","4431","4424","4424"],["Organ Donation","4432","4424","4424"],["Organ Transplantation","4433","4424","4424"],["Psychiatric Ethics","4434","4424,44642","4424"],["Therapeutic Cloning","4435","4424","4424"],["Medical Ethics, Misc","4436","4424","4424"],["Neuroethics","4437","4393,4701,396","4393"],["Ethics of Brain Imaging","4438","4437","4437"],["Cognitive Enhancement","4439","4437","4437"],["Neuroethics, Misc","4440","4437","4437"],["Reproductive Ethics","4441","4898,4393","4393"],["Abortion","4442","4441","4441"],["Cloning","4443","4410,4441","4441"],["Contraception","4444","4441","4441"],["Morality of Procreation","4445","4441","4441"],["Sex Selection","4446","4441","4441"],["Sperm and Egg Donation","4447","4441","4441"],["Stem Cell Research","4448","4441","4441"],["Surrogate Motherhood","4449","4441","4441"],["Reproductive Ethics, Misc","4450","4441","4441"],["Environmental Ethics","4451","26454,26","26"],["Animal Ethics","4452","4451,48824","4451"],["Animal Cruelty","4453","4452","4452"],["Animal Rights","4454","5144,4452","4452"],["Speciesism","4455","4452","4452"],["Vegetarianism","4456","4452","4452"],["Animal Ethics, Misc","4457","4452","4452"],["Environmental Value","4458","26454,5207,4451","4451"],["Environmental Cost-Benefit Analysis","4459","4458","4458"],["Environmental Diversity","4460","4458","4458"],["Intrinsic Environmental Value","4461","4458","4458"],["Instrumental Environmental Value","4462","4458","4458"],["Environmental Value, Misc","4463","4458","4458"],["Environmental Philosophies","4464","26454,4451","26454"],["Conservation Ethics","4465","4464,5282","4464"],["Deep Ecology","4466","4464,5282","4464"],["Environmental Pluralism","4467","4464","4464"],["Environmental Pragmatism","4468","4464","4464"],["Environmental Humanism","4469","4464","4464"],["Social Ecology","4470","5282,4464","4464"],["Environmental Philosophies, Misc","4471","4464","4464"],["Topics in Environmental Ethics","4472","26454,4451","4451"],["Climate Change","4473","4472","4472"],["Environmental Justice","4474","5100,4472","4472"],["Future Generations","4475","4472","4472"],["Nature","4476","4472","4472"],["Pollution","4477","4472","4472"],["Sustainability","4478","4472","4472"],["Wilderness","4479","4472","4472"],["Topics in Environmental Ethics, Misc","4480","4472","4472"],["Professional Ethics","4481","26","26"],["Academic and Teaching Ethics","4482","4481,6235","6235"],["Business Ethics","4483","26","26"],["Marketing Ethics","4484","4483","4483"],["Sales Ethics","4490","27525","27525"],["Whistleblowing","4492","27536","27536"],["Business Ethics, Misc","4493","4483","4483"],["Media Ethics","4494","4481","4481"],["Military Ethics","4495","4481","4481"],["Legal Ethics","4496","4481,4985","4481"],["Professional Ethics, Misc","4497","4481","4481"],["Political Ethics","4498","5161,26","26"],["Criminal Justice Ethics","4499","5100,5088,4498","4498"],["Policing","4500","4499","4499"],["Punishment","4501","4499","4499"],["Capital Punishment","4502","4499,4394","4499"],["Criminal Justice Ethics, Misc","4503","4499","4499"],["Government Ethics","4504","4498","4498"],["International Ethics","4505","4498,5073","4498"],["Famine","4506","4505","4505"],["Global Justice","4507","5100,5089,4505,5073","4505"],["International Ethics, Misc","4508","4505","4505"],["Social Ethics","4509","26","26"],["Family Ethics","4510","4509","4509"],["Childhood","4511","4510,31","4510"],["Parenthood","4512","4510,4441","4510"],["Family Ethics, Misc","4513","4510","4510"],["Friendship","4514","4509","4509"],["Social Ethics, Misc","4515","4509","4509"],["Technology Ethics","4516","26","26"],["Computer Ethics","4517","46,4516","4516"],["Internet Ethics","4518","4517","4517"],["Computer Ethics, Misc","4519","4517","4517"],["Nanotechnology","4520","4516","4516"],["Technology Ethics, Misc","4521","4516","4516"],["Meta-Ethics, Miscellaneous","4522","28","28"],["Moral Judgment","4523","4584,29,28","28"],["Amoralists","4524","4706,4523","4523"],["Internalism and Externalism about Moral Judgment","4525","4523,4584","4523"],["Moral Judgment, Misc","4526","4523","4523"],["Moral Naturalism and Non-Naturalism","4527","28,5583","28"],["Moral Naturalism","4528","4527","4527"],["Moral Nonnaturalism","4529","4536,4527","4527"],["Moral Supervenience","4530","303,4527","4527"],["The Naturalistic Fallacy","4531","4527","4527"],["The Open Question Argument","4532","4527","4527"],["The Is/Ought Gap","4533","4527","4527"],["Moral Naturalism and Non-Naturalism, Misc","4534","4527","4527"],["Moral Realism and Irrealism","4535","28,1362","28"],["Moral Realism","4536","4535","4535"],["Moral Cognitivism","4537","4536,4523","4536"],["Cornell Realism","4538","4536","4536"],["Moral Descriptivism","4539","4536","4536"],["Moral Functionalism","4540","4536","4536"],["Moral Realism, Misc","4541","4536","4536"],["Moral Sensibility Theories","4542","4536","4536"],["Moral Irrealism","4543","4535","4535"],["Moral Emotivism and Sentimentalism","4544","4523,16239,4543","4543"],["Moral Error Theories and Fictionalism","4545","4543","4543"],["Moral Expressivism","4546","4543,4571,4523","4543"],["Moral Irrealism, Misc","4547","4543","4543"],["Moral Noncognitivism","4548","4543,4523","4543"],["Moral Prescriptivism","4549","4543,4571","4543"],["Moral Projectivism","4550","4543","4543"],["Moral Relativism","4551","4543,70758","4543"],["Moral Subjectivism","4552","4543","4543"],["Moral Realism and Irrealism, Miscellaneous","4553","4535","4535"],["Ideal Observer Theories","4554","4553","4553"],["Moral Constructivism","4555","4553,4536","4553"],["Moral Explanation","4556","4553","4553"],["Moral Objectivity","4557","4553","4553"],["Moral Queerness","4558","4553","4553"],["Quasi-Realism","4559","1362,4553","4553"],["Moral Response-Dependence","4560","4553","4553"],["Moral Realism and Irrealism, Misc","4561","4553","4553"],["Moral Epistemology","4562","28,5449","28"],["Moral Coherentism","4563","4562","4562"],["Moral Intuitionism","4564","4562,5370","4562"],["Moral Disagreement","4565","4562","4562"],["Moral Justification","4566","4562,5398","4562"],["Moral Rationalism","4567","4562,5585,4536,5365","4562"],["Moral Skepticism","4568","4562,5522","4562"],["Reflective Equilibrium","4569","4562","4562"],["Moral Epistemology, Misc","4570","4562","4562"],["Moral Language","4571","28","28"],["Moral Semantics","4572","4571","4571"],["Moral Language, Misc","4573","4571","4571"],["Moral Normativity","4574","28,5199","28"],["Ought Implies Can","4575","4640,4574","4574"],["Moral Normativity, Misc","4576","4574","4574"],["Moral Norms","4577","4574","4574"],["Moral Principles","4578","28","28"],["Moral Generalism","4579","4578","4578"],["Moral Generalizations","4580","4578","4578"],["Moral Particularism","4581","4578","4578"],["Moral Principles, Misc","4582","4578","4578"],["Moral Universalizability","4583","4578","4578"],["Moral Reasoning and Motivation","4584","28,6143,29","28"],["Moral Concepts","4585","4584","4584"],["Moral Motivation","4586","4584","4584"],["Moral Rationality","4587","5402,4584","4584"],["Moral Reasons","4588","4584","4584"],["Moral Reasoning and Motivation, Misc","4589","4584","4584"],["Moral Responsibility","4590","28,5992,347","28"],["Control and Responsibility","4591","4590","4590"],["Doing and Allowing","4592","4691,4590","4590"],["Moral Responsibility, Misc","4593","4590","4590"],["Responsibility and Reactive Attitudes","4594","4590,6128","4590"],["Consequentialism","4595","30","30"],["Utilitarianism","4596","4601,4595","4595"],["Act- and Rule-Utilitarianism","4597","4596","4596"],["Varieties of Utilitarianism","4598","4596","4596"],["Objections to Utilitarianism","4599","4596","4596"],["Utilitarianism, Misc","4600","4596","4596"],["Varieties of Consequentialism","4601","4595","4595"],["Agent-Neutral and Agent-Relative Consequentialism","4602","4601","4601"],["Act- and Rule-Consequentalism","4604","4601","4601"],["Maximizing and Satisficing Consequentialism","4605","4601","4601"],["Varieties of Consequentialism, Misc","4606","4601","4601"],["Objections to Consequentialism","4607","4595","4595"],["Aggregation and Consequentialism","4608","4607","4607"],["Demandingness of Consequentialism","4609","4607","4607"],["Self-Effacingness of Consequentalism","4610","4607","4607"],["Usability of Consequentialism","4611","4607","4607"],["Consequentialism, Friendship, and Commitment","4612","4607","4607"],["Objections to Consequentialism, Misc","4613","4607","4607"],["Arguments for Consequentialism","4614","4595","4595"],["Topics in Consequentialism","4615","4595","4595"],["Consequentialism and Teleology","4616","26959,4615","4615"],["Topics in Consequentialism, Misc","4617","4615","4615"],["Consequentialism, Misc","4618","4595","4595"],["Deontological Moral Theories","4619","30","30"],["Kantian Ethics","4620","4619,27840,4628","4619"],["Kant: Categorical Imperative","4621","27885,4620","27885"],["Categorical and Hypothetical Imperatives","4622","4578,4620","4620"],["The Good Will and Moral Worth","4623","4620","4620"],["Contradictions in Conception and in the Will","4624","4620","4620"],["Perfect and Imperfect Duties","4625","4620","4620"],["Objections to Kantian Ethics","4626","4620","4620"],["Kantian Ethics, Misc","4627","4620","4620"],["Varieties of Deontological Moral Theories","4628","4619","4619"],["Divine Command Theories","4629","4628","4628"],["Natural Law Theories","4630","4628","4628"],["Natural Rights Theories","4631","4628","4628"],["Agent-Centered Deontological Theories","4632","4628","4628"],["Patient-Centered Deontological Theories","4633","4628","4628"],["Pluralistic Deontological Theories","4634","4628","4628"],["Varieties of Deontological Moral Theories, Misc","4635","4628","4628"],["Arguments for Deontological Theories","4636","4619","4619"],["Objections to Deontological Moral Theories","4637","4619","4619"],["Paradox of Deontological Constraints","4638","4637,5261","4637"],["Objections to Deontological Moral Theories, Misc","4639","4637","4637"],["Topics in Deontological Moral Theories","4640","4619","4619"],["The Doctrine of Double Effect","4641","4640,4691","4640"],["Conflicts of Duty","4642","4640,4691","4640"],["Deontological Moral Theories, Misc","4643","4619","4619"],["Virtue Ethics","4644","4706,30","30"],["Varieties of Virtue Ethics","4645","4644","4644"],["Agent-Based Virtue Ethics","4646","4645","4645"],["Ethics of Care","4647","4645","4645"],["Eudaimonistic Virtue Ethics","4648","4645","4645"],["Pluralistic Virtue Ethics","4649","4645","4645"],["Sentimentalist Virtue Ethics","4650","4645","4645"],["Varieties of Virtue Ethics, Misc","4651","4645","4645"],["Objections to Virtue Ethics","4652","4644","4644"],["Applicability of Virtue Ethics","4653","4652","4652"],["Virtue Ethics and Moral Relativism","4654","4652","4652"],["Objections to Virtue Ethics, Misc","4655","4652","4652"],["Topics in Virtue Ethics","4656","4644","4644"],["Virtue Ethics and Codifiability","4657","4656","4656"],["Virtue Ethics and Eudaimonia","4658","4656","4656"],["Virtue Ethics and Practical Wisdom","4659","4656","4656"],["Topics in Virtue Ethics, Misc","4660","4656","4656"],["Virtue Ethics, Misc","4661","4644","4644"],["Ethical Theories, Miscellaneous","4662","30","30"],["Anti-Theory","4663","4662","4662"],["Ethical Egoism","4664","4662","4662"],["Moral Contractarianism","4665","5064,4662","4662"],["Moral Contractualism","4666","5064,4662","4662"],["Moral Pluralism","4667","4662,4640","4662"],["Contrasting Ethical Theories","4668","4662","4662"],["Consequentialism and Deontology","4669","4615,4640,4668","4668"],["Consequentialism and Virtue Ethics","4670","4615,4668,4656","4668"],["Deontology and Virtue Ethics","4671","4640,4668,4656","4668"],["Contrasting Ethical Theories, Misc","4672","4668","4668"],["Ethical Theories, Misc","4673","4662","4662"],["Moral Value","4674","4615,28,30,5207","30"],["Theories of Moral Value","4675","4674","4674"],["Buck-Passing Accounts of Moral Value","4676","4675","4675"],["Value Pluralism","4677","4675","4675"],["Theories of Moral Value, Misc","4678","4675","4675"],["Varieties of Moral Value","4679","4674","4674"],["Agent-Relative Value","4680","4679","4679"],["Moral Worth","4681","4679","4679"],["Neutral Value","4682","4679","4679"],["The Good","4683","4679","4679"],["Varieties of Moral Value, Misc","4684","4679","4679"],["Topics in Moral Value","4685","4674","4674"],["Values and Norms","4686","4685,4574","4685"],["Topics in Moral Value, Misc","4687","4685","4685"],["Moral Value, Misc","4688","4674","4674"],["Moral Phenomena","4689","30","30"],["Desert","4690","4689","4689"],["Moral Dilemmas","4691","4689","4689"],["The Trolley Problem","4692","4691","4691"],["Moral Dilemmas, Misc","4693","4691","4691"],["Moral Luck","4694","4689","4689"],["Obligation","4695","4689","4689"],["Promises","4696","4689","4689"],["Suberogation","4697","4689","4689"],["Supererogation","4698","4689","4689"],["Moral Phenomena, Misc","4699","4689","4689"],["Altruism and Psychological Egoism","4700","29","29"],["Ethics and Cognitive Science","4701","29","29"],["Evolution of Morality","4702","5301,4701","4701"],["Neuroscience of Ethics","4703","4701,4437","4701"],["Psychology of Ethics","4704","4701","4701"],["Ethics and Cognitive Science, Misc","4705","4701","4701"],["Moral Character","4706","29","29"],["Integrity","4707","4706","4706"],["Moral Sainthood","4708","4706","4706"],["Skepticism about Character","4709","4701,4706,4652","4706"],["Virtues and Vices","4710","4706,4644","4706"],["Moral Character, Misc","4711","4706","4706"],["Moral States and Processes","4712","29","29"],["Alienation","4713","4712","4712"],["Anger","4714","4712,16236","4712"],["Courage","4715","4712","4712"],["Cruelty","4716","4712","4712"],["Envy","4717","4712","4712"],["Gratitude","4718","4712","4712"],["Guilt and Shame","4719","4712","4712"],["Happiness","4720","4712,16236","4712"],["Hypocrisy","4721","4712","4712"],["Jealousy","4722","4937,4712,16236","4712"],["Kindness","4723","4712","4712"],["Moral Deliberation","4725","4712","4712"],["Moral Intuition","4726","5370,4712","4712"],["Moral Perception","4727","4712","4712"],["Moral Phenomenology","4728","4712","4712"],["Resentment","4729","4712","4712"],["Schadenfreude","4730","4712","4712"],["Empathy and Sympathy","4731","4712","4712"],["Trust","4732","5554,4712","4712"],["Moral States and Processes, Misc","4733","4712","4712"],["Moral Psychology, Misc","4734","29","29"],["Normative Ethics, Miscellaneous","4735","30","30"],["Feminist Ethics","4736","4735,4752","4735"],["Normative Ethics, Misc","4737","4735","4735"],["Philosophy of Gender, Race, and Sexuality","4738","24,26,34","24"],["Feminist Philosophy","4739","4738,6732","4738"],["Varieties of Feminism","4740","4739","4739"],["Analytic Feminism","4741","4740","4740"],["Black Feminism","4742","6607,4740","4740"],["Ecofeminism","4743","4740,4464","4740"],["Continental Feminism","4744","6719,4740","6719"],["Cultural Feminism","4745","4740","4740"],["Feminist Pragmatism","4746","4740,7101","4740"],["Marxist and Socialist Feminism","4747","4740","4740"],["Radical Feminism","4748","4740","4740"],["Separatist Feminism","4749","4740","4740"],["Varieties of Feminism, Misc","4751","4740","4740"],["Feminist Approaches to Philosophy","4752","4739","4739"],["Feminist Aesthetics","4753","4752","4752"],["Feminist Bioethics","4754","4752","4752"],["Feminist History of Philosophy","4755","4752","4752"],["Feminist Metaphysics","4756","4752","4752"],["Feminist Philosophy of Law","4757","4752","4752"],["Feminist Philosophy of Mind","4758","4752","4752"],["Feminist Philosophy of Religion","4759","4752,4283","4752"],["Feminist Social Epistemology","4760","4752","4752"],["Feminist Approaches to Philosophy, Misc","4761","4752","4752"],["Feminist Perspectives on Phenomena","4762","4739","4739"],["Feminism: Pornography","4763","4771","4771"],["Psychoanalytic Feminism","4764","861,4740","4740"],["Feminism: The Family","4765","4771","4771"],["Feminism: The Self","4766","4771","4771"],["Feminism: Reproduction","4767","4771","4771"],["Feminism: Sexuality","4768","4771","4771"],["Feminism: Philosophy of Race","4769","4762","4762"],["Feminist Perspectives on Phenomena, Misc","4770","4762","4762"],["Topics in Feminist Philosophy","4771","4739","4739"],["Feminism: Equality","4772","4771","4771"],["Feminism: Oppression","4773","4771","4771"],["Feminism and Power","4774","4762","4762"],["Objections to Feminism","4775","4777","4777"],["Topics in Feminist Philosophy, Misc","4776","4771","4771"],["Feminist Philosophy, Miscellaneous","4777","4739","4739"],["Philosophy of Gender","4778","4738,4997","4738"],["Conceptions of Sex","4779","4778","4778"],["The Sex/Gender Distinction","4780","4779","4779"],["Biological Conceptions of Sex","4781","4779","4779"],["Eliminativism about Sex","4782","4779","4779"],["Social Conceptions of Sex","4783","4779","4779"],["Conceptions of Sex, Misc","4784","4779","4779"],["Conceptions of Gender","4785","4778","4778"],["Eliminativism about Gender","4786","4785","4785"],["Realism about Gender","4787","4785","4785"],["Gender as Personality","4788","4785","4785"],["Gender as Sexuality","4789","4785","4785"],["Gender as Socialized","4790","4785","4785"],["Gender as Socially Constructed","4791","4785","4785"],["Conceptions of Gender, Misc","4792","4785","4785"],["Conceptions of Womanhood","4793","4778","4778"],["Biological Conceptions of Womanhood","4794","4793","4793"],["Womanhood as a Nominal Kind","4795","4793","4793"],["Womanhood as a Social Collective","4796","4793","4793"],["Womanhood as a Political Kind","4797","4793","4793"],["Conceptions of Womanhood, Misc","4798","4793","4793"],["Gender and Equality","4799","4778","4778"],["Gender and Oppression","4800","4799","4799"],["Science and Gender Equality","4801","4799","4799"],["Sexism","4802","4799","4799"],["Sexual Discrimination","4803","4799","4799"],["Gender and Equality, Misc","4804","4799","4799"],["Transgender Issues","4805","4778","4778"],["Gender Identity Disorder","4806","4805","4805"],["Intersexuality","4807","4805","4805"],["Transgender Issues, Misc","4808","4805","4805"],["Transgender Rights","4809","78709,4805","4805"],["Transgenderism and Postgenderism","4810","4805","4805"],["Transsexuality","4811","4805","4805"],["Topics in the Philosophy of Gender","4812","4778","4778"],["Gender and Race","4813","4812","4812"],["Gender and Multiculturalism","4814","4812","4812"],["Gender Identity","4815","4812","4812"],["Maleness and Masculinity","4816","4812","4812"],["Topics in the Philosophy of Gender, Misc","4817","4812","4812"],["Philosophy of Gender, Misc","4818","4778","4778"],["Philosophy of Race","4819","4738,4997","4738"],["Conceptions of Race","4820","4819,6605","4819"],["Race as a Biological Kind","4821","4820","4820"],["Race as Socially Constructed","4822","4820","4820"],["Race as a Subjective Identity","4823","4820,4849","4820"],["Eliminativism about Race","4824","4820","4820"],["The Normative Role of Race Concepts","4825","4820","4820"],["Pluralism about Race","4826","4820","4820"],["The Metaphysics of Race, Misc","4827","4820","4820"],["Conceptions of Race, Misc","4828","4820","4820"],["The Politics of Race","4829","4819,6605","4819"],["Apartheid","4830","4829","4829"],["Color Blindness and Color Consciousness","4831","4829","4829"],["Interracial Coalitions","4832","4829","4829"],["Race and Civil Rights","4833","5128,4829","4829"],["Race and Democratic Representation","4834","4829","4829"],["Race and Justice","4835","4829","4829"],["Racial Discrimination","4836","4829,4839","4829"],["Racial Inequality","4837","4829","4829"],["The Politics of Race, Misc","4838","4829","4829"],["Racism","4839","4819,6605","4819"],["Cognitive Accounts of Racism","4840","4839","4839"],["Institutional Accounts of Racism","4841","4839","4839"],["Motivational Accounts of Racism","4842","4839","4839"],["Cultural Racism","4843","4839","4839"],["Racism and Psychology","4844","4839","4839"],["Racism and Sexism","4845","4839","4839"],["White Supremacy","4846","4839","4839"],["Xenophobia","4847","4839","4839"],["Racism, Misc","4848","4839","4839"],["Racial Identity","4849","6605,4819","4819"],["Mixed Race","4850","4849","4849"],["Racial Assimilation","4851","4849","4849"],["Racial Passing","4852","4849","4849"],["Racial Solidarity and Unity","4853","4849","4849"],["Racialization","4854","4849","4849"],["Racial Identity, Misc","4855","4849","4849"],["Topics in the Philosophy of Race","4856","6605,4819","4819"],["Critical Race Theory","4857","4856,6620","4856"],["Intersectionality","4858","4856,4771","4856"],["Phenomenology of Race","4859","4856","4856"],["Race and Class","4860","4856","4856"],["Race and Culture","4861","4856","4856"],["Race and Ethnicity","4862","4856","4856"],["Race and Gender","4863","4856","4856"],["Race and IQ","4864","4856","4856"],["Race and Science","4865","4856","4856"],["Topics in the Philosophy of Race, Misc","4866","4856","4856"],["Philosophy of Race, Miscellaneous","4867","4819","4819"],["Philosophy of Sexual Orientation","4868","4738,4997,4916,4509","4738"],["The Nature of Sexual Orientation","4869","4868","4868"],["Essentialism about Sexual Orientation","4870","4869","4869"],["Sexual Orientation as Biological","4871","4869","4869"],["Sexual Orientation as Socially Constructed","4872","4869","4869"],["Sexual Orientation as a Choice","4873","4869","4869"],["The Nature of Sexual Orientation, Misc","4874","4869","4869"],["Sexual Orientations","4875","4868","4868"],["Bisexuality","4876","4875","4875"],["Heterosexuality","4877","4875","4875"],["Homosexuality","4878","4875","4875"],["Lesbianism","4879","4875","4875"],["Sexual Orientations, Misc","4880","4875","4875"],["Homosexuality and Morality","4881","4868","4868"],["Homosexuality and Natural Law","4882","4881","4881"],["Homosexuality and Religion","4883","6824,4881","4881"],["Homosexuality and Morality, Misc","4884","4881","4881"],["Homosexualty, Politics, and the Law","4885","4868","4868"],["Gay Liberation","4886","4885","4885"],["Gay Rights","4887","4885,78709","4885"],["Gay Marriage","4888","4937,4885","4885"],["Homosexuality and Military Service","4889","4885","4885"],["Homosexuality, Politics, and the Law, Misc","4890","4885","4885"],["Queer Theory","4891","4868","4868"],["Topics in the Philosophy of Sexual Orientation","4892","4868","4868"],["Genetics and Sexual Orientation","4893","4892","4892"],["Innateness of Sexual Orientation","4894","5278,4892","4892"],["Sexual Orientation and Choice","4895","4892","4892"],["Outing and Sexual Orientation","4896","4892","4892"],["Topics in the Philosophy of Sexual Orientation, Misc","4897","4892","4892"],["Philosophy of Sexuality","4898","4509,4738","4738"],["The Nature of Sex","4899","4898","4898"],["Defining Sexual Activity","4900","4907,4899","4899"],["Procreative Views of Sex","4901","4899","4899"],["Expressive Views of Sex","4902","4899","4899"],["Love-based Views of Sex","4903","4899","4899"],["Hedonist Views of Sex","4904","4899","4899"],["Normal vs Abnormal Sex","4905","4899","4899"],["The Nature of Sex, Misc","4906","4899","4899"],["Sexual Activities","4907","4898","4898"],["Bestiality","4908","4907","4907"],["Fetishism","4909","4907","4907"],["Flirting and Seduction","4910","4907","4907"],["Incest","4911","4907","4907"],["Masturbation","4912","4907","4907"],["Pedophilia","4913","4907","4907"],["Sadomasochism","4914","4907","4907"],["Sexual Activities, Misc","4915","4907","4907"],["Sexual Phenomena","4916","4898","4898"],["Celibacy","4917","4916","4916"],["Pornography","4918","4916","4916"],["Sex Work and Prostitution","4919","4916","4916"],["Sexual Desire","4920","4916","4916"],["Sexual Perversion","4921","4916","4916"],["Sexual Pleasure","4922","4916","4916"],["Sexual Harassment","4923","4916","4916"],["Sexual Objectification","4924","4916","4916"],["Sexual Phenomena, Misc","4925","4916","4916"],["Sexual Ethics","4926","4898","4898"],["Ethical Theories and Sexual Ethics","4927","4926","4926"],["Natural Law and Sexual Ethics","4928","4926","4926"],["Sexual Consent","4929","4926","4926"],["Sexual Ethics, Misc","4930","4926","4926"],["Philosophy of Love","4931","4712,4898,16236","4898"],["Defining Love","4932","4931","4931"],["Features of Love","4933","4931","4931"],["Theories of Love","4934","4931","4931"],["Varieties of Love","4935","4931","4931"],["Philosophy of Love, Misc","4936","4931","4931"],["Relationships and Marriage","4937","4898","4898"],["Infidelity","4938","4937,4916","4937"],["Marriage, Misc","4939","4937","4937"],["Monogamy and Polygamy","4940","4937","4937"],["Relationships and Marriage, Misc","4941","4937","4937"],["Philosophy of Sexuality, Miscellaneous","4942","4898","4898"],["The Nature of Law and Legal Systems","4943","32","32"],["Interpretivist Theories of Law","4944","4943","4943"],["Legal Positivism","4945","4943","4943"],["Natural Law Theory","4946","4943","4943"],["Legal Realism","4947","4943","4943"],["Mixed Theories of Law","4948","4943","4943"],["Nature of Law, Misc","4949","4943","4943"],["Legal Reasoning and Adjudication","4950","32","32"],["Formalism about Legal Reasoning","4951","4950","4950"],["Realism about Legal Reasoning","4952","4950","4950"],["Indeterminacy of Legal Reasoning","4953","4950,38506","4950"],["Formal Models of Legal Reasoning","4954","4950","4950"],["Legal Reasoning and Adjudication, Misc","4955","4950","4950"],["Legal Authority and Obligation","4956","32","32"],["Legal Authority","4957","4956","4956"],["Political Obligation","4958","5161,4956","4956"],["Obligations in the Law","4959","4956","4956"],["Legal Authority and Obligation, Misc","4960","4956","4956"],["Methodology of Jurisprudence","4961","32","32"],["Descriptive Jurisprudence","4962","4961","4961"],["Normative Jurisprudence","4963","4961","4961"],["Conceptual Analysis in Jurisprudence","4964","4961","4961"],["Naturalism in Jurisprudence","4965","4961,5583","4961"],["Methodology of Jurisprudence, Misc","4966","4961","4961"],["Criminal Law","4967","32","32"],["Punishment in Criminal Law","4968","4967","4967"],["Justification and Excuse in Criminal Law","4969","4967","4967"],["Defenses in Criminal Law","4970","4967","4967"],["Specific Crimes","4971","4967","4967"],["Criminal/Tort Distinction","4972","4967","4967"],["Criminal Law, Misc","4973","4967","4967"],["Private Law","4974","32","32"],["Contracts","4975","4974","4974"],["Torts","4976","4974","4974"],["Property in Law","4977","4974","4974"],["Private Law, Misc","4978","4974","4974"],["Constitutional Law","4979","5050,32","32"],["Constitutionalism","4980","4979","4979"],["Constitutional Interpretation","4981","4979","4979"],["Constitutional Law, Misc","4982","4979","4979"],["International Law","4983","32,5073","32"],["Other Areas of Law","4984","32","32"],["Philosophy of Law, Miscellaneous","4985","32","32"],["Causation in the Law","4986","5670,4985","4985"],["Evidence and Proof in Law","4987","5449,4985","4985"],["Law and Language","4988","6403,4985","4985"],["Philosophy of Law, Misc","4989","4985","4985"],["Culture and Cultures","4990","34","34"],["Cultural Relativism","4991","70758,4990","4990"],["Multiculturalism","4992","4990","4990"],["Multiculturalism and Autonomy","4993","5027,4992","4992"],["Multiculturalism and Feminism","4994","4992","4992"],["Multicultural Liberalism","4995","4992","4992"],["Multiculturalism, Misc","4996","4992","4992"],["Minorities","4997","4990","4990"],["Minority Rights","4998","4997,78709","4997"],["Identity Politics","4999","4997","4997"],["Politics of Recognition","5000","4997","4997"],["Minorities, Misc","5001","4997","4997"],["Cultural Pluralism","5002","4990","4990"],["Culture and Cultures, Misc","5003","4990","4990"],["Equality","5004","34,6215","34"],["Affirmative Action","5005","4829,4778,4997,5004,6620,4819","5004"],["Affirmative Action in Education","5006","5005","5005"],["Arguments for Affirmative Action","5007","5005","5005"],["Arguments against Affirmative Action","5008","5005","5005"],["Affirmative Action, Misc","5009","5005","5005"],["Egalitarianism","5010","5089,5004","5004"],["The Scope of Equality","5011","5010","5010"],["The Value of Equality","5012","5010,48826","5010"],["Equality and Capabilities","5013","5010","5010"],["Equality and Responsibility","5014","5010","5010"],["The Leveling-Down Objection","5015","5010","5010"],["Egalitarianism, Misc","5016","5010","5010"],["Priority and Prioritarianism","5017","5089,5004","5004"],["The Concept of Equality","5018","5004","5004"],["Varieties of Equality","5019","5004","5004"],["Equality of Welfare","5020","5019","5019"],["Equality of Resources","5021","5019","5019"],["Equality of Opportunity","5022","5019","5019"],["Varieties of Equality, Misc","5023","5019","5019"],["Equality, Misc","5024","5004","5004"],["Freedom and Liberty","5025","34","34"],["Coercion","5026","28559","28559"],["Autonomy","5027","5025","5025"],["Autonomy, Misc","5028","5027","5027"],["Specific Freedoms","5029","5025","5025"],["Freedom of Assembly","5030","5128,5029","5029"],["Freedom of Association","5031","5128,5029","5029"],["Freedom of Movement","5032","5029,5128","5029"],["Freedom of Religion","5033","5029,6824","5029"],["Freedom of Speech","5034","5029,5128","5029"],["Freedom of Thought","5035","5029,5128","5029"],["Specific Freedoms, Misc","5036","5029","5029"],["Positive and Negative Freedom","5037","5025","5025"],["Theories of Freedom","5038","6109,5025","5025"],["Freedom and Liberty, Misc","5039","5025","5025"],["Government and Democracy","5040","34","34"],["Democracy","5041","5040","5040"],["Civic Virtue","5042","5041","5041"],["Civil Society","5043","5041","5041"],["Conceptions of Democracy","5044","5041","5041"],["Deliberative Democracy","5045","5041","5041"],["Justification of Democracy","5046","5041","5041"],["Participatory Democracy","5047","5041","5041"],["Representative Democracy","5048","5041","5041"],["Democracy, Misc","5049","5041","5041"],["Government","5050","5040","5040"],["Authoritarianism","5051","5050","5050"],["Paternalism in Government","5052","5050","5050"],["Government, Misc","5053","5050","5050"],["Political Authority","5054","5040,5167","5040"],["Associative Obligations","5055","5054","5054"],["Consensus and Political Authority","5056","5054","5054"],["Consent and Political Authority","5057","5054","5054"],["Democratic Authority","5058","5041,5054","5054"],["Instrumentalism about Political Authority","5059","5054","5054"],["Public Justification","5060","5054","5054"],["Political Legitimacy","5061","5050,5054","5054"],["Political Obedience","5062","5054","5054"],["Political Authority, Misc","5063","5054","5054"],["Social Contract","5064","5040","5040"],["Contractarianism about Political Authority","5065","5064","5064"],["Contractualism about Political Authority","5066","5064","5064"],["Social Contract, Misc","5067","5064","5064"],["Social Choice Theory","5068","5554,5040,6205","5040"],["Arrow's Theorem","5069","5068","5068"],["Condorcet's Paradox","5070","5261,5068","5068"],["Judgment Aggregation","5071","5554,5475,5068","5068"],["Social Choice Theory, Misc","5072","5068","5068"],["International Philosophy","5073","34","34"],["Cosmopolitanism","5074","4856,5073","5073"],["Cultural Cosmopolitanism","5075","5074,4990","5074"],["Economic Cosmopolitanism","5076","5074","5074"],["Moral Cosmopolitanism","5077","5074","5074"],["Political Cosmopolitanism","5078","5074","5074"],["Cosmopolitanism, Misc","5079","5074","5074"],["Globalization","5080","5073","5073"],["Imperialism","5081","5073","5073"],["Intervention","5082","5073,5167","5073"],["International Justice","5083","5073,5100","5073"],["International Order","5084","5073","5073"],["Global Governance","5085","5073","5073"],["International Realism and Neo-Realism","5086","5073","5073"],["International Philosophy, Misc","5087","5073","5073"],["Justice","5088","34","34"],["Distributive Justice","5089","5004,5100,6215,5088","5088"],["Consequentualist Approaches to Distributive Justice","5090","5089","5089"],["Desert and Distributive Justice","5091","5089","5089"],["Libertarian Critique of Distributive Justice","5092","5089","5089"],["Rawls on Distributive Justice","5094","5089","5089"],["The Difference Principle","5095","5094","5094"],["The Original Position","5096","5094","5094"],["Rawls on Distributive Justice, Misc","5097","5094","5094"],["Welfare","5098","5089,4416","5089"],["Distributive Justice, Misc","5099","5089","5089"],["Varieties of Justice","5100","5088","5088"],["Varieties of Justice, Misc","5101","5100","5100"],["Aspects of Justice","5102","5088","5088"],["The Nature of Justice","5103","5102","5102"],["The Priority of Justice","5104","5102","5102"],["The Scope of Justice","5105","5102","5102"],["Aspects of Justice, Misc","5106","5102","5102"],["Justice, Misc","5107","5088","5088"],["Political Theory","5108","34","34"],["Political Views","5109","34","34"],["Anarchism","5110","5054,5109","5109"],["Communitarianism","5111","5109","5109"],["Political Conservatism","5112","5109","5109"],["Political Constructivism","5113","5109","5109"],["Liberalism","5114","5109","5109"],["Liberalism and Liberty","5115","5114","5114"],["Classical Liberalism","5116","5114","5114"],["New Liberalism","5117","5114","5114"],["Political Liberalism","5118","5114","5114"],["Liberalism and Value","5119","5114","5114"],["The Scope of Liberalism","5120","5114","5114"],["Liberalism, Misc","5121","5114","5114"],["Perfectionism","5122","5109","5109"],["Political Libertarianism","5123","5109","5109"],["Republicanism","5124","5109","5109"],["Socialism and Marxism","5125","5109","5109"],["Political Views, Misc","5126","5109","5109"],["Rights","5127","34","34"],["Civil and Political Rights","5128","5127","5127"],["Civil and Political Rights, Misc","5129","5128","5128"],["The Concept of Rights","5130","5127","5127"],["Foundations of Rights","5133","5127","5127"],["Contractarian And Consent Theories","5134","5133","5133"],["Will Versus Interest Theories","5135","5133","5133"],["Consequentialism and Rights","5136","5133","5133"],["The Basis of Rights, Misc","5137","5133","5133"],["Rights and Values","5138","5127","5127"],["Conflicts Among Rights","5139","5138","5138"],["Criticisms of Rights","5140","5138","5138"],["Rights and Equality","5141","5138","5138"],["Rights and Freedom","5142","5138","5138"],["Aspects of Rights, Misc","5143","5138","5138"],["Miscellaneous Rights","5144","4390,5127","5127"],["Children's Rights","5145","78709","78709"],["Environmental Rights","5146","5144","5144"],["Natural Rights","5147","5144","5144"],["Labor Rights","5149","5144","5144"],["Specific Rights, Misc","5150","5144","5144"],["Human Rights","5151","5127,70974,4390","5127"],["Human Rights Law","5152","5151","5151"],["Human Rights Treaties","5153","5151","5151"],["Human Rights, Misc","5154","5151","5151"],["Property Rights","5155","5127,4390","5127"],["Original Appropriation","5156","5155","5155"],["Externalities","5157","5155","5155"],["Self-Ownership","5158","5155","5155"],["Property Rights, Misc","5159","5155","5155"],["Rights, Misc","5160","5127","5127"],["Social and Political Philosophy, Miscellaneous","5161","34","34"],["Exploitation","5162","5161,28559","5161"],["Political Concepts","5163","5161","5161"],["The Political Role of Philosophy","5164","5161","5161"],["Property","5165","5161","5161"],["Social and Political Philosophy, Misc","5166","5161","5161"],["States and Nations","5167","34","34"],["Immigration","5168","5167","5167"],["Nationalism","5169","5167","5167"],["Patriotism","5170","5167","5167"],["Political Power","5171","5167","5167"],["Revolution","5172","5167","5167"],["Secession","5173","5167","5167"],["Sovereignty","5174","5167","5167"],["Statehood","5175","5167","5167"],["States and Nations, Misc","5176","5167","5167"],["War and Violence","5177","4505,34","34"],["Violence","5178","5177","5177"],["Genocide","5179","5151,4394,5178","5178"],["Gun Control","5180","5178","5178"],["Murder","5181","5178","5178"],["Rape","5182","5178,4916","5178"],["Terrorism","5183","5178","5178"],["Torture","5184","5178","5178"],["Violence, Misc","5185","5178","5178"],["War","5186","5177","5177"],["Civil War","5187","5186,5167","5186"],["Conduct of War","5188","5186","5186"],["Deterrence","5189","5186","5186"],["Ethics and Justification of War","5190","5186","5186"],["Just War Theory","5191","5186","5186"],["Nature of War","5192","5186","5186"],["Nuclear War","5193","5186","5186"],["Pacifism","5194","5186","5186"],["Purpose of War","5195","5186","5186"],["War Crimes","5196","5186","5186"],["War, Misc","5197","5186","5186"],["Value Theory, Miscellaneous","5198","24","24"],["Normativity","5199","5198","5198"],["Normativity and Naturalism","5200","5583,5199","5199"],["Normativity, Misc","5201","5199","5199"],["Value","5202","5198","5198"],["Theories of Value","5203","5202","5202"],["Axiology","5204","5203,4685","5203"],["Value Realism","5205","5203","5203"],["Value Relativism","5206","70758,5203","5203"],["Varieties of Value","5207","5202","5202"],["Intrinsic Value","5208","4679,5207","5207"],["Aspects of Value","5210","5202","5202"],["Fact-Value Distinction","5211","4685,5210","5210"],["Incommensurability of Value","5212","4691,4685,5210","5210"],["Intransitivity of Value","5213","4685,5210","5210"],["Aspects of Value, Misc","5214","5210","5210"],["Well-Being","5215","4596,4615,4679,5207,5202","5202"],["Hedonist Accounts of Well-Being","5216","5215,331","5215"],["Desire Satisfaction Accounts of Well-Being","5217","5215,196","5215"],["Objective Accounts of Well-Being","5218","5215","5215"],["Perfectionist Accounts of Well-Being","5219","5215","5215"],["Well-Being, Misc","5220","5215","5215"],["The Meaning of Life","5221","6978","6978"],["Value, Misc","5222","5202","5202"],["Logics","5223","37","37"],["Classical Logic","5224","5223","5223"],["Aristotelian Logic","5225","7007,5224","5224"],["Propositional Logic","5226","5224","5224"],["Predicate Logic","5227","5224","5224"],["Deontic Logic","5228","5223","5223"],["Epistemic Logic","5229","5223,5467","5223"],["Doxastic and Epistemic Logic","5230","5229","5229"],["Inductive Logic","5231","5943,5229","5229"],["Nonmonotonic Logic","5232","5468,5229","5229"],["Higher-Order Logic","5233","5223","5223"],["Second-Order Logic","5234","5233","5233"],["Higher-Order Logic, Misc","5235","5233","5233"],["Modal and Intensional Logic","5236","5223","5223"],["Intensional Modal Logic","5237","5236","5236"],["Modal Logic","5238","5236","5236"],["Provability Logic","5239","5236","5236"],["Quantified Modal Logic","5240","5236","5236"],["Semantics for Modal Logic","5241","5236","5236"],["Nonclassical Logics","5242","5223","5223"],["Free Logic","5243","5242","5242"],["Fuzzy Logic","5244","5242","5242"],["Infinitary Logic","5245","5242","5242"],["Intuitionistic Logic","5246","5242","5242"],["Many-Valued Logic","5247","5242","5242"],["Paraconsistent Logic","5248","5242","5242"],["Quantum Logic","5249","5242,5794","5242"],["Relevance Logic","5250","5242","5242"],["Substructural Logic","5251","5242","5242"],["Temporal Logic","5252","5223,5984","5223"],["Logics, Misc","5253","5223","5223"],["Logical Consequence and Entailment","5254","37","37"],["Logical Expressions","5255","37","37"],["Logical Constants","5256","5255","5255"],["Logical Connectives","5257","5255,6498","5255"],["Variables","5258","6601,5255","5255"],["Paradoxes","5259","37","37"],["Liar Paradox","5260","6658,5259","5259"],["Paradoxes, Misc","5261","5259","5259"],["Logical Semantics and Logical Truth","5262","37","37"],["Logic and Philosophy of Logic, Miscellaneous","5263","37","37"],["Dialetheism","5264","5263","5263"],["Epistemology of Logic","5265","5263,5449","5263"],["Informal Logic","5266","5263","5263"],["Logical Pluralism","5267","5263","5263"],["Logic in Philosophy","5268","5263","5263"],["Model Theory","5269","5263","5263"],["Proof Theory","5270","5263","5263"],["Logic and Philosophy of Logic, Misc","5271","5263","5263"],["Developmental Biology","5272","38","38"],["Developmental Constraints","5273","5272","5272"],["Developmental Modularity","5274","5272","5272"],["Developmental Systems Theory","5275","5272","5272"],["Epigenetic Inheritance","5276","5272,5307","5272"],["Evolutionary Developmental Biology","5277","5272","5272"],["Innateness","5278","5585,5581,5272","5272"],["Nature and Nurture","5279","5272","5272"],["Process Structuralism","5280","5290,5272","5272"],["Developmental Biology, Misc","5281","5272","5272"],["Ecology and Conservation Biology","5282","4472,38","38"],["Biodiversity","5283","5282","5282"],["Ecology and Conservation Biology, Misc","5284","5282","5282"],["Ecosystems","5285","5282","5282"],["Population Ecology","5286","5282","5282"],["Prioritization","5287","5282","5282"],["Reduction in Ecology","5288","5282,5987,27554","5282"],["Evolutionary Biology","5289","38","38"],["Anti-Darwinist Approaches","5290","5289","5289"],["Evolution and Creationism","5291","4261,5290","5290"],["Intelligent Design","5292","4201,5290","5290"],["Punctuated Equilibrium","5293","5290","5290"],["Anti-Darwinist Approaches, Misc","5294","5290","5290"],["Levels and Units of Selection","5295","5289","5289"],["Group Selection","5296","5295","5295"],["Gene Selection","5297","5295","5295"],["The Selfish Gene","5298","5295","5295"],["Organismic Selection","5299","5295","5295"],["Levels and Units of Selection, Misc","5300","5295","5295"],["Evolution of Phenomena","5301","5289","5289"],["Evolution of Altruism","5302","5301","5301"],["Evolution of Complexity","5303","5301","5301"],["Evolution of Culture","5304","5301","5301"],["Sociobiology","5305","5301,390","5301"],["Evolution of Phenomena, Misc","5306","5301","5301"],["Mechanisms of Evolution","5307","5289","5289"],["Genetic Drift","5308","5307","5307"],["Exaptation","5309","5307","5307"],["Heritability","5310","5307","5307"],["Natural Selection","5311","5307","5307"],["Niche Construction","5312","5307","5307"],["Speciation","5313","5307","5307"],["Mechanisms of Evolution, Misc","5314","5307","5307"],["Evolutionary Biology, Miscellaneous","5315","5289","5289"],["Adaptationism","5316","5315","5315"],["Darwinism","5317","5315","5315"],["Epistemology of Evolution","5318","5315","5315"],["Evolutionary Progress","5319","5315","5315"],["Fitness","5320","5315","5315"],["Functions","5321","26959","26959"],["Optimality","5322","5315","5315"],["Evolutionary Biology, Misc","5323","5315","5315"],["Genetics and Molecular Biology","5324","38","38"],["Genetics","5325","5324","5324"],["Classical Genetics","5326","5325","5325"],["Classical and Molecular Genetics","5327","5325","5325"],["Genotypes and Phenotypes","5328","5325","5325"],["Molecular Genetics","5329","5325","5325"],["Population Genetics","5330","5325","5325"],["Reduction in Genetics","5331","5987,5325,27554","5325"],["Genetics, Misc","5332","5325","5325"],["Genes","5333","5324","5324"],["Defining Genes","5334","5333","5333"],["Gene Concepts","5335","5333","5333"],["Genome Project","5336","5333","5333"],["Genetic Determinism","5337","5333","5333"],["Genetic Information","5338","5527,5333","5333"],["Genetic Program","5339","5272,5333","5333"],["Selfish Gene","5340","5333","5333"],["Genes, Misc","5341","5333","5333"],["Molecular Biology, Misc","5342","5324","5324"],["Philosophy of Biology, Miscellaneous","5343","38","38"],["Artificial Life","5344","5681,370,5343","5343"],["Biological Information","5345","5343,5527","5343"],["Biological Modeling","5346","5343","5343"],["Causation in Biology","5347","5343","5343"],["Complexity in Biology","5348","5343","5343"],["Explanation in Biology","5349","28949,5343","5343"],["Life","5350","5343","5343"],["Philosophy of Biology, Misc","5351","5343","5343"],["Vitalism","5352","5343,26959","5343"],["Systematic Biology","5353","38","38"],["Homology","5354","5353","5353"],["Biological Natural Kinds","5355","5353","5353"],["Organisms","5356","5353","5353"],["Populations","5357","5353","5353"],["Species","5358","4472,5353","5353"],["Essentialism about Species","5359","5358,1367","5358"],["Phylogenetic Inference","5360","5358","5358"],["Species Concepts","5361","5358","5358"],["The Metaphysics of Species","5362","5358","5358"],["Systematic Biology, Misc","5363","5353","5353"],["Epistemological Sources","5364","11","11"],["The A Priori","5365","5364","5364"],["Apriority and Necessity","5366","5365","5365"],["The A Priori, Misc","5367","5365","5365"],["The Synthetic A Priori","5368","5365","5365"],["Theories of the A Priori","5369","5365","5365"],["Intuition","5370","5364,329,5589","5364"],["Epistemology of Intuition","5371","5370","5370"],["Cybernetics","5372","370","370"],["Intuition, Misc","5373","5370","5370"],["The Nature of Intuition","5374","5370","5370"],["Reasoning","5375","197,5364","5364"],["Argument","5376","5589,5375","5375"],["Critical Reasoning","5377","5375","5375"],["Deductive Reasoning","5378","5375","5375"],["History of Psychology","5379","5975,847","847"],["Fallacies","5380","5375","5375"],["Psychological Behaviorism","5381","6775,5379","5379"],["Cognitivism in Psychology","5382","5379","5379"],["Inference","5383","5375","5375"],["History of Psychology, Misc","5384","5379","5379"],["The Nature of Reasoning","5385","5375","5375"],["Reasoning, Misc","5386","5375","5375"],["Epistemological Sources, Misc","5387","5364","5364"],["Epistemological States and Properties","5388","11","11"],["The Basing Relation","5389","5388,5438","5388"],["Issues in Psychology","5390","847","847"],["Defeat","5391","5388","5388"],["Parapsychology","5392","5390","5390"],["Entitlement","5393","5388","5388"],["Evidence","5394","5388,5934","5388"],["Evidence and Knowledge","5395","5394","5394"],["Evidence, Misc","5396","5394","5394"],["Ignorance","5397","5388","5388"],["Justification","5398","5388","5388"],["Epistemic Regress","5399","5398,5419,5438","5398"],["Justification, Misc","5400","5398","5398"],["Propositional and Doxastic Justification","5401","5398","5398"],["Rationality","5402","5388","5388"],["Irrationality","5403","5402","5402"],["Psychoanalysis, Misc","5404","861","861"],["Rational Requirements","5405","5402,6145","5402"],["Psychotherapy","5406","861","861"],["Rationality, Misc","5407","5402","5402"],["Psychotherapy and Psychoanalysis, Misc","5408","861","861"],["Psychopathology","5409","394,4437","394"],["Understanding","5410","5388","5388"],["Warrant","5411","5388","5388"],["Transmission of Warrant","5412","5411","5411"],["Warrant, Misc","5413","5411","5411"],["Nativism in Cognitive Science, Misc","5414","388","388"],["Wisdom","5415","5388,4706","5388"],["Epistemological States and Properties, Misc","5416","5388","5388"],["Epistemological Theories","5417","11","11"],["Evolutionary Psychology","5418","390","390"],["Coherentism","5419","5417,5398","5417"],["Coherentism, Misc","5420","5419","5419"],["Evolution of Cognition, Misc","5421","390","390"],["Dogmatism","5422","5417,5398","5417"],["Dogmatism, Misc","5423","5422","5422"],["Dogmatist and Moorean Replies to Skepticism","5424","5422,5538","5422"],["Animal Language","5425","393","393"],["Epistemic Contextualism","5426","5417,6420,5491","5417"],["Animal Cognition, Misc","5427","393","393"],["Contextualist Replies to Skepticism","5428","5426,5538","5426"],["Epistemic Contextualism and Invariantism","5429","5426","5426"],["Representation in Cognitive Science","5430","387,229","387"],["Epistemic Contextualism and Relativism","5431","5426,5435","5426"],["Epistemic Contextualism, Misc","5432","5426","5426"],["Epistemic Contrastivism","5433","5426","5426"],["Epistemic Internalism and Externalism","5434","5417,5398","5417"],["Epistemic Relativism","5435","70758,5554,5417,5491","5417"],["Epistemic Relativism, Misc","5436","5435","5435"],["Evidentialism","5437","5394,5417,5398","5417"],["Foundationalism","5438","5417,5398","5417"],["Foundationalism and Coherentism","5439","5438,5419","5438"],["Foundationalism, Misc","5440","5438","5438"],["Infinitism","5441","5398,5417","5417"],["Reliabilism","5442","5417","5417"],["Reliabilism about Knowledge","5443","5442,5491","5442"],["Reliabilism about Justification","5444","5398,5442","5442"],["Reliabilism, Misc","5445","5442","5442"],["The Generality Problem for Reliabilism","5446","5442","5442"],["Virtue Epistemology","5447","5417","5417"],["Epistemological Theories, Misc","5448","5417","5417"],["Epistemology of Specific Domains","5449","11","11"],["Epistemology of Specific Domains, Misc","5450","5449","5449"],["Epistemology, Miscellaneous","5451","11","11"],["Epistemic Luck","5452","5451,5388","5388"],["Epistemic Paradoxes","5453","5259,5451","5451"],["Epistemic Possibility","5454","5839,5451,5388","5388"],["Epistemology, Misc","5455","5451","5451"],["Feminist Epistemology","5456","5554,5451,4752","5451"],["Evolutionary Epistemology","5457","6001,5451,5301,5417","5451"],["Metaepistemology","5458","5451","5451"],["Naturalized Epistemology","5459","5451","5451"],["Epistemic Normativity","5460","11,5199","11"],["Doxastic Voluntarism","5461","195,5460","5460"],["Epistemic Normativity, Misc","5462","5460","5460"],["Epistemic Norms","5463","5460","5460"],["Epistemic Value","5464","5460,5207","5460"],["Epistemic Virtues","5465","5460","5460"],["Ethics of Belief","5466","195,5460","5460"],["Formal Epistemology","5467","11","11"],["Belief Revision","5468","195,5467","5467"],["AGM Belief Revision Theory","5469","5468","5468"],["Ranking Functions","5470","5468","5468"],["Belief Revision, Misc","5471","5468","5468"],["Causal Reasoning","5472","5670,5467","5467"],["Causal Modeling","5473","5472,5900","5472"],["Causal Reasoning, Misc","5474","5472","5472"],["Formal Social Epistemology","5475","5554,5467","5467"],["Common Knowledge","5476","5475","5475"],["Formal Social Epistemology, Misc","5477","5475","5475"],["Formal Epistemology, Misc","5479","5467","5467"],["Knowledge","5480","11,5388","11"],["Defining Knowledge","5481","5480","5480"],["Defining Knowledge, Misc","5482","5481","5481"],["The Gettier Problem","5483","5481","5481"],["Varieties of Knowledge","5484","5480","5480"],["Knowledge by Acquaintance","5485","5484","5484"],["Knowledge How","5486","5484","5484"],["Knowledge-Wh","5487","5484","5484"],["Analog and Digital Computation","5488","378","378"],["Varieties of Knowledge, Misc","5489","5484","5484"],["Computers","5490","378","378"],["Theories of Knowledge","5491","5480","5480"],["Implementing Computations","5492","378","378"],["Causal Theory of Knowledge","5493","5491","5491"],["Noncomputable Processes","5494","378","378"],["Primitivism about Knowledge","5495","5481,5491","5491"],["Pancomputationalism","5496","378","378"],["Quantum Computation","5497","5794,378","378"],["Theories of Knowledge, Misc","5498","5491","5491"],["Principles of Knowledge","5499","5480","5480"],["Computer Simulation and Virtual Reality","5500","46","46"],["Closure of Knowledge","5501","5499","5499"],["Simulation and Reality","5502","5500","5500"],["Infallibility","5503","5499","5499"],["Are We in a Simulation?","5504","5500,5522","5500"],["Knowability","5505","5499,5453","5499"],["Virtual Reality","5506","5500","5500"],["The KK Principle","5507","5499","5499"],["Luminosity","5508","5499","5499"],["Philosophy of Computation, Miscellaneous","5509","46","46"],["Safety and Sensitivity","5510","5499","5499"],["Computers in Philosophy","5511","5509","5509"],["Principles of Knowledge, Misc","5512","5499","5499"],["Computer Languages","5513","5509","5509"],["Knowledge, Miscellaneous","5514","5480","5480"],["Databases","5515","5509","5509"],["Knowledge, Misc","5516","5514","5514"],["The Internet","5517","5509","5509"],["The Problem of Easy Knowledge","5518","5442,5514","5514"],["Hypertext","5519","5509","5509"],["Skepticism","5520","11","11"],["Programs","5521","5509","5509"],["Varieties of Skepticism","5522","5520","5520"],["Software","5523","5509","5509"],["Brains in Vats","5524","5522","5522"],["Software Verification","5525","5509","5509"],["Cartesian Skepticism","5526","5522","5522"],["Philosophy of Information","5527","46","46"],["Dreams and Skepticism","5528","333,5522","5522"],["Conceptions of Information","5529","5527","5527"],["The Information Economy","5530","5527","5527"],["The Infosphere","5531","5527","5527"],["Information Theory","5532","5527","5527"],["Information Ethics","5533","5527","5527"],["Pyrrhonian Skepticism","5534","5522","5522"],["Physics of Information","5535","5527","5527"],["Varieties of Skepticism, Misc","5536","5522","5522"],["Theory of Computation","5537","46","46"],["Replies to Skepticism","5538","5520","5520"],["The Church-Turing Thesis","5539","5537","5537"],["Abductive Replies to Skepticism","5540","5968,5538","5538"],["Algorithmic Complexity","5541","5537","5537"],["Computability","5542","5537","5537"],["Content Externalist Replies to Skepticism","5543","5538","5538"],["Computational Complexity","5544","5537","5537"],["Fallibilist Replies to Skepticism","5545","5538","5538"],["Theory of Computation, Misc","5546","5537","5537"],["Relevant Alternative Replies to Skepticism","5547","5538","5538"],["Transcendental Replies to Skepticism","5548","5538","5538"],["Epistemology of Mathematics","5549","5449,47","47"],["Replies to Skepticism, Misc","5550","5538","5538"],["Apriority in Mathematics","5551","5365,5549","5549"],["Skepticism, Misc","5552","5520","5520"],["Epistemology of Mathematics, Misc","5553","5549","5549"],["Social Epistemology","5554","11","11"],["Mathematics and the Causal Theory of Knowledge","5555","5549","5549"],["Collective Epistemology","5556","5554,4193","5554"],["Mathematical Intuition","5557","5549,5370","5549"],["Mathematical Proof","5558","5549","5549"],["Epistemology of Disagreement","5559","5554,5475","5554"],["Godel's Theorem","5560","5558","5558"],["Social Epistemology, Misc","5561","5554","5554"],["Computer Proof","5562","5558","5558"],["Testimony","5563","5554,5364","5554"],["Probabilistic Proof","5564","5558","5558"],["Epistemology of Testimony","5565","5563","5563"],["Undecidability","5566","5558","5558"],["Testimony, Misc","5567","5563","5563"],["Mathematical Proof, Misc","5568","5558","5558"],["The Nature of Testimony","5569","5563","5563"],["Revisability in Mathematics","5570","5549","5549"],["Ontology of Mathematics","5571","5894,47,5892","47"],["Epistemology of Philosophy","5572","5449,12","12"],["Mathematical Fictionalism","5573","5571","5571"],["Epistemology of Philosophy, Misc","5574","5572","5572"],["Indeterminacy in Mathematics","5575","5571,38506","5571"],["Metaphilosophical Skepticism","5576","5572,5522","5572"],["Mathematical Nominalism","5577","5571","5571"],["Mathematical Platonism","5578","5571","5571"],["Metaphilosophical Views","5579","12","12"],["Mathematical Structuralism","5580","5571","5571"],["Empiricism","5581","5579,5417","5579"],["Mathematical Neo-Fregeanism","5582","5571","5571"],["Naturalism","5583","5579","5579"],["Indispensability Arguments in Mathematics","5584","5571","5571"],["Rationalism","5585","5365,5579,5417","5579"],["Numbers","5586","5894,5571","5571"],["Metaphilosophical Views, Misc","5587","5579","5579"],["Mathematical Truth","5588","47","47"],["Philosophical Methods","5589","5572,12","12"],["Analyticity in Mathematics","5590","5588","5588"],["Axiomatic Truth","5592","5608,5588","5588"],["Conceptual Analysis","5593","5365,230,6217,5589","5589"],["Objectivity Of Mathematics","5594","5588","5588"],["Experimental Philosophy","5595","5589,12","12"],["Mathematical Truth, Misc","5596","5588","5588"],["Formal Philosophy","5597","5589","5589"],["Set Theory","5598","5263,47,5642","47"],["Linguistic Analysis in Philosophy","5599","5589","5589"],["The Nature of Sets","5600","5598,5894,5571","5598"],["Philosophical Methods, Misc","5601","5589","5589"],["The Iterative Conception of Set","5602","5600","5600"],["Thought Experiments","5603","1369,5589,6025","5589"],["Ontology of Sets","5604","5600","5600"],["Transcendental Arguments","5605","5589","5589"],["The Nature of Sets, Misc","5606","5600","5600"],["Metaphilosophy, Miscellaneous","5607","12","12"],["Axioms of Set Theory","5608","5598","5598"],["Disagreement in Philosophy","5609","5607","5607"],["Kinds of Philosophy","5610","5607","5607"],["The Axiom of Choice","5611","5608","5608"],["The Axiom of Constructibility","5612","5608","5608"],["Metaphilosophy, Misc","5613","5607","5607"],["The Axiom of Determinacy","5614","5608","5608"],["The Nature of Philosophy","5615","5607","5607"],["The Axiom of Infinity","5616","5608","5608"],["The Nature of Analytic Philosophy","5617","5607","5607"],["New Axioms in Set Theory","5618","5608","5608"],["Philosophical Language","5619","5607","5607"],["Philosophical Progress","5620","5607","5607"],["Nonstandard Axiomatizations","5621","5608","5608"],["Traditions in Philosophy","5622","5607","5607"],["Independence Results in Set Theory","5623","5608","5608"],["The Role of Philosophy","5624","5607","5607"],["Axioms of Set Theory, Misc","5625","5608","5608"],["The Value of Philosophy","5626","5607,48826","5607"],["Cardinals and Ordinals","5627","5598","5598"],["The Continuum Hypothesis","5628","5627","5627"],["Large Cardinals","5629","5608,5627","5627"],["Theories of Causation","5630","1359","1359"],["Cardinals and Ordinals, Misc","5631","5627","5627"],["Causal Eliminativism","5632","5630","5630"],["Set Theory as a Foundation","5633","5598","5598"],["Causal Realism","5634","5630","5630"],["Russell's Paradox","5635","5259,5633","5633"],["Causal Reductionism","5636","5630","5630"],["Set Theory and Logicism","5637","5633","5633"],["Counterfactual Theories of Causation","5638","5630","5630"],["Set-Theoretic Constructions","5639","5633","5633"],["Set Theory as a Foundation, Misc","5640","5633","5633"],["Manipulability Theories of Causation","5641","5630","5630"],["Areas of Mathematics","5642","47","47"],["Nomological Theories of Causation","5643","5630","5630"],["Algebra","5644","5642","5642"],["Causal Occasionalism","5645","5630","5630"],["Analysis","5646","5642","5642"],["Process Theories of Causation","5647","5630","5630"],["Category Theory","5648","5642","5642"],["Statistical Theories of Causation","5649","5630","5630"],["Geometry","5650","5642","5642"],["Theories of Causation, Misc","5651","5630","5630"],["Varieties of Causation","5652","1359","1359"],["Number Theory","5653","5642","5642"],["Topology","5654","5642","5642"],["The Direction of Causation","5655","5652","5652"],["Areas of Mathematics, Misc","5656","5642","5642"],["Causal Overdetermination","5657","5652,317","5652"],["Theories of Mathematics","5658","47","47"],["Causal Preemption","5659","5652","5652"],["Logicism in Mathematics","5660","5658","5658"],["Causation by Absences","5661","5652","5652"],["Formalism in Mathematics","5662","5658","5658"],["Downward Causation","5663","317,313,5652","5652"],["Intuitionism and Constructivism","5664","5658","5658"],["Probabilistic Causation","5665","5652","5652"],["Predicativism in Mathematics","5666","5658","5658"],["Mathematical Naturalism","5667","5583,5658","5658"],["Varieties of Causation, Misc","5668","5652","5652"],["Theories of Mathematics, Misc","5669","5658","5658"],["Causation, Miscellaneous","5670","1359","1359"],["Philosophy of Mathematics, Miscellaneous","5671","47","47"],["Causal Relata","5672","5670","5670"],["Explanation in Mathematics","5673","28949,5671","5671"],["Causal Explanation","5674","5670","5670"],["The Infinite","5675","5671","5671"],["The Application of Mathematics","5676","5671","5671"],["Singular Causation","5677","5670","5670"],["Philosophy of Mathematics, Misc","5678","5671","5671"],["Causation, Misc","5679","5670","5670"],["Philosophy of Physical Science","5680","36","36"],["Complex Systems","5681","5680","5680"],["Chance and Objective Probability","5682","1359,5859","1359"],["Chaos","5683","5681","5681"],["Chance and Determinism","5684","5682","5682"],["Complexity","5685","5681","5681"],["Chance and Objective Probability, Misc","5686","5682","5682"],["Nonlinear Dynamics","5687","5681","5681"],["Systems Theory","5688","5681","5681"],["Complex Systems, Misc","5690","5681","5681"],["Philosophy of Chemistry","5691","5680","5680"],["Dispositions and Powers","5692","1359","1359"],["Chemical Bonding","5693","5691","5691"],["Bare Dispositions","5694","5692","5692"],["Chemical Explanation","5695","28949,5691","5691"],["Dispositional and Categorical Properties","5696","1376,5692","5692"],["Chemical Elements and Substances","5698","5691","5691"],["Conditional Analyses","5699","5692","5692"],["Dispositions and Bases","5701","5692","5692"],["Chemical Synthesis","5702","5691","5691"],["Masked Dispositions","5703","5692","5692"],["Powers","5705","5692","5692"],["Structure in Chemistry","5706","5691","5691"],["Dispositions and Powers, Misc","5707","5692","5692"],["Organic Chemistry","5708","5691","5691"],["The Periodic Table","5709","5691","5691"],["Anti-Realism about Laws","5710","1357","1357"],["Quantum Chemistry","5711","5691,5794","5691"],["Best-Systems Analyses","5712","1357","1357"],["Realism in Chemistry","5713","5691","5691"],["Ceteris Paribus Laws","5714","1357","1357"],["Interlevel Relations in Chemistry","5715","5987,5691,27557","5691"],["Humeanism and Nonhumeanism about Laws","5716","1357","1357"],["Philosophy of Chemistry, Misc","5717","5691","5691"],["Lawlikeness","5718","1357","1357"],["Philosophy of Cosmology","5719","5680","5680"],["Laws as Relations between Universals","5720","1357","1357"],["The Early Universe","5721","5719","5719"],["Necessitarianism about Laws","5722","1357","1357"],["The Big Bang","5723","5721","5721"],["Inflation in Cosmology","5725","5721","5721"],["Origin of the Universe","5727","5721","5721"],["Probabilistic Laws","5728","1357,5682","1357"],["The Early Universe, Misc","5729","5721","5721"],["Laws of Nature, Misc","5730","1357","1357"],["Design and Observership in Cosmology","5731","26867,5719","5719"],["Causation, Laws, Etc, Miscellaneous","5732","1359","1359"],["Anthropic Principle","5733","5731","5731"],["Global Metaphysical Theories","5734","13","13"],["Fine-Tuning in Cosmology","5735","26866,4201,5731","5731"],["Multiple Universes","5736","5731","5731"],["Observation in Cosmology","5737","5731","5731"],["Logical Atomism","5738","5734","5734"],["Design and Observership in Cosmology, Misc","5739","5731","5731"],["Monism","5740","1374,5734","5734"],["Philosophy of Cosmology, Miscellaneous","5741","5719","5719"],["Metaphysical Naturalism","5742","5583,5734","5734"],["Extraterrestial Life and Intelligence","5743","5741","5741"],["Phenomenalism","5744","5734,6740","5734"],["Physicalism","5745","5986,5734,5793","5734"],["Why is there Something?","5746","5741","5741"],["Causal Closure of the Physical","5747","317,293,5745","5745"],["Philosophy of Cosmology, Misc","5748","5741","5741"],["Philosophy of Earth Sciences","5749","5680","5680"],["Philosophy of Physics, Miscellaneous","5750","5680","5680"],["Astrophysics","5751","5750","5750"],["Physicalism, Misc","5752","5745","5745"],["Atomic and Molecular Physics","5753","5750","5750"],["Process Philosophy","5754","5734","5734"],["Biophysics","5755","5750","5750"],["Global Metaphysical Theories, Misc","5756","5734","5734"],["Condensed Matter Physics","5757","5750","5750"],["Classical Mechanics","5758","5750","5750"],["Identity","5759","5892","5892"],["Electromagnetism","5760","5750","5750"],["Gauge Theories","5761","5750","5750"],["Contingent Identity","5762","1374,5759","5759"],["Particle Physics","5763","5750","5750"],["Identity of Indiscernibles","5764","5759","5759"],["Solid State Physics","5765","5750","5750"],["String Theory","5766","5750","5750"],["Vague Identity","5767","5759,6706","5759"],["Thermodynamics and Statistical Mechanics","5768","26867,5750,5691","5750"],["The Necessity of Identity","5769","5759","5759"],["Symmetry in Physics","5770","5750","5750"],["Philosophy of Physics, Misc","5771","5750","5750"],["Endurance","5772","1365","1365"],["Philosophy of Physical Science, Misc","5773","5680","5680"],["Occasional Identity","5774","1365","1365"],["Quantum Mechanics","5775","5680","5680"],["Perdurance","5776","1365","1365"],["Interpretation of Quantum Mechanics","5777","5775","5775"],["Relative Identity","5778","5759,1365","1365"],["Bohmian Interpretation","5779","5777","5777"],["Stage Theory","5780","1365","1365"],["Collapse Interpretations","5781","5777","5777"],["Three- and Four-Dimensionalism","5782","1365,1374","1365"],["Copenhagen Interpretation","5783","5777","5777"],["Persistence, Misc","5784","1365","1365"],["Decoherence Interpretations","5785","5777","5777"],["Everett Interpretation","5786","5777","5777"],["Measurement Problem","5787","5777","5777"],["Modal Interpretations","5788","5777","5777"],["Probabilities in Quantum Mechanics","5789","5777,26867","5777"],["Relational Interpretations","5790","5777","5777"],["Transactional Interpretation","5791","5777","5777"],["Interpretations of Quantum Mechanics, Misc","5792","5777","5777"],["Interlevel Metaphysics","5793","13,5986","13"],["Quantum Theories","5794","5775","5775"],["Quantum Chromodynamics","5795","5794","5794"],["Fundamentality","5796","5793","5793"],["Quantum Electrodynamics","5797","5794","5794"],["Interlevel Metaphysics, Misc","5798","5793","5793"],["Quantum Field Theory","5799","5794","5794"],["Quantum Gravity","5800","5794","5794"],["Quantum Theories, Misc","5801","5794","5794"],["Quantum Nonlocality","5802","5775","5775"],["Action at a Distance","5803","5802","5802"],["Bell's Theorem","5804","5802","5802"],["Supervenient Causation","5805","317,303,5652","303"],["Einstein-Podolsky-Rosen","5806","5802","5802"],["Entanglement","5807","5802","5802"],["Quantum Nonlocality, Misc","5808","5802","5802"],["Metaontology, Misc","5809","1361","1361"],["Quantum Mechanics, Miscellaneous","5810","5775","5775"],["Ontological Commitment","5811","1361","1361"],["Ontological Conventionalism and Relativism","5813","1361,70758","1361"],["Quantum Determinism and Indeterminism","5814","5810","5810"],["Ontological Disagreement","5815","1361","1361"],["Quantum Self-Observation","5816","5810","5810"],["Ontological Fictionalism","5817","1361,4354","1361"],["Schrodinger's Cat","5818","5810","5810"],["Ontological Pluralism","5819","1361","1361"],["Uncertainty Principle","5820","5810","5810"],["Ontological Realism","5821","1361,1362","1361"],["Wave-Particle Duality","5822","5810","5810"],["Quantum Mechanics, Misc","5824","5810","5810"],["Space and Time","5825","5680","5680"],["Metaphysics of Spacetime","5826","5825","5825"],["Counterpart Theory","5827","1367","1367"],["Essentialism","5829","1367","1367"],["Causal Theories of Spacetime","5830","5826","5826"],["Essentialism and Quantified Modal Logic","5831","1367","1367"],["Conventionalism about Spacetime","5832","5826","5826"],["Haecceitism","5833","1367","1367"],["Relationism about Spacetime","5834","5826","5826"],["Origins Essentialism","5835","1367","1367"],["Substantivalism about Spacetime","5836","5826","5826"],["Essentialism and De Re Modality, Misc","5837","1367","1367"],["The Hole Argument","5838","5826","5826"],["Varieties of Modality","5839","1371","1371"],["Metaphysics of Spacetime, Misc","5840","5826","5826"],["Conceptual Necessity","5841","5839","5839"],["Special Relativity","5842","5825","5825"],["Logical Necessity","5843","5839","5839"],["Simultaneity","5844","5842","5842"],["Metaphysical Necessity","5845","5839","5839"],["The Twin Paradox","5846","5261,5842","5842"],["Nomological Necessity","5847","1357,5839","5839"],["Special Relativity, Misc","5848","5842","5842"],["Varieties of Modality, Misc","5849","5839","5839"],["General Relativity","5850","5825","5825"],["Theories of Modality","5851","1371","1371"],["Physics of Time","5852","5825,5984","5825"],["Space and Time, Misc","5854","5825","5825"],["Modal Conventionalism","5855","5851","5851"],["Philosophy of Probability","5856","36","36"],["Modal Noncognitivism","5857","5851","5851"],["Modal Primitivism","5858","5851","5851"],["Interpretation of Probability","5859","5856","5856"],["Theories of Modality, Misc","5860","5851","5851"],["Classical Probability","5861","5859","5859"],["Frequentism","5862","5682,5859","5859"],["Conceivability, Imagination, and Possibility","5863","1369,336","1369"],["Logical Probability","5864","5859,5682","5859"],["Counterfactuals and Modal Epistemology","5865","1369","1369"],["Propensities","5866","5859,5682","5859"],["Modal Error","5867","1369","1369"],["Interpretion of Probability, Misc","5868","5859","5859"],["Modal Intuition","5869","1369,5370","1369"],["Mathematics of Probability","5870","5856","5856"],["Modal Empiricism","5871","1369,5581","1369"],["Axioms of Probability","5872","5870","5870"],["Modal Epistemology, Misc","5873","1369","1369"],["Infinitesimals and Probability","5874","5870","5870"],["Modal Rationalism","5875","5365,5585,1369","1369"],["Mathematics of Probability, Misc","5876","5870","5870"],["Modal Skepticism","5877","5522,1369","1369"],["Probabilistic Reasoning","5878","5467,5934,5856,26865","5856"],["Bayesian Reasoning","5879","5878,5935,5900","5878"],["Actualism","5880","1370","1370"],["Bayesian Reasoning, Misc","5881","5879","5879"],["Modal Ersatizism","5882","1370","1370"],["Modal Fictionalism","5883","1370","1370"],["Prior Probabilities","5884","5879","5879"],["Modal Realism","5885","5851,1370","1370"],["The Problem of Old Evidence","5886","5394,5879","5879"],["Probabilistic Principles","5887","5878","5878"],["Impossible Worlds","5888","1370","1370"],["Conditionalization","5889","5887,5879","5887"],["Possible Worlds, Misc","5890","1370","1370"],["Indifference Principles","5891","5887","5887"],["Objects","5892","1379,13","13"],["Scoring Rules","5893","5887","5887"],["Abstract Objects","5894","5892","5892"],["Chance-Credence Principles","5895","5887,5682","5887"],["Bundle Theories","5896","28903","28903"],["The Reflection Principle","5897","5887","5887"],["Updating Principles","5898","5887","5887"],["Coincident Objects","5899","1374","1374"],["Probabilistic Frameworks","5900","5878","5878"],["Material Constitution","5901","1374","1374"],["Mereology","5902","5892","5892"],["Dempster-Shafer Theory","5903","5900","5900"],["Plausibility Theory","5904","5900","5900"],["Mereological Nihilism","5905","5902,1374","5902"],["Probability and AI","5906","5900","5900"],["Problem of the Many","5907","38506,1374","1374"],["Probabilistic Puzzles","5908","5259,5878","5878"],["Stuff","5909","1374","1374"],["Doomsday Argument","5910","5908","5908"],["Mereological Universalism","5911","5902,1374","5902"],["Monty Hall","5912","5908","5908"],["Vague Objects","5913","6706,1374","1374"],["Material Objects, Misc","5914","1374","1374"],["Sleeping Beauty","5915","5908","5908"],["Minor Entities","5916","5892","5892"],["Probabilistic Puzzles, Misc","5917","5908","5908"],["Holes","5918","5916","5916"],["Subjective Probability","5919","5859,5878","5878"],["Reflections","5920","5916","5916"],["Betting Interpretations and Dutch Books","5921","5919","5919"],["Shadows","5922","5916","5916"],["Conditional Probability","5923","5919","5919"],["Minor Entities, Misc","5924","5916","5916"],["Degrees of Belief","5925","5919,195","5919"],["Nonexistent Objects","5926","5892","5892"],["Imprecise Credences","5927","5919","5919"],["Substratum Theories","5928","28903","28903"],["Philosophy of Statistics","5929","5856","5856"],["Objects, Misc","5930","5892","5892"],["Philosophy of Probability, Misc","5931","5856","5856"],["General Philosophy of Science","5932","36","36"],["Facts and States of Affairs","5933","1379","1379"],["Scientific Method","5934","5467,5732,5932,5856","5932"],["Confirmation","5935","5934","5934"],["Confirmation Holism","5937","5935","5935"],["Varieties of Confirmation","5938","5935","5935"],["Paradox of Confirmation","5939","5453,5908,5935","5935"],["Quine-Duhem Thesis","5940","5935","5935"],["Confirmation, Misc","5941","5935","5935"],["Intrinsic and Extrinsic Properties","5942","1376","1376"],["Induction","5943","5934,5375","5934"],["Natural Properties","5944","1376","1376"],["Induction, Misc","5945","5943","5943"],["Properties, Misc","5946","1376","1376"],["Property Nominalism","5947","1376","1376"],["Inductive Reasoning","5948","5943","5943"],["Tropes","5949","1376","1376"],["Inductive Skepticism","5950","5943,5522","5943"],["Universals","5951","1376","1376"],["Justification of Induction","5952","5943","5943"],["New Riddle of Induction","5953","5943,5908","5943"],["Metaphysical Realism","5954","1362","1362"],["Explanation","5955","5732,5932","5932"],["The Model-Theoretic Argument","5956","1362","1362"],["Causal Accounts of Explanation","5957","28947","28947"],["Deductive-Nomological Explanation","5958","28947","28947"],["Realism and Anti-Realism, Misc","5959","1362","1362"],["Unification Accounts of Explanation","5960","28947","28947"],["Semantic Anti-Realism","5961","1362","1362"],["Mechanistic Explanation","5962","28948","28948"],["Narrative Explanation","5963","28948","28948"],["Statistical Explanation","5964","28948","28948"],["Eternalism","5965","1380","1380"],["Pragmatics and Explanation","5966","5973","5973"],["Growing Block Views","5967","1380","1380"],["Inference to the Best Explanation","5968","5973,5934,5375","5973"],["Presentism","5969","1380","1380"],["The Open Future","5970","38506,1380","1380"],["Inference to the Best Explanation, Misc","5971","5968","5968"],["The Passage of Time","5972","1385","1385"],["Explanation, Misc","5973","5955","5955"],["A-Theories of Time","5974","5972","5972"],["History of Science","5975","5932","5932"],["B-Theories of Time","5976","5972","5972"],["General Philosophy of Science, Miscellaneous","5977","5932","5932"],["McTaggart's Argument","5978","5972","5972"],["Demarcation of Science","5979","5981","5981"],["Time and Change","5980","5972","5972"],["Nature of Science","5981","5977","5977"],["The Passage of Time, Misc","5982","5972","5972"],["Pseudoscience","5983","5981","5981"],["Aspects of Time","5984","1385","1385"],["General Philosophy of Science, Misc","5985","5977","5977"],["Interlevel Relations in Science","5986","5932","5932"],["Reduction","5987","5793,5986","5986"],["The Direction of Time","5988","5984","5984"],["Reductionism","5989","5987","5987"],["Aspects of Time, Misc","5990","5984","5984"],["Reduction, Misc","5991","5987","5987"],["Action Theory","5992","14","14"],["Reductive Explanation","5993","5987","5987"],["The Nature of Action","5994","5992","5992"],["Theory Reduction","5995","5987","5987"],["Causal Theory of Action","5996","5994","5994"],["Defining Action","5997","5994","5994"],["The Nature of Action, Misc","5998","5994","5994"],["The Structure of Action","5999","5994","5994"],["Varieties of Action","6000","5992","5992"],["Scientific Change","6001","5934,5932","5932"],["Collective Action","6002","4193,6000","6000"],["Inaction","6003","6000","6000"],["Incommensurability in Science","6004","6013,6001","6001"],["Scientific Change, Misc","6005","6001","6001"],["Trying","6006","6000","6000"],["Scientific Progress","6007","6001","6001"],["Varieties of Action, Misc","6008","6000","6000"],["Scientific Revolutions","6009","6001","6001"],["Explanation of Action","6010","5992","5992"],["Theory Change","6011","6001","6001"],["Explanation of Action, Misc","6012","6010","6010"],["Scientific Language","6013","5932","5932"],["Cognitive Significance in Science","6014","6013","6013"],["Action Theory, Miscellaneous","6015","5992","5992"],["Conceptual Change in Science","6016","6013,6001","6013"],["Action Sentences","6017","6015","6015"],["Operationalism","6018","6013","6013"],["Agency","6019","5992","5992"],["Ramsey Sentences","6020","6013","6013"],["Reference in Science","6021","6013","6013"],["Knowledge of Action","6022","6015","6015"],["Scientific Language, Misc","6023","6013","6013"],["Action Theory, Misc","6024","6015","6015"],["Scientific Practice","6025","5932","5932"],["Intentions","6026","5992","5992"],["Experimentation in Science","6027","6025","6025"],["Measurement in Science","6028","6025","6025"],["Collective Intentions","6029","6026,4193","6026"],["Observation in Science","6030","6025","6025"],["Intentional Action","6031","6000,6026,6015","6026"],["Observables","6032","6030","6030"],["Intentions, Misc","6033","6026","6026"],["The Observation-Theory Distinction","6034","6074,6030","6030"],["Observation, Misc","6035","6030","6030"],["Motivation and Will","6036","5992","5992"],["Prediction in Science","6037","6025","6025"],["Compulsion and Addiction","6038","6036","6036"],["Scientific Discovery","6039","6025","6025"],["Motivation","6040","6036","6036"],["Scientific Instruments","6041","6025","6025"],["The Will","6042","6036,347","6036"],["Simulation in Science","6043","6025","6025"],["Weakness of Will","6044","6036","6036"],["Motivation and Will, Misc","6045","6036","6036"],["Scientific Practice, Misc","6046","6025","6025"],["Scientific Realism","6047","1362,5932","5932"],["Decision-Theoretic Frameworks","6048","1399","1399"],["Varieties of Scientific Realism","6049","6047","6047"],["Causal Decision Theory","6050","6048","6048"],["Convergent Realism","6051","6049,6001","6049"],["Evidential Decision Theory","6052","6048","6048"],["Entity Realism","6053","6049","6049"],["Decision-Theoretic Frameworks, Misc","6054","6048","6048"],["Structural Realism","6055","6049","6049"],["Decision-Theoretic Puzzles","6056","5259,1399","1399"],["Varieties of Scientific Realism, Misc","6057","6049","6049"],["Decision-Theoretic Puzzles, Misc","6058","6056","6056"],["Alternatives to Scientific Realism","6059","6047","6047"],["Newcomb's Problem","6060","6056","6056"],["Constructive Empiricism","6061","6059,5581","6059"],["Scientific Conventionalism","6062","6059","6059"],["St. Petersburg Paradox","6063","6056","6056"],["Natural Ontological Attitude","6064","6059","6059"],["The Toxin Puzzle","6065","6026,6056","6056"],["Scientific Fictionalism","6066","6059","6059"],["Two-Envelope Paradox","6067","6056","6056"],["Social Constructionism about Science","6068","6059","6059"],["Game Theory","6069","1399,6205","1399"],["Instrumentalism","6070","6059","6059"],["Convention and Coordination","6071","6069","6069"],["Alternatives to Scientific Realism, Misc","6072","6059","6059"],["Evolutionary Game Theory","6073","5307,6069","6069"],["Arguments For and Against Scientific Realism","6074","6047","6047"],["Game-Theoretic Principles","6075","6069","6069"],["Convergence and Scientific Realism","6076","6074","6074"],["Game Theory and Ethics","6077","6069","6069"],["Abduction and Scientific Realism","6078","6074,5968","6074"],["Game Theory and Political Philosophy","6079","6069","6069"],["Novel Predictions and Scientific Realism","6080","6074","6074"],["Prisoner's Dilemma","6081","6069","6069"],["Game Theory, Misc","6082","6069","6069"],["Topics in Decision Theory","6083","1399","1399"],["Historical Arguments Against Scientific Realism","6084","6074","6074"],["The Miracle Argument for Scientific Realism","6085","6074","6074"],["Decision Theory and Ethics","6086","6083","6083"],["Arguments For and Against Scientific Realism, Misc","6087","6074","6074"],["Infinite Decision Theory","6088","6083","6083"],["Truth and Verisimilitude","6089","6047","6047"],["Normative and Descriptive Decision Theory","6090","6083","6083"],["Scientific Truth","6091","6089","6089"],["Utility","6092","4596,6083","6083"],["Verisimilitude","6093","6089","6089"],["Topics in Decision Theory, Misc","6094","6083","6083"],["Truth and Verisimilitude, Misc","6095","6089","6089"],["Scientific Realism, Misc","6096","6047","6047"],["Free Will and Science","6097","347","347"],["Sociology of Science","6098","5932,6242,5554","5932"],["Free Will and Genetics","6099","6097","6097"],["Theories and Models","6100","5932","5932"],["Free Will and Neuroscience","6101","396,6097","6097"],["The Nature of Theories","6102","6100","6100"],["Free Will and Physics","6103","6097","6097"],["The Received View of Theories","6104","6102","6102"],["Free Will and Psychology","6105","6097","6097"],["Research Programs","6106","6001,6102","6102"],["Free Will and Science, Misc","6107","6097","6097"],["Semantic View of Theories","6108","6132,6102","6102"],["Theories of Free Will","6109","347","347"],["The Nature of Theories, Misc","6110","6102","6102"],["Agent Causation","6111","5652,6019,6109,5994","6109"],["Theoretical Virtues","6112","5934,6100","6100"],["Compatibilism","6113","6109","6109"],["Aesthetic Virtues in Science","6114","6112","6112"],["Free Will Skepticism","6115","6109","6109"],["Epistemological Conservatism","6116","6112","6112"],["Identification Theories","6117","6019,6109,5994","6109"],["Falsifiability","6118","5981,6112","6112"],["Incompatibilism","6119","6109","6109"],["Nonempirical Virtues","6120","6125,6112","6112"],["Libertarianism about Free Will","6121","6109","6109"],["Simplicity and Parsimony","6122","6112","6112"],["Semi-Compatibilism","6123","6109","6109"],["Theoretical Virtues, Misc","6124","6112","6112"],["Underdetermination of Theory by Data","6125","5394,6074,6100","6100"],["Theories of Free Will, Misc","6126","6109","6109"],["Empirically Equivalent Theories","6127","6125","6125"],["Topics in Free Will","6128","347","347"],["Alternative Possibilities","6129","6128","6128"],["Underdetermination of Theory by Data, Misc","6130","6125","6125"],["Determinism","6131","6128,1380","6128"],["Models and Idealization","6132","6100","6100"],["Fatalism","6133","6128,1380","6128"],["Analogy in Science","6134","6132","6132"],["Free Will and Responsibility","6135","4590,6128","6128"],["Approximation","6136","6132","6132"],["Free Will and Foreknowledge","6137","6128","6128"],["Idealization","6138","6132","6132"],["Models","6139","6132","6132"],["Topics in Free Will, Misc","6140","6128","6128"],["Models and Idealization, Misc","6141","6132","6132"],["Philosophy of Science, Misc","6142","36","36"],["Practical Reason","6143","28,14","14"],["Feminist Philosophy of Science","6144","6142,4752","6142"],["Practical Reason, Misc","6145","6143","6143"],["Philosophy of Anthropology","6146","50","50"],["Decision","6147","6145","6145"],["Philosophy of Economics","6148","50","50"],["Deliberation","6149","6145","6145"],["Areas of Economics","6150","6148","6148"],["Desire and Reason","6151","196,6145","6145"],["Microeconomics","6152","6150","6150"],["Instrumental Reasoning","6153","6145","6145"],["Macroeconomics","6154","6150","6150"],["Econometrics","6156","6150","6150"],["Experimental Economics","6158","6150","6150"],["Practical and Theoretical Reasoning","6159","6145","6145"],["Areas of Economics, Misc","6160","6150","6150"],["Pratical Reason, Misc","6161","6145","6145"],["The Status of Economics","6162","6148","6148"],["Reasons","6163","6143,5388","6143"],["Realism about Economics","6164","6162","6162"],["Internalism and Externalism about Reasons","6165","6163,4584","6163"],["Positivism about Economics","6166","6162","6162"],["Reasons and Causes","6167","6010,317,6163","6163"],["Falsificationism about Economics","6168","6162","6162"],["Reasons and Oughts","6169","6163","6163"],["Formalism about Economics","6170","6162","6162"],["Reasons and Rationality","6171","5402,6163","6163"],["Instrumentalism about Economics","6172","6162","6162"],["Subjective and Objective Reasons","6173","6163","6163"],["Pragmatism about Economics","6174","6162","6162"],["The Status of Economics, Misc","6175","6162","6162"],["Languages","6176","15","15"],["Issues in the Philosophy of Economics","6177","6148","6148"],["Linguistic Convention","6178","6176","6176"],["Causation in Economics","6179","6177","6177"],["Idiolects","6180","6176","6176"],["Economic Institutions","6181","6177","6177"],["Knowledge of Language","6182","5449,6398,6176","6176"],["Economics Imperialism","6183","6177","6177"],["Languages, Misc","6184","6176","6176"],["Empirical Testing in Economics","6185","6177","6177"],["Linguistic Universals","6186","6176,6654","6176"],["Idealization in Economics","6187","6177","6177"],["Private Language","6188","6176","6176"],["Invisible Hand Explanations","6189","6177","6177"],["Public Language","6190","6176","6176"],["Laws in Economics","6191","6177","6177"],["Words","6192","6176,5894","6176"],["Markets","6193","5161,6177","6177"],["Meaning","6194","15","15"],["Models in Economics","6195","6177","6177"],["The Basis of Meaning","6196","6194","6194"],["Naturalism in Economics","6197","5583,6177","6177"],["Deflationary Theories of Meaning","6198","6196","6196"],["Rationality in Economics","6199","6177","6177"],["Reduction in Economics","6201","6177","6177"],["Issues in the Philosophy of Economics, Misc","6203","6177","6177"],["Intention-Based Theories of Meaning","6204","6196","6196"],["Theory in Economics","6205","6148","6148"],["Thought-Based Theories of Meaning","6206","6196","6196"],["Public Choice Theory","6207","6205","6205"],["Use Theories of Meaning","6208","6196","6196"],["Rational Expectations Theory","6209","6205","6205"],["The Basis of Meaning, Misc","6210","6196","6196"],["Aspects of Meaning","6211","6194","6194"],["Social Welfare Theory","6212","6205","6205"],["Speaker Meaning and Semantic Meaning","6213","6341,6211","6211"],["Theory in Economics, Misc","6214","6205","6205"],["Economics and Ethics","6215","6148","6148"],["Aspects of Meaning, Misc","6216","6211","6211"],["Analyticity","6217","6194","6194"],["Economics and Justice","6218","6215","6215"],["Analyticity and A Priority","6219","6217","6217"],["Normative Economics","6220","6215","6215"],["Definitions","6221","6217","6217"],["Values in Economics","6222","6215","6215"],["Synonymy","6223","6217","6217"],["Economics and Ethics, Misc","6224","6215","6215"],["The Analytic-Synthetic Distinction","6225","6217","6217"],["Analyticity, Misc","6226","6217","6217"],["The Nature of Education","6227","31","31"],["Interpretation","6228","6194","6194"],["The Aims of Education","6229","31","31"],["Educational Authority","6231","31","31"],["Philosophy of Education, Misc","6233","31","31"],["The Principle of Charity","6234","6228","6228"],["Philosophy of Teaching","6235","31","31"],["Radical Interpretation","6236","6228","6228"],["Interpretation, Misc","6238","6228","6228"],["Philosophy of Geography","6239","50","50"],["Propositions","6240","6745,1379,191,6194","6194"],["Philosophy of History","6241","50","50"],["Philosophy of Sociology","6242","50","50"],["Pleonastic Propositions","6243","6240","6240"],["Philosophy of Social Science, Miscellaneous","6244","50","50"],["Propositions and Facts","6245","6240","6240"],["Functional Explanation in Social Science","6246","28949,6244","6244"],["Propositions and That-Clauses","6247","6240","6240"],["Holism and Individualism in Social Science","6248","6244","6244"],["Propositions as Sets of Worlds","6249","6240","6240"],["Propositions, Misc","6251","6240","6240"],["Objectivity and Value in Social Science","6252","6244","6244"],["Singular Propositions","6253","6240,6298","6240"],["Rational Choice Theory","6254","6205,6244","6244"],["Structured Propositions","6255","6240,6298","6240"],["Reduction in Social Science","6256","5987,6244","6244"],["The Unity of the Proposition","6257","6240","6240"],["Social Ontology","6258","6244","6244"],["Translation","6259","6194","6194"],["Philosophy of Social Science, Misc","6260","6244","6244"],["The Indeterminacy of Translation","6261","38506,6259","6259"],["Classical Greek Philosophy","6262","52","52"],["Aristotle","6263","6262,52","52"],["Translation, Misc","6264","6259","6259"],["Classical Greek Philosophy, Misc","6265","6262","6262"],["Plato","6266","52,6262","52"],["Socrates","6267","6262","6262"],["Semantic Phenomena","6268","6194,6360","6194"],["Hellenistic and Later Ancient Philosophy","6269","52","52"],["Ambiguity and Polysemy","6270","6268","6268"],["Stoics","6271","6269","6269"],["Compositionality","6272","6268","6268"],["Epicureans","6273","6269","6269"],["Middle Platonists","6274","6269","6269"],["Conventional Implicature","6275","6268,6435","6268"],["Neoplatonists","6276","6269","6269"],["Intensionality and Opacity","6277","6268","6268"],["Academic Skeptics","6278","6269","6269"],["Logical Form","6279","6268","6268"],["Pyrrhonists","6280","6269","6269"],["Nonliteral Meaning","6281","6268","6268"],["Hellenistic and Later Ancient Philosophy, Misc","6282","6269","6269"],["Scope","6283","6268,6629","6268"],["Pre-Socratic Philosophy","6284","52","52"],["Semantic Values","6285","6268","6268"],["Milesians","6286","6284","6284"],["Semantic Phenomena, Misc","6287","6268","6268"],["Pythagoreans","6288","6284","6284"],["Eleatics","6289","6284","6284"],["Fregean Theories of Meaning","6290","6304,6194","6194"],["Anaxagoras","6291","6284","6284"],["Frege's Puzzle","6292","6290,6560,6464","6290"],["Atomists","6293","6284","6284"],["Fregean Sense","6294","6290","6290"],["Sophists","6295","6284","6284"],["Fregean Theories, Misc","6296","6290","6290"],["Pre-Socratic Philosophy, Misc","6297","6284","6284"],["Russellian and Direct Reference Theories of Meaning","6298","6304,6194,6330","6194"],["Ancient Greek and Roman Philosophy, Miscellaneous","6299","52","52"],["Pre-1000 Medieval Philosophy","6300","53","53"],["Augustine","6301","6300","6300"],["Russellian and Direct Reference Theories, Misc","6302","6298","6298"],["Boethius","6303","6300","6300"],["Semantic Theories","6304","6360,6194","6194"],["Pre-1000 Medieval Philosophy, Misc","6305","6300","6300"],["Conceptual Semantics","6306","6304","6304"],["11th/12th Century Philosophy","6307","53","53"],["Event-Based Semantics","6308","6304","6304"],["Peter Abelard","6309","6307","6307"],["Anselm","6310","6307","6307"],["Possible World Semantics","6311","1370,6304","6304"],["Justificationist Semantics","6312","6304","6304"],["Maimonides","6313","6307","6307"],["Roger Bacon","6314","6317","6317"],["11/12th Century Philosophy, Misc","6315","6307","6307"],["Situation Semantics","6316","6304","6304"],["13th/14th Century Philosophy","6317","53","53"],["Truth-Conditional Theories","6318","6304","6304"],["Thomas Aquinas","6319","6317","6317"],["Two-Dimensional Semantics","6320","6304","6304"],["Jean Buridan","6321","6317","6317"],["Type-Theoretic Semantics","6322","6304","6304"],["William of Ockham","6323","6317","6317"],["Semantic Theories, Misc","6324","6304","6304"],["John Duns Scotus","6325","6317","6317"],["Meaning, Misc","6326","6194","6194"],["13th/14th Century Philosophy, Misc","6327","6317","6317"],["Reference","6328","15","15"],["15th/16th Century Philosophy","6329","53","53"],["Theories of Reference","6330","6328,6196","6328"],["Desiderius Erasmus","6331","6329","6329"],["Causal Theories of Reference","6332","6330","6330"],["Niccolo Machiavelli","6333","6329","6329"],["Deflationary Theories of Reference","6334","6330","6330"],["15th/16th Century Philosophy, Misc","6335","6329","6329"],["Descriptive Theories of Reference","6336","6330,6512","6330"],["Medieval and Renaissance Philosophy, Miscellaneous","6337","53","53"],["17th/18th Century Philosophy","6338","51","51"],["Theories of Reference, Misc","6339","6330","6330"],["17th/18th Century British Philosophy","6340","6988,6338","6338"],["Aspects of Reference","6341","6328","6328"],["George Berkeley","6342","6340","6340"],["Francis Bacon","6343","6340","6340"],["Indeterminacy and Inscrutability of Reference","6344","6341,38506","6341"],["Thomas Hobbes","6345","6340","6340"],["Intension and Extension","6346","6341","6341"],["David Hume","6347","6340","6340"],["Nonreferring Expressions","6348","6341","6341"],["Francis Hutcheson","6349","6340","6340"],["Reference Failure","6350","6341","6341"],["John Locke","6351","6340","6340"],["Rigid Designation","6352","6341,6560","6341"],["Isaac Newton","6353","6340","6340"],["Aspects of Reference, Misc","6354","6341","6341"],["Thomas Reid","6355","6340","6340"],["Reference, Misc","6356","6328","6328"],["Adam Smith","6357","6340","6340"],["17th/18th Century British Philosophy, Misc","6358","6340","6340"],["17th/18th Century French Philosophy","6359","6992,6338","6338"],["Semantics","6360","866","866"],["RenÃƒÂ© Descartes","6361","6359","6359"],["Formal Semantics","6362","6360","6360"],["Nicolas Malebranche","6363","6359","6359"],["Generative Semantics","6364","6360","6360"],["Blaise Pascal","6365","6359","6359"],["Lexical Semantics","6366","6360","6360"],["Jean-Jacques Rousseau","6367","6359","6359"],["17th/18th Century French Philosophy, Misc","6368","6359","6359"],["20th Century French Philosophy","6369","6992","6992"],["Semantics, Misc","6370","6360","6360"],["Gottfried Leibniz","6371","7005","7005"],["Other Areas of Linguistics","6372","866","866"],["Immanuel Kant","6373","6720,7005","7005"],["Computational Linguistics","6374","6372","6372"],["18th Century German Philosophy, Misc","6375","7005","7005"],["Historical Linguistics","6376","6372","6372"],["17th/18th Century Philosophy, Miscellaneous","6377","6338","6338"],["Phonology","6378","6372","6372"],["Baruch Spinoza","6379","6377","6377"],["Psycholinguistics","6380","6372","6372"],["Giovanni Battista Vico","6381","6377","6377"],["Sociolinguistics","6382","6372","6372"],["17th/18th Century Philosophy, Misc","6383","6377","6377"],["Other Areas of Linguistics, Misc","6384","6372","6372"],["19th Century American Philosophy","6385","6998,55","55"],["Methodology of Linguistics","6386","866","866"],["Competence and Performance","6388","6386","6386"],["George Herbert Mead","6389","6385,18826","6385"],["Linguistic Intuitions","6390","6386,5370","6386"],["Charles Sanders Peirce","6391","18826,6385","6385"],["Prescriptivism and Descriptivism","6392","6386","6386"],["Josiah Royce","6393","18826,6385","6385"],["Psychological Reality in Linguistics","6394","6386","6386"],["William James","6395","18826,6385","6385"],["Methodology of Linguistics, Misc","6396","6386","6386"],["19th Century American Philosophy, Misc","6397","6385","6385"],["Philosophy of Linguistics, Miscellaneous","6398","866","866"],["19th Century Austrian Philosophy","6399","6984,55","55"],["Franz Brentano","6400","6399","6399"],["Sigmund Freud","6401","6985,6399","6399"],["Ernst Mach","6402","6399","6399"],["Philosophy of Language, Miscellaneous","6403","15","15"],["Alexius Meinong","6404","6399","6399"],["Evolution of Language","6405","5301,6403","6403"],["19th Century Austrian Philosophy, Misc","6406","6399","6399"],["Feminist Philosophy of Language","6407","4752,6403","6403"],["19th Century British Philosophy","6408","6988,55","55"],["Language and Society","6409","6403","6403"],["Jeremy Bentham","6410","6408","6408"],["Francis Herbert Bradley","6411","6408","6408"],["Use and Mention","6412","6403","6403"],["John Stuart Mill","6413","6408","6408"],["Philosophy of Language, Misc","6414","6403","6403"],["Henry Sidgwick","6415","6408","6408"],["Pragmatics","6416","15,6372","15"],["19th Century British Philosophy, Misc","6417","6408","6408"],["Assertion","6418","6416","6416"],["19th Century German Philosophy","6419","6994,55","55"],["Context and Context-Dependence","6420","6416,6268","6416"],["Wilhelm Dilthey","6421","6419","6419"],["Context and Logical Form","6422","6420","6420"],["Johann Gottlieb Fichte","6423","6720,6419","6419"],["Gottlob Frege","6424","6445,6995,6419","6445"],["Semantic Minimalism","6425","6420","6420"],["G. W. F. Hegel","6426","6720,6419","6419"],["The Nature of Context","6427","6420","6420"],["Karl Marx","6428","6419","6419"],["The Scope of Context-Dependence","6429","6420","6420"],["Friedrich Nietzsche","6430","6419","6419"],["Context and Context-Dependence, Misc","6431","6420","6420"],["Friedrich Schelling","6432","6720,6419","6419"],["Discourse Representation","6433","6416","6416"],["Arthur Schopenhauer","6434","6419,6720","6419"],["Implicature","6435","6416","6416"],["19th Century German Philosophy, Misc","6436","6419","6419"],["Conversational Implicature","6437","6435","6435"],["19th Century Philosophy, Miscellaneous","6438","55","55"],["Implicature, Misc","6439","6435","6435"],["SÃƒÂ¸ren Kierkegaard","6440","6438","6438"],["Linguistic Communication","6441","6416","6416"],["19th Century Philosophy, Misc","6442","6438","6438"],["Linguistic Focus","6443","6416","6416"],["Linguistic Force","6444","6416","6416"],["20th Century Analytic Philosophy","6445","56","56"],["Metaphor","6446","6268,6416","6416"],["G. E. M. Anscombe","6447","6445,6989","6445"],["Performatives","6448","6416","6416"],["J. L. Austin","6449","6445,6989","6445"],["Presupposition","6450","6416","6416"],["A. J. Ayer","6451","6445,6989","6445"],["Relevance Theory","6452","6416,6304","6416"],["C. D. Broad","6453","6445,6989","6445"],["Semantics-Pragmatics Distinction","6454","6416,6360","6416"],["Rudolf Carnap","6455","6445,6995","6445"],["Speech Acts","6456","6416","6416"],["Roderick Chisholm","6457","6445,6999","6445"],["Pragmatics, Misc","6458","6416","6416"],["David Lewis","6459","6445,6999","6445"],["Specific Expressions","6460","15,6360","15"],["Donald Davidson","6461","6445,6999","6445"],["Adverbs","6462","6460","6460"],["Paul Feyerabend","6463","6985,6445","6445"],["Attitude Ascriptions","6464","6240,195,6460,6621,191","6460"],["Attitude Ascriptions, Misc","6466","6464","6464"],["Nelson Goodman","6467","6445,6999","6445"],["Desire Ascriptions","6468","6464","6464"],["Thomas Kuhn","6469","6999,6445","6445"],["Fregean Theories of Attitude Ascriptions","6470","6290,6464","6464"],["G. E. Moore","6471","6445,6989","6445"],["Karl Popper","6472","6445,6989,6985","6445"],["Russellian Theories of Attitude Ascriptions","6473","6298,6464","6464"],["W. V. O. Quine","6474","6999,6445","6445"],["Hidden-Indexical Theories of Attitude Ascriptions","6475","6464,6420","6464"],["John Rawls","6476","6999,6445","6445"],["Substitutivity in Attitude Ascriptions","6477","6464","6464"],["Bertrand Russell","6478","6445,6989","6445"],["Conditionals","6479","6460,6498,5257","6460"],["Gilbert Ryle","6480","6445,6989","6445"],["Truth-Conditional Accounts of Indicative Conditionals","6481","6479","6479"],["Wilfrid Sellars","6482","6999,6445","6445"],["Epistemic Accounts of Indicative Conditionals","6483","6479","6479"],["P. F. Strawson","6484","6445,6989","6445"],["Alfred Tarski","6485","6445","6445"],["Pragmatic Accounts of Indicative Conditionals","6486","6479","6479"],["Ludwig Wittgenstein","6487","6445,6985,6989","6445"],["Indicative Conditionals and Conditional Probabilities","6488","6479","6479"],["20th Century Analytic Philosophy, Misc","6489","6445","6445"],["Indicative Conditionals, Misc","6490","6479","6479"],["20th Century Continental Philosophy","6491","56","56"],["Possible-World Theories of Counterfactuals","6492","6554,6479","6479"],["Theodor W. Adorno","6493","6491,6723,6995","6723"],["Subjunctive Conditionals, Misc","6494","6479","6479"],["Hannah Arendt","6495","6491,6727,6995","6491"],["Conditionals, Misc","6496","6479","6479"],["Henri Bergson","6497","6491,6727,6369","6491"],["Connectives","6498","6460","6460"],["Simone de Beauvoir","6499","6491,4744,6369,6721","4744"],["Causal Connectives","6500","6498","6498"],["Gilles Deleuze","6501","6726,6491,6369","6726"],["Explanatory Connectives","6502","6498","6498"],["Jacques Derrida","6503","6726,6491,6369","6726"],["Conjunction","6504","5257,6498","6498"],["Michel Foucault","6505","6726,6491,6369","6726"],["Connectives, Misc","6506","6498","6498"],["Hans-Georg Gadamer","6507","6491,6724,6995","6724"],["Disjunction","6508","5257,6498","6498"],["JÃƒÂ¼rgen Habermas","6509","6723,6491,6995","6723"],["Negation","6510","5257,6498","6498"],["Martin Heidegger","6511","6491,6995,6722","6722"],["Descriptions","6512","6460","6460"],["Edmund Husserl","6513","6995,6722,6491,6985","6722"],["Attributive and Referential Uses of Descriptions","6514","6512","6512"],["Luce Irigaray","6515","4744,6491,6369","4744"],["Descriptions as Predicates","6516","6512","6512"],["Jacques Lacan","6517","6726,6491,6369,28667","28667"],["Emmanuel Levinas","6518","6722,6491,6369","6722"],["Incompleteness of Descriptions","6519","6512","6512"],["Jean-FranÃƒÂ§ois Lyotard","6520","6726,6491,6369","6726"],["Indefinite Descriptions","6521","6512","6512"],["Maurice Merleau-Ponty","6522","6491,6369,6722","6722"],["Presuppositional Account of Descriptions","6523","6512","6512"],["Paul Ricoeur","6524","6491,6369,6724","6724"],["Russell's Theory of Descriptions","6525","6512","6512"],["Jean-Paul Sartre","6526","6491,6369,6721","6721"],["Determiners","6527","6460","6460"],["Max Scheler","6528","6995,6722,6491","6722"],["Articles","6529","6527","6527"],["20th Century Continental Philosophy, Misc","6530","6491","6491"],["20th Century Philosophy, Miscellaneous","6531","56","56"],["Determiners, Misc","6532","6527","6527"],["Ernst Cassirer","6533","6995,6531","6531"],["Numerical Expressions","6534","6527","6527"],["R. G. Collingwood","6535","6531,6989","6531"],["Possessives","6536","6527","6527"],["John Dewey","6537","6531,18826,6999,6385","6531"],["Generics","6538","6460","6460"],["Charles Hartshorne","6539","6531,6999","6531"],["Indexicals and Demonstratives","6540","6460","6460"],["Friedrich Hayek","6541","6531,6985","6531"],["Character and Content","6542","6540,6420","6540"],["Richard Rorty","6543","6531,18826,6999","6531"],["Complex Demonstratives","6544","6540,6527","6540"],["George Santayana","6545","6531,18826,6999","6531"],["Demonstratives, Misc","6546","6540","6540"],["Alfred North Whitehead","6547","6531","6531"],["Direct Reference Theories of Indexicals","6548","6540,6298","6540"],["20th Century Philosophy, Misc","6549","6531","6531"],["Indexicals, Misc","6550","6540","6540"],["The First-Person Pronoun","6551","6540","6540"],["Pure and Impure Indexicals","6552","6540","6540"],["African/Africana Philosophy","6553","58","58"],["Modal Expressions","6554","6460","6460"],["African Philosophy: Topics","6555","30251","30251"],["Epistemic Modals","6556","6554","6554"],["African Philosophy: Metaphysics","6557","6555","6555"],["Modal Expressions, Misc","6558","6554","6554"],["African Philosophy: Aesthetics","6559","6555","6555"],["Names","6560","6573,6460","6460"],["African Philosophy: Ethics","6561","6555","6555"],["Causal Theories of Names","6562","6560","6560"],["African Philosophy: Colonialism and Postcolonialism","6563","6574","6574"],["Demonstrative Theories of Names","6564","6540,6560","6560"],["Descriptive Theories of Names","6566","6560,6512","6560"],["Empty Names","6568","6341,6560","6560"],["African Political Philosophy","6570","6555","6555"],["Millian Theories of Names","6571","6298,6560","6560"],["Areas of African Philosophy, Misc","6572","6555","6555"],["Nouns","6573","6460","6460"],["African Philosophy: Themes","6574","30251","30251"],["Singular Terms","6575","6573","6573"],["General Terms","6577","6573","6573"],["African Philosophy and the African Diaspora","6578","6574","6574"],["Kind Terms","6579","6573","6573"],["African Ethnophilosophy","6580","6574","6574"],["Mass Nouns and Count Nouns","6582","6573","6573"],["Predicates","6583","6460","6460"],["Pan-Africanism","6584","6639,6574","6639"],["Adjectives, Misc","6585","6583","6583"],["Gradable Adjectives","6587","6583","6583"],["African Philosophy: Themes, Misc","6588","6574","6574"],["Predicates and Context-Dependence","6589","6583,6420","6583"],["African Philosophy: History and Traditions","6590","30251","30251"],["Kinds of Predicate","6591","6583","6583"],["Ancient Egyptian Philosophy","6592","6590","6590"],["States, Activities, Accomplishments, Achievements","6593","6621,6583","6583"],["Akan Philosophy","6594","6590","6590"],["Taste Predicates","6595","6583","6583"],["Predicates, Misc","6597","6583","6583"],["Pronouns and Anaphora","6599","6460","6460"],["Quantifiers","6601","6460,5255,6527","6460"],["Generalized Quantifiers","6603","6601","6601"],["African Philosophy: History and Traditions, Misc","6604","6590","6590"],["African-American Philosophy","6605","4819,6553,6998,6736","6553"],["Plural Quantification","6606","6601","6601"],["Movements in African-American Philosophy","6607","6605","6605"],["Quantification and Ontology","6608","1361,6601","6601"],["Black Assimiliationism","6609","6607","6607"],["Quantifier Restriction","6610","6601","6601"],["Unrestricted Quantification","6611","6601","6601"],["Black Conservatism","6612","6607","6607"],["Substitutional Quantification","6613","6601","6601"],["Black Nationalism","6614","6607","6607"],["Black Separatism","6615","6607","6607"],["Questions","6616","6460","6460"],["Quotation","6617","6460","6460"],["Movements in African-American Philosophy, Misc","6618","6607","6607"],["Temporal Expressions","6619","5984,6460","6460"],["Topics in African-American Philosophy","6620","6605","6605"],["Verbs","6621","6460","6460"],["African-American Aesthetics","6622","6620","6620"],["Intensional Transitive Verbs","6623","6621","6621"],["Culture and African-American Philosophy","6624","6620","6620"],["Specific Expressions, Misc","6625","6460","6460"],["Reparations","6626","6620,4829","6620"],["Syntax","6627","15,866","15"],["Self-Respect in African-American Philosophy","6628","6620","6620"],["Syntactic Phenomena","6629","6627","6627"],["Slavery","6630","6620","6620"],["Binding","6631","6629","6629"],["Topics in African-American Philosophy, Misc","6632","6620","6620"],["Ellipsis","6633","6629","6629"],["Grammaticality","6634","6629","6629"],["African-American Philosophy, Misc","6635","6605","6605"],["Afro-Caribbean Philosophy","6636","6553,6736","6553"],["Syntactic Categories","6637","6629","6629"],["Syntactic Phenomena, Misc","6638","6629","6629"],["African/Africana Philosophy, Miscellaneous","6639","6553","6553"],["Syntactic Theories","6640","6627","6627"],["African and African-American Philosophy","6641","6620,6639","6639"],["Government and Binding","6642","6640","6640"],["African Diaspora","6643","6639","6639"],["The Minimalist Program","6644","6640","6640"],["Afro-European Philosophy","6645","6639","6639"],["Nontransformational Grammars","6646","6640","6640"],["Negritude","6647","6620,6639,6574","6639"],["Transformational Grammar","6648","6640","6640"],["Pan-Africanism","6649","6639,6607","6639"],["Universal Grammar","6650","6640,6654","6640"],["African/Africana Philosophy, Misc","6651","6639","6639"],["Syntactic Theories, Misc","6652","6640","6640"],["Asian Philosophy","6653","58","58"],["Linguistic Innateness","6654","5278,388,6398,6627","6627"],["Linguistic Innateness, Misc","6655","6654","6654"],["Poverty of the Stimulus","6656","6654","6654"],["Indian Philosophy","6657","6653","6653"],["Truth","6658","15","15"],["Protophilosophy","6659","6657","6657"],["Theories of Truth","6660","6658","6658"],["Vedic Philosophy","6661","6659","6659"],["Coherence Theory of Truth","6662","6660","6660"],["Upanisadic Philosophy","6663","6659","6659"],["Correspondence Theory of Truth","6664","6660","6660"],["Protophilosophy, Misc","6665","6659","6659"],["Minimalism and Deflationism about Truth","6666","6660","6660"],["Orthodox/Astika Philosophy","6667","6657","6657"],["Pragmatism about Truth","6668","6660,7101","6660"],["Mimamsa","6669","6667","6667"],["Tarskian Theories of Truth","6670","6660","6660"],["Samkhya","6671","6667","6667"],["Theories of Truth, Misc","6672","6660","6660"],["Nyaya","6673","6667","6667"],["Truth, Miscellaneous","6674","6658","6658"],["Vaisesika","6675","6667","6667"],["Relativism about Truth","6676","6674,70758","6674"],["Vedanta","6677","6667","6667"],["Truth Bearers","6678","6674","6674"],["Yoga","6679","6667","6667"],["Truth and Justification","6680","6674","6674"],["Orthodox/Astika Philosophy, Misc","6681","6667","6667"],["Heterodox/Nastika Philosophy","6682","6657","6657"],["Truth, Misc","6683","6674","6674"],["Theravada Buddhist Philosophy","6684","6682","6682"],["Theories of Vagueness","6685","38502","38502"],["Mahayana Buddhist Philosophy","6686","6682","6682"],["Contextual Theories of Vagueness","6687","6685,6420","6685"],["Buddhist Logic","6688","7015,7007,6682","6682"],["Degree Theories of Vagueness","6689","6685","6685"],["Jain Philosophy","6690","6682","6682"],["Epistemic Theories of Vagueness","6691","6685","6685"],["Carvaka Philosophy","6692","6682","6682"],["Incoherentism about Vagueness","6693","6685","6685"],["Heterodox/Nastika Philosophy, Misc","6694","6682","6682"],["Theistic Indian Philosophy","6695","6657","6657"],["Intuitionistic Theories of Vagueness","6696","6685","6685"],["Saiva Siddhanta Philosophy","6697","6695","6695"],["Nihilism about Vagueness","6698","6685","6685"],["Kashmiri Saivism","6699","6695","6695"],["Many-Valued Logic","6700","6685","6685"],["Vaisnavite","6701","6695","6695"],["Supervaluationism","6702","6685","6685"],["Theistic Indian Philosophy, Misc","6703","6695","6695"],["Theories of Vagueness, Misc","6704","6685","6685"],["Indian Linguistic Philosophy","6705","6657","6657"],["Vagueness and Indeterminacy, Misc","6706","38502","38502"],["Vyakarana/Grammar","6707","6705","6705"],["Higher-Order Vagueness","6708","6706","6706"],["Nirukta/Etyomology","6709","6705","6705"],["Sorites Paradox","6710","5259,6706","6706"],["Indian Linguistic Philosophy, Misc","6711","6705","6705"],["Vagueness in Ethics and the Law","6712","4985,6706","6706"],["Indian Aesthetics","6713","6657","6657"],["Indian Political Philosophy","6715","6657,7043","6657"],["Modern Indian Philosophy","6716","6657","6657"],["Indian Philosophy, Misc","6717","6657","6657"],["Tibetan Philosophy","6718","6653","6653"],["Continental Philosophy","6719","58,6728","58"],["German Idealism","6720","6994,6719","6994"],["Existentialism","6721","6719","6719"],["Phenomenology","6722","6719","6719"],["Critical Theory","6723","6719","6719"],["Hermeneutics","6724","6719","6719"],["Continental Structuralism","6725","6719","6719"],["Poststructuralism","6726","6719","6719"],["Continental Philosophy, Misc","6727","6719","6719"],["European Philosophy","6728","58","58"],["Eastern European Philosophy","6729","6728","6728"],["Iberian Philosophy","6730","6728","6728"],["European Philosophy, Misc","6731","6728","6728"],["Philosophical Traditions, Miscellaneous","6732","58","58"],["Australasian Philosophy","6733","6732","6732"],["Polynesian Philosophy","6734","6732","6732"],["Philosophical Traditions, Misc","6735","6732","6732"],["Philosophy of the Americas","6736","58","58"],["Native American Philosophy","6737","6998,6736","6736"],["Latin American Philosophy","6738","6736","6736"],["Philosophy of the Americas, Misc","6739","6736","6736"],["Theories of Consciousness, Misc","6740","153","153"],["Natural Sciences, Misc","6741","71","71"],["Semiotics","6742","79","79"],["Collective Consciousness","6743","172,4193","172"],["Aspects of Consciousness, Misc","6744","172","172"],["The Nature of Contents","6745","190,6304","190"],["Fregean and Russellian Contents","6746","6745","6745"],["First-Person Contents","6747","173,6745","6745"],["Object-Dependent Contents","6748","6745","6745"],["The Nature of Contents, Misc","6749","6745","6745"],["Aspects of Intentionality, Misc","6750","219","219"],["The Concept of Representation","6751","229","229"],["Varieties of Representation","6752","229","229"],["Theories of Representation","6753","229","229"],["Skepticism about Representations","6754","229","229"],["Representation, Misc","6755","229","229"],["Perception-Based Theories of Concepts","6756","230,266","230"],["Inferential Theories of Concepts","6757","230","230"],["Prototype and Exemplar Theories of Concepts","6758","230","230"],["Theory-Based Theories of Concepts","6759","230","230"],["Atomist Theories of Concepts","6760","230","230"],["Theories of Concepts, Misc","6761","230","230"],["Conceptual Change","6762","230","230"],["Concept Possession","6763","230","230"],["Ontology of Concepts","6764","230","230"],["Recognitional Concepts","6765","230","230"],["Concepts, Misc","6766","230","230"],["Science of Perception, Misc","6767","259","259"],["Perception and the Mind, Misc","6768","266","266"],["Dogmatism about Perception","6769","5422,268","268"],["Perceptual Justification","6770","5398,268","268"],["Perception and Knowledge, Misc","6771","268","268"],["Perception and Skepticism","6772","5522,268","268"],["Aspects of Perception","6773","232","232"],["Aspects of Perception, Misc","6774","6773","6773"],["Behaviorism","6775","19","19"],["Behaviorism, Misc","6776","6775","6775"],["Functionalism","6777","19,26959","19"],["Other Psychophysical Relations","6778","27559,19","19"],["Anomalous Monism and Mental Causation","6779","317","317"],["Functionalism and Mental Causation","6780","317","317"],["The Exclusion Problem","6781","317","317"],["Mental Causation, Misc","6782","317","317"],["Epistemology of Mind","6783","16","16"],["Analogy and Other Minds","6784","346","346"],["Abduction and Other Minds","6785","346,5968","346"],["Criteria and Other Minds","6786","346","346"],["Direct Knowledge and Other Minds","6787","346","346"],["Induction and Other Minds","6788","5943,346","346"],["Other Minds, Misc","6789","346","346"],["Private Language and Other Minds","6790","346","346"],["Epistemology of Mind, Misc","6791","6783","6783"],["Epistemology, General Works","6818","5451","5451"],["Metaphysics, General Works","6819","1386","1386"],["Metaphysics, Misc","6820","1386","1386"],["Free Will, Misc","6822","347","347"],["Philosophy of Language, General Works","6823","6403","6403"],["Religion and Society","6824","4251","4251"],["Philosophy of Religion, General Works","6825","4283","4283"],["Philosophy of Religion, Misc","6826","4283","4283"],["Aesthetics, General Works","6827","4379","4379"],["Aesthetics, Misc","6828","4379","4379"],["Applied Ethics, General Works","6829","4380","4380"],["Applied Ethics, Misc","6830","4380","4380"],["Meta-Ethics, General Works","6831","4522","4522"],["Meta-Ethics, Misc","6832","4522","4522"],["Normative Ethics, General Works","6833","4735","4735"],["Feminist Philosophy, General Works","6834","4777","4777"],["Feminist Philosophy, Misc","6835","4777","4777"],["Philosophy of Race, General Works","6836","4867","4867"],["Philosophy of Race, Misc","6837","4867","4867"],["Philosophy of Sexuality, General Works","6838","4942","4942"],["Philosophy of Law, General Works","6839","4985","4985"],["Social and Political Philosophy, General Works","6840","5161","5161"],["Philosophy of Sexuality, Misc","6841","4942","4942"],["Logic and Philosophy of Logic, General Works","6842","5263","5263"],["Philosophy of Biology, General Works","6843","5343","5343"],["Philosophy of AI, General Works","6844","379","379"],["Philosophy of AI, Misc","6845","379","379"],["Philosophy of Computation, Misc","6846","5509","5509"],["Philosophy of Information, Misc","6847","5527","5527"],["Philosophy of Mathematics, General Works","6848","5671","5671"],["Philosophy of Physics, General Works","6849","5750","5750"],["Philosophy of Economics, Misc","6850","6148","6148"],["Philosophy of Social Science, General Works","6851","6244","6244"],["Philosophy of Science, General Works","6852","6142","6142"],["Philosophy of Science, Miscellaneous","6853","6142","6142"],["Philosophy, General Works","6854","4","4"],["Philosophy, Miscellaneous","6855","4","4"],["The Value of Lives","6978","5202","5202"],["Population Ethics","6979","6978","6978"],["The Value of Lives, Misc","6980","6978","6978"],["Computation and Physical Systems, Misc","6981","378","378"],["Computer Simulation and Virtual Reality, Misc","6982","5500","5500"],["Austrian Philosophy","6984","6728","6728"],["20th Century Austrian Philosophy","6985","6984","6984"],["20th Century Austrian Philosophy, Misc","6986","6985","6985"],["Austrian Philosophy, Misc","6987","6984","6984"],["British Philosophy","6988","6728","6728"],["20th Century British Philosophy","6989","6988","6988"],["20th Century British Philosophy, Misc","6990","6989","6989"],["British Philosophy, Misc","6991","6988","6988"],["French Philosophy","6992","6728","6728"],["20th Century French Philosophy, Misc","6993","6369","6369"],["German Philosophy","6994","6728","6728"],["20th Century German Philosophy","6995","6994","6994"],["20th Century German Philosophy, Misc","6996","6995","6995"],["German Philosophy, Misc","6997","6994","6994"],["American Philosophy","6998","6736","6736"],["20th Century American Philosophy","6999","6998","6998"],["20th Century American Philosophy, Misc","7000","6999","6999"],["American Philosophy, Misc","7001","6998","6998"],["19th Century French Philosophy","7002","55,6992","55"],["Auguste Comte","7003","7002","7002"],["19th Century French Philosophy, Misc","7004","7002","7002"],["17th/18th Century German Philosophy","7005","6994,6338","6338"],["German Idealism, Misc","7006","6720","6720"],["History of Logic","7007","37","37"],["History of Logic, Misc","7008","7007","7007"],["Ancient Greek and Roman Logic","7009","61789,7007","61789"],["Ancient Greek and Roman Ethics","7010","7050,61789","61789"],["Ancient Greek and Roman Philosophy, Misc","7011","6299","6299"],["Medieval Logic","7012","28997,7007","28997"],["Medieval Philosophy of Religion","7013","28997","28997"],["Medieval and Renaissance Philosophy, Misc","7014","6337","6337"],["Indian Logic","7015","6657,7007","6657"],["Indian Logic, Misc","7016","7015","7015"],["Averroes","7018","6307,25688","6307"],["Avicenna","7019","25688,6307","6307"],["Medicine and Law","7023","4985,4424","4424"],["Sport","7024","4509","4509"],["Philosophy of Technology, Misc","7025","4516","4516"],["Engineering Ethics","7026","4516,4481","4481"],["The Sublime","7027","4302","4302"],["The Tragic","7028","4302","4302"],["History of Aesthetics","7029","25","25"],["Deception","7030","4509","4509"],["Personality","7031","4706","4706"],["Moral Education","7032","29,31","29"],["Authenticity","7033","4706","4706"],["Forgiveness","7034","4712","4712"],["Hope","7035","4712","4712"],["Tolerance","7036","4712","4712"],["Religious Ethics","7037","4735","4735"],["Buddhist Ethics","7038","7037","7037"],["Christian Ethics","7039","7037","7037"],["Jewish Ethics","7040","7037","7037"],["Islamic Ethics","7041","7037","7037"],["Religious Ethics, Misc","7042","7037","7037"],["History of Political Philosophy","7043","34","34"],["Ancient Greek Political Philosophy","7044","6299,7043","6299"],["17th/18th Century Political Philosophy","7046","6377,7043","6377"],["19th Century Political Philosophy","7047","7043,6438","6438"],["Ethics","7049","5198","5198"],["History of Ethics","7050","7049","7049"],["Chinese Ethics","7051","7050","7050"],["Indian Ethics","7052","6657,7050","6657"],["Japanese Ethics","7053","7050","7050"],["Medieval Ethics","7054","6337,7050","6337"],["17th/18th Century Ethics","7055","6377,7050","6377"],["19th Century Ethics","7056","6438,7050","6438"],["History of Ethics, Misc","7057","7050","7050"],["Ethics and Society","7058","7049","7049"],["Ethics and Culture","7059","7058","7058"],["Ethics and Law","7060","7058","7058"],["Ethics and Religion","7061","7058","7058"],["Ethics and Science","7062","7058","7058"],["Ethics and Society, Misc","7063","7058","7058"],["Ethics, General Works","7064","7049","7049"],["Ethics, Misc","7065","7049","7049"],["Human Ecology","7066","5282,70974","5282"],["Matter","7067","5750","5750"],["Philosophy of Archaeology","7068","50","50"],["Philosophy of Learning","7069","31","31"],["Philosophy of Teaching, Misc","7070","6235","6235"],["Introductions to Logic","7071","5263","5263"],["Philosophy, Introductions and Anthologies","7072","4","4"],["T. H. Green","7073","6408","6408"],["Pragmatism","7101","5579","5579"],["Reasons, Misc","7102","6163","6163"],["Biomedical Ethics, Miscellaneous","7103","4393","4393"],["Biotechnology Ethics","7104","7103,4516","7103"],["Biological Enhancement","7105","7103","7103"],["Biomedical Ethics, Misc","7106","7103","7103"],["Environmental Ethics, Misc","7107","26454,4451","4451"],["Scientific Research Ethics","7108","4481","4481"],["Natural Kinds","7761","1379","1379"],["Descriptions, Misc","7762","6512","6512"],["Names, Misc","7763","6560","6560"],["Nouns, Misc","7764","6573","6573"],["Quantifiers, Misc","7765","6601","6601"],["Verbs, Misc","7766","6621","6621"],["The Paradox of Analysis","10391","6217,5261","6217"],["Causal Theories of Counterfactuals","11146","6479","6479"],["Logic of Conditionals","11147","6479","6479"],["Language Acquisition","11148","6398","6398"],["Dynamic Semantics","11149","6304","6304"],["Moral Imagination","11172","336,4712","4712"],["Aesthetic Imagination","11176","336,4284","4284"],["Objective and Subjective Consequentialism","11177","4601","4601"],["The Scope of Consequentialism","11178","4615","4615"],["Consequentialism and Justice","11179","4615","4615"],["Kripke's Puzzle About Belief","11189","6464,6560","6464"],["Physicalist Theories of Color","11263","273","273"],["Dispositionalist Theories of Color","11264","273","273"],["Primitivist Theories of Color","11265","273","273"],["Theories of Color, Misc","11266","273","273"],["Color Realism","11267","273","273"],["Color Irrealism","11268","273","273"],["Color Terms","11269","273","273"],["Color, Misc","11270","273","273"],["Special Science Laws","11481","1357","1357"],["Dispositions and Laws","11482","1357,5692","5692"],["Causation and Laws","11483","1357,5670","5670"],["Explanation and Laws","11484","1357,5973","5973"],["Actualism and Possibilism in Ethics","11486","4662","4662"],["Verificationist Theories of Meaning","11566","6196","6196"],["Humeanism and Nonhumeanism about Chance","11567","5682","5682"],["Humean Supervenience","11569","5732,5734","5734"],["Causation, Laws, Etc, Misc","11571","5732","5732"],["Definition of Literature","11712","4353","4353"],["Ontology of Literature","11713","4353","4353"],["Literature and Emotion","11714","4353","4353"],["Literary Interpretation","11715","4353","4353"],["Literary Values","11716","48826,4353","4353"],["Norms of Assertion","12648","6418,5460","6418"],["Assertion, Misc","12650","6418","6418"],["Moore's Paradox","12651","195,6418,5261","6418"],["Higher-Order Theories of Consciousness","12729","153","153"],["Higher-Order Perception Theories of Consciousness","12731","12729","12729"],["Higher-Order Theories of Consciousness, Misc","12732","12729","12729"],["Science and Values","12816","6001,6025","6025"],["Scientific Representation","12817","6132,6013","6013"],["Nature of Science, Misc","12872","5981","5981"],["Unity of Science","12873","5981,5986","5986"],["Scientific Method, Misc","12874","5934","5934"],["Hypothetico-Deductive Method","12877","12874","12874"],["Scientific Metamethodology","12878","12874","12874"],["Scientific Method, Miscellaneous","12879","12874","12874"],["Collective Responsibility","15212","4590,4193","4590"],["Responsibility in Applied Ethics","15213","4590,4381","4381"],["Psychopathology and Responsibility","15216","4590,5409","4590"],["Polish Philosophy","16234","6728","6728"],["Theories of Emotion","16235","332","332"],["Varieties of Emotion","16236","332","332"],["Aspects of Emotion","16237","332","332"],["Emotions, Misc","16238","332","332"],["Moral Emotion","16239","16236,29,332","29"],["Responsibility and Emotion","16240","16239","16239"],["Moral Emotion, Misc","16241","16239","16239"],["Somatic and Feeling Theories of Emotion","16243","16235","16235"],["Perceptual Theories of Emotion","16244","16235","16235"],["Aspects of Emotion, Misc","16245","16237","16237"],["Varieties of Emotion, Misc","16246","16236","16236"],["Animal Emotion","16248","393,16238","393"],["Psychopathology and Emotion","16249","16238,5409","5409"],["Knowledge of Emotion","16250","16237","16237"],["Cyborgs","16259","370","370"],["Transhumanism","16260","370,70974","370"],["Emotional Expression","16439","16237","16237"],["American Pragmatism","18826","7101,6998","6998"],["Stanley Cavell","18828","6531,6999","6531"],["American Pragmatism, Misc","18829","18826","18826"],["Pragmatism, Misc","18830","7101","7101"],["19th Century American Pragmatism, Misc","18831","6385,18826","18826"],["20th Century American Pragmatism, Misc","18832","18826,6999","18826"],["The Consequence Argument","18850","6128","6128"],["Speech Reports","18851","6464,6460","6460"],["Counterpossible Conditionals","19041","6479","6479"],["Indicative vs Subjunctive Conditionals","19042","6479","6479"],["The Singularity","19613","370","370"],["Mind Uploading","19614","370,32447","370"],["Literature and Knowledge","20085","4353","4353"],["Literature and Ethics","20086","4353","4353"],["Ethics of Artificial Intelligence","23808","4517,370,4516","370"],["Computational Philosophy","23809","5589,5509","5589"],["Desire and Motivation","23982","6145,196","196"],["Higher-Order Desire","23983","196","196"],["Machine Ethics","23984","4517,370,4516","370"],["17th/18th Century Logic","24104","7007,6377","6377"],["19th Century Logic","24105","7007,6438","6438"],["20th Century Logic","24106","7007,6531","6531"],["Aristotelian Commentators","25169","6269","6269"],["Neo-Kantianism","25171","27900,6731","6731"],["Empedocles","25553","6284","6284"],["Heraclitus","25554","6284","6284"],["Socratics","25555","6262","6262"],["Joint Attention","25640","4148,4193","4148"],["Collective Mentality, Misc","25641","4193","4193"],["Ralph Waldo Emerson","25683","6385","6385"],["Al-Kindi","25684","25688,6300","6300"],["Al-Farabi","25685","25688,6300","6300"],["Al-Ghazali","25686","25688,6307","6307"],["Ibn Tufayl","25687","25688,6307","6307"],["Medieval Arabic and Islamic Philosophy","25688","6337,60","60"],["Mathematical Logic","26250","5263,97","97"],["Decision Theory and Hypothesis Testing","26412","6083","6083"],["Normative and Descriptive Game Theory","26413","6069","6069"],["Preferences in Decision Theory","26414","6083","6083"],["Environmental Philosophy","26454","38","38"],["Environmental Philosophy, Misc","26455","26454","26454"],["Existence","26837","1379","1379"],["Ontological Categories","26838","1379","1379"],["Composition as Identity","26839","1374,5902,5759","5902"],["Mereology, Misc","26840","5902","5902"],["Philosophy Through Film","26844","4329","4329"],["Applications of Probability","26865","5856","5856"],["Probability in the Philosophy of Religion","26866","4251,26865","26865"],["Probability in the Physical Sciences","26867","5773,26865","26865"],["Probability in the Philosophy of Religion, Misc","26868","26866","26866"],["Probability in the Physical Sciences, Misc","26869","26867","26867"],["Applications of Probability, Misc","26870","26865","26865"],["Philosophy of Physical Science, Miscellaneous","26871","5773","5773"],["Imre Lakatos","26902","6445","6445"],["Applications of Science","26903","6025","6025"],["Aesthetic Education","26904","4301","4301"],["Aesthetic Interpretation","26905","4284","4284"],["Aesthetic Knowledge","26906","5449,4284","4284"],["Logical Empiricism","26924","5977,5581,6445","6445"],["Empiricism, Misc","26925","5581","5581"],["Rationalism, Misc","26926","5585","5585"],["Naturalism, Misc","26927","5583","5583"],["Biology and Society","26949","5343","5343"],["History of Biology","26950","5343,5975","5343"],["Concepts of Other Minds","26952","346","346"],["Aesthetics and Psychoanalysis","26958","4284","4284"],["Teleology and Function","26959","38","38"],["Teleology","26960","26959","26959"],["Teleology and Function, Misc","26961","26959","26959"],["Aesthetic Realism","26962","4296","4296"],["Volitional Theories of Action","26987","5994","5994"],["Noncausal Theories of Action","26988","5994","5994"],["Volition","26989","6026,6036","6036"],["Autonomy and Agency","27001","6019","6019"],["Agency, Misc","27002","6019","6019"],["Conditional Assertion","27044","6479,6418","6479"],["Scientific Essentialism","27045","1367","1367"],["Hypercomputation","27054","378,5537","5537"],["Internal Realism","27069","1362","1362"],["Experience of Temporal Passage","27085","5972,178","178"],["The Specious Present","27086","178","178"],["Temporal Experience, Misc","27087","178","178"],["Self-Consciousness, Misc","27178","173","173"],["Functionalism and Self-Consciousness","27179","173","173"],["Immunity to Error through Misidentification","27180","173","173"],["Self-Consciousness in Experience","27200","173","173"],["Self-Consciousness in Action","27201","6015,173","173"],["Narrative Identity","27202","32453","32453"],["Inorganic Chemistry","27352","5691","5691"],["Chemical Atomism","27353","5691","5691"],["History of Chemistry","27354","5691,5975","5691"],["Chemical Instrumentation","27355","5691","5691"],["Accounting Ethics","27502","4483","4483"],["Ethical Audits","27503","27502","27502"],["Social and Environmental Reporting","27504","27502","27502"],["Accounting Ethics, Misc","27505","27502","27502"],["Context of Business Ethics","27506","4483","4483"],["Business Ethics and Non-Governmental Organizations","27507","27506","27506"],["Business Ethics and Public Policy","27508","27506","27506"],["Business Ethics and Religion","27509","27506","27506"],["Business Ethics and Societal Culture","27510","27506","27506"],["Context of Business Ethics, Misc","27511","27506","27506"],["Financial Ethics","27512","4483","4483"],["Ethics of Executive Remuneration","27513","27512","27512"],["Ethics of Mergers and Acquisitions","27514","27512","27512"],["Insider Trading","27515","27512","27512"],["Shareholder Activism","27516","27512","27512"],["Socially Responsible Investment","27517","27512","27512"],["Financial Ethics, Misc","27518","27512","27512"],["Foundations of Business Ethics","27519","4483","4483"],["Moral Theory and Business Ethics","27520","27519","27519"],["Narratives in Business Ethics","27521","27519","27519"],["The Possibility of Business Ethics","27522","27519","27519"],["Stakeholder Theory","27523","27519","27519"],["Foundations of Business Ethics, Misc","27524","27519","27519"],["Management Ethics","27525","4483","4483"],["Bluffing and Fraud in Business","27526","27525","27525"],["Corporate Philanthropy","27527","27525","27525"],["Corruption in Business","27528","27525","27525"],["Ethical Leadership","27529","27525","27525"],["International Management Ethics","27530","27525","27525"],["Management Ethics, Misc","27531","27525","27525"],["Moral Reasoning in Business","27532","27506","27506"],["Organizational Ethics","27536","4483","4483"],["Corporate Ethical Climate","27537","27536","27536"],["Corporate Codes of Ethics","27538","27536","27536"],["Corporate Ethics Training","27539","27536","27536"],["Corporate Ethics Officers","27540","27536","27536"],["Corporate Ethics Programs, Misc","27541","27536","27536"],["Ethical Design of Organizations","27542","27536","27536"],["Organizational Ethics, Misc","27543","27536","27536"],["Teaching Business Ethics","27544","4493","4493"],["Business Ethics Consulting","27545","4493","4493"],["Business Ethics, Miscellaneous","27546","4493","4493"],["Advertising Ethics","27547","4484","4484"],["Consumer Ethics","27548","4484","4484"],["Corporate Ethical Reputation","27549","4484","4484"],["Stakeholder Expectations of Business","27550","4484","4484"],["Marketing Ethics, Misc","27551","4484","4484"],["Interlevel Relations in Biology","27553","38,5986","38"],["Reduction in Biology","27554","27553,5987","27553"],["Reduction in Biology, Misc","27555","27554","27554"],["Interlevel Relations in Biology, Misc","27556","27553","27553"],["Interlevel Relations in Physical Science","27557","5773,5986","5773"],["Interlevel Relations in Physical Science, Misc","27558","27557","27557"],["Interlevel Relations in Cognitive Science","27559","387,5986","387"],["Interlevel Relations in Cognitive Science, Misc","27560","27559","27559"],["Concepts of Emergence","27562","313","313"],["Emergence, Misc","27563","313","313"],["Psychophysical Emergence","27564","313,6778","6778"],["Emergence in Biology","27565","313,27553","27553"],["Emergence in Cognitive Science","27566","27559,313","27559"],["Emergence in Physical Science","27567","313,27557","27557"],["Reduction in Physical Science","27568","27557","27557"],["Kant: Metaphysics and Epistemology","27834","6373","6373"],["Kant: Science, Logic, and Mathematics","27837","6373","6373"],["Kant: Teleology","27838","6373","6373"],["Kant: Ethics","27840","6373","6373"],["Kant: Social, Political, and Religious Thought","27841","6373","6373"],["Kant: Aesthetics","27842","6373","6373"],["Kant's Works","27843","6373","6373"],["Kant: Metaphysics","27844","27834","27834"],["Kant: Philosophy of Mind","27845","27834","27834"],["Kant: Apperception and Self-Consciousness","27846","27845","27845"],["Kant: The Self","27847","27845","27845"],["Kant: Space","27849","27844","27844"],["Kant: Time","27850","27844","27844"],["Kant: Transcendental Idealism","27851","27844","27844"],["Kant: Causation","27852","27844","27844"],["Kant: Ontology","27853","27844","27844"],["Kant: Modality","27854","27844","27844"],["Kant: The Critique of Traditional Metaphysics","27855","27844","27844"],["Kant: Rational Psychology","27856","27855","27855"],["Kant: Rational Cosmology","27857","27855","27855"],["Kant: Rational Theology","27858","27879,27855","27855"],["Kant: Judgment","27859","27871,27860,27845","27845"],["Kant: Epistemology","27860","27834","27834"],["Kant: Categories","27861","27859","27859"],["Kant: Schematism","27862","27859","27859"],["Kant: Assent","27863","27845,27860","27860"],["Kant: Justification","27864","27860","27860"],["Kant: Cognition and Knowledge","27865","27860","27860"],["Kant: Skepticism","27866","27860","27860"],["Kant's Scientific Work","27867","27837,27843","27843"],["Kant: Philosophy of Science","27868","27837","27837"],["Kant: Philosophy of Mathematics","27869","27837","27837"],["Kant: Philosophy of Logic","27871","27837","27837"],["Kant: Beauty","27872","27842","27842"],["Kant: The Sublime","27873","27842","27842"],["Kant: Aesthetic Judgment","27874","27842","27842"],["Kant: Hermeneutics","27875","27842","27842"],["Kant: Aesthetics, Misc","27876","27842","27842"],["Kant: Anthropology","27877","27841","27841"],["Kant: Philosophy of History","27878","27841","27841"],["Kant: Philosophy of Religion","27879","27841","27841"],["Kant: War and Peace","27880","27841","27841"],["Kant: Teleology in Science","27881","27838","27838"],["Kant: Teleology in Religion","27882","27838,27879","27838"],["Kant: Teleology in Aesthetics","27883","27838","27838"],["Kant: Teleology in History and Politics","27884","27838","27838"],["Kant: Normative Ethics","27885","27840","27840"],["Kant: Meta-Ethics","27886","4620,27840","27840"],["Kant: Philosophy of Law","27887","27840","27840"],["Kant: Philosophy of Gender, Race, and Sexuality","27888","27840","27840"],["Kant's Works in Pre-Critical Philosophy","27889","27843","27843"],["Kant's Works in Theoretical Philosophy","27890","27843,27834","27843"],["Kant's Works in Practical Philosophy","27891","27843,27840","27843"],["Kant's Works in Aesthetics","27892","27843,27842","27843"],["Kant's Unpublished Works","27893","27843","27843"],["Kant's Correspondence","27894","27893","27893"],["Kant's Lectures","27895","27893","27893"],["Kant's Unpublished Notes","27896","27893","27893"],["Kant, Misc","27900","6373","6373"],["Kant: Philosophy of Language","28073","27834","27834"],["Kant: Metaphysics, Misc","28074","27844","27844"],["Kant: Philosophy of Mind, Misc","28075","27845","27845"],["Kant: Epistemology, Misc","28076","27860","27860"],["Kant: Science, Logic, and Mathematics, Misc","28077","27837","27837"],["Kant: Metaphysics and Epistemology, Misc","28078","27834","27834"],["Kant: Teleology, Misc","28079","27838","27838"],["Kant: Ethics, Misc","28080","27840","27840"],["Kant: Social, Political and Religious Thought, Misc","28081","27841","27841"],["Kant, Miscellaneous","28091","27900","27900"],["Persons, Misc","28092","321","321"],["The Body","28093","321","321"],["The Body, Misc","28094","28093","28093"],["The Self, Misc","28095","322","322"],["The Soul","28096","322,4251","4251"],["Feminism: Global Justice","28097","4771","4771"],["Feminism: Disability","28098","4771,4417","4771"],["Feminism: Friendship","28099","4771","4771"],["Feminism: Love","28100","4771","4771"],["Feminism: The Body","28101","4771","4771"],["Feminism: Identity Politics","28102","4771","4771"],["Feminism: Marriage and Civil Unions","28103","4771","4771"],["Feminism: Terrorism","28104","4771","4771"],["Feminist Political Philosophy","28106","4752","4752"],["Feminism: Mothering","28107","4771","4771"],["Feminism: Transgender Issues","28108","4771","4771"],["Critical Race Feminism","28109","4740","4740"],["Indigenous Feminism","28110","4740","4740"],["Lesbian Feminism","28111","4740","4740"],["Feminist Phenomenology","28112","4740","4740"],["Postcolonial Feminism","28113","4740","4740"],["Poststructural Feminism","28114","6726,4744,4740","4740"],["Postmodern Feminism","28115","4744,4740","4740"],["Feminist Philosophy of Education","28116","4752","4752"],["Feminism: Violence","28119","4771","4771"],["Feminism: War","28120","4771","4771"],["Feminism: Rape and Sexual Violence","28121","4771","4771"],["Feminism: Autonomy","28122","4771","4771"],["Asian Feminism","28123","4740","4740"],["Indian Feminism","28124","4740","4740"],["Latin American Feminism","28125","28375,4740","28375"],["Kant: Transcendental Arguments","28161","27860","27860"],["Kant: Analyticity","28165","28073,27871","28073"],["Kant: Truth","28166","28073,27871","28073"],["Kant: Philosophy of Language, Misc","28167","28073","28073"],["Kant: Intuition","28168","27845,27860","27845"],["Kant: The A Priori","28169","27860","27860"],["Kant: The Synthetic A Priori","28170","27860","27860"],["Kant: Consciousness","28171","27845","27845"],["Kant: Critique of Pure Reason","28172","27890","27890"],["Kant's Works in Theoretical Philosophy, Misc","28173","27890","27890"],["Kant: Groundwork of the Metaphysics of Morals","28174","27891","27891"],["Kant: Critique of Practical Reason","28175","27891","27891"],["Kant: Religion within the Boundaries of Mere Reason","28176","27891","27891"],["Kant's Works in Practical Philosophy, Misc","28177","27891","27891"],["Kant: Critique of the Power of Judgment","28178","27892","27892"],["Kant's Works in Aesthetics, Misc","28179","27892","27892"],["Kant: Metaphysical Foundations of Natural Science","28180","27890,27867","27867"],["Kant's Scientific Work, Misc","28181","27867","27867"],["Experimental Philosophy of Action","28229","5595","5595"],["Experimental Philosophy of Mind","28230","5595","5595"],["Experimental Philosophy of Language","28231","5595","5595"],["Experimental Philosophy: Ethics","28232","5595","5595"],["Experimental Philosophy: Epistemology","28233","5595","5595"],["Experimental Philosophy: Metaphysics","28234","5595","5595"],["Foundations of Experimental Philosophy","28235","5595","5595"],["Experimental Philosophy, Miscellaneous","28236","5595","5595"],["Experimental Philosophy: Consciousness","28237","28230","28230"],["Experimental Philosophy of Mind, Misc","28238","28230","28230"],["Experimental Philosophy: Reference","28239","28231","28231"],["Experimental Philosophy of Language, Misc","28240","28231","28231"],["Experimental Philosophy: Causation","28241","28234","28234"],["Experimental Philosophy: Metaphysics, Misc","28242","28234","28234"],["Experimental Philosophy: Free Will","28243","28229","28229"],["Experimental Philosophy: Intentional Action","28244","28229","28229"],["Experimental Philosophy of Action, Misc","28245","28229","28229"],["European Philosophy, Miscellaneous","28264","6731","6731"],["Classical Chinese Philosophy","28268","62","62"],["Post-Classical Chinese Philosophy","28269","62","62"],["Chinese Neo-Confucianism","28270","62","62"],["Contemporary Chinese Philosophy","28271","62","62"],["Chinese Philosophy: Topics","28272","62","62"],["Chinese Philosophy: Aesthetics","28273","28272","28272"],["Chinese Philosophy: Ethics","28274","28272","28272"],["Chinese Philosophy: Metaphysics and Epistemology","28275","28272","28272"],["Chinese Philosophy of Science","28276","28272","28272"],["Chinese Political Philosophy","28277","28272","28272"],["Chinese Philosophy: Topics, Misc","28278","28272","28272"],["Classical Confucianism","28279","28268","28268"],["Classical Daoism","28280","28268","28268"],["Mohism","28281","28268","28268"],["Chinese Legalism","28282","28268","28268"],["The School of Names","28283","28268","28268"],["Classical Chinese Philosophy, Misc","28284","28268","28268"],["Confucius","28285","28279","28279"],["Mencius","28286","28279","28279"],["The Doctrine of the Mean","28288","28279","28279"],["The Great Learning","28289","28279","28279"],["Classical Confucianism, Misc","28290","28279","28279"],["Laozi","28291","28280","28280"],["Classical Daoism, Misc","28293","28280","28280"],["Mozi","28294","28281","28281"],["Later Mohism","28295","28281","28281"],["Mohism, Misc","28296","28281","28281"],["Hanfeizi","28297","28282","28282"],["Chinese Legalism, Misc","28298","28282","28282"],["Gongsun Long","28299","28283","28283"],["The School of Names, Misc","28300","28283","28283"],["Yin Yang Confucianism","28301","28269","28269"],["Xunzi","28312","28279","28279"],["Zhuangzi","28313","28280","28280"],["Dong Zhongshu","28315","28301","28301"],["Post-Classical Chinese Philosophy, Misc","28316","28269","28269"],["Chinese Buddhist Philosophy","28317","62","62"],["The Three-Treatise School of Chinese Buddhism","28318","28317","28317"],["The Consciousness-Only School of Chinese Buddhism","28319","28317","28317"],["The Tiantai School of Chinese Buddhism","28320","28317","28317"],["Chinese Buddhist Philosophy, Misc","28321","28317","28317"],["Neo-Daoism","28322","28269","28269"],["Huainanzi","28323","28322","28322"],["Liezi","28324","28322","28322"],["Wang Bi","28325","28322","28322"],["Neo-Daoism, Misc","28326","28322","28322"],["The Huayan School of Chinese Buddhism","28327","28317","28317"],["Chinese Zen Buddhism","28328","28317","28317"],["Song-Ming Neo-Confucianism","28329","28270","28270"],["Zhou Dunyi","28330","28329","28329"],["Shao Yong","28331","28329","28329"],["Zhang Zai","28332","28329","28329"],["Cheng Hao","28333","28329","28329"],["Cheng Yi","28334","28329","28329"],["Lu Xiangshan","28335","28329","28329"],["Zhu Xi","28336","28329","28329"],["Wang Yangming","28337","28329","28329"],["Wang Fuzhi","28338","28329","28329"],["Song-Ming Neo-Confucianism, Misc","28339","28329","28329"],["Qing Neo-Confucianism","28340","28270","28270"],["Yan Yuan","28341","28340","28340"],["Dai Zhen","28342","28340","28340"],["Qing Neo-Confucianism, Misc","28343","28340","28340"],["Neo-Confucianism, Misc","28344","28270","28270"],["Chinese Philosophy, Misc","28345","62","62"],["New Confucianism","28358","28271","28271"],["Contemporary Chinese Philosophy, Misc","28359","28271","28271"],["Latin American Philosophy: Foundations","28361","6738","6738"],["History of Latin American Philosophy","28362","6738","6738"],["Pre-Columbian Latin American Philosophy","28363","28362","28362"],["16th Century Latin American Philosophy","28364","28362","28362"],["17th-18th Century Latin American Philosophy","28365","28362","28362"],["19th Century Latin American Philosophy","28366","28362","28362"],["20th Century Latin American Philosophy","28367","28362","28362"],["History of Latin American Philosophy, Misc","28368","28362","28362"],["Latin American Philosophy: Metaphysics and Epistemology","28369","6738","6738"],["Latin American Philosophy of Science, Logic, and Mathematics","28370","6738","6738"],["Latin American Philosophy: Ethics","28371","28375","28375"],["Latin American Political Philosophy","28372","28375","28375"],["Latin American Philosophy of Literature","28373","28375","28375"],["Latin American Philosophy of Race and Ethnicity","28374","28375,4819","28375"],["Latin American Philosophy: Value Theory","28375","6738","6738"],["Latin American Philosophy: Value Theory, Misc","28376","28375","28375"],["Latin American Philosophy, Misc","28377","6738","6738"],["Kant: Perception","28467","27845","27845"],["Kant: Imagination","28468","27845","27845"],["Kant: Synthesis","28469","27845","27845"],["Kant: Inference","28470","27860,27871","27871"],["Kant: Logical Form","28471","28073,27871","27871"],["Kant: Transcendental Logic","28472","27871","27871"],["Kant: Concepts","28473","27871,27845","27845"],["Kant: Philosophy of Logic, Misc","28474","27871","27871"],["Chinese Philosophy of Logic and Language","28476","28272","28272"],["Economics and Cognitive Science","28483","6177","6177"],["Autonomy in Political Theories","28494","5027","5027"],["Autonomy and Moral Psychology","28495","5027","5027"],["Oppression","28559","5025","5025"],["Toleration","28560","28559,5025","5025"],["Oppression, Misc","28561","28559","28559"],["Korean Philosophy","28563","6653","6653"],["Contemporary Daoism","28564","28271","28271"],["Ferdinand de Saussure","28661","6491,6725","6725"],["Roland Barthes","28662","6491,6725","6725"],["Louis Althusser","28663","6725,6491","6725"],["Claude Levi-Strauss","28664","6725,6491","6725"],["Walter Benjamin","28665","6723,6491","6723"],["Max Horkheimer","28666","6723,6491","6723"],["Continental Psychoanalysis","28667","6719","6719"],["Existentialism, Misc","28670","6721","6721"],["Continental Philosophy: Topics","28671","6719","6719"],["Hermeneutics, Misc","28672","6724","6724"],["Phenomenology, Misc","28673","6722","6722"],["Critical Theory, Misc","28674","6723","6723"],["Continental Aesthetics","28675","28671","28671"],["Continental Epistemology","28676","28671","28671"],["Continental Ethics","28677","28671","28671"],["Continental Philosophy of Mind","28678","28671","28671"],["Continental Philosophy of Religion","28679","28671","28671"],["Continental Philosophy of Science","28680","28671","28671"],["Continental Political Philosophy","28681","28671","28671"],["Continental Metaphysics","28682","28671","28671"],["Continental Philosophy: Topics, Misc","28683","28671","28671"],["Albert Camus","28684","6491,6721","6721"],["Continental Feminism, Misc","28685","4744","4744"],["Poststructuralism, Misc","28686","6726","6726"],["Continental Structuralism, Misc","28692","6725","6725"],["Continental Psychoanalysis, Misc","28693","28667","28667"],["Continental Philosophy of Language","28694","28671","28671"],["Alain Badiou","28696","6726,6491","6726"],["Slavoj Zizek","28697","6726,6491","6726"],["Judith Butler","28897","4744,6726,6491","4744"],["Continental Philosophy, Miscellaneous","28898","6727","6727"],["Abstract Objects, Misc","28899","5894","5894"],["Mereological Essentialism","28900","5902","5902"],["Simples and Gunk","28901","5902","5902"],["The Argument from Vagueness","28902","5902","5902"],["Objects and Properties","28903","5892","5892"],["Objects and Properties, Misc","28904","28903","28903"],["Temporary Intrinsics","28905","1365","1365"],["Eliminative Conceptions of Material Objects","28906","1374","1374"],["Permissive Conceptions of Material Objects","28907","1374","1374"],["Artifacts","28908","1374","1374"],["Mary Wollstonecraft","28943","6340","6340"],["History: Feminist Philosophy","28944","4739","4739"],["Functional Explanation","28945","26959,28948","28948"],["Mathematical Explanation","28946","5671,28948","28948"],["Theories of Explanation","28947","5955","5955"],["Varieties of Explanation","28948","5955","5955"],["Explanation in the Sciences","28949","5955","5955"],["Theories of Explanation, Misc","28950","28947","28947"],["Varieties of Explanation, Misc","28951","28948","28948"],["Explanation, Miscellaneous","28952","5973","5973"],["Explanation in the Sciences, Misc","28953","28949","28949"],["Mathematical Psychologism","28968","5571","5571"],["History: Philosophy of Mathematics","28969","47","47"],["History of Mathematics","28970","5671","5671"],["Mathematical Practice","28971","5671","5671"],["Nondeductive Methods in Mathematics","28972","5549","5549"],["Visualization in Mathematics","28973","5549","5549"],["Phenomenology of Mathematics","28974","5549","5549"],["Mathematical Finitism","28975","5658","5658"],["Mathematical Methodology","28984","5549","5549"],["Medieval Philosophy: Topics","28997","53","53"],["Arabic and Islamic Philosophy, Misc","28999","60","60"],["Medieval Jewish Philosophy","29000","66,6337","66"],["Jewish Philosophy, Misc","29001","66","66"],["Medieval Philosophy of Mind","29002","28997","28997"],["Medieval Philosophy of Language","29003","28997","28997"],["Medieval Political Philosophy","29004","28997","28997"],["Medieval Ethics","29005","28997","28997"],["Medieval Philosophy: Topics, Misc","29006","28997","28997"],["Marcilio Ficino","29007","6329","6329"],["Giordano Bruno","29008","6329","6329"],["Bonaventure","29009","6317","6317"],["Henry of Ghent","29010","6317","6317"],["Medieval Metaphysics","29011","28997","28997"],["Medieval Philosophy of Nature","29012","28997","28997"],["Renaissance Humanism","29014","6329","6329"],["Pragmatic Theories of Explanation","29072","28947","28947"],["Explanatory Value","29073","48826,5973","5973"],["Explanation and Understanding","29074","5973","5973"],["Chinese Feminism","30250","4740,28272","28272"],["African Philosophy","30251","6553","6553"],["Personal Identity and Values","30252","321","321"],["Immortality","30253","32447","32447"],["History: Persons","30254","321","321"],["African Philosophy, Misc","30259","30251","30251"],["African Philosophy: Epistemology","30263","6555","6555"],["Puzzle Cases in Personal Identity","32447","321","321"],["Puzzle Cases in Personal Identity, Misc","32448","32447","32447"],["Brain Transplants","32449","32447","32447"],["Personal Identity and Normative Ethics","32450","30252","30252"],["Personal Identity and Applied Ethics","32451","30252","30252"],["Personal Identity and Values, Misc","32452","30252","30252"],["Practical Identity","32453","321","321"],["Practical Identity, Misc","32454","32453","32453"],["Social Identity","32455","32453","32453"],["Nonreductionist Theories of Personal Identity","32456","318","318"],["Thought Experiments in Personal Identity","32457","32447","32447"],["Identity Theory of Truth","38494","6660","6660"],["Revision Theory of Truth","38495","6660","6660"],["Prosentential Theory of Truth","38496","6660","6660"],["Primitivism about Truth","38497","6660","6660"],["Pluralism about Truth","38498","6660","6660"],["Contextualism about Truth","38499","6660","6660"],["Truth-Aptness","38500","6674","6674"],["Truth-Values","38501","6674","6674"],["Vagueness and Indeterminacy","38502","15,6658","15"],["Truth-Value Gaps","38503","6674,6685","6674"],["Truth-Value Gluts","38504","6674,6685","6674"],["Indeterminacy","38506","38502","38502"],["Metaphysical Indeterminacy","38509","38506","38506"],["Quantum Indeterminacy","38510","5810,38506","5810"],["Indeterminacy, Misc","38511","38506","38506"],["Epistemic Paradoxes, Misc","38512","5453","5453"],["Paradox of the Knower","38513","5453","5453"],["Paradoxes, Miscellaneous","38517","5261","5261"],["Nietzsche: Metaphysics","38523","38530","38530"],["Nietzsche: Epistemology","38524","38530","38530"],["Nietzsche: Philosophy of Mind","38525","38530","38530"],["Nietzsche: Philosophy of Language","38526","38530","38530"],["Nietzsche: Philosophy of Science","38527","38530","38530"],["Nietzsche: Meta-Ethics","38528","38531","38531"],["Nietzsche: Normative Ethics","38529","38531","38531"],["Nietzsche: Metaphysics and Epistemology","38530","6430","6430"],["Nietzsche: Value Theory","38531","6430","6430"],["Nietzsche's Works","38532","6430","6430"],["Nietzsche: Philosophy of Religion","38534","38530","38530"],["Nietzsche: Teleology","38535","38523","38523"],["Nietzsche: Metaphysics and Epistemology, Misc","38536","38530","38530"],["Nietzsche: Value Theory, Misc","38537","38531","38531"],["Nietzsche: Will to Power","38538","38523","38523"],["Nietzsche: Eternal Recurrence","38539","38523","38523"],["Nietzsche: Overman","38540","38537,38523","38537"],["Nietzsche: Critique of Traditional Metaphysics","38541","38523","38523"],["Nietzsche: Time, Being and Becoming","38542","38523","38523"],["Nietzsche: Truth","38543","38523,38524,38526","38526"],["Nietzsche: Philosophy of Language, Misc","38544","38526","38526"],["Nietzsche: Consciousness","38545","38525","38525"],["Nietzsche: The Self","38546","38525","38525"],["Nietzsche: Philosophy of Mind, Misc","38547","38525","38525"],["Nietzsche: Metaphysics, Misc","38548","38523","38523"],["Nietzsche: Character and Virtue Ethics","38549","38529","38529"],["Nietzsche: Deontology","38550","38529","38529"],["Nietzsche: Utilitarianism","38551","38529","38529"],["Nietzsche: Ethical Egoism","38552","38529","38529"],["Nietzsche: Normative Ethics, Misc","38553","38529","38529"],["Nietzsche: Philosophy of History","38554","38531","38531"],["Nietzsche: Social and Political Philosophy","38555","38531","38531"],["Nietzsche: Nihilism","38556","38537,38523","38537"],["Nietzsche: Value Theory, Miscellaneous","38557","38537","38537"],["Nietzsche: Naturalism","38559","38524","38524"],["Nietzsche: Relativism","38560","38524","38524"],["Nietzsche: Epistemology, Misc","38561","38524","38524"],["Nietzsche: The Birth of Tragedy","38562","38532","38532"],["Nietzsche: The Untimely Meditations","38563","38532","38532"],["Nietzsche: Dawn","38564","38532","38532"],["Nietzsche: Human, All Too Human","38565","38532","38532"],["Nietzsche: The Gay Science","38566","38532","38532"],["Nietzsche: Genealogy of Morals","38567","38532","38532"],["Nietzsche: Beyond Good and Evil","38568","38532","38532"],["Nietzsche: Thus Spoke Zarathustra","38569","38532","38532"],["Nietzsche: The Anti-Christian","38570","38532","38532"],["Nietzsche: Twilight of the Idols","38571","38532","38532"],["Nietzsche: Ecce Homo","38572","38532","38532"],["Nietzsche: On the \"Will to Power\"","38573","38532","38532"],["Nietzsche: Unpublished Works","38574","38532","38532"],["Nietzsche: Nachlass of the Early Period","38575","38574","38574"],["Nietzsche: Nachlass of the Middle Period","38576","38574","38574"],["","38578","28236,38574,27885","27885"],["Nietzsche: Nachlass of the Late Period","38579","38574","38574"],["Nietzsche's Correspondence","38580","38574","38574"],["Nietzsche's Unpublished Lectures","38581","38574","38574"],["Nietzsche: Unpublished Works, Misc","38582","38574","38574"],["Nietzsche, Misc","38614","6430","6430"],["Nietzsche: Aesthetics","38832","38531","38531"],["Yijing (The Book of Change)","39305","28268","28268"],["Chinese Philosophy of Religion","39306","28272","28272"],["Chinese Philosophy: Hermeneutics","39307","28272","28272"],["Experimental Philosophy: Contextualism and Invariantism","39308","28233","28233"],["Experimental Philosophy: Epistemology, Misc","39309","28233","28233"],["Experimental Philosophy: Folk Morality","39310","28232","28232"],["Experimental Philosophy: Ethics, Misc","39311","28232","28232"],["Experimental Philosophy: Crosscultural Research","39312","28236","28236"],["Experimental Philosophy, Misc","39313","28236","28236"],["Critiques of Experimental Philosophy","39314","28235","28235"],["Foundations of Experimental Philosophy, Misc","39315","28235","28235"],["Theories of Imagination","39480","336","336"],["Imagination and Memory","39481","336","336"],["History: Imagination","39482","336","336"],["Religious Imagination","39483","336,4233","4233"],["Literary Imagination","39484","4353,336","4353"],["Iris Marion Young","39618","6531","6531"],["Liberal Feminism","39619","4740","4740"],["Citizenship","39620","5167","5167"],["Religious Skepticism","40408","4233,5522","4233"],["Pragmatic Replies to Skepticism","40409","5538","5538"],["Ordinary Language Replies to Skepticism","40410","5538","5538"],["History: Skepticism","40443","5520","5520"],["Quantities","40471","1376","1376"],["Deontic Modals","41200","4640,6554","6554"],["Autobiographical Memory","42277","334","334"],["Time and Memory","42278","334,178","334"],["Embodied Memory","42279","334,28093","334"],["Social and Cultural Memory","42280","334","334"],["Direct Inference Principles","44063","5887","5887"],["Probabilistic Principles, Misc","44064","5887","5887"],["Probabilistic Frameworks, Misc","44065","5900","5900"],["Subjective Probability, Misc","44066","5919","5919"],["Smell","44176","253","253"],["Hearing","44177","253","253"],["History: Pleasure","44309","331","331"],["Colonialism and Postcolonialism","44310","5073","5073"],["Touch","44311","253","253"],["Taste Experience","44312","253","253"],["Speculative Realism","44343","6719","6719"],["Object-Oriented Ontology","44419","44343","44343"],["Speculative Materialism","44420","5745,44343","44343"],["Speculative Realism, Misc","44421","44343","44343"],["Criteria of Identity","44640","5759","5759"],["Mental Disorders","44641","394,5409,4417","394"],["Philosophy of Psychiatry","44642","394","394"],["Psychiatric Taxonomy","44643","44642","44642"],["Philosophy of Psychiatry, Misc","44644","44642","44642"],["Depression","44645","44641","44641"],["Bipolar Disorders","44646","44641","44641"],["Personality Disorders","44647","44641","44641"],["Mental Disorders, Misc","44648","44641","44641"],["Psychopathology, Misc","44649","5409","5409"],["Autism","44651","44641","44641"],["Alzheimer's Disease","44652","44641","44641"],["Husserl: Metaphysics and Epistemology","44992","6513","6513"],["Husserl: Science, Logic, and Mathematics","44993","6513","6513"],["Husserl: Philosophy of Mind","44994","6513","6513"],["Husserl: Phenomenology","44995","6513,44994","6513"],["Husserl and Other Philosophers","44996","6513","6513"],["Husserl: Value Theory","44997","6513","6513"],["Husserl: Works","44998","6513","6513"],["Husserl, Misc","44999","6513","6513"],["Husserl: Metaphysics","45000","44992","44992"],["Husserl: Idealism","45001","45000","45000"],["Husserl: Ontology","45002","45000","45000"],["Husserl: Realism","45003","45000","45000"],["Husserl: Metaphysics, Misc","45004","45000","45000"],["Husserl: Epistemology","45005","44992","44992"],["Husserl: Evidence","45006","45005","45005"],["Husserl: Intuition","45007","45005","45005"],["Husserl: Reason","45008","45005","45005"],["Husserl: Truth","45009","45005","45005"],["Husserl: Epistemology, Misc","45010","45005","45005"],["Husserl: Philosophy of Language","45011","44992","44992"],["Husserl: Metaphysics and Epistemology, Misc","45012","44992","44992"],["Husserl: Consciousness","45013","44994","44994"],["Husserl: Intentionality","45014","44994","44994"],["Husserl: Constitution","45015","45014","45014"],["Husserl: Horizonality","45016","45014","45014"],["Husserl: Noesis and Noema","45017","45014","45014"],["Husserl: Intentionality, Misc","45018","45014","45014"],["Husserl: Time Consciousness","45019","45013","45013"],["Husserl: Intersubjectivity","45020","44994","44994"],["Husserl: Other-Awareness","45021","45013,45020","45020"],["Husserl: Intersubjectivity, Misc","45022","45020","45020"],["Husserl: The Self","45023","44994","44994"],["Husserl: Self-Awareness","45024","45013,45023","45023"],["Husserl: The Self, Misc","45026","45023","45023"],["Husserl: Perception","45027","44994","44994"],["Husserl: Embodiment and Action","45028","44994","44994"],["Husserl: Philosophy of Mind, Misc","45029","44994","44994"],["Husserl: Phenomenological Method","45030","44995","44995"],["Husserl: Phenomenology and Psychology","45031","44995","44995"],["Husserl: Phenomenology and Cognitive Science","45032","44995","44995"],["Husserl: Phenomenology, Misc","45033","44995","44995"],["Husserl: Transcendental and Phenomenological Reduction","45034","45030","45030"],["Husserl: Empirical vs Transcendental","45035","45023,45030","45030"],["Husserl: Eidetic Reduction and Variation","45036","45030","45030"],["Husserl: Genetic Phenomenology","45037","45030","45030"],["Husserl: Phenomenological Method, Misc","45038","45030","45030"],["Husserl: Critique of Psychologism","45039","45031","45031"],["Husserl: Phenomenology and Psychology, Misc","45040","45031","45031"],["Husserl: Ethics","45041","44997","44997"],["Husserl: Philosophy of Religion","45042","44997","44997"],["Husserl: Social and Political Philosophy","45043","44997","44997"],["Husserl: Philosophy of Logic","45044","44993","44993"],["Husserl: Philosophy of Science","45045","44993","44993"],["Husserl: Philosophy of Mathematics","45046","44993","44993"],["Husserl: Philosophy of Social Science","45047","44993","44993"],["Husserl: Science, Logic, and Mathematics, Misc","45048","44993","44993"],["Husserl: Cartesian Meditations","45049","44998","44998"],["Husserl: Logical Investigations","45050","44998","44998"],["Husserl: Ideas 1","45051","44998","44998"],["Husserl: Crisis","45052","44998","44998"],["Husserl: Correspondence","45053","44998","44998"],["Husserl: Works, Misc","45054","44998","44998"],["Husserl: Value Theory, Misc","45055","44997","44997"],["Husserl: Lifeworld","45056","45047","45047"],["Husserl: Philosophy of History","45057","45047","45047"],["Husserl: Philosophy of Social Sciences, Misc","45058","45047","45047"],["Husserl: Critique of Representationalism","45059","45005","45005"],["Husserl: Egology and Solipsism","45060","45005","45005"],["Husserl: Introductions and Overviews","45061","44999","44999"],["Husserl: Development and Influences","45062","44999","44999"],["Husserl, Miscellaneous","45063","44999","44999"],["Nietzsche: Philosophy of Education","45440","38531","38531"],["Nietzsche: Moral Psychology","45441","38529","38529"],["Kant: Political Philosophy","45579","27841","27841"],["Perceptual Constancy","45602","6773","6773"],["Epistemic Responsibility","45603","5460","5460"],["Robert Boyle","45718","6340","6340"],["Edmund Burke","45719","6340","6340"],["Joseph Butler","45720","6340","6340"],["Earl of Shaftesbury","45721","6340","6340"],["Cambridge Platonism","45722","6340","6340"],["Logical Connectives, Misc","45818","5257","5257"],["Mary Astell","45828","6340","6340"],["Anne Conway","45829","6340","6340"],["Margaret Cavendish","45830","6340","6340"],["Bernard Mandeville","45831","6340","6340"],["Husserl and Analytic Philosophers","45834","44996","44996"],["Husserl and Continental Philosophers","45835","44996","44996"],["Husserl and Other Philosophers, Misc","45836","44996","44996"],["Modal Combinatorialism","45893","5851","5851"],["Logic and Information","46179","5527,5263","5527"],["Nonconceptual/Prereflective Self-Consciousness","46206","173","173"],["Fair Trade","46335","27525","27525"],["Microfinance","46336","27512","27512"],["Corporate Governance","46337","27512","27512"],["Kant: Moral Psychology","46532","4620,27840","27840"],["Kant: Applied Ethics","46533","27840","27840"],["Defeasibility Theory of Knowledge","47042","5491","5491"],["Divine Middle Knowledge","47044","4227","4227"],["Theories of Omniscience","47045","4227","4227"],["Divine Omniscience, Misc","47046","4227","4227"],["Divine Necessity","47047","4220","4220"],["Divine Immutability","47048","4220","4220"],["Civil Disobedience","47049","5167","5167"],["Political Feasibility","47050","5161","5161"],["Political Realism and Utopianism","47051","5161","5161"],["Methods in Political Philosophy","47052","5161","5161"],["Berkeley: Epistemology","47053","6342","6342"],["Berkeley: Metaphysics","47054","6342","6342"],["Berkeley: Philosophy of Action","47055","6342","6342"],["Berkeley: Philosophy of Language","47056","6342","6342"],["Berkeley: Philosophy of Mind","47057","6342","6342"],["Berkeley: Philosophy of Religion","47058","6342","6342"],["Berkeley: Philosophy of Science","47059","6342","6342"],["Berkeley: Value Theory","47060","6342","6342"],["Berkeley: Works","47061","6342","6342"],["Berkeley, Misc","47062","6342","6342"],["Berkeley: Skepticism","47063","47053","47053"],["Berkeley: Epistemology, Misc","47064","47053","47053"],["Berkeley: Immaterialism","47065","47054","47054"],["Berkeley: Metaphysics, Misc","47067","47054","47054"],["Berkeley: Epistemology of Mind","47068","47057","47057"],["Berkeley: Sensory Perception","47069","47057","47057"],["Berkeley: Ideas","47070","47057","47057"],["Berkeley: Abstract Ideas","47071","47070","47070"],["Berkeley: General Ideas","47072","47070","47070"],["Berkeley: Ideas, Misc","47073","47070","47070"],["Berkeley: Arguments for Theism","47074","47058","47058"],["Berkeley: Continuity Argument for Theism","47075","47074","47074"],["Berkeley: Passivity Argument for Theism","47076","47074","47074"],["Berkeley: Divine Language Argument for Theism","47077","47074","47074"],["Berkeley: Divine Attributes","47078","47058","47058"],["Berkeley: Philosophy of Religion, Misc","47079","47058","47058"],["Berkeley: Vision","47080","47069","47069"],["Berkeley: Heterogeneity Thesis","47081","47069","47069"],["Berkeley: Sensory Perception, Misc","47082","47069","47069"],["Berkeley: New Theory of Vision","47083","47061","47061"],["Berkeley: Principles of Human Knowledge","47084","47061","47061"],["Berkeley: Three Dialogues Between Hylas and Philonous","47085","47061","47061"],["Berkeley: Works, Misc","47086","47061","47061"],["Berkeley: Space and Time","47087","47054","47054"],["Berkeley: Primary and Secondary Qualities","47088","47069","47069"],["Berkeley and Other Philosophers","47089","47062","47062"],["Berkeley: General Works","47090","47062","47062"],["Berkeley, Miscellaneous","47091","47062","47062"],["Kant: Moral Realism and Constructivism","47092","27886","27886"],["Kant: Freedom","47093","27886,27844","27886"],["Kant: Fact of Reason","47094","27886","27886"],["Kant: Meta-Ethics, Misc","47095","27886","27886"],["Kant: Maxims","47096","46532","46532"],["Kant: Moral Motivation","47097","46532","46532"],["Kant: Respect","47098","46532","46532"],["Kant: Moral Psychology, Misc","47099","46532","46532"],["Kant: Formula of Universal Law","47101","4620,27885","27885"],["Kant: Formula of Humanity","47103","4620,27885","27885"],["Kant: Normative Ethics, Misc","47104","27885","27885"],["Externalism and Cognitive Science","47108","199","199"],["Externalism and Cognitive Science, Misc","47109","47108","47108"],["Varieties of Content Externalism","47110","199","199"],["Varieties of Content Externalism, Misc","47111","47110","47110"],["Content Internalism and Externalism, Miscellaneous","47112","210","210"],["Externalism and Slow Switching","47113","206","206"],["Externalism and Armchair Knowledge","47114","206","206"],["Externalism and Self-Knowledge, Misc","47115","206","206"],["Berkeley: Notions","47139","47057","47057"],["Berkeley: Philosophy of Mind, Misc","47140","47057","47057"],["Berkeley: Arguments for Theism, Misc","47141","47074","47074"],["The Concept of Toleration","47326","28560","28560"],["Defenses of Toleration","47327","28560","28560"],["Toleration in Normative Theories","47328","28560","28560"],["Toleration in Applied Ethics","47329","28560","28560"],["History: Toleration","47330","28560","28560"],["Toleration, Misc","47331","28560","28560"],["The Concept of Well-Being","48497","5215","5215"],["Varieties of Value, Misc","48498","5207","5207"],["Theories of Value, Misc","48499","5203","5203"],["Temporal Eliminativism","48532","1380","1380"],["Temporal Ontology, Misc","48533","1380","1380"],["Philosophy of Medicine","48822","6142","6142"],["Philosophy of Medicine, Misc","48823","48822","48822"],["Non-Human Animals","48824","26454","26454"],["Non-Human Animals, Misc","48825","48824","48824"],["The Value of Phenomena","48826","5202","5202"],["The Value of Phenomena, Misc","48827","48826","48826"],["Health and Illness","49062","28093,48822","48822"],["Health and Illness, Misc","49063","49062","49062"],["Health","49064","49062,4416","49062"],["Philosophy of Medicine, Miscellaneous","49065","48823","48823"],["Medical Epistemology","49066","48823","48823"],["Medical Methodology","49067","48823","48823"],["Feminism: Non-Human Animals","49068","4771","4771"],["Islamic Feminism","49069","4740","4740"],["Whiteness","49070","4856","4856"],["Queer Feminism","49071","4740","4740"],["Epistemologies of Ignorance","49072","4856,5451","4856"],["Epistemic Injustice","49073","5100,5451","5451"],["Implicit Bias","49074","4856,4812,4997","4997"],["Vulnerability","49075","28559","28559"],["Functionalist Theories of Consciousness, Misc","49081","158","158"],["Biological Theories of Consciousness","49082","153","153"],["Biological Theories of Consciousness, Misc","49083","49082","49082"],["The Combination Problem for Panpsychism","49085","160","160"],["History: Panpsychism","49086","160","160"],["Panpsychism, Misc","49087","160","160"],["Theories of Consciousness, Miscellaneous","49088","6740","6740"],["Methodology in Metaphysics","50765","1361,5589,1386","1361"],["History: Self-Knowledge","50768","338","338"],["Science and Religion","50772","5977,6142,4251","4251"],["Philosophy of Higher Education","50793","31","31"],["History: Autonomy","51179","5027","5027"],["Moral Uncertainty","52881","4562","4562"],["Crossmodal Perception","52882","253","253"],["Perceptual Evidence","56109","5394,268","268"],["Women in Philosophy","57086","5607,4812","4812"],["Sensory Disabilities and Disorders","57442","4417,253","253"],["Blindness","57443","57442","57442"],["Deafness","57444","57442","57442"],["Sensory Disabilities and Disorders, Misc","57445","57442","57442"],["Philosophy of Political Science","59418","50,5161","50"],["Aristotle: Logic and Philosophy of Language","60738","7009,6263","6263"],["Aristotle: Metaphysics","60739","6263","6263"],["Aristotle: Natural Science","60740","6263","6263"],["Aristotle: Epistemology","60741","6263","6263"],["Aristotle: Philosophy of Mind","60742","6263","6263"],["Aristotle: Philosophy of Science","60743","6263","6263"],["Aristotle: Ethics","60744","7010,6263","6263"],["Aristotle: Political Philosophy","60745","6263","6263"],["Aristotle: Aesthetics","60746","6263","6263"],["Aristotle: Philosophical Method","60747","6263","6263"],["Aristotle's Works","60748","6263","6263"],["Aristotle, Misc","60750","6263","6263"],["Aristotle and Other Philosophers","60751","6263","6263"],["Brentano: Consciousness","60752","6400","6400"],["Brentano: Intentionality","60753","6400","6400"],["Brentano: Judgment","60754","6400","6400"],["Brentano: Value","60755","6400","6400"],["Brentano: Metaphysics","60756","6400","6400"],["Brentano, Misc","60757","6400","6400"],["Aristotle: Syllogistic","60810","60738","60738"],["Aristotle: Dialectic and Dialectical Argument","60811","60738","60738"],["Aristotle: Demonstration","60812","60738","60738"],["Aristotle: Non-Syllogistic Argument","60813","60738","60738"],["Aristotle: Fallacies","60814","60738","60738"],["Aristotle: Predication","60815","60738","60738"],["Aristotle: Principles","60816","60738,60743","60738"],["Aristotle: Definition","60817","60738","60738"],["Aristotle: Truth","60818","60738","60738"],["Aristotle: Necessity and Contingency","60819","60738","60738"],["Aristotle: Theoretical Science","60820","60741","60741"],["Aristotle: Perception","60821","60741,60742","60742"],["Aristotle: Epistemology, Misc","60822","60741","60741"],["Aristotle: Logic and Philosophy of Language, Misc","60823","60738","60738"],["Aristotle: First Philosophy","60824","60739","60739"],["Aristotle: Substance","60825","60739","60739"],["Aristotle: The Zeta Problem","60826","60739","60739"],["Aristotle: Non-Contradiction","60827","60739","60739"],["Aristotle: Form and Matter","60828","60739","60739"],["Aristotle: Substantial Forms","60829","60739","60739"],["Aristotle: Actuality and Potentiality","60830","60739","60739"],["Aristotle: Essence","60831","60739","60739"],["Aristotle: Mathematical Objects","60832","60739","60739"],["Aristotle: Metaphysics, Misc","60833","60739","60739"],["Aristotle: Matter and Elements","60834","60740","60740"],["Aristotle: Time","60835","60740","60740"],["Aristotle: Place","60836","60740","60740"],["Aristotle: Cosmology","60837","60740","60740"],["Aristotle: The Unmoved Mover","60838","60740","60740"],["Aristotle: Biology","60839","60740","60740"],["Aristotle: Matter and Material Change","60840","60740","60740"],["Aristotle: Causation","60841","60740","60740"],["Aristotle: Chance","60842","60740","60740"],["Aristotle: Necessity and Possibility","60843","60740","60740"],["Aristotle: Theoretical Wisdom","60844","60740","60740"],["Aristotle: Natural Science, Misc","60845","60740","60740"],["Aristotle: Soul","60854","60742","60742"],["Aristotle: Active/Passive Intellect","60855","60742","60742"],["Aristotle: Philosophy of Mind, Misc","60857","60742","60742"],["Aristotle: Empiricism","60858","60743","60743"],["Aristotle: Mathematical Science","60859","60743","60743"],["Aristotle: Philosophy of Science, Misc","60860","60743","60743"],["Aristotle: The Good","60861","60744","60744"],["Aristotle: The Good Life","60862","60744","60744"],["Aristotle: Happiness","60863","60744","60744"],["Aristotle: Moral Virtues","60864","60744","60744"],["Aristotle: Friendship","60865","60864","60864"],["Aristotle: Courage","60866","60864","60864"],["Aristotle: Justice","60867","60864","60864"],["Aristotle: Moral Virtues, Misc","60868","60864","60864"],["Aristotle: Moral Education","60869","60744","60744"],["Aristotle: Practical Wisdom","60870","60744","60744"],["Aristotle: Free Will and Agency","60871","60744","60744"],["Aristotle: Character","60872","60744","60744"],["Aristotle: Voluntary and Involuntary","60873","60744","60744"],["Aristotle: Pleasure","60874","60744","60744"],["Aristotle: The Two Lives","60875","60744","60744"],["Aristotle: External Goods","60876","60744","60744"],["Aristotle: Ethics, Misc","60877","60744","60744"],["Aristotle: Dialectic","60878","60747","60747"],["Aristotle: Puzzles","60879","60747","60747"],["Aristotle: Philosophical Method, Misc","60880","60747","60747"],["Aristotle: Criticism of Plato","60881","60751","60751"],["Aristotle and Other Philosophers, Misc","60882","60751","60751"],["Aristotle: Development","60883","6263","6263"],["Aristotle: Categories","60884","60902","60902"],["Aristotle: On Interpretation","60885","60902","60902"],["Aristotle: Prior Analytics","60886","60902","60902"],["Aristotle: Posterior Analytics","60887","60902","60902"],["Aristotle: Topics","60888","60902","60902"],["Aristotle: On Sophistical Refutations","60889","60902","60902"],["Aristotle: Physics","60890","60903","60903"],["Aristotle: On Generation and Corruption","60891","60903","60903"],["Aristotle: On the Heavens","60892","60903","60903"],["Aristotle: Meteorology","60893","60903","60903"],["Aristotle: On the Soul","60894","60903","60903"],["Aristotle: Parts of Animals","60895","60903","60903"],["Aristotle: Generation of Animals","60896","60903","60903"],["Aristotle: Motion of Animals","60897","60903","60903"],["Aristotle: Parva Naturalia","60898","60903","60903"],["Aristotle: History of Animals","60899","60903","60903"],["Aristotle's Works: The Metaphysics","60900","60748,60739","60748"],["Aristotle's Works in Ethics","60901","60748","60748"],["Aristotle's Works in Logic","60902","60748,60738","60748"],["Aristotle's Works in Natural Science","60903","60740,60748","60748"],["Aristotle: Nicomachean Ethics","60904","60901","60901"],["Aristotle: Eudemian Ethics","60905","60901","60901"],["Aristotle: Magna Moralia","60906","60901","60901"],["Aristotle: Politics","60907","60745,60901","60901"],["Aristotle's Works in Aesthetics","60908","60746,60748","60748"],["Aristotle: Poetics","60909","60908","60908"],["Aristotle: Rhetoric","60910","60902","60902"],["Aristotle's Lost Works","60911","60748","60748"],["Aristotle's Works, Misc","60912","60748","60748"],["Aristotle: Metaphysics A","60913","60900","60900"],["Aristotle: Metaphysics B","60914","60900","60900"],["Aristotle: Metaphysics Gamma","60915","60900","60900"],["Aristotle: Metaphysics Delta","60916","60900","60900"],["Aristotle: Metaphysics Episilon","60917","60900","60900"],["Aristotle: Metaphysics Zeta","60918","60900","60900"],["Aristotle: Metaphysics Eta","60919","60900","60900"],["Aristotle: Metaphysics Theta","60920","60900","60900"],["Aristotle: Metaphysics Iota","60921","60900","60900"],["Aristotle: Metaphysics Lambda","60922","60900","60900"],["Aristotle: Metaphysics Mu","60923","60900","60900"],["Aristotle: Metaphysics Nu","60924","60900","60900"],["Aristotle's Works: Metaphysics, Misc","60925","60900","60900"],["Aristotle: Aesthetics, Misc","60926","60746","60746"],["Aristotle: Political Philosophy, Misc","60927","60745","60745"],["Parmenides","60928","6289","6289"],["Zeno of Elea","60929","6289","6289"],["Eleatics, Misc","60930","6289","6289"],["Epicurus","60931","6273","6273"],["Lucretius","60932","6273","6273"],["Philodemus","60933","6273","6273"],["Epicureans, Misc","60934","6273","6273"],["Alexander of Aphrodisias","60935","25169","25169"],["Simplicius","60936","25169","25169"],["Aristotelian Commentators, Misc","60937","25169","25169"],["Plotinus","60938","6276","6276"],["Neoplatonists, Misc","60939","6276","6276"],["Aristotle: Weakness of Will","61125","60744","60744"],["Ancient Greek and Roman Metaphysics","61784","61789","61789"],["Ancient Greek and Roman Epistemology","61785","61789","61789"],["Ancient Greek and Roman Philosophy of Mind","61786","61789","61789"],["Ancient Greek and Roman Aesthetics","61787","61789","61789"],["Ancient Greek and Roman Political Philosophy","61788","61789","61789"],["Ancient Greek and Roman Philosophy: Topics","61789","52","52"],["Aristotle: Induction","61790","60738","60738"],["Protagoras","61791","6295","6295"],["Gorgias","61792","6295","6295"],["Sophists, Misc","61793","6295","6295"],["Aristotle's Works: The Physics","61794","60748","60748"],["John Philoponus","61795","25169","25169"],["Andronicus","61796","25169","25169"],["Ammonius","61797","25169","25169"],["The Old Stoa","61798","6271","6271"],["Chrysippus","61799","6271","6271"],["Epictetus","61800","6271","6271"],["Marcus Aurelius","61801","6271","6271"],["Stoics, Misc","61802","6271","6271"],["Porphyry","61803","6276","6276"],["Proclus","61804","6276","6276"],["Ecological Developmental Biology","61841","5272,5282","5272"],["Normativity of Law","61845","4985,4956,5199","4985"],["Old Academy","62031","6262","6262"],["Speusippus","62032","62031","62031"],["Xenocrates","62033","62031","62031"],["Old Academy, Misc","62034","62031","62031"],["Peripatetics","62035","6269","6269"],["Theophrastus","62036","62035","62035"],["Peripatetics, Misc","62037","62035","62035"],["The Concept of Miracle","62121","4267","4267"],["The Possibility of Miracles","62122","4267","4267"],["Epistemology of Miracles","62123","4267","4267"],["17th Century German Philosophy, Misc","62124","7005","7005"],["Johann Georg Hamann","62551","7005","7005"],["Johann Gottfried Herder","62552","7005","7005"],["Gotthold Ephraim Lessing","62553","7005","7005"],["Moses Mendelssohn","62554","7005","7005"],["Christian Wolff","62555","7005","7005"],["African-American Philosophy: Health Care Ethics","62588","6620","6620"],["Afrocentrism","62589","6620","6620"],["Husserl: Consciousness, Misc","62675","45013","45013"],["Hobbes: Epistemology","64295","6345","6345"],["Hobbes: Free Will","64296","6345","6345"],["Hobbes: Philosophy of Mathematics","64297","6345","6345"],["Hobbes: Moral Psychology","64298","6345","6345"],["Hobbes: Philosophy of Science","64299","6345","6345"],["Hobbes: Philosophy of Language","64300","6345","6345"],["Hobbes: Philosophy of Mind","64301","6345","6345"],["Hobbes: Philosophy of Religion","64302","6345","6345"],["Hobbes: Biblical Criticism","64303","64302","64302"],["Hobbes: Philosophy of Religion, Misc","64304","64302","64302"],["Hobbes: Social and Political Philosophy","64305","6345","6345"],["Hobbes: Laws of Nature","64306","64305","64305"],["Hobbes: Social Contract","64307","64305","64305"],["Hobbes: Sovereignty","64308","64305","64305"],["Hobbes: Context","64309","6345","6345"],["Hobbes: Intellectual Context","64310","64309","64309"],["Hobbes: Political Context","64311","64309","64309"],["Thomas Hobbes, Misc","64312","6345","6345"],["Hobbes: History","64313","6345","6345"],["Values in Film","64315","4329","4329"],["The Art of Film","64316","64315","64315"],["Medium Specificity in Film","64317","64315","64315"],["Film and Morality","64318","64315","64315"],["Film Evaluation, Misc","64319","64315","64315"],["Ontology of Film","64320","4329","4329"],["Film Authorship","64321","64320","64320"],["Narration in Film","64322","64320","64320"],["Movement in Film","64323","64320","64320"],["Ontology of Film, Misc","64324","64320","64320"],["Audience Engagement in Film","64325","4329","4329"],["Character Identification in Film","64326","64325","64325"],["Film and Dreams","64327","64325","64325"],["Paradox of Suspense","64328","64325","64325"],["Paradox of Painful Art","64329","64325","64325"],["Paradox of Fiction","64330","64325","64325"],["Audience Engagement in Film, Misc","64331","64325","64325"],["Genres of Film","64332","4329","4329"],["Horror Film","64333","64332","64332"],["Documentary Film","64334","64332","64332"],["Avant-Garde Film","64335","64332","64332"],["Film Theory","64336","4329","4329"],["Classical Film Theory","64337","64336","64336"],["Cognitive Film Theory","64338","64336","64336"],["Continental Film Theory","64339","64336","64336"],["Film Theory, Misc","64340","64336","64336"],["Film Media","64341","4329","4329"],["Film Media, Misc","64342","64341","64341"],["Genres of Film, Misc","64343","64332","64332"],["Cognitive Phenomenology","64352","172","172"],["Antoine Arnauld","64593","6359","6359"],["Behavioral Economics","64740","6150","6150"],["Development Economics","64741","6150","6150"],["History of Economics","64742","6177","6177"],["Measurement in Economics","64743","6177","6177"],["Sociology of Knowledge","65093","6242,5554","5554"],["Philosophy of Sociology, Misc","65094","6242","6242"],["Pierre Bayle","65345","6359","6359"],["Denis Diderot","65346","6359","6359"],["Etienne Bonot de Condillac","65347","6359","6359"],["Voltaire","65348","6359","6359"],["Montesquieu","65349","6359","6359"],["Carnap: Epistemology","65435","6455","6455"],["Carnap: Ontology","65436","6455","6455"],["Carnap: Philosophy of Language","65437","6455","6455"],["Carnap: Philosophy of Logic","65438","6455","6455"],["Carnap: Philosophy of Science","65439","6455","6455"],["Carnap: Physicalism","65440","65439","65439"],["Carnap: Confirmation and Verification","65441","65439","65439"],["Carnap: Probability and Inductive Logic","65442","65439","65439"],["Carnap: Philosophy of Science, Misc","65443","65439","65439"],["Carnap: Works","65444","6455","6455"],["Carnap: Der Raum","65445","65444","65444"],["Carnap: Der Logische Aufbau Der Welt","65446","65444","65444"],["Carnap: Logical Syntax of Language","65447","65444","65444"],["Carnap: Meaning and Necessity","65448","65444","65444"],["Carnap: Works, Misc","65449","65444","65444"],["Carnap's Intellectual Context","65450","6455","6455"],["Carnap, Misc","65451","6455","6455"],["Hugo Grotius","65476","6377","6377"],["Condorcet","65477","6359","6359"],["Pierre Gassendi","65478","6359","6359"],["Friedrich Heinrich Jacobi","65479","7005","7005"],["Salomon Maimon","65480","7005","7005"],["Samuel Pufendorf","65481","7005","7005"],["Romanticism","65956","6731","6731"],["Ludwig Feuerbach","65957","6419","6419"],["Friedrich Engels","65958","6419","6419"],["Karl Leonhard Reinhold","65959","7005","7005"],["Georg Lukacs","65960","6727,6491","6491"],["Hegel: Logic and Metaphysics","65961","6426","6426"],["Hegel: Social and Political Philosophy","65962","6426","6426"],["Hegel: Ethics","65963","6426","6426"],["Hegel: Philosophy of History","65964","6426","6426"],["Hegel: History of Philosophy","65965","6426","6426"],["Hegel: Philosophy of Religion","65966","6426","6426"],["Hegel: Aesthetics","65967","6426","6426"],["Hegel: Works","65968","6426","6426"],["Hegel, Misc","65969","6426","6426"],["Hegel: Logic","65970","65961","65961"],["Hegel: Metaphysics","65971","65961","65961"],["Hegel: Phenomenology","65972","65961","65961"],["Hegel: Philosophy of Mind","65973","65961","65961"],["Hegel: Philosophy of Language","65974","65961","65961"],["Hegel: Philosophy of Action","65975","65961","65961"],["Hegel: Philosophy of Nature","65976","65961","65961"],["Kant: Life and Times","66085","27900","27900"],["Nietzsche: Life and Times","66086","38614","38614"],["Nietzsche, Miscellaneous","66087","38614","38614"],["Karl Jaspers","66132","6491,6995,6721","6721"],["Leo Strauss","66133","6491,6995,6727","6491"],["Friedrich Schleiermacher","66134","6419","6419"],["Jacques RanciÃƒÂ¨re","66138","6491,6369,6726","6726"],["Jean-Luc Nancy","66139","6491,6369,6726","6726"],["Julia Kristeva","66140","6491,6369,4744,6726","4744"],["Michel Henry","66141","6722,6491,6369","6722"],["Hume: Metaphysics and Epistemology","66143","6347","6347"],["Hume: Value Theory","66144","6347","6347"],["Hume: Metaphysics","66145","66143","66143"],["Hume: Epistemology","66146","66143","66143"],["Hume: Philosophy of Mind","66147","66143","66143"],["Hume: Philosophy of Religion","66148","66143","66143"],["Hume: Philosophy of Action","66149","66143","66143"],["Hume: Philosophy of Language","66150","66143","66143"],["Hume: Aesthetics","66151","66144","66144"],["Hume: Meta-Ethics","66152","66144","66144"],["Hume: Normative Ethics","66153","66144","66144"],["Hume: Social and Political Philosophy","66154","66144","66144"],["Hume: Science, Logic, and Mathematics","66155","6347","6347"],["Hume: Logic","66156","66155","66155"],["Hume: Philosophy of Mathematics","66157","66155","66155"],["Hume: Philosophy of Probability","66158","66155","66155"],["Hume: Philosophy of Economics","66159","66155","66155"],["Hume: Scientific Method","66160","66155","66155"],["Hume: Induction","66161","66146,66155","66146"],["Hume: Laws of Nature","66162","66155,66145","66155"],["Hume: Memory","66163","66146","66146"],["Hume: Testimony","66164","66146","66146"],["Hume: Causation","66165","66145","66145"],["Hume: Modality","66166","66145","66145"],["Hume: Substance","66167","66145","66145"],["Hume: Personal Identity","66168","66145","66145"],["Hume: Space and Time","66169","66145","66145"],["Hume: Free Will","66170","66149","66149"],["Hume: Decision Theory","66171","66149","66149"],["Hume: Emotion","66172","66147","66147"],["Hume: Perception","66173","66147","66147"],["Hume: Imagination","66174","66147","66147"],["Hume: Belief","66175","66147,66146","66147"],["Hume: Desire","66176","66147","66147"],["Hume: Ideas","66177","66147","66147"],["Hume: Consciousness","66178","66147","66147"],["Hume: Philosophy of Mind, Misc","66179","66147","66147"],["Hume: Philosophy of Action, Misc","66180","66149","66149"],["Hume: Metaphysics, Misc","66181","66145","66145"],["Hume: Self-Knowledge","66182","66146","66146"],["Hume: Works","66183","6347","6347"],["Hume: Miscellaneous","66184","6347","6347"],["Hume: Biography","66185","66184","66184"],["Hume: Intellectual Context","66186","66184","66184"],["Hume: Introductions and Anthologies","66187","66184","66184"],["Hume: A Treatise of Human Nature","66188","66183","66183"],["Hume: An Enquiry Concerning Human Understanding","66189","66183","66183"],["Hume: An Enquiry Concerning the Principles of Morals","66190","66183","66183"],["Hume: Dialogues Concerning Natural Religion","66191","66183","66183"],["Locke: Metaphysics","66198","6351","6351"],["Locke: Relations","66200","66198","66198"],["Locke: Essence","66201","66198","66198"],["Locke: Substance","66202","66198","66198"],["Locke: Natural Kinds","66203","66198","66198"],["Locke: Powers","66204","66198","66198"],["Locke: Primary and Secondary Qualities","66205","66198","66198"],["Locke: Metaphysics, Misc","66206","66198","66198"],["Locke: Epistemology","66207","6351","6351"],["Locke: Skepticism","66208","66207","66207"],["Locke: Judgment","66209","66207","66207"],["Locke: Knowledge","66210","66207","66207"],["Locke: Epistemology, Misc","66211","66207","66207"],["Locke: Philosophy of Mind","66212","6351","6351"],["Locke: Ideas","66213","66212","66212"],["Locke: Abstract Ideas","66214","66213","66213"],["Locke: Representation","66215","66213","66213"],["Locke: Innate Ideas","66216","66213","66213"],["Locke: Ideas, Misc","66217","66213","66213"],["Locke: Thinking Matter","66218","66212","66212"],["Locke: Dualism","66219","66212","66212"],["Locke: Persons","66220","66212","66212"],["Locke: Perception","66221","66212","66212"],["Locke: Molyneux's Question","66222","66212","66212"],["Locke: Philosophy of Mind, Misc","66223","66212","66212"],["Locke: Free Will","66224","6351","6351"],["Locke: Compatibilism and Incompatibilism","66225","66224","66224"],["Locke: Responsibility","66226","66224","66224"],["Locke: Free Will, Misc","66227","66224","66224"],["Locke: Philosophy of Language","66228","6351","6351"],["Locke: Philosophy of Religion","66229","6351","6351"],["Locke: Political Philosophy","66230","6351","6351"],["Locke: Ethics","66231","6351","6351"],["Locke: Works","66232","6351","6351"],["Locke: Miscellaneous","66233","6351","6351"],["Locke: Life and Times","66234","66233","66233"],["Locke and Other Philosophers","66235","66233","66233"],["Locke: Introductions","66236","66233","66233"],["Locke, Misc","66237","66233","66233"],["Locke: Signification","66238","66228","66228"],["Locke: Propositional Attitudes","66239","66212,66228","66228"],["Locke: Philosophy of Language, Misc","66240","66228","66228"],["Locke: Arguments for Theism","66241","66229","66229"],["Locke: God's Attributes","66242","66229","66229"],["Locke: Immortality","66243","66229","66229"],["Locke: Philosophy of Religion, Misc","66244","66229","66229"],["Locke: The Law of Nature","66245","66230","66230"],["Locke: State of Nature","66246","66230","66230"],["Locke: Property","66247","66230","66230"],["Locke: Political Obligation","66248","66230","66230"],["Locke: Political Legitimacy","66249","66230","66230"],["Locke: Toleration","66250","66230","66230"],["Locke: Political Philosophy, Misc","66251","66230","66230"],["Locke: Divine Command Theory","66252","66231","66231"],["Locke: Moral Motivation","66253","66231","66231"],["Locke: Ethics, Misc","66254","66231","66231"],["Locke: An Essay Concerning Human Understanding","66255","66232","66232"],["Locke: Letter Concerning Toleration","66256","66232","66232"],["Locke: Two Treatises of Government","66257","66232","66232"],["Locke: The Reasonableness of Christianity","66258","66232","66232"],["Locke: Some Thoughts Concerning Education","66259","66232","66232"],["Locke: Works, Misc","66260","66232","66232"],["Locke: Philosophy of Science","66262","6351","6351"],["Locke: Matter","66263","66262","66262"],["Locke: Mechanism","66264","66262","66262"],["Locke: Gravity","66265","66262","66262"],["Locke: Space and Time","66266","66198,66262","66262"],["Locke: Philosophy of Science, Misc","66267","66262","66262"],["Locke: Identity","66268","66198","66198"],["Giorgio Agamben","66321","6726,6491","6726"],["Hume: Motivation","66322","66149","66149"],["Hume: Abstract Ideas","66323","66177","66177"],["Hume: Association of Ideas","66324","66177","66177"],["Hume: Ideas, Misc","66325","66177","66177"],["Hume: Pain","66326","66147","66147"],["Hume: Pleasure","66327","66147","66147"],["Hume: The Argument from Evil","66328","66148","66148"],["Hume: Atheism","66329","66148","66148"],["Hume: Design Arguments for Theism","66330","66148","66148"],["Hume: Cosmological Arguments for Theism","66331","66148","66148"],["Hume: Philosophy of Religion, Misc","66332","66148","66148"],["Hume and Other Philosophers","66333","66184","66184"],["Hume, Misc","66334","66184","66184"],["Hume: Skepticism","66404","66146","66146"],["Hume: Epistemology, Misc","66405","66146","66146"],["Hume: Moral Internalism and Externalism","66406","66152","66152"],["Hume: Moral Cognitivism","66407","66152","66152"],["Hume: Moral Sentimentalism","66408","66152","66152"],["Hume: Moral Expressivism","66409","66152","66152"],["Hume: Moral Noncognitivism","66411","66152","66152"],["Hume: Moral Projectivism","66412","66152","66152"],["Hume: Moral Realism and Irrealism","66413","66152","66152"],["Hume: Moral Relativism","66414","66152","66152"],["Hume: The Is/Ought Gap","66415","66152","66152"],["Hume: Meta-Ethics, Misc","66416","66152","66152"],["Hume: Utilitarianism","66417","66153","66153"],["Hume: Virtue Ethics","66418","66153","66153"],["Hume: Moral Psychology","66419","66153","66153"],["Hume: Moral Value","66420","66153","66153"],["Hume: Sympathy","66421","66153","66153"],["Hume: Normative Ethics, Misc","66422","66153","66153"],["Hume: Justice","66423","66154","66154"],["Hume: Social and Political Philosophy, Misc","66424","66154","66154"],["Hume: Applied Ethics","66425","66144","66144"],["Locke: Rights","66426","79182,66230","66230"],["Locke: Punishment","66427","66230","66230"],["Locke: Education","66428","66230","66230"],["Locke: Philosophy of Mathematics","66429","6351","6351"],["Hume: Moral Judgment","66463","66152","66152"],["Hume: Virtues and Vices","66464","66153","66153"],["Hume: The Common Point of View","66465","66153","66153"],["Hume: Philosophy of Gender","66466","66154","66154"],["Hume: Philosophy of Race","66467","66154","66154"],["Hume's Historical Works","66468","66183","66183"],["Hume: Works, Misc","66469","66183","66183"],["Hume: Value Theory, Misc","66533","66144","66144"],["Derrida: Metaphysics and Epistemology","66597","6503","6503"],["Derrida: Metaphysics","66598","66597","66597"],["Derrida: Differance","66599","66598,66603","66598"],["Derrida: Iterability","66600","66598,66603","66598"],["Derrida: Time","66601","66598","66598"],["Derrida: Epistemology","66602","66597","66597"],["Derrida: Philosophy of Language","66603","66597","66597"],["Derrida: Speech Act Theory","66604","66603","66603"],["Derrida: Speech and Writing","66605","66603","66603"],["Derrida: Philosophy of Language, Misc","66606","66603","66603"],["Derrida: Metaphysics, Misc","66607","66598","66598"],["Derrida: Philosophy of Religion","66608","66597","66597"],["Derrida: Metaphysics and Epistemology, Misc","66609","66597","66597"],["Derrida: Phenomenology","66610","6503","6503"],["Derrida: Psychoanalysis","66611","28667,6503","6503"],["Derrida: Science, Logic, and Mathematics","66612","6503","6503"],["Derrida: Value Theory","66613","6503","6503"],["Derrida: Aesthetics","66614","66613","66613"],["Derrida: LIterature","66615","66614","66614"],["Derrida: Aesthetics, Misc","66616","66614","66614"],["Derrida: Ethics","66617","66613","66613"],["Derrida: Animals","66618","66617","66617"],["Derrida: Friendship","66619","66617","66617"],["Derrida: Gift","66620","66617","66617"],["Derrida: Hospitality","66621","66617","66617"],["Derrida: Mourning","66622","66617","66617"],["Derrida: Ethics, Misc","66623","66617","66617"],["Derrida: Gender, Race, and Sexuality","66624","66613","66613"],["Derrida: History","66625","66613","66613"],["Derrida: Law","66626","66613","66613"],["Derrida: Social and Political Philosophy","66627","66613","66613"],["Derrida: Cosmopolitanism","66628","66627","66627"],["Derrida: Democracy","66629","66627","66627"],["Derrida: Social and Political Philosophy, Misc","66630","66627","66627"],["Derrida: Value Theory, Misc","66631","66613","66613"],["Derrida: Works","66632","6503","6503"],["Derrida: Of Grammatology","66633","66632","66632"],["Derrida: Writing and Difference","66634","66632","66632"],["Derrida: Margins of Philosophy","66635","66632","66632"],["Derrida: Specters of Marx","66636","66632","66632"],["Derrida: Works, Misc","66637","66632","66632"],["Derrida: Miscellaneous","66638","6503","6503"],["Derrida: Introductions and Overviews","66639","66638","66638"],["Derrida: Development and Influences","66640","66638","66638"],["Derrida, Misc","66641","66638","66638"],["Derrida and Other Philosophers","66642","6503","6503"],["Xenophanes","66643","6284","6284"],["Pride","67724","4712","4712"],["Galen","67725","6274","6274"],["Philo","67726","6274","6274"],["Plutarch","67727","6274","6274"],["Middle Platonists, Misc","67728","6274","6274"],["Perceptual Particularity","68195","241","241"],["Kant: Genius","68203","27842","27842"],["Kant: Philosophy of Art","68204","27842","27842"],["Hobbes: Science","68205","6345","6345"],["Hobbes: Mathematics","68206","6345","6345"],["Hobbes: Philosophy of Law","68207","6345","6345"],["Kant: Highest Good","68346","27879","27879"],["Kant: Philosophy of Religion, Misc","68347","27879","27879"],["Hegel: Conceptuality","68348","65970","65970"],["Hegel: Category Theory","68349","65970","65970"],["Hegel: Truth","68350","65970","65970"],["Hegel: Formal Logic","68351","65970","65970"],["Hegel: Transcendental Logic","68352","65970","65970"],["Hegel: Dialectic","68353","65970","65970"],["Hegel: Negation","68354","65970","65970"],["Hegel: Contradiction","68355","65970","65970"],["Hegel: Logic, Misc","68356","65970","65970"],["Hegel: Idealism","68357","65971","65971"],["Hegel: Freedom","68358","65971","65971"],["Hegel: Categorical Realism","68359","65971","65971"],["Hegel: Post-Kantian Interpretation","68360","65971","65971"],["Hegel: Naturalism","68361","65971","65971"],["Hegel: Teleology","68362","65971","65971"],["Hegel: System of Philosophy","68363","65971","65971"],["Hegel: Metaphysics, Misc","68364","65971","65971"],["Hegel: Phenomenology and Systematic Philosophy","68365","65972","65972"],["Hegel: Master-Slave Dialectic","68366","65972","65972"],["Hegel: Phenomenological Observer","68367","65972","65972"],["Hegel: Phenomenology, Misc","68368","65972","65972"],["Hegel: Consciousness","68369","65973","65973"],["Hegel: Self-Consciousness","68370","65973","65973"],["Hegel: Critique of Cartesianism","68371","65973","65973"],["Hegel: Feeling","68372","65973","65973"],["Hegel: Perception","68373","65973","65973"],["Hegel: Representation","68374","65973","65973"],["Hegel: Thought","68375","65973","65973"],["Hegel: Philosophy of Mind, Misc","68376","65973","65973"],["Hegel: Mathematics","68377","65976","65976"],["Hegel: Physics","68378","65976","65976"],["Hegel: Chemistry","68379","65976","65976"],["Hegel: Biology","68380","65976","65976"],["Hegel: Philosophy of Nature, Misc","68381","65976","65976"],["Hegel: Theory of Recognition","68382","65962","65962"],["Hegel: Family","68383","65962","65962"],["Hegel: Civil Society","68384","65962","65962"],["Hegel: The State","68385","65962","65962"],["Hegel: Republicanism","68386","65962","65962"],["Hegel: Democracy","68387","65962","65962"],["Hegel: Patriotism","68388","65962","65962"],["Hegel: International Relations","68389","65962","65962"],["Hegel: War","68390","65962","65962"],["Hegel: Critique of Kant","68392","65963","65963"],["Hegel: Philosophy of Law","68393","65963","65963"],["Hegel: Property Rights","68394","68393","68393"],["Hegel: Punishment","68395","68393","68393"],["Hegel: Philosophy of Law, Misc","68396","68393","68393"],["Hegel: Concept of God","68397","65966","65966"],["Hegel: Ontological Proof","68398","68397","68397"],["Hegel: The Trinity","68399","68397","68397"],["Hegel: Incarnation","68400","68397","68397"],["Hegel: Death of God","68401","68397","68397"],["Hegel: Concept of God, Misc","68402","68397","68397"],["Hegel: Christianity","68403","65966","65966"],["Hegel: Mysticism","68404","68403","68403"],["Hegel: Catholicism","68405","68403","68403"],["Hegel: Protestantism","68406","68403","68403"],["Hegel: Christianity, Misc","68407","68403","68403"],["Hegel: Judaism","68408","65966","65966"],["Hegel: Atheism","68409","65966","65966"],["Hegel: Philosophy of Religion, Misc","68410","65966","65966"],["Hegel: End of Art Thesis","68411","65967","65967"],["Hegel: Aesthetic Feeling","68412","65967","65967"],["Hegel: Classical Art","68413","65967","65967"],["Hegel: Tragedy","68414","68413","68413"],["Hegel: Comedy","68415","68413","68413"],["Hegel: Classical Art, Misc","68416","68413","68413"],["Hegel: Modern Arts","68417","65967","65967"],["Hegel: Aesthetics, Misc","68418","65967","65967"],["Hegel: Historical Science","68419","65964","65964"],["Hegel: Reason in History","68420","65964","65964"],["Hegel: The Ancient World","68421","65964","65964"],["Hegel: The Modern World","68422","65964","65964"],["Hegel: End of History Thesis","68423","65964","65964"],["Hegel: Philosophy of History, Misc","68424","65964","65964"],["Hegel: Interpretation of Greek Philosophy","68425","65965","65965"],["Hegel: Plato","68426","68425","68425"],["Hegel: Aristotle","68427","68425","68425"],["Hegel: Stoicism","68428","68425","68425"],["Hegel: Interpretation of Greek Philosophy, Misc","68429","68425","68425"],["Hegel: Interpretation of Modern Philosophy","68430","65965","65965"],["Hegel: Subjectivity and Modernity","68431","68430","68430"],["Hegel: Romanticism","68432","68430","68430"],["Hegel: Interpretation of Modern Philosophy, Misc","68433","68430","68430"],["Hegel: Pre-Jena Writings","68434","65968","65968"],["Hegel: Jena Writings","68435","65968","65968"],["Hegel: Phenomenology of Spirit","68436","65968","65968"],["Hegel: Science of Logic","68437","65968","65968"],["Hegel: Encyclopedia of the Philosophical Sciences","68438","65968","65968"],["Hegel: Philosophy of Right","68439","65968","65968"],["Hegel: Berlin Lectures","68440","65968","65968"],["Hegel: Works, Misc","68441","65968","65968"],["Kant: Biblical Interpretation","68512","27879","27879"],["Kant: Faith","68513","27879","27879"],["Kant: God","68514","27879","27879"],["Kant: Moral Religious Arguments","68515","27879","27879"],["Seemings","69021","5364","5364"],["Pragmatic Encroachment","69022","5417","5417"],["Speckled Hen Problem","69023","268","268"],["Knowledge as a Natural Kind","69024","5491,5481","5481"],["The Concept of Knowledge","69026","5481","5481"],["Law and Neuroscience","69027","396,4985","4985"],["Imprisonment","69029","4499","4499"],["Tathagatagarbha Thought in Chinese Buddhism","69190","28317","28317"],["Applied Virtue Ethics","69212","69215,4656","4656"],["Consequentialism in Applied Ethics","69213","4615,69215","4615"],["Deontology in Applied Ethics","69214","4640,69215","4640"],["Ethical Theories in Applied Ethics","69215","4380","4380"],["Ethical Theories in Applied Ethics, Misc","69216","69215","69215"],["US Latina Feminism","69400","4740","4740"],["Boredom","69995","4712","4712"],["African Philosophy: Logic","70008","6555","6555"],["African Philosophy: Methodology","70009","6555","6555"],["African Philosophy of Religion","70010","6555","6555"],["Relativism","70758","5734","5734"],["Relativism, Misc","70759","70758","70758"],["Innateness, Misc","70782","5278","5278"],["Innate Concepts","70783","230,5278,388","230"],["Ukrainian Philosophy","70901","6728","6728"],["Human Beings","70974","321","321"],["Human Nature","70975","70974","70974"],["Human Beings, Misc","70976","70974","70974"],["Brentano's Works","71658","6400","6400"],["Brentano and Other Philosophers","71659","6400","6400"],["Robustness in Science","71660","6112","6112"],["History of Physics","71757","5750,5975","5750"],["History of Science, Misc","71758","5975","5975"],["History of Neuroscience","71759","5975,396","396"],["History of Cognitive Science","71760","5975,387","387"],["Materialist Feminism","73918","4740,5745,4744","4740"],["Mathematical Structure of Quantum Mechanics","74676","5810","5810"],["Quantum Information","74677","5527,5794","5794"],["Plato: Metaphysics","74809","6266","6266"],["Plato: Epistemology","74810","6266","6266"],["Plato: Philosophy of Language","74811","6266","6266"],["Plato: Philosophy of Mind","74812","6266","6266"],["Plato: Philosophy of Science","74813","6266","6266"],["Plato: Ethics","74814","7010,6266","6266"],["Plato: Political Philosophy","74815","6266","6266"],["Plato: Aesthetics","74816","6266","6266"],["Plato and Other Philosophers","74817","6266","6266"],["Plato's Works","74818","6266","6266"],["Plato, Misc","74819","6266","6266"],["Plato: Philosophical Method","74820","6266","6266"],["Plato: Why Dialogues?","74821","74820","74820"],["Plato: Socratic Irony","74822","74820","74820"],["Plato: Elenchos","74823","74820","74820"],["Plato: Induction","74824","74820","74820"],["Plato: Hypothesis","74825","74820","74820"],["Plato: Collection and Division","74826","74820","74820"],["Plato: Dialectic","74827","74820","74820"],["Plato: Sophistry","74828","74820","74820"],["Plato: Rhetoric","74829","74820","74820"],["Plato: Myths","74830","74820","74820"],["Plato: Philosophical Method, Misc","74831","74820","74820"],["Plato: Forms","74832","74809","74809"],["Plato: One and Many","74833","74809","74809"],["Plato: Appearance and Reality","74834","74809","74809"],["Plato: Causation","74835","74809","74809"],["Plato: Change","74836","74809","74809"],["Plato: Theology","74837","74809","74809"],["Plato: Mathematics","74838","74809,74813","74809"],["Plato: Third Man Argument","74839","74809","74809"],["Plato: Metaphysics, Misc","74840","74809","74809"],["Plato: Meno's Paradox","74841","74810","74810"],["Plato: Theory of Recollection","74842","74812,74810","74810"],["Plato: Definition","74843","74810,74811","74810"],["Plato: Knowledge and Belief","74844","74812,74810","74810"],["Plato: Perception","74845","74812,74810","74810"],["Plato: Expertise","74846","74810","74810"],["Plato: Epistemology, Misc","74847","74810","74810"],["Plato: Truth","74848","74811","74811"],["Plato: Meaning","74849","74811","74811"],["Plato: Predication","74850","74811","74811"],["Plato: Philosophy of Language, Misc","74851","74811","74811"],["Plato: Immortality of the Soul","74852","74812","74812"],["Plato: Pleasure","74853","74812","74812"],["Plato: Moral Psychology","74854","74812","74812"],["Plato: Eros","74855","74812","74812"],["Plato: Philosophy of Mind, Misc","74856","74812","74812"],["Plato: Exact Sciences","74857","74813","74813"],["Plato: Teleology","74858","74813","74813"],["Plato: Natural Science","74859","74813","74813"],["Plato: Cosmology","74860","74813","74813"],["Plato: Demiurge","74861","74813","74813"],["Plato: Philosophy of Science, Misc","74862","74813","74813"],["Plato: The Good","74863","74814","74814"],["Plato: Happiness","74864","74814","74814"],["Plato: Moral Virtue","74865","74814","74814"],["Plato: Courage","74866","74865","74865"],["Plato: Wisdom","74867","74865","74865"],["Plato: Piety","74868","74865","74865"],["Plato: Temperance","74869","74865","74865"],["Plato: Justice","74870","74865","74865"],["Plato: Moral Virtues, Misc","74871","74865","74865"],["Plato: Friendship","74872","74814","74814"],["Plato: Moral Education","74873","74814","74814"],["Plato: Weakness of Will","74874","74814","74814"],["Plato: Unity of Virtue","74875","74814","74814"],["Plato: Intellectualism","74876","74814","74814"],["Plato: Ethics, Misc","74877","74814","74814"],["Plato: Forms of Rule","74878","74815","74815"],["Plato: Philosopher Rulers","74879","74815","74815"],["Plato: Obedience to Law","74880","74815","74815"],["Plato: Feminism","74881","74815","74815"],["Plato: Poltical Philosophy, Misc","74882","74815","74815"],["Plato: Beauty","74883","74816","74816"],["Plato: Art","74884","74816","74816"],["Plato: Imitation","74885","74816","74816"],["Plato: Poetry","74886","74816","74816"],["Plato: Censorship","74887","74816","74816"],["Plato: Aesthetics, Misc","74888","74816","74816"],["Plato: Early Socratic Dialogues","74893","74818","74818"],["Plato: Middle Dialogues","74894","74818","74818"],["Plato: Late Dialogues","74895","74818","74818"],["Plato: Alcibiades I","74896","74818","74818"],["Plato: Apology","74897","74818","74818"],["Plato: Charmides","74898","74818","74818"],["Plato: Clitophon","74899","74818","74818"],["Plato: Cratylus","74900","74818","74818"],["Plato: Critias","74901","74818","74818"],["Plato: Crito","74902","74818","74818"],["Plato: Euthyphro","74903","74818","74818"],["Plato: Euthydemus","74904","74818","74818"],["Plato: Gorgias","74905","74818","74818"],["Plato: Hippias Major","74906","74818","74818"],["Plato: Hippias Minor","74907","74818","74818"],["Plato: Ion","74908","74818","74818"],["Plato: Laches","74909","74818","74818"],["Plato: Laws","74910","74818","74818"],["Plato: Letters","74911","74818","74818"],["Plato: Lysis","74912","74818","74818"],["Plato: Menexenus","74913","74818","74818"],["Plato: Meno","74914","74818","74818"],["Plato: Parmenides","74915","74818","74818"],["Plato: Phaedo","74916","74818","74818"],["Plato: Phaedrus","74917","74818","74818"],["Plato: Philebus","74918","74818","74818"],["Plato: Politicus","74919","74818","74818"],["Plato: Protagoras","74920","74818","74818"],["Plato: Republic","74921","74818","74818"],["Plato: Sophist","74922","74818","74818"],["Plato: Symposium","74923","74818","74818"],["Plato: Theaetetus","74924","74818","74818"],["Plato: Timaeus","74925","74818","74818"],["Plato: Dubia and Spuria","74926","74818","74818"],["Plato's Works, Misc","74927","74818","74818"],["Plato: Interpretive Strategies","74928","6266","6266"],["African Philosophy: General Works","75846","30251","30251"],["History of Quantum Mechanics","75966","5810","5810"],["Disgust","77105","16236,4712","4712"],["Spinoza: Metaphysics","77897","6379","6379"],["Spinoza: Epistemology","77898","6379","6379"],["Spinoza: Philosophy of Mind","77899","6379","6379"],["Spinoza: Philosophy of Action","77900","6379","6379"],["Spinoza: Philosophy of Science and Mathematics","77901","6379","6379"],["Spinoza: Philosophy of Religion","77902","6379","6379"],["Spinoza: Political Philosophy","77903","6379","6379"],["Spinoza: Ethical Theory","77904","6379","6379"],["Spinoza: Works","77905","6379","6379"],["Spinoza: Context","77906","6379","6379"],["Spinoza and Other Philosophers","77907","6379","6379"],["Spinoza: Miscellaneous","77908","6379","6379"],["Aging","78167","4416","4416"],["Feminism: Aging","78168","4771","4771"],["Feminism: Sex Work and Prostitution","78234","4771","4771"],["Rights and Utility","78679","5138","5138"],["Rights and Justice","78680","5138","5138"],["Rights and Democracy","78681","5138","5138"],["Rights and Personhood","78682","5138","5138"],["The Analysis of Rights","78683","5130","5130"],["The Concept of Rights, Misc","78684","5130","5130"],["Immigration Rights","78685","5144","5144"],["Rights Against Discrimination","78686","5144","5144"],["Sexual Rights","78687","78697,4926","78697"],["Reproductive Rights","78688","4441,78697","78697"],["Rights Against Violence","78689","78697","78697"],["Rights Against Slavery","78690","78697","78697"],["Right to Life","78691","78697","78697"],["Privacy Rights","78692","5144","5144"],["Rights and Duties","78693","5130","5130"],["Corporate Rights","78694","5144","5144"],["Rights and the Rule of Law","78695","5138","5138"],["Intellectual Property Rights","78696","5155","5155"],["Bodily Rights","78697","5127,4390","5127"],["Bodily Rights, Misc","78698","78697","78697"],["Freedom of Contract","78699","5128","5128"],["Right to Political Participation","78700","5128","5128"],["Constitutional Rights","78701","5128","5128"],["Rights of Future Generations","78702","5144","5144"],["Rights to Reparations","78703","5144","5144"],["Human Rights and Democracy","78704","5151","5151"],["Human Rights and Global Justice","78705","5151","5151"],["Human Rights and International Law","78706","5151","5151"],["Justifications of Human Rights","78707","5151","5151"],["Group Rights","78709","4390,5127","5127"],["Women's Rights","78710","78709,4799","78709"],["Disability Rights","78711","4417,78709","78709"],["Parental Rights","78712","78709","78709"],["Ethnic Rights","78713","78709","78709"],["Rights in War","78714","5186,5144","5144"],["Right to Self-Defense","78715","5144","5144"],["The Concept of Human Rights","78716","5151","5151"],["Disability, Misc","78717","4417","4417"],["Physical Disabilities","78718","4417","4417"],["Cognitive Disabilities","78719","4417","4417"],["The Concept of Disability","78720","4417","4417"],["Abilities","78721","6000","6000"],["Capacities","78722","6000","6000"],["Skills","78723","6000","6000"],["Human Rights Abuses","78786","5151","5151"],["Rights in Applied Ethics, Misc","78787","4390","4390"],["History: Rights","79182","5127","5127"],["Group Rights, Misc","79183","78709","78709"],["Legal Rights","79184","4985,5127","5127"],["Divine Hiddenness","89115","4220,4216","4220"],["Felix Guattari","89117","6726","6726"],["Teaching Philosophy","89145","4","4"],["Kant: Opus Postumum","89678","27890","27890"],["Kant: Metaphysics of Morals","89679","27891","27891"],["Kant and Other Philosophers","89680","27900","27900"],["Kant: Theoretical and Practical Reason","89681","27886,27860","27886"],["Kant: Kingdom of Ends","89682","27885","27885"],["Quantum Statistical Mechanics","89804","5794","5794"],["Zizek: Political Philosophy","92263","28697","28697"],["Zizek: Psychoanalysis","92264","28667,28697","28697"],["Zizek: Philosophy of Religion","92265","28697","28697"],["Zizek, Misc","92266","28697","28697"],["RanciÃƒÂ¨re: Works","92267","66138","66138"],["RanciÃƒÂ¨re: Political Philosophy","92268","66138","66138"],["RanciÃƒÂ¨re: History","92269","66138","66138"],["RanciÃƒÂ¨re: Aesthetics","92270","66138","66138"],["RanciÃƒÂ¨re: Philosophy of Education","92271","66138","66138"],["RanciÃƒÂ¨re, Misc","92272","66138","66138"],["Experimental Philosophy: Semantics","92555","28231","28231"]];

  length = json.length;

  for (i = 0; i < length; i++) {
    $('.topics').append('<p><a href="https://www.google.com/#q=' + json[i][0] + '">' + json[i][0] + '</a></p>');
  }
  // console.log(json[0]);
  // console.log(json.length);

});

