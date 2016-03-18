/**
 * Created by 4423 on 18/03/2016.
 */

var JsML = (function() {
  function HTML(tag, props, contents)
  {
    function HTMLBuilder(tag, props, contents)
    {
      // const
      var STRING = 0;
      var JQUERY = 1;
      var JSOBJECT = 2;

      var _tag = "";
      var _props = {};
      var _contents = [];
      var _rType = STRING;

      this.append = function (html)
      {
        if ("Array" === _objectType(html)) {
          _contents.concat(html);
          return this;
        }

        _validateInput(html);
        _contents.push(html);

        return this;
      };

      this.prepend = function (html)
      {
        if ("Array" === _objectType(html)) {
          html.concat(_contents)
          _contents = html;
          return this;
        }

        _validateInput(html);
        _contents.unshift(html);

        return this;
      };

      this.html = function (html)
      {
        if ("Array" !== _objectType(html)) {
          _validateInput(html);
          html = [html];
        }

        _contents = html;
      };

      this.asString = function ()
      {
        var html = '<' + _tag;

        for (var key in _props) {
          if (null === _props[key] || undefined === _props[key]) {
            continue;
          }

          html += ' ' + key + '="' + _props[key] + '"'
        }

        if (_contents.length) {
          _rType = STRING;
          return html + '>' + _parseForDisplay(_contents) + '</' + _tag + '>';
        }

        return html + ' />';
      };
      this.asJsObject = function ()
      {
        // TODO: implement
      };
      this.asJQueryObject = function ()
      {
        // TODO: implement
      };

      var _validateInput = function (inp)
      {
        if ("Array" === _objectType(inp)) {
          for (var i = 0; i < inp.length; i++) {
            _validateInput(inp[i]);
          }
        } else if (!~["String", "Number", "Boolean", "HTMLBuilder"].indexOf(_objectType(inp))) {
          throw new Error("invalid contents type");
        }
      }.bind(this);

      var _parseForDisplay = function (inp)
      {
        if ("Array" === _objectType(inp)) {
          var string = "";
          for (var i = 0; i < inp.length; i++) {
            string += _parseForDisplay(inp[i]);
          }

          return string;
        }

        console.log(_objectType(inp), typeof inp);
        if ("HTMLBuilder" === _objectType(inp)) {
          switch (_rType) {
            case JSOBJECT:
              return inp.asJsObject();
            case JQUERY:
              return inp.asJQueryObject();
          }
          return inp.asString();
        }

        if ("boolean" === typeof inp) {
          return inp ? "true" : "false";
        }

        return inp;
      }.bind(this);

      var _objectType = function (ob)
      {
        var type = Object.prototype.toString.call(ob);
        if ("[object Object]" === type) {
          return ob.constructor.name;
        } else if (/^\[object\s\w+\]$/i.test(type)) {
          return /^\[object\s(\w+)\]/i.exec(type)[1];
        }

        return typeof ob;
      };

      (function __construct() {
        if ("string" !== typeof tag) {
          throw new Error("`tag` should be of type string");
        }

        if ("[object Array]" === _objectType(contents)) {
          _contents = contents;
        } else if (contents) {
          _validateInput(contents);
          _contents.push(contents);
        }
        _tag = tag;
        _props = "object" !== typeof props ? props : {};
      })();
    };

    return new HTMLBuilder(tag, props, contents);
  }
  return {
    HTML: HTML,
    populateGlobal: function ()
    {
      window.HTML = HTML;
    }
  };
})();